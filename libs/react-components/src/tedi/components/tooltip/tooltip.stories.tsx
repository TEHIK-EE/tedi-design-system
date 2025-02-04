import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { Card, CardContent } from '../../../community/components/card';
import Toggle from '../../../community/components/form/toggle/toggle';
import { Col, Row } from '../../../tedi/components/grid';
import { Icon } from '../../../tedi/components/icon/icon';
import Button from '../buttons/button/button';
import Link from '../navigation/link/link';
import { Heading } from '../typography/heading/heading';
import Tooltip, { TooltipProps } from './tooltip';

const meta: Meta<TemplateProps> = {
  component: Tooltip,
  title: 'TEDI-Ready/Components/Helpers/Tooltip',
  subcomponents: {
    'Tooltip.Provider': Tooltip.Provider,
    'Tooltip.Trigger': Tooltip.Trigger,
    'Tooltip.Content': Tooltip.Content,
  } as never,
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        transform: (code: string) => {
          return code.replaceAll('TooltipContent', 'Tooltip.Content').replaceAll('TooltipTrigger', 'Tooltip.Trigger');
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<TemplateProps>;

interface TemplateProps extends TooltipProps {
  trigger?: JSX.Element;
  tooltipProps?: Partial<ComponentProps<typeof Tooltip.Content>>;
}

const Template: StoryFn<TemplateProps> = (args) => {
  const { trigger, tooltipProps, ...rest } = args;
  return (
    <Tooltip {...rest}>
      <Tooltip.Trigger>{trigger || <span>Very long Tooltip Trigger</span>}</Tooltip.Trigger>
      <Tooltip.Content {...tooltipProps}>{tooltipProps?.children || 'Tooltip Content'}</Tooltip.Content>
    </Tooltip>
  );
};

export const Default: Story = {
  render: Template,
  args: {},
};

export const OpenWithClick: Story = {
  render: Template,
  args: {
    openWith: 'click',
  },
};

export const DefaultOpen: Story = {
  render: Template,
  args: {},
};

export const OuterControlled: Story = {
  render: Template,
  args: {},
};

export const TriggerIcon: Story = {
  render: Template,
  args: {
    trigger: <Icon name="info" display="inline" />,
  },
};

export const TriggerButton: Story = {
  render: Template,
  args: {
    trigger: <Button onClick={() => console.log('onClick action triggered')}>Hover me</Button>,
  },
};

export const TriggerAnchor: Story = {
  render: Template,
  args: {
    trigger: <Link onClick={() => console.log('onClick action triggered')}>Hover me</Link>,
  },
};

export const TriggerToggle: Story = {
  render: Template,
  args: {
    trigger: (
      <Toggle
        ariaLabel="Some toggle"
        label="test"
        onChange={() => console.log('Toggle clicked - Action should be not made when Tooltip is shown on click')}
        checked={true}
      />
    ),
    openWith: 'click',
  },
};

export const TriggerCardCustomContent: Story = {
  render: Template,
  args: {
    ...Default.args,
    trigger: (
      <Card>
        <CardContent>
          Whole card <br /> can trigger tooltip
        </CardContent>
      </Card>
    ),
    tooltipProps: {
      children: (
        <Row>
          <Col width="auto">
            <Icon name="person" />
          </Col>
          <Col width="auto">
            <Heading>You can add any content to Tooltip!</Heading>
            <Link href="https://www.w3schools.com" target="_blank">
              Even links!
            </Link>
          </Col>
        </Row>
      ),
    },
  },
};

/**
 * Tooltip accepts CardProps to Card which wraps TooltipContent.<br />
 * This can be used to add border, padding, background color, etc. to TooltipContent.<br />
 * **Note**: It is added to use in HeaderDropdown, use it with caution.
 */
export const WithCardBorder: Story = {
  render: Template,
  args: {
    ...Default.args,
    openWith: 'click',
    trigger: <Button visualType="primary">Click me</Button>,
    tooltipProps: {
      cardProps: {
        border: 'top-primary-main',
      },
    },
  },
};

export const TooltipWidth: StoryFn = () => {
  const tooltiptext = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque commodi consectetur cupiditate dolorum ex
          facere harum id, impedit in maxime minus provident, ratione rem rerum sint unde veritatis voluptatibus
          voluptatum!`;

  return (
    <Row justifyContent="center" gap={5}>
      <Col width="auto">
        <Tooltip>
          <Tooltip.Trigger>
            <p>Tooltip with no width limit</p>
          </Tooltip.Trigger>
          <Tooltip.Content maxWidth="none">{tooltiptext}</Tooltip.Content>
        </Tooltip>
      </Col>

      <Col width="auto">
        <Tooltip>
          <Tooltip.Trigger>
            <p>Small tooltip width</p>
          </Tooltip.Trigger>
          <Tooltip.Content maxWidth="small">{tooltiptext}</Tooltip.Content>
        </Tooltip>
      </Col>

      <Col width="auto">
        <Tooltip>
          <Tooltip.Trigger>
            <p>Medium tooltip width</p>
          </Tooltip.Trigger>
          <Tooltip.Content>{tooltiptext}</Tooltip.Content>
        </Tooltip>
      </Col>

      <Col width="auto">
        <Tooltip>
          <Tooltip.Trigger>
            <p>Large tooltip width</p>
          </Tooltip.Trigger>
          <Tooltip.Content maxWidth="large">{tooltiptext}</Tooltip.Content>
        </Tooltip>
      </Col>
    </Row>
  );
};

export const TooltipPosition: StoryFn = () => {
  const tooltiptext = 'Lorem ipsum dolor sit amet';

  return (
    <Row justifyContent="center" gap={5}>
      <Col width="auto">
        <Tooltip>
          <Tooltip.Trigger>
            <p>Tooltip top</p>
          </Tooltip.Trigger>
          <Tooltip.Content>{tooltiptext}</Tooltip.Content>
        </Tooltip>
      </Col>

      <Col width="auto">
        <Tooltip>
          <Tooltip.Trigger>
            <p>Tooltip bottom</p>
          </Tooltip.Trigger>
          <Tooltip.Content>{tooltiptext}</Tooltip.Content>
        </Tooltip>
      </Col>

      <Col width="auto">
        <Tooltip>
          <Tooltip.Trigger>
            <p>Tooltip right</p>
          </Tooltip.Trigger>
          <Tooltip.Content>{tooltiptext}</Tooltip.Content>
        </Tooltip>
      </Col>

      <Col width="auto">
        <Tooltip>
          <Tooltip.Trigger>
            <p>Tooltip left</p>
          </Tooltip.Trigger>
          <Tooltip.Content>{tooltiptext}</Tooltip.Content>
        </Tooltip>
      </Col>
    </Row>
  );
};
