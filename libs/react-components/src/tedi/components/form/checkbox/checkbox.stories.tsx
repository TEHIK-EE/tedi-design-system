import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Col, Row } from '../../grid';
import { Text } from '../../typography/text/text';
import Checkbox, { CheckboxProps } from './checkbox';

/**
 * [Figma ↗](https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4228-72934&m=dev)<br/>
 * [Zeroheight ↗](https://zeroheight.com/1ee8444b7/p/796203-checkbox)<br/><hr/>
 * In most cases, you should use the `ChoiceGroup` component. However, we also provide a standalone `Check` component for custom use cases.
 */

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'TEDI-Ready/Components/Form/Checkbox',
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const Template: StoryFn<CheckboxProps> = (args) => <Checkbox {...args} label="Text" value="default" />;

export const Default: Story = {
  render: Template,

  args: {
    id: 'default-check',
    name: 'default-check',
    defaultChecked: true,
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

export const DisabledSelected = () => {
  const [checked, setChecked] = useState<boolean>(true);

  return (
    <Checkbox
      id="controlled-check"
      label="Text"
      name="controlled-check"
      value="controlled"
      checked={checked}
      disabled
      onChange={(value, checked) => setChecked(checked)}
    />
  );
};

export const Indeterminate = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [indeterminate, setIndeterminate] = useState<boolean>(true);

  return (
    <Checkbox
      id="controlled-check"
      label="Text"
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
      <Text color="secondary" element="span">
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
      <Text color="secondary" element="span">
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
    label:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc.',
    extraContent: (
      <Text color="secondary" element="span">
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
    <Checkbox
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
        <Checkbox
          id="check-long-title"
          label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc."
          name="check-long-title"
          value="check"
        />
      </Col>
    </Row>
  );
};
