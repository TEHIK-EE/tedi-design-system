import { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import { Col, ColProps, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Separator from '../../misc/separator/separator';
import ChoiceGroup from './choice-group';
import { ExtendedChoiceGroupItemProps } from './components/choice-group-item/choice-group-item';

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
  title: 'TEDI-Ready/Components/Form/ChoiceGroup/ChoiceGroup',
  subcomponents: { 'ChoiceGroup.Item': ChoiceGroup.Item } as never,
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          return code.replaceAll('ChoiceGroupItem', 'ChoiceGroup.Item');
        },
      },
    },
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
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
  layout?: 'separated' | 'segmented';
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

const generateItems = ({
  index,
  inputType = 'radio',
  variant = 'primary',
  withHelper = false,
  withIndicator = false,
  tooltip = false,
  colProps,
  layout,
  justifyContent,
}: GenerateItemsArgs): ExtendedChoiceGroupItemProps[] => [
  {
    id: `${inputType}-${variant}-value-${index * 10 + 1}-${withHelper}-${withIndicator}-${layout}`,
    label: 'Text',
    value: `${inputType}-${variant}-value-${index * 10 + 1}-${withHelper}-${withIndicator}-${layout}`,
    ...(withHelper && { helper: { text: 'Description' } }),
    colProps,
    tooltip: tooltip ? 'Tooltip' : undefined,
    justifyContent,
  },
  {
    id: `${inputType}-${variant}-value-${index * 10 + 2}-${withHelper}-${withIndicator}-${layout}`,
    label: 'Text',
    value: `${inputType}-${variant}-value-${index * 10 + 2}-${withHelper}-${withIndicator}-${layout}`,
    ...(withHelper && { helper: { text: 'Description' } }),
    colProps,
    tooltip: tooltip ? 'Tooltip' : undefined,
    justifyContent,
  },
  {
    id: `${inputType}-${variant}-value-${index * 10 + 3}-${withHelper}-${withIndicator}-${layout}`,
    label: 'Text',
    value: `${inputType}-${variant}-value-${index * 10 + 3}-${withHelper}-${withIndicator}-${layout}`,
    ...(withHelper && { helper: { text: 'Description', type: 'error' } }),
    disabled: true,
    colProps,
    tooltip: tooltip ? 'Tooltip' : undefined,
    justifyContent,
  },
];

const renderGroup = (
  inputType: 'radio' | 'checkbox',
  variant: 'primary' | 'secondary',
  withHelper: boolean,
  withIndicator: boolean,
  layout: 'segmented' | 'separated',
  index: number,
  justifyContent: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
) => (
  <Row key={`${inputType}-${variant}-${layout}-${index}`}>
    <Col lg={6} md={12}>
      <ChoiceGroup
        color="primary"
        id={`${inputType}-${variant}-${layout}-no-helper-${index}`}
        inputType={inputType}
        items={generateItems({
          index,
          inputType,
          variant: 'primary',
          withHelper,
          withIndicator,
          layout,
          justifyContent,
        })}
        label="Filter"
        hideLabel
        name={`${inputType}-${variant}-${layout}-no-helper-${index}`}
        showIndicator={withIndicator}
        variant="card"
        layout={layout}
      />
    </Col>
    <Col lg={6} md={12}>
      <ChoiceGroup
        color="secondary"
        id={`${inputType}-${variant}-${layout}-with-helper-${index}`}
        inputType={inputType}
        items={generateItems({
          index: index + 1,
          inputType,
          variant: 'secondary',
          withHelper,
          withIndicator,
          layout,
          justifyContent,
        })}
        label="Filter"
        hideLabel
        name={`${inputType}-${variant}-${layout}-with-helper-${index}`}
        showIndicator={withIndicator}
        variant="card"
        layout={layout}
      />
    </Col>
  </Row>
);

