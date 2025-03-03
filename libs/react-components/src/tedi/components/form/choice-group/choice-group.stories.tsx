import { Meta, StoryObj } from '@storybook/react';

import { ColProps } from '../../../../tedi/components/grid/col';
import ChoiceGroup from './choice-group';
import { ChoiceGroupItemProps } from './choice-group.types';

/**
 * `ChoiceGroup` manages the state of input elements with the `radio` or `checkbox` role.<br/>
 * It also allows the `fieldset`'s `FormLabel` to be shown or hidden, and enables the display of a `FormHelper` for the entire `fieldset`.<br/>
 * Visual variations include: Check, Radio, Filter, Light, and Selector.
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
  colored?: true;
  tooltip?: boolean;
}

const generateItems = (
  index: number,
  { colProps, extraLongTitle, colored, tooltip }: GenerateItemsArgs = {}
): ChoiceGroupItemProps[] => [
  {
    id: `value-${index * 3}`,
    label: 'Option 1',
    value: `value-${index * 3}`,
    colProps,
    background: colored && 'success-primary',
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
    background: colored && 'warning-primary',
    tooltip: tooltip ? 'Tooltip' : undefined,
  },
  {
    id: `value-${index * 3 + 2}`,
    label: 'Option 3',
    value: `value-${index * 3 + 2}`,
    disabled: !colored,
    colProps,
    background: colored && 'important-primary',
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

export const FilterItem: Story = {
  args: {
    label: 'Choose your filter:',
    id: 'example-3',
    defaultValue: [],
    inputType: 'radio',
    name: 'radio-3',
    type: 'filter',
    items: generateItems(4),
  },
};

export const FilterItemColumn: Story = {
  args: {
    label: 'Choose your filter:',
    id: 'example-3.5',
    defaultValue: [],
    inputType: 'radio',
    name: 'radio-3.5',
    type: 'filter',
    items: generateItems(5),
    direction: 'column',
  },
};

export const SelectorItem: Story = {
  args: {
    label: 'Select your item:',
    id: 'example-4',
    defaultValue: [],
    inputType: 'checkbox',
    name: 'check-4',
    type: 'selector',
    items: generateItems(6),
  },
};

export const SelectorItemColumn: Story = {
  args: {
    label: 'Select your item:',
    id: 'example-4.5',
    defaultValue: [],
    inputType: 'checkbox',
    name: 'check-4.5',
    type: 'selector',
    items: generateItems(7),
    direction: 'column',
  },
};

export const LightItem: Story = {
  args: {
    label: 'Choose your item:',
    id: 'example-5',
    defaultValue: [],
    inputType: 'radio',
    name: 'radio-5',
    type: 'light',
    items: generateItems(8),
  },
};

export const LightItemAutoWidth: Story = {
  args: {
    label: 'Choose your item:',
    id: 'example-5.1',
    defaultValue: [],
    inputType: 'radio',
    name: 'radio-5.1',
    type: 'light',
    items: generateItems(9, { colProps: { width: 'auto' } }),
  },
};

export const LightItemColumn: Story = {
  args: {
    label: 'Choose your item:',
    id: 'example-5.2',
    defaultValue: [],
    inputType: 'radio',
    name: 'radio-5.2',
    type: 'light',
    items: generateItems(10),
    direction: 'column',
  },
};

export const WithHiddenLabel: Story = {
  args: {
    ...Checkbox.args,
    label: 'Im hidden:',
    hideLabel: true,
    items: generateItems(11),
  },
};

export const WithError: Story = {
  args: {
    ...Checkbox.args,
    label: 'I have error:',
    items: generateItems(12),
    helper: {
      text: 'Oh no an error!',
      type: 'error',
      id: 'test',
    },
  },
};

export const WithDefaultValue: Story = {
  args: {
    ...Checkbox.args,
    label: 'I have second item selected by default:',
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

/**
 * ExtraContent prop can only be used with check and radio inputType.
 */
export const WithExtraContent: Story = {
  args: {
    ...Checkbox.args,
    inputType: 'radio',
    label: 'I have extra content after label:',
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
    label: 'I have extra long titles:',
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

export const FilterItemWithColors: Story = {
  args: {
    label: 'Choose your filter:',
    id: 'filter-colored',
    inputType: 'radio',
    name: 'filter-colored',
    type: 'filter',
    items: generateItems(19, { colored: true }),
  },
};

export const RadioWithTooltip: Story = {
  args: {
    label: 'ChoiceGroup with radio buttons that have tooltips:',
    id: 'radio-tooltip',
    defaultValue: [],
    inputType: 'radio',
    name: 'radio-tooltip',
    items: generateItems(20, { tooltip: true }),
  },
};
