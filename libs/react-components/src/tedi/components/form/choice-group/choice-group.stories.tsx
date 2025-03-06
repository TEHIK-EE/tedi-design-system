import { Meta, StoryObj } from '@storybook/react';

import Col, { ColProps } from '../../../../tedi/components/grid/col';
import { Row } from '../../grid';
import ChoiceGroup from './choice-group';
import { ChoiceGroupItemProps } from './choice-group.types';

/**
 * `ChoiceGroup` manages the state of input elements with the `radio` or `checkbox` role.<br/>
 * It also allows the `fieldset`'s `FormLabel` to be shown or hidden, and enables the display of a `FormHelper` for the entire `fieldset`.<br/>
 * Visual variations include: Default, Card, and Pills.
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
  colored?: true;
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
    background: 'success-primary',
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
    background: 'warning-primary',
    tooltip: tooltip ? 'Tooltip' : undefined,
  },
  {
    id: `value-${index * 3 + 2}`,
    label: 'Option 3',
    value: `value-${index * 3 + 2}`,
    disabled: true,
    colProps,
    background: 'danger-primary',
    tooltip: tooltip ? 'Tooltip' : undefined,
  },
];

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

export const FilterPrimary: Story = {
  args: {
    label: 'Filter',
    id: 'example-3',
    defaultValue: [],
    inputType: 'radio',
    name: 'radio-3',
    variant: 'card',
    color: 'primary',
    items: generateItems(4),
  },
};

export const FilterSecondary: Story = {
  args: {
    label: 'Filter',
    id: 'example-3.1',
    defaultValue: [],
    inputType: 'radio',
    name: 'radio-3.1',
    variant: 'card',
    color: 'secondary',
    items: generateItems(5),
  },
};
export const FilterRow: Story = {
  args: {
    label: 'Filter',
    id: 'example-3.2',
    defaultValue: [],
    inputType: 'radio',
    name: 'radio-3.2',
    variant: 'card',
    color: 'secondary',
    items: generateItems(6),
    direction: 'column',
    layout: 'separated',
  },
};

export const FilterRowSegmented: Story = {
  args: {
    label: 'Filter',
    id: 'example-3.2.1',
    defaultValue: [],
    inputType: 'radio',
    name: 'radio-3.2.1',
    variant: 'card',
    color: 'secondary',
    items: generateItems(6),
    direction: 'column',
    layout: 'segmented',
  },
};

export const RadioCard: Story = {
  args: {
    label: 'Filter',
    id: 'example-3.3',
    defaultValue: [],
    inputType: 'radio',
    name: 'radio-3.3',
    variant: 'card',
    color: 'primary',
    items: generateItems(7, { colProps: { width: 'auto' } }),
  },
};

export const CheckboxCard: Story = {
  args: {
    label: 'Filter',
    id: 'example-3.4',
    defaultValue: [],
    inputType: 'checkbox',
    name: 'radio-3.4',
    variant: 'card',
    color: 'primary',
    items: generateItems(8, { colProps: { width: 'auto' } }),
  },
};

export const FilterWithColors: Story = {
  args: {
    label: 'Filter',
    id: 'example-3.5',
    inputType: 'radio',
    name: 'radio-3.5',
    variant: 'card',
    color: 'primary',
    items: generateItems(9, { colored: true }),
  },
};

export const ShowIndicator: Story = {
  args: {
    label: 'Filter',
    id: 'example-3.6',
    inputType: 'radio',
    name: 'example-3.6',
    variant: 'card',
    color: 'primary',
    items: generateItems(10, { colProps: { width: 'auto' } }),
    showIndicator: true,
  },
};

export const WithHiddenLabel: Story = {
  args: {
    ...Checkbox.args,
    label: 'I am hidden:',
    hideLabel: true,
    items: generateItems(11),
  },
};

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

export const CheckboxWithLongTitle: Story = {
  args: {
    ...Checkbox.args,
    inputType: 'checkbox',
    label: 'I have extra long titles:',
    items: generateItems(16, { extraLongTitle: true }),
  },
};

export const CheckboxWithTooltip: Story = {
  args: {
    ...Checkbox.args,
    inputType: 'checkbox',
    label: 'I have tooltips:',
    items: generateItems(17, { tooltip: true }),
  },
};

export const RadioWithLongTitle: Story = {
  args: {
    ...Checkbox.args,
    inputType: 'radio',
    label: 'I have extra long titles:',
    items: generateItems(18, { extraLongTitle: true }),
  },
};

export const RadioWithTooltip: Story = {
  args: {
    label: 'ChoiceGroup with radio buttons that have tooltips:',
    id: 'radio-tooltip',
    defaultValue: [],
    inputType: 'radio',
    name: 'radio-tooltip',
    items: generateItems(19, { tooltip: true }),
  },
};

export const RadioCardWithHelperText = () => {
  return (
    <Row>
      <Col lg={6} md={12}>
        <ChoiceGroup
          color="primary"
          id="example-9"
          inputType="radio"
          items={[
            {
              colProps: {
                width: 'auto',
              },
              id: 'value-90',
              label: 'Option 1',
              tooltip: undefined,
              value: 'value-90',
              helper: { text: 'Text' },
            },
            {
              id: 'value-91',
              label: 'Option 2, that is longer than the others',
              tooltip: undefined,
              value: 'value-91',
              helper: { text: 'Text' },
            },
            {
              disabled: true,
              id: 'value-92',
              label: 'Option 3',
              tooltip: undefined,
              value: 'value-92',
              helper: { text: 'Text' },
            },
          ]}
          label="Filter"
          name="example-9.0"
          showIndicator
          variant="card"
        />
      </Col>
    </Row>
  );
};
