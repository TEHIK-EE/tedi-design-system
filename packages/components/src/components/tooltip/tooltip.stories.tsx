import { Meta, Story } from '@storybook/react';
import React from 'react';

import Anchor from '../anchor/anchor';
import Button from '../button/button';
import { Card, CardContent } from '../card';
import { Col, Row } from '../grid';
import Icon from '../icon/icon';
import Heading from '../typography/heading/heading';
import Tooltip from './tooltip';
import TooltipProvider, { TooltipProviderProps } from './tooltip-provider';
import TooltipTrigger from './tooltip-trigger';

export default {
  title: 'components/Tooltip',
  component: TooltipProvider,
  subcomponents: { Tooltip, TooltipTrigger },
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    trigger: {
      table: {
        category: 'Example Props',
      },
      description: 'Trigger can be any HTML element and React elements that have been wrapped with forwardRef',
      control: {
        type: null,
      },
    },
    tooltip: {
      table: {
        category: 'Example Props',
      },
      description: 'Tooltip content',
      control: {
        type: null,
      },
    },
  },
} as Meta;

interface TemplateProps extends TooltipProviderProps {
  trigger: JSX.Element;
  tooltip: React.ReactNode;
}

const Template: Story<TemplateProps> = (args) => {
  const { trigger, tooltip, ...rest } = args;
  return (
    <div className="text-center">
      <TooltipProvider {...rest}>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <Tooltip>{tooltip}</Tooltip>
      </TooltipProvider>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  trigger: <span>Very long Tooltip Trigger</span>,
  tooltip: 'Tooltip Content',
};

export const OpenWithClick = Template.bind({});
OpenWithClick.args = {
  trigger: <span>Very long Tooltip Trigger</span>,
  tooltip: 'Tooltip Content',
  openWith: 'click',
};

export const DefaultOpen = Template.bind({});
DefaultOpen.args = {
  ...Default.args,
  defaultOpen: true,
};

export const OuterControlled = Template.bind({});
OuterControlled.args = {
  ...Default.args,
  open: true,
  onToggle: (open) => console.log(open),
};

export const TriggerButton = Template.bind({});
TriggerButton.args = {
  ...Default.args,
  trigger: <Button onClick={() => console.log('onClick action triggered')}>Hover me</Button>,
};

export const TriggerAnchor = Template.bind({});
TriggerAnchor.args = {
  ...Default.args,
  trigger: <Anchor onClick={() => console.log('onClick action triggered')}>Hover me</Anchor>,
};

export const TriggerCardCustomContent = Template.bind({});
TriggerCardCustomContent.args = {
  ...Default.args,
  trigger: (
    <Card>
      <CardContent>
        Whole card <br /> can trigger tooltip
      </CardContent>
    </Card>
  ),
  tooltip: (
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
};

export const TooltipWidth: Story = () => {
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
