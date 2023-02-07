import { Meta, Story } from '@storybook/react';

import { Col, Row } from '../grid';
import { VerticalSpacing } from '../vertical-spacing';
import { Button, ButtonProps } from './button';

export default {
  title: 'components/Button',
  component: Button,
} as Meta<ButtonProps>;

const Template: Story<ButtonProps> = (args) => {
  const getRow = (name: string, rowProps?: Partial<ButtonProps>): JSX.Element => (
    <Row gutterX={5} alignItems="center">
      <Col width={1} className={args.color === 'inverted' ? 'text-white' : undefined}>
        {name}
      </Col>
      <Col width="auto">
        <Row>
          <Col width="auto">
            <Button {...args} {...rowProps}>
              Button
            </Button>
          </Col>
          <Col width="auto">
            <Button {...args} {...rowProps} iconRight="north_east">
              Button
            </Button>
          </Col>
          <Col width="auto">
            <Button {...args} {...rowProps} icon="north_east">
              Button
            </Button>
          </Col>
        </Row>
      </Col>
      <Col width="auto">
        <Row>
          <Col width="auto">
            <Button {...args} {...rowProps} size="small">
              Button
            </Button>
          </Col>
          <Col width="auto">
            <Button {...args} {...rowProps} iconRight="north_east" size="small">
              Button
            </Button>
          </Col>
          <Col width="auto">
            <Button {...args} {...rowProps} icon="north_east" size="small">
              Button
            </Button>
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
  visualType: 'secondary',
};

export const Error = Template.bind({});
export const ErrorSecondary = Template.bind({});
Error.args = {
  color: 'error',
};
ErrorSecondary.args = {
  ...Error.args,
  visualType: 'secondary',
};

export const Success = Template.bind({});
export const SuccessSecondary = Template.bind({});
Success.args = {
  color: 'success',
};
SuccessSecondary.args = {
  ...Success.args,
  visualType: 'secondary',
};

export const Inverted = Template.bind({});
export const InvertedSecondary = Template.bind({});
Inverted.args = {
  color: 'inverted',
};
InvertedSecondary.args = {
  ...Inverted.args,
  visualType: 'secondary',
};

Inverted.parameters = {
  backgrounds: { default: 'black' },
};
InvertedSecondary.parameters = {
  backgrounds: { default: 'black' },
};

export const Link = Template.bind({});
Link.args = {
  visualType: 'link',
};

export const InvertedLink = Template.bind({});
InvertedLink.args = {
  ...Link.args,
  color: 'inverted',
};
InvertedLink.parameters = {
  backgrounds: { default: 'black' },
};

const NoStyleTemplate: Story<ButtonProps> = (args) => {
  return (
    <Button {...args} noStyle={true}>
      Button without styles
    </Button>
  );
};
export const NoStyle = NoStyleTemplate.bind({});
