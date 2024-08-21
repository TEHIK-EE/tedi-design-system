import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import Col from '../../grid/col';
import Row from '../../grid/row';
import Text from '../../typography/text/text';
import Radio, { RadioProps } from './radio';

/**
 * Most of the time you should use `ChoiceGroup` component. But we also export a single `Radio` component for custom use cases.
 */
const meta: Meta<typeof Radio> = {
  component: Radio,
  title: 'Community/Form/Radio',
};

export default meta;
type Story = StoryObj<typeof Radio>;

const Template: StoryFn<RadioProps> = (args) => <Radio {...args} label="Select me" value="default" />;

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

export const WithTooltip: Story = {
  render: Template,

  args: {
    id: 'tooltip-radio',
    name: 'tooltip-radio',
    tooltip: 'This is a tooltip',
  },
};

export const WithTooltipAndExtraContent: Story = {
  render: Template,

  args: {
    id: 'tooltip-extra-content-radio',
    name: 'tooltip-extra-content-radio',
    extraContent: (
      <Text color="muted" element="span">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec
        porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.
      </Text>
    ),
    tooltip: 'This is a tooltip',
  },
};

export const WithLongTitleAndTooltipAndExtraContent: Story = {
  args: {
    id: 'long-title-tooltip-extra-content-radio',
    name: 'long-title-tooltip-extra-content-radio',
    label:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc.',
    extraContent: (
      <Text color="muted" element="span">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec
        porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.
      </Text>
    ),
    tooltip: 'This is a tooltip',
  },
};

export const Controlled = () => {
  const [checked, setChecked] = React.useState<boolean>(false);

  return (
    <Radio
      id="controlled-check"
      label="Select me"
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
