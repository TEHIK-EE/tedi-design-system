import { placements } from '@floating-ui/utils';
import { Meta, StoryFn, StoryObj } from '@storybook/react';

import Button from '../buttons/button/button';
import InfoButton from '../buttons/info-button/info-button';
import { Col, Row } from '../grid';
import Link from '../navigation/link/link';
import Popover, { PopoverProps } from './popover';

const meta: Meta<PopoverProps> = {
  component: Popover,
  subcomponents: {
    'Popover.Trigger': Popover.Trigger,
    'Popover.Content': Popover.Content,
  } as never,
  title: 'TEDI-Ready/Components/Helpers/Popover',
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          return code.replaceAll('PopoverTrigger', 'Popover.Trigger').replaceAll('PopoverContent', 'Popover.Content');
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<PopoverProps>;

const DefaultTemplate: StoryFn<PopoverProps> = (args) => {
  return (
    <Popover {...args}>
      <Popover.Trigger>
        <Button>Popover Trigger</Button>
      </Popover.Trigger>
      <Popover.Content>
        The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
      </Popover.Content>
    </Popover>
  );
};

const BuiltWithVariablesTemplate: StoryFn<PopoverProps> = (args) => {
  return (
    <Row>
      <Col>
        <Popover {...args}>
          <Popover.Trigger>
            <Button>Open Popover</Button>
          </Popover.Trigger>
          <Popover.Content title="Heading" close>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
            <div className="display-flex gap-2">
              <Button visualType="secondary">Cancel</Button>
              <Button>Submit</Button>
            </div>
          </Popover.Content>
        </Popover>
      </Col>
      <Col>
        <Popover {...args}>
          <Popover.Trigger>
            <Button>Open Popover</Button>
          </Popover.Trigger>
          <Popover.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
            <div className="display-flex gap-2">
              <Button visualType="secondary">Cancel</Button>
              <Button>Submit</Button>
            </div>
          </Popover.Content>
        </Popover>
      </Col>
      <Col>
        <Popover {...args}>
          <Popover.Trigger>
            <Button>Open Popover</Button>
          </Popover.Trigger>
          <Popover.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
            <Link underline={false} iconRight="north_east" className="align-self-end">
              Read more
            </Link>
          </Popover.Content>
        </Popover>
      </Col>
      <Col>
        <Popover {...args}>
          <Popover.Trigger>
            <Button>Open Popover</Button>
          </Popover.Trigger>
          <Popover.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Popover.Content>
        </Popover>
      </Col>
    </Row>
  );
};

const HeadingTemplate: StoryFn<PopoverProps> = (args) => {
  return (
    <Row>
      <Col>
        <Popover {...args}>
          <Popover.Trigger>
            <Button visualType="secondary">Open Popover</Button>
          </Popover.Trigger>
          <Popover.Content width="medium" title="Heading" close>
            This popover is with title and close button.
            <div className="display-flex justify-content-end gap-2">
              <Button visualType="secondary">Cancel</Button>
              <Button>Submit</Button>
            </div>
          </Popover.Content>
        </Popover>
      </Col>
      <Col>
        <Popover {...args}>
          <Popover.Trigger>
            <Button visualType="secondary">Open Popover</Button>
          </Popover.Trigger>
          <Popover.Content width="medium" title="Heading">
            This popover is with title.
            <div className="display-flex justify-content-end gap-2">
              <Button visualType="secondary">Cancel</Button>
              <Button>Submit</Button>
            </div>
          </Popover.Content>
        </Popover>
      </Col>
      <Col>
        <Popover {...args}>
          <Popover.Trigger>
            <Button visualType="secondary">Open Popover</Button>
          </Popover.Trigger>
          <Popover.Content
            width="medium"
            title="This popover is with smaller title and close button."
            titleProps={{ element: 'p' }}
            close
          >
            <div className="display-flex justify-content-end gap-2">
              <Button visualType="secondary">Cancel</Button>
              <Button>Submit</Button>
            </div>
          </Popover.Content>
        </Popover>
      </Col>
      <Col>
        <Popover {...args}>
          <Popover.Trigger>
            <Button visualType="secondary">Open Popover</Button>
          </Popover.Trigger>
          <Popover.Content width="medium">
            This popover does not have title and close button.
            <div className="display-flex justify-content-end gap-2">
              <Button visualType="secondary">Cancel</Button>
              <Button>Submit</Button>
            </div>
          </Popover.Content>
        </Popover>
      </Col>
    </Row>
  );
};

const TriggerTemplate: StoryFn<PopoverProps> = (args) => {
  return (
    <Row className="align-items-center">
      <Col>
        <Popover {...args}>
          <Popover.Trigger>
            <Button visualType="secondary">Button Trigger</Button>
          </Popover.Trigger>
          <Popover.Content>This popover is triggered by button.</Popover.Content>
        </Popover>
      </Col>
      <Col>
        <Popover {...args}>
          <Popover.Trigger>
            <InfoButton>Info Button Trigger</InfoButton>
          </Popover.Trigger>
          <Popover.Content>This popover is triggered by info button.</Popover.Content>
        </Popover>
      </Col>
      <Col>
        <Popover {...args}>
          <Popover.Trigger>Text Trigger</Popover.Trigger>
          <Popover.Content>This popover is triggered by text. By default text has dashed underline.</Popover.Content>
        </Popover>
      </Col>
    </Row>
  );
};

const ArrowPositionTemplate: StoryFn<PopoverProps> = (args) => {
  return (
    <Row gap={3}>
      {placements.map((placement) => (
        <Col xs={3} key={placement}>
          <Popover {...args} placement={placement}>
            <Popover.Trigger>{placement}</Popover.Trigger>
            <Popover.Content>
              The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
            </Popover.Content>
          </Popover>
        </Col>
      ))}
    </Row>
  );
};

const SizeTemplate: StoryFn<PopoverProps> = (args) => {
  const sizes = ['small', 'medium', 'large'] as const;

  return (
    <Row gap={3}>
      {sizes.map((size) => (
        <Col xs={3} key={size}>
          <Popover {...args}>
            <Popover.Trigger>{size}</Popover.Trigger>
            <Popover.Content width={size}>
              The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
            </Popover.Content>
          </Popover>
        </Col>
      ))}
    </Row>
  );
};

const NotDismissibleTemplate: StoryFn<PopoverProps> = (args) => {
  return (
    <Popover {...args}>
      <Popover.Trigger>This is not dismissible</Popover.Trigger>
      <Popover.Content title="Not dismissible" close>
        This popover can not be closed by clicking outside or Escape button. Make sure you show the close button,
        otherwise it can not be closed.
      </Popover.Content>
    </Popover>
  );
};

const ScrollLockedTemplate: StoryFn<PopoverProps> = (args) => {
  return (
    <Popover {...args}>
      <Popover.Trigger>Popover with locked scrolling</Popover.Trigger>
      <Popover.Content>
        This popover locks scroll on rest of the page. Use this when you want to focus user attention to this content.
      </Popover.Content>
    </Popover>
  );
};

export const Default: Story = {
  render: DefaultTemplate,
  args: {},
};

export const BuiltWithVariables: Story = {
  render: BuiltWithVariablesTemplate,
  args: {},
};

export const Heading: Story = {
  render: HeadingTemplate,
  args: {},
};

export const Trigger: Story = {
  render: TriggerTemplate,
  args: {},
};

export const ArrowPosition: Story = {
  render: ArrowPositionTemplate,
  args: {},
};

export const Size: Story = {
  render: SizeTemplate,
  args: {},
};

export const NotDismissible: Story = {
  render: NotDismissibleTemplate,
  args: {
    dismissible: false,
  },
};

export const ScrollLocked: Story = {
  render: ScrollLockedTemplate,
  args: {
    scrollLock: true,
  },
};
