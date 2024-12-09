import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../../grid';
import { Text } from '../../typography/text/text';
import TextField, { TextFieldProps } from './textfield';

/**
 * [Figma ↗](https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=3486-37649&m=dev)<br/>
 * [Zeroheight ↗](https://zeroheight.com/1ee8444b7/p/328d11-text-field)
 */

const meta: Meta<typeof TextField> = {
  component: TextField,
  title: 'TEDI-Ready/Components/Form/TextField',
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
type Story = StoryObj<typeof TextField>;

const stateArray = ['Default', 'Hover', 'Focus', 'Active', 'Disabled'];

interface TemplateStateProps extends TextFieldProps {
  array: typeof stateArray;
}

const sizeArray: TextFieldProps['size'][] = ['default', 'small'];

interface TemplateMultipleProps<Type = TextFieldProps['size']> extends TextFieldProps {
  array: Type[];
  property: keyof TextFieldProps;
}

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property, ...textFieldProps } = args;

  return (
    <div className="example-list">
      {array.map((value, key) => (
        <Row className={`${key === array.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col width={2}>{value?.toString()}</Col>
          <Col className="d-flex">
            <TextField {...textFieldProps} {...{ [property]: value }} />
          </Col>
          <Col className="d-flex">
            <TextField icon={{ name: 'person' }} {...textFieldProps} {...{ [property]: value }} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

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
            <TextField disabled={state === 'Disabled'} id={state} {...textFieldProps} />
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

export const Sizes: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,

  args: {
    id: 'example-1',
    label: 'Label',
    property: 'size',
    array: sizeArray,
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

export const WithHint: Story = {
  args: {
    ...Default.args,
    helper: {
      id: 'example-3',
      text: 'Hint text',
      type: 'hint',
    },
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    helper: {
      id: 'example-3',
      text: 'Feedback text',
      type: 'error',
    },
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    helper: {
      id: 'example-4',
      text: 'Feedback text',
      type: 'valid',
    },
  },
};

export const Password: Story = {
  args: {
    ...Default.args,
    input: { type: 'password' },
    value: '123456789',
  },
};

export const Placeholder: Story = {
  args: {
    ...Default.args,
    placeholder: 'Text value',
  },
};
