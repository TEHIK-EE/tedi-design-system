import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../../grid';
import { Text } from '../../typography/text/text';
import TextArea, { TextAreaProps } from './textarea';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: 'TEDI-Ready/Components/Form/TextArea',
};

export default meta;
type Story = StoryObj<typeof TextArea>;

const stateArray = ['Default', 'Hover', 'Focus', 'Active', 'Disabled'];

interface TemplateStateProps extends TextAreaProps {
  array: typeof stateArray;
}

const TemplateColumnWithStates: StoryFn<TemplateStateProps> = (args) => {
  const { array, id, ...textFieldProps } = args;

  return (
    <div className="state-example">
      {array.map((state, index) => (
        <Row key={index} className="padding-14-16">
          <Col width={2} className="display-flex align-items-center">
            <Text modifiers="bold">{state}</Text>
          </Col>
          <Col className="display-flex align-items-center">
            <TextArea disabled={state === 'Disabled'} id={state} {...textFieldProps} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export const Default: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
  },
};

export const States: StoryObj<TemplateStateProps> = {
  render: TemplateColumnWithStates,
  args: {
    array: stateArray,
    label: 'Label',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      focus: '#Focus',
      active: '#Active',
    },
  },
};

export const WithHintText: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
    helper: { text: 'Hint text' },
  },
};

export const Valid: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
    helper: { type: 'valid', text: 'Hint text' },
  },
};

export const Error: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
    helper: { type: 'error', text: 'Hint text' },
  },
};

export const TextValue: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
    value: 'Text value',
  },
};

export const Placeholder: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
    placeholder: 'Text value',
  },
};
