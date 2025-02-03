import { Meta, StoryObj } from '@storybook/react';
import { OptionsOrGroups } from 'react-select';

import { AsyncSelectTemplate } from './examples/async';
import { CustomOptionSelectTemplate } from './examples/custom-option';
import { EditableSelectTemplate } from './examples/editable';
import { colourOptions, MultipleHandledTemplate } from './examples/multiple-handled';
import Select, { IGroupedOptions, ISelectOption } from './select';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Community/Form/Select',
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2', isDisabled: true },
  { value: 'option-3', label: 'Option 3' },
  { value: 'option-4', label: 'Option 4' },
];

const groupedOptions: OptionsOrGroups<ISelectOption, IGroupedOptions<ISelectOption>> = [
  {
    label: 'GROUP 1',
    options: [
      { value: 'option-2', label: 'Option 2' },
      { value: 'option-3', label: 'Option 3' },
    ],
  },
  {
    label: 'GROUP 2',
    options: [
      { value: 'option-4', label: 'Option 4' },
      { value: 'option-5', label: 'Option 5' },
    ],
  },
];

const groupedOptions2: OptionsOrGroups<ISelectOption, IGroupedOptions<ISelectOption>> = [
  {
    label: 'Group 1',
    options: [
      { value: 'option-1', label: 'Option 1' },
      { value: 'option-2', label: 'Option 2' },
    ],
  },
  {
    label: 'Group 2',
    options: [
      { value: 'option-3', label: 'Option 3' },
      { value: 'option-4', label: 'Option 4' },
    ],
  },
  {
    label: 'Group 3 - Separately set styles have priority',
    text: {
      modifiers: ['small'],
      color: 'inverted',
    },
    backgroundColor: 'primary-main',
    options: [
      { value: 'option-5', label: 'Option 5' },
      { value: 'option-6', label: 'Option 6' },
    ],
  },
];

export const Default: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
    defaultValue: options[2],
    options: options,
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    id: 'example-2',
    size: 'small',
  },
};

export const MultipleSmall: Story = {
  args: {
    ...Default.args,
    id: 'example-multiple-small',
    size: 'small',
    multiple: true,
    defaultValue: undefined,
    placeholder: 'Placeholder',
  },
};

export const MultipleClosesOnSelect: Story = {
  args: {
    ...Default.args,
    id: 'example-multiple-closes-on-select',
    multiple: true,
    closeMenuOnSelect: true,
    blurInputOnSelect: true,
    defaultValue: undefined,
    placeholder: 'Placeholder',
  },
};

export const ClearIndicatorVisible: Story = {
  args: {
    ...Default.args,
    isClearIndicatorVisible: true,
  },
};

export const MultipleHandled: Story = {
  render: MultipleHandledTemplate,
  args: {
    id: 'multiple-handled-example',
    label: 'Multiple Select',
    multiple: true,
  },
};

export const StackingTags: Story = {
  render: MultipleHandledTemplate,
  args: {
    id: 'stacking-tags-example',
    label: 'Stacking Tags',
    defaultValue: colourOptions.filter((option) => !option.isDisabled),
    multiple: true,
    tagsDirection: 'stack',
  },
};

export const RemovableTags: Story = {
  render: MultipleHandledTemplate,
  args: {
    id: 'removable-tags-example',
    label: 'Removable Tags',
    defaultValue: colourOptions.filter((option) => !option.isDisabled),
    multiple: true,
    isTagRemovable: true,
    tagsDirection: 'stack',
  },
};

export const CustomOptionSelect: Story = {
  render: CustomOptionSelectTemplate,
  args: {
    label: 'Name or personal code',
    id: 'appeal-select',
  },
};

export const AsyncSelect: Story = {
  render: AsyncSelectTemplate,
  args: {
    id: 'async-example',
    label: 'Async label',
    async: true,
  },
};

export const EditableSelect: Story = {
  render: EditableSelectTemplate,
  args: {
    id: 'editable-example',
    label: 'Editable label',
  },
};

export const SelectWithGroupedOptions: Story = {
  args: {
    id: 'grouped-options-example',
    label: 'Grouped options label',
    options: groupedOptions,
  },
};

/**
 * All group headings can be styled at once with `optionGroupHeadingText` and `optionGroupBackgroundColor`.<br/>
 * But they can be styled separately also using `text` and `backgroundColor` inside `options` prop.<br/>
 * If both ways are used at the same time, priority is given to separately set styles.
 */
export const SelectWithStyledGroupedOptions: Story = {
  args: {
    id: 'grouped-options-example-styled',
    label: 'Grouped options label',
    optionGroupHeadingText: {
      modifiers: ['italic'],
      color: 'important',
    },
    optionGroupBackgroundColor: 'important-highlight',
    options: groupedOptions2,
  },
};
