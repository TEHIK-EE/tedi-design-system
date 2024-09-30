import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import { Col, Row } from '../../../../../tedi/src/components/grid';
import Text from '../../typography/text/text';
import Check, { CheckProps } from './check';

/**
 * Most of the time you should use `ChoiceGroup` component. But we also export a single `Check` component for custom use cases.
 */
const meta: Meta<typeof Check> = {
  component: Check,
  title: 'Community/Form/Check',
};

export default meta;
type Story = StoryObj<typeof Check>;

const Template: StoryFn<CheckProps> = (args) => <Check {...args} label="Select me" value="default" />;

export const Default: Story = {
  render: Template,

  args: {
    id: 'default-check',
    name: 'default-check',
    defaultChecked: true,
    label: <b>Select me</b>,
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
      label="Select me"
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

export const WithTooltip: Story = {
  render: Template,

  args: {
    id: 'tooltip-check',
    name: 'tooltip-check',
    tooltip: 'This is a tooltip',
  },
};

export const WithTooltipAndExtraContent: Story = {
  render: Template,

  args: {
    id: 'tooltip-extra-content-check',
    name: 'tooltip-extra-content-check',
    extraContent: (
      <Text color="muted" element="span">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec
        porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.
      </Text>
    ),
    tooltip: 'This is a tooltip',
  },
};

export const WithTooltipAndLongTitleAndExtraContent: Story = {
  args: {
    id: 'tooltip-long-title-extra-content-check',
    name: 'tooltip-long-title-extra-content-check',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. word word word word word',
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
  const [checked, setChecked] = React.useState<boolean>(true);

  return (
    <Check
      id="controlled-check"
      label="Select me"
      name="controlled-check"
      value="controlled"
      checked={checked}
      onChange={(value, checked) => setChecked(checked)}
    />
  );
};

export const CheckWithLongTitle = () => {
  return (
    <Row>
      <Col width={6}>
        <Check
          id="check-long-title"
          label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc."
          name="check-long-title"
          value="check"
        />
      </Col>
    </Row>
  );
};
