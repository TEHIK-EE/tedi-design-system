import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Icon } from '../icon/icon';
import { Text } from '../typography/text/text';
import { TextGroup, TextGroupProps } from './text-group';

/**
 * [Figma ↗](https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=45-30752&mode=dev)<br/>
 * [Zeroheight ↗](https://tedi.zeroheight.com/styleguide/s/118912/p/28835d-icons)
 */

const meta: Meta<typeof TextGroup> = {
  component: TextGroup,
  title: 'Tedi-ready/Content/TextGroup',
  parameters: {
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextGroup>;

const Template: StoryFn<TextGroupProps> = (args) => <TextGroup {...args} />;
const TemplateWithLayouts: StoryFn<TextGroupProps> = (args) => {
  return (
    <>
      <TextGroup type="horizontal" {...args} />
      <TextGroup type="vertical" {...args} />
    </>
  );
};

const MultipleTextGroupsTemplate: StoryFn<TextGroupProps> = (args) => {
  const items = [
    { label: <Text modifiers="bold">Name</Text>, value: <Text>John Doe</Text> },
    { label: <Text modifiers="bold">Email</Text>, value: <Text>john.doe@example.com</Text> },
    { label: <Text modifiers="bold">Phone</Text>, value: <Text>+123 456 7890</Text> },
    { label: <Text modifiers="bold">Status</Text>, value: <Text color="success">Active</Text> },
  ];

  return (
    <>
      {items.map((item, index) => (
        <TextGroup key={index} {...args} label={item.label} value={item.value} />
      ))}
    </>
  );
};

export const Default: Story = {
  render: TemplateWithLayouts,
  args: {
    label: <Text modifiers="bold">Name</Text>,
    value: <Text>John Doe</Text>,
  },
};

export const Layouts: Story = {
  render: Template,
  args: {
    label: (
      <Text modifiers="bold" color="tertiary">
        Patient
      </Text>
    ),
    value: (
      <>
        <Icon name="person" size={18} color="secondary" />
        <Text modifiers="small">john.doe@example.com</Text>
      </>
    ),
    type: 'horizontal',
  },
};

export const MultipleItems: Story = {
  render: MultipleTextGroupsTemplate,
  args: {
    type: 'horizontal',
    verticalSpacing: { size: 0 },
    labelWidth: '150px',
  },
};
