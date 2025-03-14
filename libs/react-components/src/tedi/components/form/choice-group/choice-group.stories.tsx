import { Meta, StoryObj } from '@storybook/react';

import Col, { ColProps } from '../../../../tedi/components/grid/col';
import { Row } from '../../grid';
import { VerticalSpacing } from '../../vertical-spacing';
import ChoiceGroup from './choice-group';
import { ChoiceGroupItemProps } from './choice-group.types';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4598-78103&m=dev" target="_BLANK">Radio Figma ↗</a><br />
 * <a href="https://zeroheight.com/1ee8444b7/p/93e423-radio" target="_BLANK">Radio Zeroheight ↗</a><br/>
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4228-72934&m=dev" target="_BLANK">Checkbox Figma ↗</a><br />
 * <a href="https://zeroheight.com/1ee8444b7/p/796203-checkbox" target="_BLANK">Checkbox Zeroheight ↗</a><br/><hr/>
 * The `ChoiceGroup` component manages the state of input elements with either the radio or checkbox role. <br/>
 * It provides flexibility to show or hide the `FormLabel` for the fieldset and supports displaying a `FormHelper` to provide additional context or guidance for the entire group.
 */
const meta: Meta<typeof ChoiceGroup> = {
  component: ChoiceGroup,
  title: 'TEDI-Ready/Components/Form/ChoiceGroup',
};

export default meta;
type Story = StoryObj<typeof ChoiceGroup>;

interface GenerateItemsArgs {
  index: number;
  inputType?: 'radio' | 'checkbox';
  variant?: 'primary' | 'secondary';
  withHelper?: boolean;
  withIndicator?: boolean;
  extraLongTitle?: boolean;
  tooltip?: boolean;
  colProps?: ColProps;
}

const generateItems = ({
  index,
  inputType = 'radio',
  variant = 'primary',
  withHelper = false,
  withIndicator = false,
  tooltip = false,
  colProps,
}: GenerateItemsArgs): ChoiceGroupItemProps[] => [
  {
    id: `${inputType}-${variant}-value-${index * 10 + 1}-${withHelper}-${withIndicator}`,
    label: 'Text',
    value: `${inputType}-${variant}-value-${index * 10 + 1}-${withHelper}-${withIndicator}`,
    ...(withHelper && { helper: { text: 'Description' } }),
    colProps,
    tooltip: tooltip ? 'Tooltip' : undefined,
  },
  {
    id: `${inputType}-${variant}-value-${index * 10 + 2}-${withHelper}-${withIndicator}`,
    label: 'Text',
    value: `${inputType}-${variant}-value-${index * 10 + 2}-${withHelper}-${withIndicator}`,
    ...(withHelper && { helper: { text: 'Description' } }),
    colProps,
    tooltip: tooltip ? 'Tooltip' : undefined,
  },
  {
    id: `${inputType}-${variant}-value-${index * 10 + 3}-${withHelper}-${withIndicator}`,
    label: 'Text',
    value: `${inputType}-${variant}-value-${index * 10 + 3}-${withHelper}-${withIndicator}`,
    disabled: true,
    ...(withHelper && { helper: { text: 'Description' } }),
    colProps,
    tooltip: tooltip ? 'Tooltip' : undefined,
  },
];

const renderGroup = (
  inputType: 'radio' | 'checkbox',
  variant: 'primary' | 'secondary',
  withHelper: boolean,
  withIndicator: boolean,
  index: number
) => (
  <Row key={`${inputType}-${variant}-${index}`}>
    <Col lg={6} md={12}>
      <ChoiceGroup
        color="primary"
        id={`${inputType}-${variant}-no-helper-${index}`}
        inputType={inputType}
        items={generateItems({
          index,
          inputType,
          variant: 'primary',
          withHelper,
          withIndicator,
        })}
        label="Filter"
        hideLabel
        name={`${inputType}-${variant}-no-helper-${index}`}
        showIndicator={withIndicator}
        variant="card"
        defaultValue={generateItems({ index, inputType, variant, withHelper, withIndicator })[0].value}
      />
    </Col>
    <Col lg={6} md={12}>
      <ChoiceGroup
        color="secondary"
        id={`${inputType}-${variant}-with-helper-${index}`}
        inputType={inputType}
        items={generateItems({
          index: index + 1,
          inputType,
          variant: 'secondary',
          withHelper,
          withIndicator,
        })}
        label="Filter"
        hideLabel
        name={`${inputType}-${variant}-with-helper-${index}`}
        showIndicator={withIndicator}
        variant="card"
      />
    </Col>
  </Row>
);

const renderChoiceGroups = (inputType: 'radio' | 'checkbox') => (
  <VerticalSpacing>
    {renderGroup(inputType, 'primary', false, true, 1)}
    {renderGroup(inputType, 'primary', true, true, 2)}
    {renderGroup(inputType, 'primary', false, false, 3)}
    {renderGroup(inputType, 'primary', true, false, 4)}
  </VerticalSpacing>
);

export const Radio: Story = {
  args: {
    label: 'ChoiceGroup with radios:',
    id: 'example-1',
    defaultValue: [],
    inputType: 'radio',
    name: 'radio-1',
    items: generateItems({ index: 0 }),
    onChange: (value) => console.log({ value }),
  },
};

export const RadioRow: Story = {
  args: {
    ...Radio.args,
    id: 'example-1.1',
    name: 'radio-1.1',
    direction: 'row',
  },
};

export const Checkbox: Story = {
  args: {
    label: 'ChoiceGroup with checkboxes:',
    id: 'example-2',
    defaultValue: [],
    inputType: 'checkbox',
    name: 'check-2',
    items: generateItems({ index: 2 }),
  },
};

export const CheckboxRow: Story = {
  args: {
    ...Checkbox.args,
    id: 'example-2.1',
    name: 'check-2.1',
    direction: 'row',
  },
};

export const RadioCard = () => <VerticalSpacing>{renderChoiceGroups('radio')}</VerticalSpacing>;

export const CheckboxCard = () => <VerticalSpacing>{renderChoiceGroups('checkbox')}</VerticalSpacing>;

export const WithError: Story = {
  args: {
    ...Checkbox.args,
    label: 'I have an error:',
    items: generateItems({ index: 12 }),
    helper: {
      text: 'Oh no, an error!',
      type: 'error',
      id: 'test',
    },
  },
};

export const WithDefaultValue: Story = {
  args: {
    ...Checkbox.args,
    label: 'I have the second item selected by default:',
    items: generateItems({ index: 13 }),
    defaultValue: ['value-40'],
  },
};

export const WithIndeterminate: Story = {
  args: {
    ...Checkbox.args,
    label: 'I have an indeterminate checkbox:',
    items: generateItems({ index: 14 }),
    indeterminateCheck: (state) => (state === 'all' ? 'Unselect all' : 'Select all'),
  },
};

export const WithExtraContent: Story = {
  args: {
    ...Checkbox.args,
    inputType: 'radio',
    label: 'I have extra content after the label:',
    items: generateItems({ index: 15, extraLongTitle: true }),
    helper: { text: 'Extra Content' },
  },
};

export const FullWidth: Story = {
  args: {
    ...Checkbox.args,
    inputType: 'radio',
    label: 'My options will fill the space:',
    variant: 'card',
    showIndicator: true,
    items: generateItems({ index: 16, colProps: { width: 'auto', grow: 1 } }),
  },
};
