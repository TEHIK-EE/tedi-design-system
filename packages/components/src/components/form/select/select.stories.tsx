import { Meta, StoryObj } from '@storybook/react';

import { AsyncSelectTemplate } from './examples/async';
import { CustomOptionSelectTemplate } from './examples/custom-option';
import { EditableSelectTemplate } from './examples/editable';
import { MultipleHandledTemplate } from './examples/multiple-handled';
import Select from './select';

const meta: Meta<typeof Select> = {
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2', isDisabled: true },
  { value: 'option-3', label: 'Option 3' },
  { value: 'option-4', label: 'Option 4' },
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

export const CustomOptionSelect: Story = {
  render: CustomOptionSelectTemplate,
  args: {
    label: 'Nimi või isikukood',
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
