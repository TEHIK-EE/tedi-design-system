import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Col, Row } from '../../grid';
import { Text } from '../../typography/text/text';
import { VerticalSpacing } from '../../vertical-spacing';
import { Button } from '../button/button';
import ButtonGroup from './button-group';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=2215-38193&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://zeroheight.com/1ee8444b7/p/82e9cf-button-group" target="_BLANK">ZeroHeight ↗</a>
 */

const meta: Meta<typeof ButtonGroup> = {
  title: 'TEDI-Ready/Components/Buttons/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    status: {
      type: 'partiallyTediReady',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

const buttonStates = ['Default', 'Hover', 'Active', 'Disabled'];

const Template: StoryFn<typeof ButtonGroup> = (args) => {
  return (
    <Row>
      <Col md={6}>
        <ButtonGroup {...args}>
          <Button id="1">Text</Button>
          <Button id="2" isActive>
            Text
          </Button>
          <Button id="3">Text</Button>
        </ButtonGroup>
      </Col>
    </Row>
  );
};

const TemplateTypes: StoryFn<typeof Button> = (args) => {
  return (
    <VerticalSpacing>
      <ButtonGroup type="primary" stretch={false}>
        <Button id="1" {...args}>
          Text
        </Button>
        <Button id="2" isActive {...args}>
          Text
        </Button>
        <Button id="3" {...args}>
          Text
        </Button>
      </ButtonGroup>
      <ButtonGroup type="secondary" stretch={false}>
        <Button id="1" {...args}>
          Text
        </Button>
        <Button id="2" isActive {...args}>
          Text
        </Button>
        <Button id="3" {...args}>
          Text
        </Button>
      </ButtonGroup>
    </VerticalSpacing>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    type: 'primary',
  },
};

export const Types: StoryObj<typeof Button> = {
  render: TemplateTypes,
};

export const WithIcon: StoryObj<typeof Button> = {
  render: TemplateTypes,
  args: { iconLeft: 'table' },
};

export const IconOnly: StoryObj<typeof Button> = {
  render: TemplateTypes,
  args: { icon: 'table' },
};

const TemplateColumn: StoryFn<{ states: string[] }> = (args) => {
  const [selectedIdPrimary, setSelectedIdPrimary] = useState<string | null>(null);
  const [selectedIdSecondary, setSelectedIdSecondary] = useState<string | null>(null);

  return (
    <VerticalSpacing size={0.5}>
      <Row>
        <Col md={1}></Col>
        <Col>
          <Text modifiers="bold">Primary</Text>
        </Col>
        <Col>
          <Text modifiers="bold">Secondary</Text>
        </Col>
      </Row>
      {args.states.map((state, index) => (
        <Row key={index}>
          <Col md={1} sm={12}>
            <strong>{state}</strong>
          </Col>
          <Col>
            <ButtonGroup type="primary" onSelectionChange={setSelectedIdPrimary}>
              <Button
                id={`${state}-primary`}
                isActive={state === 'Active' || selectedIdPrimary === `${state}-1-primary`}
                onClick={() => setSelectedIdPrimary(`${state}-1`)}
                disabled={state === 'Disabled'}
              >
                Text
              </Button>
              <Button id={`${state}-2`} onClick={() => setSelectedIdPrimary(`${state}-2`)}>
                Text
              </Button>
              <Button id={`${state}-3`} onClick={() => setSelectedIdPrimary(`${state}-3`)}>
                Text
              </Button>
            </ButtonGroup>
          </Col>
          <Col>
            <ButtonGroup type="secondary" onSelectionChange={setSelectedIdSecondary}>
              <Button
                id={`${state}-secondary`}
                isActive={state === 'Active' || selectedIdSecondary === `${state}-1-secondary`}
                onClick={() => setSelectedIdSecondary(`${state}-1-secondary`)}
                disabled={state === 'Disabled'}
              >
                Text
              </Button>
              <Button id={`${state}-2-secondary`} onClick={() => setSelectedIdSecondary(`${state}-2-secondary`)}>
                Text
              </Button>
              <Button id={`${state}-3-secondary`} onClick={() => setSelectedIdSecondary(`${state}-3-secondary`)}>
                Text
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      ))}
    </VerticalSpacing>
  );
};

export const States: StoryObj<{ states: string[] }> = {
  render: TemplateColumn,
  args: {
    states: buttonStates,
  },
  parameters: {
    pseudo: {
      hover: ['#Hover-primary', '#Hover-secondary'],
      active: ['#Active-primary', '#Active-secondary'],
      focus: ['#Focus-primary', '#Focus-secondary'],
    },
  },
};

export const DifferentWidthButtons: Story = {
  render: (args) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
      <Row>
        <Col md={6}>
          <ButtonGroup {...args} stretch={false} onSelectionChange={setSelectedId}>
            <Button id="1" isActive={selectedId === '1'} onClick={() => setSelectedId('1')}>
              Text
            </Button>
            <Button id="2" isActive={selectedId === '2'}>
              Longer text
            </Button>
            <Button id="3" isActive={selectedId === '3'}>
              Even longer text
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  },
  args: {
    type: 'primary',
  },
};

export const Stretched: Story = {
  render: Template,
  args: {
    stretch: true,
  },
};

export const NoStretch: Story = {
  render: Template,
  args: {
    stretch: false,
  },
};
