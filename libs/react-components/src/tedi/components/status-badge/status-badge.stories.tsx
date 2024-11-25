import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../grid';
import { VerticalSpacing } from '../vertical-spacing';
import { StatusBadge, StatusBadgeColor, StatusBadgeProps } from './status-badge';

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2385-24154&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/764a67-status-badge" target="_BLANK">ZeroHeight ↗</a>
 */

const meta: Meta<typeof StatusBadge> = {
  component: StatusBadge,
  title: 'Tedi-Ready/Components/Tag/StatusBadge',
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

type Story = StoryObj<typeof StatusBadge>;

const colors: StatusBadgeColor[] = ['neutral', 'brand', 'accent', 'success', 'danger', 'warning'];
const variants: StatusBadgeProps['variant'][] = ['filled', 'filled-bordered', 'bordered'];
const statuses: StatusBadgeProps['status'][] = ['inactive', 'success', 'warning', 'danger'];

const Template: StoryFn<StatusBadgeProps> = (args) => <StatusBadge {...args} />;

export const Default: Story = {
  render: Template,
  args: {
    color: 'neutral',
    variant: 'filled',
    children: 'Default StatusBadge',
  },
};

const TemplateAllCombos: StoryFn<StatusBadgeProps> = (args) => {
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
                  <StatusBadge {...args} color={color} variant={variant}>
                    Text
                  </StatusBadge>
                </Col>
                <Col width="auto" key={`${color}-${variant}-icon`}>
                  <StatusBadge {...args} color={color} variant={variant} icon="check_circle">
                    Text
                  </StatusBadge>
                </Col>
                <Col width="auto" key={`${color}-${variant}-icon`}>
                  <StatusBadge {...args} color={color} variant={variant} icon="check_circle" />
                </Col>
              </>
            ))}
          </Row>
        ))}
      </VerticalSpacing>
    </div>
  );
};

const TemplateStatusGrid: StoryFn<StatusBadgeProps> = (args) => {
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
                  <StatusBadge {...args} color="neutral" variant={variant} status={status}>
                    Text
                  </StatusBadge>
                </Col>
                <Col width="auto" key={`${status}-${variant}`}>
                  <StatusBadge {...args} color="neutral" variant={variant} icon="check_circle" status={status}>
                    Text
                  </StatusBadge>
                </Col>
                <Col width="auto" key={`${status}-${variant}`}>
                  <StatusBadge {...args} color="neutral" variant={variant} icon="check_circle" status={status} />
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
    color: 'neutral',
  },
};

const TemplateLarge: StoryFn<StatusBadgeProps> = (args) => (
  <Row>
    <Col width="auto">
      <StatusBadge {...args} />
    </Col>
    <Col width="auto">
      <StatusBadge {...args} status="success" />
    </Col>
  </Row>
);

export const Large: Story = {
  render: TemplateLarge,
  args: {
    color: 'neutral',
    size: 'large',
    children: 'Large StatusBadge',
  },
};
