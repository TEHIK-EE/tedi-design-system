import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../../../tedi/components/grid';
import Anchor from '../anchor/anchor';
import Button from '../button/button';
import { Card, CardContent } from '../card';
import Toggle from '../form/toggle/toggle';
import Icon from '../icon/icon';
import Heading from '../typography/heading/heading';
import Tooltip, { TooltipProps } from './tooltip';
import TooltipProvider, { TooltipProviderProps } from './tooltip-provider';
import TooltipTrigger from './tooltip-trigger';

const meta: Meta<TemplateProps> = {
  component: TooltipProvider,
  title: 'Community/Tooltip',
  subcomponents: { Tooltip, TooltipTrigger } as never,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<TemplateProps>;

interface TemplateProps extends TooltipProviderProps {
  trigger?: JSX.Element;
  tooltipProps?: Partial<TooltipProps>;
}

const Template: StoryFn<TemplateProps> = (args) => {
  const { trigger, tooltipProps, ...rest } = args;
  return (
    <div className="text-center">
      <TooltipProvider {...rest}>
        <TooltipTrigger>{trigger || <span>Very long Tooltip Trigger</span>}</TooltipTrigger>
        <Tooltip {...tooltipProps}>{tooltipProps?.children || 'Tooltip Content'}</Tooltip>
      </TooltipProvider>
    </div>
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

  args: {
    defaultOpen: true,
  },
};

export const OuterControlled: Story = {
  render: Template,

  args: {
    open: true,
    onToggle: (open) => console.log(open),
  },
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
    trigger: <Anchor onClick={() => console.log('onClick action triggered')}>Hover me</Anchor>,
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
            <Anchor href="https://www.w3schools.com" target="_blank">
              Even links!
            </Anchor>
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
    trigger: <Button visualType="tertiary">Click me</Button>,
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
        <TooltipProvider>
          <TooltipTrigger>
            <p>Tooltip with no width limit</p>
          </TooltipTrigger>
          <Tooltip maxWidth="none">{tooltiptext}</Tooltip>
        </TooltipProvider>
      </Col>

      <Col width="auto">
        <TooltipProvider>
          <TooltipTrigger>
            <p>Small tooltip width</p>
          </TooltipTrigger>
          <Tooltip maxWidth="small">{tooltiptext}</Tooltip>
        </TooltipProvider>
      </Col>

      <Col width="auto">
        <TooltipProvider>
          <TooltipTrigger>
            <p>Medium tooltip width</p>
          </TooltipTrigger>
          <Tooltip>{tooltiptext}</Tooltip>
        </TooltipProvider>
      </Col>

      <Col width="auto">
        <TooltipProvider>
          <TooltipTrigger>
            <p>Large tooltip width</p>
          </TooltipTrigger>
          <Tooltip maxWidth="large">{tooltiptext}</Tooltip>
        </TooltipProvider>
      </Col>
    </Row>
  );
};

export const TooltipPosition: StoryFn = () => {
  const tooltiptext = 'Lorem ipsum dolor sit amet';

  return (
    <Row justifyContent="center" gap={5}>
      <Col width="auto">
        <TooltipProvider placement="top">
          <TooltipTrigger>
            <p>Tooltip top</p>
          </TooltipTrigger>
          <Tooltip>{tooltiptext}</Tooltip>
        </TooltipProvider>
      </Col>

      <Col width="auto">
        <TooltipProvider placement="bottom">
          <TooltipTrigger>
            <p>Tooltip bottom</p>
          </TooltipTrigger>
          <Tooltip>{tooltiptext}</Tooltip>
        </TooltipProvider>
      </Col>

      <Col width="auto">
        <TooltipProvider placement="right">
          <TooltipTrigger>
            <p>Tooltip right</p>
          </TooltipTrigger>
          <Tooltip>{tooltiptext}</Tooltip>
        </TooltipProvider>
      </Col>

      <Col width="auto">
        <TooltipProvider placement="left">
          <TooltipTrigger>
            <p>Tooltip left</p>
          </TooltipTrigger>
          <Tooltip>{tooltiptext}</Tooltip>
        </TooltipProvider>
      </Col>
    </Row>
  );
};
