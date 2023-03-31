import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Col, Row } from '../../grid';
import { VerticalSpacing } from '../../vertical-spacing';
import Toggle, { ToggleProps } from './toggle';

export default {
  title: 'components/Form/Toggle',
  component: Toggle,
} as Meta;

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
        <p className="text-secondary">{name}</p>
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
      <ToggleRow {...rest} size="large" name="Large" />
      <ToggleRow {...rest} icon name="With icon" />
      <ToggleRow {...rest} icon disabled name="With icon disabled" />
    </VerticalSpacing>
  );
};

const Template: Story<ToggleProps> = (args) => (
  <Row gap={5}>
    <Col width="auto">
      <ToggleCol {...args} name="Default type" />
    </Col>
    <Col width="auto">
      <ToggleCol {...args} type="ghost" name="Ghost type" />
    </Col>
  </Row>
);

export const Default = Template.bind({});
Default.args = {
  ariaLabel: 'Insightful label text for screen reader',
};

export const Alternitive = Template.bind({});
Alternitive.args = {
  ...Default.args,
  color: 'alternative',
};

export const Controlled = () => {
  const [checked, setChecked] = React.useState<boolean>(false);

  return (
    <Toggle
      ariaLabel="Insightful label text for screen reader"
      checked={checked}
      onChange={(checked) => setChecked(checked)}
    />
  );
};
