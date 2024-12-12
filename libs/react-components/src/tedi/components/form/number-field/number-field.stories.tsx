import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Col, Row } from '../../../../tedi/components/grid';
import { VerticalSpacing } from '../../../../tedi/components/vertical-spacing';
import { Button } from '../../buttons/button/button';
import { Text } from '../../typography/text/text';
import { NumberField, NumberFieldProps } from './number-field';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4536-78765&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/90c693-number-field" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof NumberField> = {
  component: NumberField,
  title: 'TEDI-Ready/Components/Form/NumberField',
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof NumberField>;

const sizesArray: Array<'default' | 'small'> = ['default', 'small'];

const TemplateSizes: StoryFn<NumberFieldProps> = (args) => {
  return (
    <Row>
      <Col lg={6} md={12} className="example-list">
        {sizesArray.map((size, key) => (
          <Row className={`${key === sizesArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
            <Col lg={2} md={12} className="display-flex align-items-center">
              <Text modifiers="bold">{size.charAt(0).toUpperCase() + size.slice(1)}</Text>
            </Col>
            <Col lg="auto" md={12}>
              <NumberField {...args} size={size} id={`numberfield-size-${size}`} />
            </Col>
          </Row>
        ))}
      </Col>
    </Row>
  );
};

export const Default: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
    defaultValue: 1,
    step: 1,
    max: 10,
    min: 0,
  },
};

export const Sizes: StoryObj<typeof TemplateSizes> = {
  render: TemplateSizes,
  args: {
    label: 'Label',
    defaultValue: 1,
    step: 1,
    max: 10,
    min: 0,
  },
};

export const States: Story = {
  args: {
    step: 1,
    max: 10,
    min: -10,
    label: 'Label',
    defaultValue: 1,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
  render: (args) => {
    return (
      <VerticalSpacing>
        <Row>
          <Col lg={2} md={12} className="display-flex align-items-center gap-3">
            <Text modifiers="bold">Default</Text>
          </Col>
          <Col>
            <NumberField {...args} id="example-6"></NumberField>
          </Col>
        </Row>
        <Row>
          <Col lg={2} md={12} className="display-flex align-items-center gap-3">
            <Text modifiers="bold">Hint</Text>
          </Col>
          <Col>
            <NumberField {...args} helper={{ id: 'example-3', text: 'Feedback text' }}></NumberField>
          </Col>
        </Row>
        <Row>
          <Col lg={2} md={12} className="display-flex align-items-center gap-3">
            <Text modifiers="bold">Error</Text>
          </Col>
          <Col>
            <NumberField {...args} helper={{ id: 'example-3', text: 'Feedback text', type: 'error' }}></NumberField>
          </Col>
        </Row>
        <Row>
          <Col lg={2} md={12} className="display-flex align-items-center gap-3">
            <Text modifiers="bold">Min value</Text>
          </Col>
          <Col>
            <NumberField {...args} defaultValue={1} min={1}></NumberField>
          </Col>
        </Row>
        <Row>
          <Col lg={2} md={12} className="display-flex align-items-center gap-3">
            <Text modifiers="bold">Max value</Text>
          </Col>
          <Col>
            <NumberField {...args} defaultValue={1} max={1}></NumberField>
          </Col>
        </Row>
        <Row>
          <Col lg={2} md={12} className="display-flex align-items-center gap-3">
            <Text modifiers="bold">Disabled</Text>
          </Col>
          <Col>
            <NumberField {...args} defaultValue={1} disabled></NumberField>
          </Col>
        </Row>
      </VerticalSpacing>
    );
  },
};

export const Decimal: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
    defaultValue: 1.5,
    step: 0.25,
    max: 3,
    min: -3,
  },
};

export const WithUnit: Story = {
  args: {
    id: 'example-2',
    label: 'Label',
    defaultValue: 2,
    step: 1,
    max: 5,
    min: -5,
    suffix: 'unit',
  },
};

export const FullWidth: Story = {
  args: {
    id: 'example-3',
    label: 'Label',
    value: 2,
    step: 1,
    suffix: 'unit',
    fullWidth: true,
  },
};

export const Controlled: Story = {
  args: {
    step: 1,
    max: 10,
    min: -10,
    defaultValue: 1,
    suffix: 'unit',
  },
  render: (args) => {
    const [state, setState] = useState(15);

    return (
      <VerticalSpacing size={2}>
        <Row cols="auto" alignItems="center">
          <Col>
            <Button icon={{ name: 'remove' }} onClick={() => setState((prev) => prev - 1)}>
              Remove
            </Button>
          </Col>
          <Col>
            <p>Current state: {state}</p>
          </Col>
          <Col>
            <Button icon={{ name: 'add' }} onClick={() => setState((prev) => prev + 1)}>
              Add
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <NumberField
              {...args}
              value={state}
              onChange={(num) => setState(num)}
              id="example-8"
              label="Controlled"
            ></NumberField>
          </Col>
        </Row>
      </VerticalSpacing>
    );
  },
};
