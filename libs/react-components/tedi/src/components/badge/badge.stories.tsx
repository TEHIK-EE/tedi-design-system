import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../grid';
import { VerticalSpacing } from '../vertical-spacing';
import { Badge, BadgeColor, BadgeProps } from './badge';

/**
 * [Figma ↗](https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2385-24154&m=dev)<br/>
 * [ZeroHeight ↗](https://tedi.tehik.ee/1ee8444b7/p/764a67-status-badge)
 */

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Tedi-ready/Components/Badge',
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

type Story = StoryObj<typeof Badge>;

const colors: BadgeColor[] = ['default', 'primary', 'accent', 'success', 'danger', 'warning'];
const variants: BadgeProps['variant'][] = ['filled', 'filled-bordered', 'bordered'];
const statuses: BadgeProps['status'][] = ['inactive', 'success', 'warning', 'danger'];

const Template: StoryFn<BadgeProps> = (args) => <Badge {...args} />;

export const Default: Story = {
  render: Template,
  args: {
    color: 'default',
    variant: 'filled',
    children: 'Default Badge',
  },
};

const TemplateAllCombos: StoryFn<BadgeProps> = (args) => {
  return (
    <div className="badge-grid">
      <VerticalSpacing size={1}>
        {colors.map((color) => (
          <Row key={color} className="mb-2">
            <Col md={2} className="d-flex align-items-center">
              <strong>{color.charAt(0).toUpperCase() + color.slice(1)}</strong>
            </Col>
            {variants.map((variant) => (
              <>
                <Col width="auto" key={`${color}-${variant}`}>
                  <Badge {...args} color={color} variant={variant}>
                    Text
                  </Badge>
                </Col>
                <Col width="auto" key={`${color}-${variant}-icon`}>
                  <Badge {...args} color={color} variant={variant} icon="check_circle">
                    Text
                  </Badge>
                </Col>
                <Col width="auto" key={`${color}-${variant}-icon`}>
                  <Badge {...args} color={color} variant={variant} icon="check_circle" />
                </Col>
              </>
            ))}
          </Row>
        ))}
      </VerticalSpacing>
    </div>
  );
};

const TemplateStatusGrid: StoryFn<BadgeProps> = (args) => {
  return (
    <div className="badge-grid">
      <VerticalSpacing size={1}>
        {statuses.map((status) => (
          <Row key={status} className="mb-2">
            <Col md={2} className="d-flex align-items-center">
              <strong>{status?.charAt(0).toUpperCase() + (status as string).slice(1)}</strong>
            </Col>
            {variants.map((variant) => (
              <>
                <Col width="auto" key={`${status}-${variant}`}>
                  <Badge {...args} color="default" variant={variant} status={status}>
                    Text
                  </Badge>
                </Col>
                <Col width="auto" key={`${status}-${variant}`}>
                  <Badge {...args} color="default" variant={variant} icon="check_circle" status={status}>
                    Text
                  </Badge>
                </Col>
                <Col width="auto" key={`${status}-${variant}`}>
                  <Badge {...args} color="default" variant={variant} icon="check_circle" status={status} />
                </Col>
              </>
            ))}
          </Row>
        ))}
      </VerticalSpacing>
    </div>
  );
};

export const Colors: Story = {
  render: TemplateAllCombos,
};

export const StatusIndicator: Story = {
  render: TemplateStatusGrid,
  args: {
    color: 'default',
  },
};

const TemplateLarge: StoryFn<BadgeProps> = (args) => (
  <Row>
    <Col width="auto">
      <Badge {...args} />
    </Col>
    <Col width="auto">
      <Badge {...args} status="success" />
    </Col>
  </Row>
);

export const Large: Story = {
  render: TemplateLarge,
  args: {
    color: 'default',
    size: 'large',
    children: 'Large Badge',
  },
};
