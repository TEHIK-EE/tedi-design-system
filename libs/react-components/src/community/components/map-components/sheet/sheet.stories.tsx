import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button, Card, Col, Link, List, Row, Search, Text, TextField, VerticalSpacing } from '../../../../tedi';
import { Sheet } from './sheet';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Map-Design-System?node-id=251-42756&m=dev" target="_BLANK">Figma ↗</a><br/>
 * NB! Use individual stories to test this component. This component is mobile-only, that means desktop variables don't apply to this component
 */

const meta: Meta<typeof Sheet> = {
  component: Sheet,
  title: 'Community/Map components/Sheet',
  argTypes: {
    side: {
      options: ['bottom', 'top'],
      control: { type: 'radio' },
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sheet>;

const Template: StoryFn<typeof Sheet> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Sheet</Button>
      <Sheet {...args} open={isOpen} onClose={() => setIsOpen(false)}>
        <Card borderless>
          <Card.Content hasSeparator>
            <VerticalSpacing>
              <TextField label="Name" placeholder="Enter your name" id="" />
              <TextField label="Email" placeholder="Enter your email" id="" />
              <Link>Additional options</Link>
            </VerticalSpacing>
          </Card.Content>
        </Card>
      </Sheet>
    </>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    title: 'Default Sheet',
    side: 'bottom',
  },
};

export const WithFooter: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ height: '500px', position: 'relative' }}>
        <Button onClick={() => setIsOpen(true)}>Open Sheet with Footer</Button>
        <Sheet
          {...args}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          footer={
            <Card borderless>
              <Card.Content>
                <Row gutter={2} justifyContent="end">
                  <Col width="auto">
                    <Button visualType="neutral" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                  </Col>
                  <Col width="auto">
                    <Button onClick={() => setIsOpen(false)}>Save</Button>
                  </Col>
                </Row>
              </Card.Content>
            </Card>
          }
        >
          <Card borderless>
            <Card.Content hasSeparator>
              <VerticalSpacing>
                <TextField label="First name" placeholder="Enter first name" id="" />
                <TextField label="Last name" placeholder="Enter last name" id="" />
              </VerticalSpacing>
            </Card.Content>
          </Card>
        </Sheet>
      </div>
    );
  },
  args: {
    title: 'Sheet with Footer',
    side: 'bottom',
  },
};

export const WithActions: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasActiveActions, setHasActiveActions] = useState(true);

    return (
      <div style={{ height: '500px', position: 'relative' }}>
        <Button onClick={() => setIsOpen(true)}>Open Sheet with Actions</Button>
        <Sheet
          {...args}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          actions={
            <Button
              size="small"
              visualType={hasActiveActions ? 'primary' : 'neutral'}
              onClick={() => setHasActiveActions(!hasActiveActions)}
              icon={hasActiveActions ? 'edit' : 'warning'}
            >
              Actions
            </Button>
          }
          hasActiveActions={hasActiveActions}
        >
          <Card borderless>
            <Card.Content hasSeparator>
              <VerticalSpacing>
                <Text>This sheet has additional actions in the header.</Text>
                <Text>Current state: {hasActiveActions ? 'Active' : 'Inactive'}</Text>
              </VerticalSpacing>
            </Card.Content>
          </Card>
        </Sheet>
      </div>
    );
  },
  args: {
    title: 'Sheet with Actions',
    side: 'bottom',
  },
};

export const Peekable: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ height: '500px', position: 'relative' }}>
        <Sheet {...args} open={isOpen} onClose={() => setIsOpen(false)} isVisible={true} hasActiveActions>
          <Card borderless>
            <Card.Content>
              <Search label="Search" placeholder="Search..." id="" hideLabel />
              <VerticalSpacing>
                <Text>Recent searches:</Text>
                <List style="styled">
                  <List.Item>Search item 1</List.Item>
                  <List.Item>Search item 2</List.Item>
                  <List.Item>Search item 3</List.Item>
                </List>
              </VerticalSpacing>
            </Card.Content>
          </Card>
        </Sheet>
        <Card borderless>
          <Card.Content>
            <VerticalSpacing>
              <Text>Scroll down to see the peekable sheet at the bottom.</Text>
              <Button onClick={() => setIsOpen(true)}>Open Sheet</Button>
            </VerticalSpacing>
          </Card.Content>
        </Card>
      </div>
    );
  },
  args: {
    title: 'Peekable Sheet',
    side: 'bottom',
  },
  parameters: {
    layout: 'fullscreen',
  },
};
