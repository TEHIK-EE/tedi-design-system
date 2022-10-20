import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Anchor, Heading, Icon } from '../..';
import Button from '../button/button';
import { Card, CardContent } from '../card';
import { Col, Row } from '../grid';
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
  trigger: <Button text="Hover me" />,
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
        <Anchor url="https://www.w3schools.com" target="_blank">
          Even links!
        </Anchor>
      </Col>
    </Row>
  ),
};
