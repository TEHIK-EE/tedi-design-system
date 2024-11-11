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
  title: 'TEDI-Ready/Form/TextField',
};

export default meta;
type Story = StoryObj<typeof TextField>;

const sizeArray: TextFieldProps['size'][] = ['small', 'default', 'large'];

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
          <Col>
            <Text modifiers="capitalize">{value?.toString()}</Text>
          </Col>
          <Col className="d-flex">
            <TextField {...textFieldProps} {...{ [property]: value }} />
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

export const Size: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  name: 'TextField size',

  args: {
    property: 'size',
    array: sizeArray,
    label: 'Label',
  },
};

export const Icon: Story = {
  args: {
    ...Default.args,
    icon: 'person',
  },
};

export const Clearable: Story = {
  args: {
    ...Default.args,
    icon: 'search',
    defaultValue: '1234',
    isClearable: true,
    placeholder: 'Search',
  },
};

export const WithHint: Story = {
  args: {
    ...Default.args,
    helper: {
      id: 'example-3',
      text: 'Hint text',
      type: 'help',
    },
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    helper: {
      id: 'example-3',
      text: 'Error text here',
      type: 'error',
    },
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    helper: {
      id: 'example-4',
      text: 'Success text here',
      type: 'valid',
    },
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
    icon: 'search',
    placeholder: 'Search',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
    icon: 'search',
    placeholder: 'Search',
  },
};

export const Password: Story = {
  args: {
    ...Default.args,
    input: { type: 'password' },
    value: '123456789',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    placeholder: 'Text value',
  },
};
