import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { ComponentProps, useState } from 'react';

import { Card, CardContent } from '../../../community/components/card';
import Toggle from '../../../community/components/form/toggle/toggle';
import Button from '../buttons/button/button';
import { Col, Row } from '../grid';
import { Icon } from '../icon/icon';
import Link from '../navigation/link/link';
import { Heading } from '../typography/heading/heading';
import Tooltip, { TooltipProps } from './tooltip';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=5797-117363&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/035e20-tooltip" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<TemplateProps> = {
  component: Tooltip,
  title: 'TEDI-Ready/Components/Helpers/Tooltip',
  subcomponents: {
    'Tooltip.Provider': Tooltip.Provider,
    'Tooltip.Trigger': Tooltip.Trigger,
    'Tooltip.Content': Tooltip.Content,
  } as never,
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          return code
            .replaceAll('TooltipProvider', 'Tooltip.Provider')
            .replaceAll('TooltipContent', 'Tooltip.Content')
            .replaceAll('TooltipTrigger', 'Tooltip.Trigger');
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<TemplateProps>;

interface TemplateProps extends TooltipProps {
  trigger?: JSX.Element;
  contentProps?: Partial<ComponentProps<typeof Tooltip.Content>>;
}

const Template: StoryFn<TemplateProps> = (args) => {
  const { trigger, contentProps, ...rest } = args;
  return (
    <Tooltip {...rest}>
      <Tooltip.Trigger>{trigger || 'Tooltip Trigger Can Be Text'}</Tooltip.Trigger>
      <Tooltip.Content {...contentProps}>{contentProps?.children || 'Tooltip Content'}</Tooltip.Content>
    </Tooltip>
  );
};

const ControlledTemplate: StoryFn<TemplateProps> = (args) => {
  const { trigger, contentProps, open, ...rest } = args;
  const [innerOpen, setInnerOpen] = useState(open);

  return (
    <Tooltip {...rest} open={innerOpen} onToggle={setInnerOpen}>
      <Tooltip.Trigger>{trigger || 'Tooltip Trigger Can Be Text'}</Tooltip.Trigger>
      <Tooltip.Content {...contentProps}>{contentProps?.children || 'Tooltip Content'}</Tooltip.Content>
    </Tooltip>
  );
};

const WidthTemplate: StoryFn<TemplateProps> = (args) => {
  return (
    <Row justifyContent="center" gap={5}>
      <Col width="auto">
        <Tooltip>
          <Tooltip.Trigger>
            <p>Tooltip with no width limit</p>
          </Tooltip.Trigger>
          <Tooltip.Content maxWidth="none">{args.contentProps?.children || 'Tooltip Content'}</Tooltip.Content>
        </Tooltip>
      </Col>

      <Col width="auto">
        <Tooltip>
          <Tooltip.Trigger>
            <p>Small tooltip width</p>
          </Tooltip.Trigger>
          <Tooltip.Content maxWidth="small">{args.contentProps?.children || 'Tooltip Content'}</Tooltip.Content>
        </Tooltip>
      </Col>

      <Col width="auto">
        <Tooltip>
          <Tooltip.Trigger>
            <p>Medium tooltip width</p>
          </Tooltip.Trigger>
          <Tooltip.Content>{args.contentProps?.children || 'Tooltip Content'}</Tooltip.Content>
        </Tooltip>
      </Col>

      <Col width="auto">
        <Tooltip>
          <Tooltip.Trigger>
            <p>Large tooltip width</p>
          </Tooltip.Trigger>
          <Tooltip.Content maxWidth="large">{args.contentProps?.children || 'Tooltip Content'}</Tooltip.Content>
        </Tooltip>
      </Col>
    </Row>
  );
};

const PositionTemplate: StoryFn<TemplateProps> = (args) => {
  return (
    <Row justifyContent="center" gap={5}>
      <Col width="auto">
        <Tooltip placement="top">
          <Tooltip.Trigger>Tooltip top</Tooltip.Trigger>
          <Tooltip.Content>{args.contentProps?.children || 'Tooltip Content'}</Tooltip.Content>
        </Tooltip>
      </Col>

      <Col width="auto">
        <Tooltip>
          <Tooltip.Trigger>Tooltip bottom</Tooltip.Trigger>
          <Tooltip.Content>{args.contentProps?.children || 'Tooltip Content'}</Tooltip.Content>
        </Tooltip>
      </Col>

      <Col width="auto">
        <Tooltip placement="left">
          <Tooltip.Trigger>Tooltip left</Tooltip.Trigger>
          <Tooltip.Content>{args.contentProps?.children || 'Tooltip Content'}</Tooltip.Content>
        </Tooltip>
      </Col>

      <Col width="auto">
        <Tooltip placement="right">
          <Tooltip.Trigger>Tooltip right</Tooltip.Trigger>
          <Tooltip.Content>{args.contentProps?.children || 'Tooltip Content'}</Tooltip.Content>
        </Tooltip>
      </Col>
    </Row>
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

export const UncontrolledDefaultOpen: Story = {
  render: Template,
  args: {
    defaultOpen: true,
  },
};

export const ControlledOpen: Story = {
  render: ControlledTemplate,
  args: {
    open: true,
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
    trigger: <Link onClick={() => console.log('onClick action triggered')}>Hover me</Link>,
  },
};

export const TriggerToggle: Story = {
  render: Template,
  args: {
    trigger: <Toggle ariaLabel="Some toggle" label="Some toggle" />,
  },
};

export const TriggerCardCustomContent: Story = {
  render: Template,
  args: {
    trigger: (
      <Card>
        <CardContent>
          Whole card <br /> can trigger tooltip
        </CardContent>
      </Card>
    ),
    contentProps: {
      maxWidth: 'none',
      children: (
        <div className="display-flex gap-2">
          <Icon name="person" size={36} />
          <Heading element="h4">You can add any content to Tooltip!</Heading>
        </div>
      ),
    },
  },
};

export const TooltipWidth: Story = {
  render: WidthTemplate,
  args: {
    contentProps: {
      children: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque commodi consectetur cupiditate dolorum ex
          facere harum id, impedit in maxime minus provident, ratione rem rerum sint unde veritatis voluptatibus
          voluptatum!`,
    },
  },
};

export const TooltipPosition: Story = {
  render: PositionTemplate,
  args: {
    contentProps: {
      children: 'Tooltip content',
    },
  },
};
