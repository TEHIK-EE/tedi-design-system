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

const buttonSizeArray = ['Default', 'Large'];
const buttonStateArray = ['Default', 'Hover', 'Active', 'Focus'];

type TemplateMultipleProps<Type = typeof buttonStateArray> = FloatingButtonProps & {
  array: Type;
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, ...buttonProps } = args;

  return (
    <Row
      xs={{ gap: buttonProps.axis === 'vertical' ? undefined : 3 }}
      xl={{ gap: 0 }}
      style={{ gap: buttonProps.axis === 'vertical' ? 100 : undefined }}
    >
      {buttonSizeArray.map((size) => (
        <Col xs={12} xl={6} key={size}>
          <Col>
            <Text modifiers="bold">{size}</Text>
          </Col>
          <Row style={{ gap: buttonProps.axis === 'vertical' ? 100 : 16 }}>
            {array.map((value, key) => (
              <Col xs={12} key={key} style={{ display: buttonProps.axis === 'vertical' ? 'flex' : undefined }}>
                <Col xs={2}>
                  <Text>{value}</Text>
                </Col>
                <Col className="display-flex align-items-center gap-2" style={{ padding: 0 }}>
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
              </Col>
            ))}
          </Row>
        </Col>
      ))}
    </Row>
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
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};
