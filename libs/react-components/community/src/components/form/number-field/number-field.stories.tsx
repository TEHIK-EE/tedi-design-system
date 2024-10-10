import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Col, Row } from '../../../../../tedi/src/components/grid';
import { VerticalSpacing } from '../../../../../tedi/src/components/vertical-spacing';
import Button from '../../button/button';
import { NumberField } from './number-field';

const meta: Meta<typeof NumberField> = {
  component: NumberField,
  title: 'Community/Form/NumberField',
};
export default meta;

type Story = StoryObj<typeof NumberField>;

export const Default: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
    defaultValue: 2,
    step: 1,
    max: 10,
    min: -10,
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
    label: 'With unit',
    defaultValue: 2,
    step: 1,
    max: 10000000,
    min: -10,
    suffix: 'unit',
  },
};

export const FullWidth: Story = {
  args: {
    id: 'example-3',
    label: 'Full width',
    value: 2,
    step: 1,
    suffix: 'unit',
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    id: 'example-4',
    label: 'Disabled',
    defaultValue: 2,
    step: 1,
    max: 10,
    min: -10,
    suffix: 'unit',
    disabled: true,
  },
};

/**
 * There are three ways to achieve error: <br/>
 * 1. Passing `invalid: true`
 * 1. Passing helper with `type: "error"`
 * 1. Programmatically setting `value` out of `minValue` or `maxValue` bounds
 */
export const Invalid: Story = {
  args: {
    step: 1,
    max: 10,
    min: -10,
    suffix: 'unit',
  },
  render: (args) => {
    return (
      <VerticalSpacing size={2}>
        <Row>
          <Col>
            <NumberField {...args} id="example-5" label="With 'invalid' prop" invalid={true}></NumberField>
          </Col>
        </Row>
        <Row>
          <Col>
            <NumberField
              {...args}
              id="example-6"
              label='With helper "type: error" prop'
              helper={{ id: 'example-3', text: 'Error text here', type: 'error' }}
            ></NumberField>
          </Col>
        </Row>
        <Row>
          <Col>
            <NumberField {...args} id="example-7" label="Programatic" defaultValue={15}></NumberField>
          </Col>
        </Row>
      </VerticalSpacing>
    );
  },
};

export const Controlled: Story = {
  args: {
    step: 1,
    max: 10,
    min: -10,
    suffix: 'unit',
  },
  render: (args) => {
    const [state, setState] = useState(15);

    return (
      <VerticalSpacing size={2}>
        <Row cols="auto" alignItems="center">
          <Col>
            <Button onClick={() => setState((prev) => prev - 1)}>-</Button>
          </Col>
          <Col>
            <p>Current state: {state}</p>
          </Col>
          <Col>
            <Button onClick={() => setState((prev) => prev + 1)}>+</Button>
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
