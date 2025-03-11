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
  extraContent?: boolean;
  colProps?: ColProps;
  extraLongTitle?: boolean;
  tooltip?: boolean;
  showIndicator?: boolean;
}

const generateItems = (
  index: number,
  { colProps, extraLongTitle, tooltip }: GenerateItemsArgs = {}
): ChoiceGroupItemProps[] => [
  {
    id: `value-${index * 3}`,
    label: 'Option 1',
    value: `value-${index * 3}`,
    colProps,
    tooltip: tooltip ? 'Tooltip' : undefined,
  },
  {
    id: `value-${index * 3 + 1}`,
    label: `Option 2, that is longer than the others${
      extraLongTitle
        ? ' - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc.'
        : ''
    }`,
    value: `value-${index * 3 + 1}`,
    colProps,
    tooltip: tooltip ? 'Tooltip' : undefined,
  },
  {
    id: `value-${index * 3 + 2}`,
    label: 'Option 3',
    value: `value-${index * 3 + 2}`,
    disabled: true,
    colProps,
    tooltip: tooltip ? 'Tooltip' : undefined,
  },
];

const choiceItems = (
  inputType: 'radio' | 'checkbox',
  variant: 'primary' | 'secondary',
  withHelper: boolean,
  withIndicator: boolean,
  index: number
) => [
  {
    id: `${inputType}-${variant}-value-${index * 10 + 1}-${withHelper}-${withIndicator}`,
    label: 'Text',
    value: `${inputType}-${variant}-value-${index * 10 + 1}-${withHelper}-${withIndicator}`,
    ...(withHelper && { helper: { text: 'Description' } }),
    showIndicator: withIndicator,
  },
  {
    id: `${inputType}-${variant}-value-${index * 10 + 2}-${withHelper}-${withIndicator}`,
    label: 'Text',
    value: `${inputType}-${variant}-value-${index * 10 + 2}-${withHelper}-${withIndicator}`,
    ...(withHelper && { helper: { text: 'Description' } }),
    showIndicator: withIndicator,
  },
  {
    id: `${inputType}-${variant}-value-${index * 10 + 3}-${withHelper}-${withIndicator}`,
    label: 'Text',
    value: `${inputType}-${variant}-value-${index * 10 + 3}-${withHelper}-${withIndicator}`,
    disabled: true,
    ...(withHelper && { helper: { text: 'Description' } }),
    showIndicator: withIndicator,
  },
];

