import { ArgsTable, CURRENT_SELECTION, Description, Primary, Stories, Title } from '@storybook/addon-docs';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import ChoiceGroup from './choice-group';
import { ChoiceGroupItemProps, ChoiceGroupProps } from './choice-group.types';

export default {
  title: 'components/Form/ChoiceGroup',
  component: ChoiceGroup,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            ChoiceGroup is created to handle state of input with role radio or checkbox. It also has possibilty to
            show/hide FormLabel of `fieldset` and show FormHelper to whole `fieldset`. Possibile visual variatsions are:
            Check/Radio/Filter/Selector.
          </Description>
          <Primary />
          <ArgsTable story={CURRENT_SELECTION} />
          <Stories />
        </>
      ),
    },
  },
} as Meta;

const Template: Story<ChoiceGroupProps> = (args) => <ChoiceGroup {...args} />;

const generateItems = (index: number, extraContent?: boolean): ChoiceGroupItemProps[] => [
  { id: `value-${index * 3}`, label: 'Valik 1', value: `value-${index * 3}` },
  {
    id: `value-${index * 3 + 1}`,
    label: 'Valik 2, mis on teistest veidi pikem',
    value: `value-${index * 3 + 1}`,
    extraContent: extraContent ? (
      <span className="text-secondary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec
        porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.
      </span>
    ) : undefined,
  },
  { id: `value-${index * 3 + 2}`, label: 'Valik 3', value: `value-${index * 3 + 2}`, disabled: true },
];

export const Radio = Template.bind({});
Radio.args = {
  label: 'ChoiceGroup with radios:',
  id: 'example-1',
  defaultValue: [],
  inputType: 'radio',
  name: 'radio-1',
  items: generateItems(0),
  onChange: (value) => console.log({ value }),
};

export const Check = Template.bind({});
Check.args = {
  label: 'ChoiceGroup with checkboxes:',
  id: 'example-2',
  defaultValue: [],
  inputType: 'checkbox',
  name: 'check-2',
  items: generateItems(1),
};

export const FilterItem = Template.bind({});
FilterItem.args = {
  label: 'Choose your filter:',
  id: 'example-3',
  defaultValue: [],
  inputType: 'radio',
  name: 'radio-3',
  type: 'filter',
  items: generateItems(2),
};

export const SelectorItem = Template.bind({});
SelectorItem.args = {
  label: 'Select your item:',
  id: 'example-4',
  defaultValue: [],
  inputType: 'checkbox',
  name: 'check-4',
  type: 'selector',
  items: generateItems(3),
};

export const WithHiddenLabel = Template.bind({});
WithHiddenLabel.args = {
  ...Check.args,
  label: 'Im hidden:',
  hideLabel: true,
  items: generateItems(4),
};

export const WithError = Template.bind({});
WithError.args = {
  ...Check.args,
  label: 'I have error:',
  items: generateItems(5),
  helper: {
    text: 'Oh no an error!',
    type: 'error',
    id: 'test',
  },
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  ...Check.args,
  label: 'I have second item selected by default:',
  items: generateItems(6),
  defaultValue: ['value-19'],
};

export const WithExtraContent = Template.bind({});
WithExtraContent.args = {
  ...Check.args,
  inputType: 'radio',
  label: 'I have extra content after label:',
  items: generateItems(7, true),
};
WithExtraContent.parameters = {
  docs: {
    description: {
      story: 'ExtraContent prop can only be used with check and radio inputType',
    },
  },
};
