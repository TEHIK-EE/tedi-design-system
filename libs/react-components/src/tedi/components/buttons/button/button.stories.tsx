import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { ElementType } from 'react';

import { Text, TextProps } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Button, ButtonProps } from './button';

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=136-29124&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/10984a-button" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'TEDI-Ready/Components/Buttons/Button',
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

const buttonStateArray = ['Default', 'Hover', 'Active', 'Loading', 'Disabled'];
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
            <Col className="display-flex align-items-center gap-3">
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
            </Col>
            <Col className="display-flex align-items-center gap-3">
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
    <Col lg="auto">
      <Button {...args} lg={{ color: 'default' }} sm={{ color: 'success', visualType: 'primary' }}>
        Button - Success (sm)
      </Button>
    </Col>
    <Col lg="auto">
      <Button
        {...args}
        lg={{ color: 'default', visualType: 'primary' }}
        md={{ color: 'danger', visualType: 'neutral' }}
        sm={{ color: 'danger', visualType: 'primary' }}
      >
        Button - Danger neutral (md)
      </Button>
    </Col>
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