const renderChoiceGroups = (inputType: 'radio' | 'checkbox') => (
  <>
    <Row>
      <Col lg={6} md={12}>
        <ChoiceGroup
          color="primary"
          id={`${inputType}-primary-no-helper-1`}
          inputType={inputType}
          items={choiceItems(inputType, 'primary', false, true, 1)}
          label="Filter"
          hideLabel
          name={`${inputType}-primary-no-helper-1`}
          showIndicator
          variant="card"
          defaultValue={choiceItems(inputType, 'primary', false, true, 1)[0].value}
        />
      </Col>
      <Col lg={6} md={12}>
        <ChoiceGroup
          color="secondary"
          id={`${inputType}-secondary-no-helper-1`}
          inputType={inputType}
          items={choiceItems(inputType, 'secondary', false, true, 1)}
          label="Filter"
          hideLabel
          name={`${inputType}-secondary-no-helper-1`}
          showIndicator
          variant="card"
          defaultValue={choiceItems(inputType, 'secondary', false, true, 1)[0].value}
        />
      </Col>
    </Row>
    <Row>
      <Col lg={6} md={12}>
        <ChoiceGroup
          color="primary"
          id={`${inputType}-primary-with-helper-2`}
          inputType={inputType}
          items={choiceItems(inputType, 'primary', true, true, 2)}
          label="Filter"
          hideLabel
          name={`${inputType}-primary-with-helper-2`}
          showIndicator
          variant="card"
        />
      </Col>
      <Col lg={6} md={12}>
        <ChoiceGroup
          color="secondary"
          id={`${inputType}-secondary-with-helper-2`}
          inputType={inputType}
          items={choiceItems(inputType, 'secondary', true, true, 2)}
          label="Filter"
          hideLabel
          name={`${inputType}-secondary-with-helper-2`}
          showIndicator
          variant="card"
        />
      </Col>
    </Row>
    <Row>
      <Col lg={6} md={12}>
        <ChoiceGroup
          color="primary"
          id={`${inputType}-primary-no-helper-3`}
          inputType={inputType}
          items={choiceItems(inputType, 'primary', false, false, 3)}
          label="Filter"
          hideLabel
          name={`${inputType}-primary-no-helper-3`}
          showIndicator={false}
          variant="card"
        />
      </Col>
      <Col lg={6} md={12}>
        <ChoiceGroup
          color="secondary"
          id={`${inputType}-secondary-no-helper-3`}
          inputType={inputType}
          items={choiceItems(inputType, 'secondary', false, false, 3)}
          label="Filter"
          hideLabel
          name={`${inputType}-secondary-no-helper-3`}
          showIndicator={false}
          variant="card"
        />
      </Col>
    </Row>
    <Row>
      <Col lg={6} md={12}>
        <ChoiceGroup
          color="primary"
          id={`${inputType}-primary-with-helper-4`}
          inputType={inputType}
          items={choiceItems(inputType, 'primary', true, false, 4)}
          label="Filter"
          hideLabel
          name={`${inputType}-primary-with-helper-4`}
          showIndicator={false}
          variant="card"
        />
      </Col>
      <Col lg={6} md={12}>
        <ChoiceGroup
          color="secondary"
          id={`${inputType}-secondary-with-helper-4`}
          inputType={inputType}
          items={choiceItems(inputType, 'secondary', true, false, 4)}
          label="Filter"
          hideLabel
          name={`${inputType}-secondary-with-helper-4`}
          showIndicator={false}
          variant="card"
        />
      </Col>
    </Row>
  </>
);

export const Radio: Story = {
  args: {
    label: 'ChoiceGroup with radios:',
    id: 'example-1',
    defaultValue: [],
    inputType: 'radio',
    name: 'radio-1',
    items: generateItems(0),
    onChange: (value) => console.log({ value }),
  },
};

export const RadioRow: Story = {
  args: {
    label: 'ChoiceGroup with radios:',
    id: 'example-1.1',
    defaultValue: [],
    inputType: 'radio',
    name: 'radio-1.1',
    items: generateItems(1),
    direction: 'row',
    onChange: (value) => console.log({ value }),
  },
};

export const Checkbox: Story = {
  args: {
    label: 'ChoiceGroup with checkboxes:',
    id: 'example-2',
    defaultValue: [],
    inputType: 'checkbox',
    name: 'check-2',
    items: generateItems(2),
  },
};

export const CheckboxRow: Story = {
  args: {
    label: 'ChoiceGroup with direction row:',
    id: 'example-2.1',
    defaultValue: [],
    inputType: 'checkbox',
    name: 'check-2.1',
    items: generateItems(3),
    direction: 'row',
  },
};

export const RadioCard = () => <VerticalSpacing>{renderChoiceGroups('radio')}</VerticalSpacing>;

export const CheckboxCard = () => <VerticalSpacing>{renderChoiceGroups('checkbox')}</VerticalSpacing>;

export const WithError: Story = {
  args: {
    ...Checkbox.args,
    label: 'I have an error:',
    items: generateItems(12),
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
    items: generateItems(13),
    defaultValue: ['value-40'],
  },
};

export const WithIndeterminate: Story = {
  args: {
    ...Checkbox.args,
    label: 'I have an indeterminate checkbox:',
    items: generateItems(14),
    indeterminateCheck: (state) => (state === 'all' ? 'Unselect all' : 'Select all'),
  },
};

export const WithExtraContent: Story = {
  args: {
    ...Checkbox.args,
    inputType: 'radio',
    label: 'I have extra content after the label:',
    items: generateItems(15, { extraContent: true }),
    helper: { text: 'Extra Content' },
  },
};
