import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../../grid';
import { Text } from '../../typography/text/text';
import TextArea, { TextAreaProps } from './textarea';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: 'TEDI-Ready/Components/Form/TextArea',
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

const sizesArray: Array<'default' | 'small'> = ['default', 'small'];

const TemplateSizes: StoryFn<TextAreaProps> = (args) => {
  return (
    <div className="example-list">
      {sizesArray.map((size, key) => (
        <Row className={`${key === sizesArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col>
            <Text modifiers="bold">{size.charAt(0).toUpperCase() + size.slice(1)}</Text>
          </Col>
          <Col>
            <TextArea {...args} size={size} id={`textarea-size-${size}`} />
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

export const Sizes: Story = {
  render: TemplateSizes,
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
export const MultipleHintTexts: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
    showCounter: true,
    characterLimit: 400,
    helper: [{ text: 'Hint text' }],
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
