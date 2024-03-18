import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import Col from '../../grid/col';
import Row from '../../grid/row';
import Text from '../../typography/text/text';
import Radio, { RadioProps } from './radio';

const meta: Meta<typeof Radio> = {
  component: Radio,
  parameters: {
    docs: {
      description: {
        component:
          'Most of the times you should use `ChoiceGroup` component. But we also export a single `Radio` component for custom use cases.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

const Template: StoryFn<RadioProps> = (args) => <Radio {...args} label="Vali mind" value="default" />;

export const Default: Story = {
  render: Template,

  args: {
    id: 'default-radio',
    name: 'default-radio',
    defaultChecked: true,
  },
};

export const HiddenLabel: Story = {
  render: Template,

  args: {
    id: 'hidden-label-radio',
    name: 'hidden-label-radio',
    hideLabel: true,
  },
};

export const DisabledState: Story = {
  render: Template,

  args: {
    id: 'disabled-radio',
    name: 'disabled-radio',
    disabled: true,
  },
};

export const WithExtraContent: Story = {
  render: Template,

  args: {
    id: 'extra-content-radio',
    name: 'extra-content-radio',
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
  const [checked, setChecked] = React.useState<boolean>(false);

  return (
    <Radio
      id="controlled-check"
      label="Vali mind"
      name="controlled-check"
      value="controlled"
      checked={checked}
      onChange={(value, checked) => setChecked(checked)}
    />
  );
};

export const RadioWithLongTitle = () => {
  return (
    <Row>
      <Col width={6}>
        <Radio
          id="radio-long-title"
          label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc."
          name="radio-long-title"
          value="radio"
        />
      </Col>
    </Row>
  );
};
