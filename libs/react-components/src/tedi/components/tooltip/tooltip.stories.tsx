import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Toggle from '../../../community/components/form/toggle/toggle';
import Button from '../buttons/button/button';
import InfoButton from '../buttons/info-button/info-button';
import { Col, Row } from '../grid';
import Tooltip, { TooltipProps } from './tooltip';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=5797-117363&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/035e20-tooltip" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<TooltipProps> = {
  component: Tooltip,
  title: 'TEDI-Ready/Components/Overlay/Tooltip',
  subcomponents: {
    'Tooltip.Trigger': Tooltip.Trigger,
    'Tooltip.Content': Tooltip.Content,
  } as never,
  parameters: {
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
type Story = StoryObj<TooltipProps>;

const Template: StoryFn<TooltipProps> = (args) => {
  return (
    <Tooltip {...args}>
      <Tooltip.Trigger>
        <InfoButton>Info</InfoButton>
      </Tooltip.Trigger>
      <Tooltip.Content>Tooltip Content</Tooltip.Content>
    </Tooltip>
  );
};

const PositionTemplate: StoryFn<TooltipProps> = (args) => {
  return (
    <Row gap={3}>
      <Col xs={3}>
        <Tooltip {...args} placement="top-start">
          <Tooltip.Trigger>Top start</Tooltip.Trigger>
          <Tooltip.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={3}>
        <Tooltip {...args} placement="top">
          <Tooltip.Trigger>Top center</Tooltip.Trigger>
          <Tooltip.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={3}>
        <Tooltip {...args} placement="top-end">
          <Tooltip.Trigger>Top end</Tooltip.Trigger>
          <Tooltip.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={3}>
        <Tooltip {...args} placement="bottom-start">
          <Tooltip.Trigger>Bottom start</Tooltip.Trigger>
          <Tooltip.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={3}>
        <Tooltip {...args} placement="bottom">
          <Tooltip.Trigger>Bottom center</Tooltip.Trigger>
          <Tooltip.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={3}>
        <Tooltip {...args} placement="bottom-end">
          <Tooltip.Trigger>Bottom end</Tooltip.Trigger>
          <Tooltip.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={3}>
        <Tooltip {...args} placement="left-start">
          <Tooltip.Trigger>Left start</Tooltip.Trigger>
          <Tooltip.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={3}>
        <Tooltip {...args} placement="left">
          <Tooltip.Trigger>Left center</Tooltip.Trigger>
          <Tooltip.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={3}>
        <Tooltip {...args} placement="left-end">
          <Tooltip.Trigger>Left end</Tooltip.Trigger>
          <Tooltip.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={3}>
        <Tooltip {...args} placement="right-start">
          <Tooltip.Trigger>Right start</Tooltip.Trigger>
          <Tooltip.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={3}>
        <Tooltip {...args} placement="right">
          <Tooltip.Trigger>Right center</Tooltip.Trigger>
          <Tooltip.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={3}>
        <Tooltip {...args} placement="right-end">
          <Tooltip.Trigger>Right end</Tooltip.Trigger>
          <Tooltip.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Tooltip.Content>
        </Tooltip>
      </Col>
    </Row>
  );
};

const WidthTemplate: StoryFn<TooltipProps> = (args) => {
  return (
    <Row gap={3}>
      <Col>
        <Tooltip {...args}>
          <Tooltip.Trigger>
            <p>Tooltip with no width limit</p>
          </Tooltip.Trigger>
          <Tooltip.Content maxWidth="none">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque commodi consectetur cupiditate dolorum ex
            facere harum id, impedit in maxime minus provident, ratione rem rerum sint unde veritatis voluptatibus
            voluptatum!
          </Tooltip.Content>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip {...args}>
          <Tooltip.Trigger>
            <p>Small tooltip width</p>
          </Tooltip.Trigger>
          <Tooltip.Content maxWidth="small">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque commodi consectetur cupiditate dolorum ex
            facere harum id, impedit in maxime minus provident, ratione rem rerum sint unde veritatis voluptatibus
            voluptatum!
          </Tooltip.Content>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip {...args}>
          <Tooltip.Trigger>
            <p>Medium tooltip width</p>
          </Tooltip.Trigger>
          <Tooltip.Content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque commodi consectetur cupiditate dolorum ex
            facere harum id, impedit in maxime minus provident, ratione rem rerum sint unde veritatis voluptatibus
            voluptatum!
          </Tooltip.Content>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip {...args}>
          <Tooltip.Trigger>
            <p>Large tooltip width</p>
          </Tooltip.Trigger>
          <Tooltip.Content maxWidth="large">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque commodi consectetur cupiditate dolorum ex
            facere harum id, impedit in maxime minus provident, ratione rem rerum sint unde veritatis voluptatibus
            voluptatum!
          </Tooltip.Content>
        </Tooltip>
      </Col>
    </Row>
  );
};

const TriggerTemplate: StoryFn<TooltipProps> = (args) => {
  return (
    <Row gap={3}>
      <Col>
        <Tooltip {...args}>
          <Tooltip.Trigger>
            <InfoButton>Info</InfoButton>
          </Tooltip.Trigger>
          <Tooltip.Content>This tooltip trigger is Info icon.</Tooltip.Content>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip {...args}>
          <Tooltip.Trigger>
            <Button icon="search">Search</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>This tooltip trigger is button with icon.</Tooltip.Content>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip {...args}>
          <Tooltip.Trigger>
            <Toggle ariaLabel="Some toggle" label="Some toggle" />
          </Tooltip.Trigger>
          <Tooltip.Content>This tooltip trigger is toggle.</Tooltip.Content>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip {...args}>
          <Tooltip.Trigger>Tooltip trigger can...</Tooltip.Trigger>
          <Tooltip.Content>Tooltip trigger can be even text.</Tooltip.Content>
        </Tooltip>
      </Col>
    </Row>
  );
};

const ControlledTemplate: StoryFn<TooltipProps> = (args) => {
  const { open, ...rest } = args;
  const [innerOpen, setInnerOpen] = useState(open);

  return (
    <Tooltip {...rest} open={innerOpen} onToggle={setInnerOpen}>
      <Tooltip.Trigger>
        <InfoButton>Info</InfoButton>
      </Tooltip.Trigger>
      <Tooltip.Content>TooltipContent</Tooltip.Content>
    </Tooltip>
  );
};

export const Default: Story = {
  render: Template,
  args: {},
};

export const ArrowPosition: Story = {
  render: PositionTemplate,
  args: {},
};

export const TooltipWidth: Story = {
  render: WidthTemplate,
  args: {},
};

export const Triggers: Story = {
  render: TriggerTemplate,
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
