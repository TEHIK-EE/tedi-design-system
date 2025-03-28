import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Col, Row } from '../../../../tedi/components/grid';
import Alert from '../../notifications/alert/alert';
import { Text } from '../../typography/text/text';
import { VerticalSpacing } from '../../vertical-spacing';
import Radio, { RadioProps } from './radio';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4598-78103&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://zeroheight.com/1ee8444b7/p/93e423-radio" target="_BLANK">Zeroheight ↗</a><br/><hr/>
 * In most cases, you should use the `ChoiceGroup` component. However, we also provide a standalone `Radio` component for custom use cases.
 */
const meta: Meta<typeof Radio> = {
  component: Radio,
  title: 'TEDI-Ready/Components/Form/ChoiceGroup/Radio',
};

export default meta;
type Story = StoryObj<typeof Radio>;

const Template: StoryFn<RadioProps> = (args) => <Radio {...args} label="Text" value="default" />;
const sizesArray: Array<'default' | 'large'> = ['default', 'large'];

const TemplateSizes: StoryFn<RadioProps> = (args) => {
  return (
    <Row>
      <Col lg={6} md={12} className="example-list">
        {sizesArray.map((size, key) => (
          <Row className={`${key === sizesArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
            <Col lg={10} md={6} xs={8} className="display-flex align-items-center">
              <VerticalSpacing>
                <Text modifiers="bold">{size.charAt(0).toUpperCase() + size.slice(1)}</Text>
                {size === 'large' && (
                  <Alert type="warning">
                    <Text>Applied automatically on mobile screen sizes. </Text>
                    <Text modifiers="bold">Otherwise, prefer using default size.</Text>
                  </Alert>
                )}
              </VerticalSpacing>
            </Col>
            <Col lg={2} md={6} xs={4}>
              <Radio {...args} size={size} id={`radio-size-${size}`} />
            </Col>
          </Row>
        ))}
      </Col>
    </Row>
  );
};

export const Default: Story = {
  render: Template,

  args: {
    id: 'default-radio',
    name: 'default-radio',
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: TemplateSizes,
};

export const States = () => {
  return (
    <Row>
      <Col lg={6} md={12}>
        <VerticalSpacing>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Default</Text>
            </Col>
            <Col>
              <Radio id="radio-default" label="Text" name="radio-default" value="radio" />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Hover</Text>
            </Col>
            <Col>
              <Radio id="radio-hover" label="Text" name="radio-hover" value="radio" hover />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Selected</Text>
            </Col>
            <Col>
              <Radio id="radio-checked" label="Text" name="radio-checked" value="radio" defaultChecked />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Disabled</Text>
            </Col>
            <Col>
              <Radio id="radio-disabled" label="Text" name="radio-disabled" value="radio" disabled />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Disabled selected</Text>
            </Col>
            <Col>
              <Radio
                id="radio-disabled-checked"
                label="Text"
                name="radio-disabled-checked"
                value="radio"
                disabled
                defaultChecked
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Error</Text>
            </Col>
            <Col>
              <Radio
                id="radio-invalid"
                label="Text"
                name="radio-invalid"
                value="radio"
                invalid
                helper={{ text: 'Feedback text', type: 'error' }}
              />
            </Col>
          </Row>
        </VerticalSpacing>
      </Col>
    </Row>
  );
};

export const HiddenLabel: Story = {
  render: Template,

  args: {
    id: 'hidden-label-radio',
    name: 'hidden-label-radio',
    hideLabel: true,
  },
};

export const WithExtraContent: Story = {
  render: Template,

  args: {
    id: 'extra-content-radio',
    name: 'extra-content-radio',
    helper: {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.',
    },
  },
};

export const WithTooltip: Story = {
  render: (args) => (
    <Row>
      <Col lg={6} md={12}>
        <VerticalSpacing>
          <Radio {...args} id="radio-short-title-tooltip" label="Text" name="radio-short-title-tooltip" value="radio" />
          <Radio
            {...args}
            id="radio-short-title-helper-tooltip"
            label="Text"
            name="radio-short-title-helper-tooltip"
            value="radio"
            helper={{
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.',
            }}
          />
          <Radio
            {...args}
            id="radio-long-title-tooltip-helper"
            label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc."
            name="radio-long-title-tooltip-helper"
            value="radio"
            helper={{
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.',
            }}
          />
        </VerticalSpacing>
      </Col>
    </Row>
  ),

  args: {
    name: 'tooltip-check',
    tooltip: 'This is a tooltip',
  },
};

export const Controlled = () => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <Radio
      id="controlled-check"
      label="Select me"
      name="controlled-check"
      value="controlled"
      checked={checked}
      onChange={(value, checked) => setChecked(checked)}
    />
  );
};

export const RadioWithLongTitle = () => {
  return (
    <Row>
      <Col width={6}>
        <Radio
          id="radio-long-title"
          label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc."
          name="radio-long-title"
          value="radio"
        />
      </Col>
    </Row>
  );
};
