import { Meta, Story } from '@storybook/react';

import { Col, Row } from '../grid';
import { VerticalSpacing } from '../vertical-spacing';
import { Button, ButtonProps } from './button';

export default {
  title: 'components/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => {
  const { text = 'Button' } = args;

  const getRow = (name: string, rowProps?: Partial<ButtonProps>): JSX.Element => (
    <Row gutterX={5} alignItems="center">
      <Col width={1} className={args.color === 'inverted' ? 'text-white' : undefined}>
        {name}
      </Col>
      <Col width="auto">
        <Row>
          <Col width="auto">
            <Button {...args} {...rowProps} text={text} />
          </Col>
          <Col width="auto">
            <Button {...args} {...rowProps} text={text} iconRight="north_east" />
          </Col>
          <Col width="auto">
            <Button {...args} {...rowProps} text={text} icon="north_east" />
          </Col>
        </Row>
      </Col>
      <Col width="auto">
        <Row>
          <Col width="auto">
            <Button {...args} {...rowProps} text={text} size="small" />
          </Col>
          <Col width="auto">
            <Button {...args} {...rowProps} text={text} iconRight="north_east" size="small" />
          </Col>
          <Col width="auto">
            <Button {...args} {...rowProps} text={text} icon="north_east" size="small" />
          </Col>
        </Row>
      </Col>
    </Row>
  );

  return (
    <VerticalSpacing size={0.5}>
      {getRow('Default')}
      {getRow('Hover', { isHovered: true })}
      {getRow('Active', { isActive: true })}
      {getRow('Disabled', { disabled: true })}
    </VerticalSpacing>
  );
};

export const Default = Template.bind({});
export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
};

export const Error = Template.bind({});
export const ErrorSecondary = Template.bind({});
Error.args = {
  color: 'error',
};
ErrorSecondary.args = {
  ...Error.args,
  type: 'secondary',
};

export const Success = Template.bind({});
export const SuccessSecondary = Template.bind({});
Success.args = {
  color: 'success',
};
SuccessSecondary.args = {
  ...Success.args,
  type: 'secondary',
};

export const Inverted = Template.bind({});
export const InvertedSecondary = Template.bind({});
Inverted.args = {
  color: 'inverted',
};
InvertedSecondary.args = {
  ...Inverted.args,
  type: 'secondary',
};

Inverted.parameters = {
  backgrounds: { default: 'black' },
};
InvertedSecondary.parameters = {
  backgrounds: { default: 'black' },
};

export const Link = Template.bind({});
Link.args = {
  type: 'link',
  text: 'Text link',
};

export const InvertedLink = Template.bind({});
InvertedLink.args = {
  ...Link.args,
  color: 'inverted',
};
InvertedLink.parameters = {
  backgrounds: { default: 'black' },
};
