import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import { Col, Row } from '../../grid';
import Text from '../../typography/text/text';
import { VerticalSpacing } from '../../vertical-spacing';
import Toggle, { ToggleProps } from './toggle';

const meta: Meta<ToggleProps> = {
  component: Toggle,
};

export default meta;
type Story = StoryObj<ToggleProps>;

interface ToggleTemplateProps extends ToggleProps {
  name: string;
}

const ToggleRow = (props: ToggleTemplateProps) => {
  const { name, ...rest } = props;
  return (
    <Row alignItems="center">
      <Col width="auto">
        <Toggle {...rest} />
      </Col>
      <Col width="auto">
        <Toggle defaultChecked {...rest} />
      </Col>
      <Col width="auto">
        <Text color="muted">{name}</Text>
      </Col>
    </Row>
  );
};

const ToggleCol = (props: ToggleTemplateProps) => {
  const { name, ...rest } = props;

  return (
    <VerticalSpacing size={0.5}>
      <p className="text-bold text-primary">{name}</p>
      <ToggleRow {...rest} name="Regular" />
      <ToggleRow {...rest} disabled name="Disabled" />
      <ToggleRow {...rest} isLoading name="Loading" />
      <ToggleRow {...rest} size="large" name="Large" />
      <ToggleRow {...rest} icon isLoading name="Large loading" />
      <ToggleRow {...rest} icon name="With icon" />
      <ToggleRow {...rest} icon disabled name="With icon disabled" />
    </VerticalSpacing>
  );
};

const Template: StoryFn<ToggleProps> = (args) => (
  <Row gap={5}>
    <Col width="auto">
      <ToggleCol {...args} name="Default type" />
    </Col>
    <Col width="auto">
      <ToggleCol {...args} type="ghost" name="Ghost type" />
    </Col>
  </Row>
);

export const Default: Story = {
  render: Template,

  args: {
    ariaLabel: 'Insightful label text for screen reader',
  },
};

export const Alternative: Story = {
  render: Template,

  args: {
    ...Default.args,
    color: 'alternative',
  },
};

export const WithLabel: Story = {
  args: {
    label: <Text>Child in danger</Text>,

    extraContent: <Text color="muted">Childs life or health is in danger or is putting others in danger.</Text>,
  },
};

export const Controlled: StoryFn<ToggleProps> = () => {
  const [checked, setChecked] = React.useState<boolean>(false);

  return (
    <Toggle
      ariaLabel="Insightful label text for screen reader"
      checked={checked}
      onChange={(checked) => setChecked(checked)}
    />
  );
};
