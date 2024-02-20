import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { ColProps } from '../../grid/col';
import Text from '../../typography/text/text';
import ChoiceGroup from './choice-group';
import { ChoiceGroupItemProps } from './choice-group.types';

const meta: Meta<typeof ChoiceGroup> = {
  component: ChoiceGroup,
  parameters: {
    docs: {
      description: {
        component: `ChoiceGroup is created to handle state of input with role radio or checkbox. It also has possibilty to
          show/hide FormLabel of <code>fieldset</code> and show FormHelper to whole <code>fieldset</code>. Possibile visual variatsions are:
          Check/Radio/Filter/Selector.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChoiceGroup>;

const generateItems = (
  index: number,
  extraContent?: boolean,
  colProps?: ColProps,
  extraLongTitle?: boolean
): ChoiceGroupItemProps[] => [
  { id: `value-${index * 3}`, label: 'Valik 1', value: `value-${index * 3}`, colProps },
  {
    id: `value-${index * 3 + 1}`,
    label: `Valik 2, mis on teistest veidi pikem${
      extraLongTitle
        ? ' - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc.'
        : ''
    }`,
    value: `value-${index * 3 + 1}`,
    extraContent: extraContent ? (
      <Text color="muted" element="span">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec
        porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.
      </Text>
    ) : undefined,
    colProps,
  },
  {
    id: `value-${index * 3 + 2}`,
    label: 'Valik 3',
    value: `value-${index * 3 + 2}`,
    disabled: true,
    colProps,
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

export const Check: Story = {
  args: {
    label: 'ChoiceGroup with checkboxes:',
    id: 'example-2',
    defaultValue: [],
    inputType: 'checkbox',
    name: 'check-2',
    items: generateItems(2),
  },
};

export const CheckRow: Story = {
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
    items: generateItems(9, false, { width: 'auto' }),
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
    ...Check.args,
    label: 'Im hidden:',
    hideLabel: true,
    items: generateItems(11),
  },
};

export const WithError: Story = {
  args: {
    ...Check.args,
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
    ...Check.args,
    label: 'I have second item selected by default:',
    items: generateItems(13),
    defaultValue: ['value-19'],
  },
};

export const WithIndeterminate: Story = {
  args: {
    ...Check.args,
    label: 'I have an indeterminate checkbox:',
    items: generateItems(14),
    indeterminateCheck: (state) => (state === 'all' ? 'Eemalda kõik' : 'Vali kõik'),
  },
};

export const WithExtraContent: Story = {
  args: {
    ...Check.args,
    inputType: 'radio',
    label: 'I have extra content after label:',
    items: generateItems(15, true),
  },

  parameters: {
    docs: {
      description: {
        story: 'ExtraContent prop can only be used with check and radio inputType',
      },
    },
  },
};

export const CheckboxWithLongTitle: Story = {
  args: {
    ...Check.args,
    inputType: 'checkbox',
    label: 'I have extra long titles:',
    items: generateItems(16, false, undefined, true),
  },
};

export const RadioWithLongTitle: Story = {
  args: {
    ...Check.args,
    inputType: 'radio',
    label: 'I have extra long titles:',
    items: generateItems(17, false, undefined, true),
  },
};
