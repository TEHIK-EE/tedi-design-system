import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Button from '../../buttons/button/button';
import InfoButton from '../../buttons/info-button/info-button';
import { Col, Row } from '../../layout/grid';
import Link from '../../navigation/link/link';
import Popover, { PopoverProps } from './popover';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=5797-117364&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://zeroheight.com/1ee8444b7/p/72a3ed-popover" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<PopoverProps> = {
  component: Popover,
  subcomponents: {
    'Popover.Trigger': Popover.Trigger,
    'Popover.Content': Popover.Content,
  } as never,
  title: 'TEDI-Ready/Components/Overlay/Popover',
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          return code.replaceAll('PopoverTrigger', 'Popover.Trigger').replaceAll('PopoverContent', 'Popover.Content');
        },
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=5797-117364&m=dev',
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

const ContentExamplesTemplate: StoryFn<PopoverProps> = (args) => {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);

  return (
    <Row gutterY={3}>
      <Col xs={12} lg={6} xxl={3}>
        <Popover {...args} open={firstOpen} onToggle={setFirstOpen}>
          <Popover.Trigger>
            <Button>Buttons & heading</Button>
          </Popover.Trigger>
          <Popover.Content title="Heading" close>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
            <div className="display-flex gap-2">
              <Button visualType="secondary" onClick={() => setFirstOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  alert('This is alert message!');
                  setFirstOpen(false);
                }}
              >
                Submit
              </Button>
            </div>
          </Popover.Content>
        </Popover>
      </Col>
      <Col xs={12} lg={6} xxl={3}>
        <Popover {...args} open={secondOpen} onToggle={setSecondOpen}>
          <Popover.Trigger>
            <Button>Buttons</Button>
          </Popover.Trigger>
          <Popover.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
            <div className="display-flex gap-2">
              <Button visualType="secondary" onClick={() => setSecondOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  alert('This is alert message!');
                  setSecondOpen(false);
                }}
              >
                Submit
              </Button>
            </div>
          </Popover.Content>
        </Popover>
      </Col>
      <Col xs={12} lg={6} xxl={3}>
        <Popover {...args}>
          <Popover.Trigger>
            <Button>Link</Button>
          </Popover.Trigger>
          <Popover.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
            <Link underline={false} iconRight="north_east" className="align-self-end">
              Read more
            </Link>
          </Popover.Content>
        </Popover>
      </Col>
      <Col xs={12} lg={6} xxl={3}>
        <Popover {...args}>
          <Popover.Trigger>
            <Button>Text</Button>
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
    <Row gutterY={3}>
      <Col xs={12} lg={6} xxl={3}>
        <Popover {...args}>
          <Popover.Trigger>
            <Button visualType="secondary">Heading & close</Button>
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
      <Col xs={12} lg={6} xxl={3}>
        <Popover {...args}>
          <Popover.Trigger>
            <Button visualType="secondary">Heading</Button>
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
      <Col xs={12} lg={6} xxl={3}>
        <Popover {...args}>
          <Popover.Trigger>
            <Button visualType="secondary">Custom heading & close</Button>
          </Popover.Trigger>
          <Popover.Content
            width="medium"
            title="This popover is with smaller title and close button."
            titleProps={{ element: 'p' }}
            close
            closeProps={{ size: 'medium' }}
          >
            <div className="display-flex justify-content-end gap-2">
              <Button visualType="secondary">Cancel</Button>
              <Button>Submit</Button>
            </div>
          </Popover.Content>
        </Popover>
      </Col>
      <Col xs={12} lg={6} xxl={3}>
        <Popover {...args}>
          <Popover.Trigger>
            <Button visualType="secondary">Only content</Button>
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
    <Row gutterY={3}>
      <Col xs={12} lg={4}>
        <Popover {...args}>
          <Popover.Trigger>
            <Button visualType="secondary">Button Trigger</Button>
          </Popover.Trigger>
          <Popover.Content>This popover is triggered by button.</Popover.Content>
        </Popover>
      </Col>
      <Col xs={12} lg={4}>
        <Popover {...args}>
          <Popover.Trigger>
            <InfoButton>Info Button Trigger</InfoButton>
          </Popover.Trigger>
          <Popover.Content>This popover is triggered by info button.</Popover.Content>
        </Popover>
      </Col>
      <Col xs={12} lg={4}>
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
    <Row gutterY={3} justifyContent="center">
      <Col xs={12} lg={4} className="display-flex justify-content-center">
        <Popover {...args} placement="top-start">
          <Popover.Trigger>Top start</Popover.Trigger>
          <Popover.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Popover.Content>
        </Popover>
      </Col>
      <Col xs={12} lg={4} className="display-flex justify-content-center">
        <Popover {...args} placement="top">
          <Popover.Trigger>Top center</Popover.Trigger>
          <Popover.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Popover.Content>
        </Popover>
      </Col>
      <Col xs={12} lg={4} className="display-flex justify-content-center">
        <Popover {...args} placement="top-end">
          <Popover.Trigger>Top end</Popover.Trigger>
          <Popover.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Popover.Content>
        </Popover>
      </Col>
      <Col xs={12} lg={4} className="display-flex justify-content-center">
        <Popover {...args} placement="bottom-start">
          <Popover.Trigger>Bottom start</Popover.Trigger>
          <Popover.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Popover.Content>
        </Popover>
      </Col>
      <Col xs={12} lg={4} className="display-flex justify-content-center">
        <Popover {...args} placement="bottom">
          <Popover.Trigger>Bottom center</Popover.Trigger>
          <Popover.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Popover.Content>
        </Popover>
      </Col>
      <Col xs={12} lg={4} className="display-flex justify-content-center">
        <Popover {...args} placement="bottom-end">
          <Popover.Trigger>Bottom end</Popover.Trigger>
          <Popover.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Popover.Content>
        </Popover>
      </Col>
      <Col xs={12} lg={4} className="display-flex justify-content-center">
        <Popover {...args} placement="left-start">
          <Popover.Trigger>Left start</Popover.Trigger>
          <Popover.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Popover.Content>
        </Popover>
      </Col>
      <Col xs={12} lg={4} className="display-flex justify-content-center">
        <Popover {...args} placement="left">
          <Popover.Trigger>Left center</Popover.Trigger>
          <Popover.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Popover.Content>
        </Popover>
      </Col>
      <Col xs={12} lg={4} className="display-flex justify-content-center">
        <Popover {...args} placement="left-end">
          <Popover.Trigger>Left end</Popover.Trigger>
          <Popover.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Popover.Content>
        </Popover>
      </Col>
      <Col xs={12} lg={4} className="display-flex justify-content-center">
        <Popover {...args} placement="right-start">
          <Popover.Trigger>Right start</Popover.Trigger>
          <Popover.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Popover.Content>
        </Popover>
      </Col>
      <Col xs={12} lg={4} className="display-flex justify-content-center">
        <Popover {...args} placement="right">
          <Popover.Trigger>Right center</Popover.Trigger>
          <Popover.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Popover.Content>
        </Popover>
      </Col>
      <Col xs={12} lg={4} className="display-flex justify-content-center">
        <Popover {...args} placement="right-end">
          <Popover.Trigger>Right end</Popover.Trigger>
          <Popover.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Popover.Content>
        </Popover>
      </Col>
    </Row>
  );
};

const SizeTemplate: StoryFn<PopoverProps> = (args) => {
  const sizes = ['small', 'medium', 'large'] as const;

  return (
    <Row gutterY={3}>
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

const ClosingButtonTemplate: StoryFn<PopoverProps> = (args) => {
  return (
    <Row gutterY={3}>
      <Col>
        <Popover {...args}>
          <Popover.Trigger>Default Button</Popover.Trigger>
          <Popover.Content title="Heading" close>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Popover.Content>
        </Popover>
      </Col>
      <Col>
        <Popover {...args}>
          <Popover.Trigger>Custom Button</Popover.Trigger>
          <Popover.Content title="Heading" close closeProps={{ size: 'medium' }}>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Popover.Content>
        </Popover>
      </Col>
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

export const ContentExamples: Story = {
  render: ContentExamplesTemplate,
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

export const ClosingButton: Story = {
  render: ClosingButtonTemplate,
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
