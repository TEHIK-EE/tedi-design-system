import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { ElementType } from 'react';

import { Col, Row } from '../../grid';
import { Text, TextProps } from '../../typography/text/text';
import { VerticalSpacing } from '../../vertical-spacing';
import { Button, ButtonProps } from './button';

/**
 * [Figma ↗](https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=136-29124&m=dev)<br/>
 * [Zeroheight ↗](https://zeroheight.com/1ee8444b7/p/10984a-button)
 */

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'TEDI-Ready/Buttons/Button',
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

const buttonStateArray = ['Default', 'Hover', 'Active', 'Focus', 'Loading', 'Disabled'];
const Template: StoryFn<ButtonProps<ElementType>> = (args) => <Button {...args} />;

export const Default: Story = {
  render: Template,
  argTypes: {
    as: {
      control: false,
      table: {
        type: { summary: 'ElementType' },
      },
    },
  },
  args: {
    children: 'Button',
  },
};

type TemplateMultipleProps<Type = typeof buttonStateArray> = ButtonProps<'button'> & {
  array: Type;
  titleColor: TextProps['color'];
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, titleColor, ...buttonProps } = args;

  return (
    <>
      <VerticalSpacing size={0.5}>
        <Row>
          <Col md={1}></Col>
          <Col>
            <Text color={titleColor} modifiers="bold">
              Default
            </Text>
          </Col>
          <Col className="text-bold">
            <Text color={titleColor} modifiers="bold">
              Small
            </Text>
          </Col>
        </Row>
        {array.map((value, key) => (
          <Row key={key}>
            <Col md={1} className="display-flex align-items-center">
              <Text color={titleColor} modifiers="bold">
                {value}
              </Text>
            </Col>
            <Col>
              <div className="display-flex align-items-center gap-3 justify-content-center">
                <Button id={value} {...buttonProps} disabled={value === 'Disabled'} isLoading={value === 'Loading'}>
                  Create
                </Button>
                <Button
                  id={value}
                  {...buttonProps}
                  iconRight="arrow_right_alt"
                  disabled={value === 'Disabled'}
                  isLoading={value === 'Loading'}
                >
                  Continue
                </Button>
                <Button
                  id={value}
                  {...buttonProps}
                  iconLeft="edit"
                  disabled={value === 'Disabled'}
                  isLoading={value === 'Loading'}
                >
                  Edit
                </Button>
                <Button
                  id={value}
                  {...buttonProps}
                  icon="arrow_right_alt"
                  disabled={value === 'Disabled'}
                  isLoading={value === 'Loading'}
                >
                  Icon Only
                </Button>
              </div>
            </Col>
            <Col>
              <div className="display-flex align-items-center gap-3">
                <Button
                  id={value}
                  size="small"
                  {...buttonProps}
                  disabled={value === 'Disabled'}
                  isLoading={value === 'Loading'}
                >
                  Create
                </Button>
                <Button
                  id={value}
                  size="small"
                  {...buttonProps}
                  iconRight="arrow_right_alt"
                  disabled={value === 'Disabled'}
                  isLoading={value === 'Loading'}
                >
                  Continue
                </Button>
                <Button
                  id={value}
                  size="small"
                  {...buttonProps}
                  iconLeft="edit"
                  disabled={value === 'Disabled'}
                  isLoading={value === 'Loading'}
                >
                  Edit
                </Button>
                <Button
                  id={value}
                  size="small"
                  {...buttonProps}
                  icon="arrow_right_alt"
                  disabled={value === 'Disabled'}
                  isLoading={value === 'Loading'}
                >
                  Icon Only
                </Button>
              </div>
            </Col>
          </Row>
        ))}
      </VerticalSpacing>
    </>
  );
};

export const Primary: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    visualType: 'primary',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

export const PrimaryInverted: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    visualType: 'primary',
    color: 'inverted',
    titleColor: 'white',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
    backgrounds: { default: 'brand' },
  },
};

export const Secondary: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    visualType: 'secondary',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

export const SecondaryInverted: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    visualType: 'secondary',
    color: 'inverted',
    titleColor: 'white',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
    backgrounds: { default: 'brand' },
  },
};

export const Neutral: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    visualType: 'neutral',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

export const NeutralInverted: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    visualType: 'neutral',
    color: 'inverted',
    titleColor: 'white',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
    backgrounds: { default: 'brand' },
  },
};

export const Success: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    color: 'success',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

export const Danger: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    color: 'danger',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

export const DangerNeutral: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    color: 'danger',
    visualType: 'neutral',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

export const NoStyleTemplate: StoryFn<ButtonProps> = (args) => {
  return (
    <Button {...args} noStyle={true}>
      Button without styles
    </Button>
  );
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Button',
  },
};

const ResponsiveTemplate: StoryFn<ButtonProps<ElementType>> = (args) => (
  <Row>
    <div className="display-flex align-items-center gap-3 justify-content-center">
      <Button {...args} sm={{ color: 'default', visualType: 'primary', size: 'small' }}>
        Button - Small (sm)
      </Button>
      <Button {...args} md={{ color: 'success', visualType: 'primary' }}>
        Button - Medium (md)
      </Button>
      <Button {...args} lg={{ color: 'danger', visualType: 'primary', size: 'small' }}>
        Button - Small (lg)
      </Button>
    </div>
  </Row>
);

export const ResponsiveButton: Story = {
  render: ResponsiveTemplate,
  args: {
    children: 'Responsive Button',
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};
