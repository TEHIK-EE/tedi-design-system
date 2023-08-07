import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import Text from '../../typography/text/text';
import Check, { CheckProps } from './check';

const meta: Meta<typeof Check> = {
  component: Check,
  parameters: {
    docs: {
      description: {
        component:
          'Most of the times you should use `ChoiceGroup` component. But we also export a single `Check` component for custom use cases.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Check>;

const Template: StoryFn<CheckProps> = (args) => <Check {...args} label="Vali mind" value="default" />;

export const Default: Story = {
  render: Template,

  args: {
    id: 'default-check',
    name: 'default-check',
    defaultChecked: true,
    label: <b>VAli mind</b>,
  },
};

export const HiddenLabel: Story = {
  render: Template,

  args: {
    id: 'hidden-label-check',
    name: 'hidden-label-check',
    hideLabel: true,
  },
};

export const DisabledState: Story = {
  render: Template,

  args: {
    id: 'disabled-check',
    name: 'disabled-check',
    disabled: true,
  },
};

export const Indeterminate = () => {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [indeterminate, setIndeterminate] = React.useState<boolean>(true);

  return (
    <Check
      id="controlled-check"
      label="Vali mind"
      name="controlled-check"
      value="controlled"
      checked={checked}
      indeterminate={indeterminate}
      onChange={(value, checked) => {
        setIndeterminate(false);
        setChecked(checked);
      }}
    />
  );
};

export const WithExtraContent: Story = {
  render: Template,

  args: {
    id: 'extra-content-check',
    name: 'extra-content-check',
    extraContent: (
      <Text color="muted" element="span">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec
        porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.
      </Text>
    ),
  },
};

export const HoverState: Story = {
  render: Template,

  args: {
    id: 'hover-check',
    name: 'hover-check',
    hover: true,
  },
};

export const Controlled = () => {
  const [checked, setChecked] = React.useState<boolean>(true);

  return (
    <Check
      id="controlled-check"
      label="Vali mind"
      name="controlled-check"
      value="controlled"
      checked={checked}
      onChange={(value, checked) => setChecked(checked)}
    />
  );
};
