import { Meta, StoryObj } from '@storybook/react';
import { OptionsOrGroups } from 'react-select';

import { AsyncSelectTemplate } from './examples/async';
import { CustomOptionSelectTemplate } from './examples/custom-option';
import { EditableSelectTemplate } from './examples/editable';
import { colourOptions, MultipleHandledTemplate } from './examples/multiple-handled';
import Select, { IGroupedOptions, ISelectOption } from './select';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4589-107311&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/97a0a6-select" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'TEDI-Ready/Components/Form/Select',
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: 'tallinn', label: 'Tallinn' },
  { value: 'tartu', label: 'Tartu', isDisabled: true },
  { value: 'elva', label: 'Elva' },
  { value: 'rakvere', label: 'Rakvere' },
];

const groupedOptions: OptionsOrGroups<ISelectOption, IGroupedOptions<ISelectOption>> = [
  {
    label: 'American cities',
    options: [
      { value: 'new-york', label: 'New York' },
      { value: 'dallas', label: 'Dallas' },
    ],
  },
  {
    label: 'Estonian cities',
    options: [
      { value: 'tallinn', label: 'Tallinn' },
      { value: 'tartu', label: 'Tartu' },
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
    isTagRemovable: false,
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
    isClearIndicatorVisible: true,
  },
};

export const WithDescription: Story = {
  render: CustomOptionSelectTemplate,
  args: {
    label: 'With description',
    id: 'description-select',
    helper: { text: 'Hint text' },
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
      modifiers: ['h6'],
      color: 'brand',
    },
    options: groupedOptions,
  },
};
