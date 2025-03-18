import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { StatusBadge, StatusBadgeColor, StatusBadgeProps, StatusBadgeStatus } from './status-badge';

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
const statuses: StatusBadgeStatus[] = ['inactive', 'success', 'warning', 'danger'];
const colorToIconMap: Record<StatusBadgeColor, string> = {
  neutral: 'edit',
  brand: 'send',
  accent: 'sync',
  success: 'check_circle',
  danger: 'error',
  warning: 'warning',
  transparent: 'edit',
};
const statusToIconMap: Record<StatusBadgeStatus, string> = {
  inactive: 'edit',
  success: 'send',
  warning: 'sync',
  danger: 'error',
};

const Template: StoryFn<StatusBadgeProps> = (args) => <StatusBadge {...args} />;

export const Default: Story = {
  render: Template,
  args: {
    color: 'neutral',
    variant: 'filled',
    children: 'Text',
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
                  <StatusBadge {...args} color={color} variant={variant} icon={colorToIconMap[color]}>
                    Text
                  </StatusBadge>
                </Col>
                <Col width="auto" key={`${color}-${variant}-icon`}>
                  <StatusBadge {...args} color={color} variant={variant} icon={colorToIconMap[color]} />
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
                  <StatusBadge
                    {...args}
                    color="neutral"
                    variant={variant}
                    icon={statusToIconMap[status]}
                    status={status}
                  >
                    Text
                  </StatusBadge>
                </Col>
                <Col width="auto" key={`${status}-${variant}`}>
                  <StatusBadge
                    {...args}
                    color="neutral"
                    variant={variant}
                    icon={statusToIconMap[status]}
                    status={status}
                  />
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
    children: 'Draft',
  },
};