const renderChoiceGroups = (inputType: 'radio' | 'checkbox', layout: 'segmented' | 'separated') => (
  <VerticalSpacing>
    <Row>
      <Col lg={6} md={12}>
        <Text modifiers="bold">Primary</Text>
      </Col>
      <Col lg={6} md={12}>
        <Text modifiers="bold">Secondary</Text>
      </Col>
    </Row>
    {renderGroup(inputType, 'primary', false, true, layout, 1, 'start')}
    {renderGroup(inputType, 'primary', true, true, layout, 2, 'start')}
    {inputType !== 'radio' ||
      (layout !== 'separated' && renderGroup(inputType, 'primary', false, false, layout, 3, 'start'))}
    {inputType !== 'radio' ||
      (layout !== 'separated' && renderGroup(inputType, 'primary', true, false, layout, 4, 'start'))}
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
  },
};

export const RadioRow: Story = {
  args: {
    label: 'ChoiceGroup with radios:',
    id: 'example-1.2',
    defaultValue: [],
    inputType: 'radio',
    name: 'radio-1.2',
    direction: 'row',
    items: generateItems({ index: 1 }),
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
    label: 'ChoiceGroup with checkboxes:',
    id: 'example-2.1',
    defaultValue: [],
    inputType: 'checkbox',
    name: 'check-2.1',
    direction: 'row',
    items: generateItems({ index: 33 }),
  },
};

export const RadioCardSegmented = () => <VerticalSpacing>{renderChoiceGroups('radio', 'segmented')}</VerticalSpacing>;
export const RadioCardSeparated = () => <VerticalSpacing>{renderChoiceGroups('radio', 'separated')}</VerticalSpacing>;
export const CheckboxCard = () => <VerticalSpacing>{renderChoiceGroups('checkbox', 'separated')}</VerticalSpacing>;

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
    inputType: 'checkbox',
    label: 'I have extra content after each option:',
    items: generateItems({ index: 15, withHelper: true }),
  },
};

export const Responsive: Story = {
  args: {
    inputType: 'radio',
    label: 'Custom label:',
    variant: 'card',
    showIndicator: true,
    layout: 'separated',
    color: 'primary',
    direction: 'row',
    lg: { layout: 'segmented', direction: 'row', color: 'secondary' },
    items: [
      {
        id: 'radio-card-1',
        label: 'Option 1',
        value: 'value-1',
        sm: { justifyContent: 'start' },
        lg: { justifyContent: 'center', colProps: { width: 'auto', grow: 1 } },
      },
      {
        id: 'radio-card-2',
        label: 'Option 2',
        value: 'value-2',
        defaultChecked: true,
        sm: { justifyContent: 'start' },
        lg: { justifyContent: 'center', colProps: { width: 'auto', grow: 1 } },
      },
      {
        id: 'radio-card-3',
        label: 'Option 3',
        value: 'value-3',
        sm: { justifyContent: 'start' },
        lg: { justifyContent: 'center', colProps: { width: 'auto', grow: 1 } },
      },
    ],
  },
};

export const CustomLabel: Story = {
  args: {
    ...Checkbox.args,
    inputType: 'checkbox',
    direction: 'row',
    label: (
      <Text modifiers={['bold', 'italic']} color="brand">
        Custom label
      </Text>
    ),
    items: generateItems({ index: 16 }),
  },
};

export const CustomItemLabels: Story = {
  args: {
    inputType: 'radio',
    label: 'Custom item labels:',
    items: [
      {
        id: 'radio-custom-item-labels-1',
        label: (
          <Text>
            Lorem ipsum dolor sit, amet
            <Separator
              axis="vertical"
              color="secondary"
              display="inline"
              dotSize="small"
              spacing={0.5}
              variant="dot-only"
            />
            consectetur adipisicing elit.
          </Text>
        ),
        value: 'radio-custom-item-labels-1',
      },
      {
        id: 'radio-custom-item-labels-2',
        label: (
          <Text>
            <Icon display="inline" name="error" color="danger" /> Lorem ipsum dolor sit amet, consectetur adipisicing
            elit.
          </Text>
        ),
        value: 'radio-custom-item-labels-2',
        defaultChecked: true,
      },
      {
        id: 'radio-custom-item-labels-3',
        label: (
          <Text>
            <Icon display="inline" name="check" color="success" /> Lorem ipsum dolor sit amet, consectetur adipisicing
            elit.
          </Text>
        ),
        value: 'radio-custom-item-labels-3',
      },
      {
        id: 'radio-custom-item-labels-4',
        label: 'Lorem ipsum',
        value: 'radio-custom-item-labels-4',
      },
    ],
  },
};
