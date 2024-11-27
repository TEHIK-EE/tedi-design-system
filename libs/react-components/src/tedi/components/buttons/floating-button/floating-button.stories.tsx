import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../../grid';
import { Text } from '../../typography/text/text';
import FloatingButton, { FloatingButtonProps } from './floating-button';

const meta: Meta<typeof FloatingButton> = {
  component: FloatingButton,
  title: 'Tedi-ready/Components/Buttons/FloatingButton',
};

export default meta;
type Story = StoryObj<typeof FloatingButton>;

const buttonStateArray = ['Default', 'Hover', 'Active', 'Focus'];

type TemplateMultipleProps<Type = typeof buttonStateArray> = FloatingButtonProps & {
  array: Type;
  marginTop: number;
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { marginTop, array, ...buttonProps } = args;

  return (
    <>
      <Row>
        <Col md={1}></Col>
        <Col>
          <Text modifiers="bold">Default</Text>
        </Col>
        <Col className="text-bold">
          <Text modifiers="bold">Large</Text>
        </Col>
      </Row>
      {array.map((value, key) => (
        <Row key={key} style={{ marginTop }}>
          <Col md={1} className="display-flex align-items-center">
            <Text modifiers="bold">{value}</Text>
          </Col>
          <Col className="display-flex align-items-center gap-3">
            <FloatingButton id={value} {...buttonProps}>
              Scroll up
            </FloatingButton>
            <FloatingButton id={value} {...buttonProps} iconRight="arrow_upward">
              Scroll up
            </FloatingButton>
            <FloatingButton id={value} {...buttonProps} iconLeft="arrow_upward">
              Scroll up
            </FloatingButton>
            {buttonProps.axis === 'horizontal' && (
              <FloatingButton id={value} {...buttonProps} icon="arrow_upward">
                Scroll up
              </FloatingButton>
            )}
          </Col>
          <Col className="display-flex align-items-center gap-3">
            <FloatingButton id={value} {...buttonProps} size="large">
              Scroll up
            </FloatingButton>
            <FloatingButton id={value} {...buttonProps} size="large" iconRight="arrow_upward">
              Scroll up
            </FloatingButton>
            <FloatingButton id={value} {...buttonProps} size="large" iconLeft="arrow_upward">
              Scroll up
            </FloatingButton>
            {buttonProps.axis === 'horizontal' && (
              <FloatingButton id={value} {...buttonProps} size="large" icon="arrow_upward">
                Scroll up
              </FloatingButton>
            )}
          </Col>
        </Row>
      ))}
    </>
  );
};

export const Default: Story = {
  args: {
    children: 'Scroll up',
    position: 'static',
  },
};

export const PrimaryHorizontal: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    axis: 'horizontal',
    visualType: 'primary',
    position: 'static',
    marginTop: 10,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

export const PrimaryVertical: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    axis: 'vertical',
    visualType: 'primary',
    position: 'static',
    marginTop: 100,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

export const SecondaryHorizontal: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    axis: 'horizontal',
    visualType: 'secondary',
    position: 'static',
    marginTop: 10,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

export const SecondaryVertical: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    axis: 'vertical',
    visualType: 'secondary',
    position: 'static',
    marginTop: 100,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};
