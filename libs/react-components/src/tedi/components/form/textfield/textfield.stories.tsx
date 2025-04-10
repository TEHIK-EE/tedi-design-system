import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import TextField, { TextFieldProps } from './textfield';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=3486-37649&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://zeroheight.com/1ee8444b7/p/328d11-text-field" target="_BLANK">Zeroheight ↗</a>
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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=3486-37649&m=dev',
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
          <Col width={2}>
            <Text modifiers="bold">{value ? value.charAt(0).toUpperCase() + value.slice(1) : ''}</Text>
          </Col>
          <Col className="d-flex">
            <TextField {...textFieldProps} id={`${textFieldProps.id}-${key}-1`} {...{ [property]: value }} />
          </Col>
          <Col className="d-flex">
            <TextField
              icon={{ name: 'person' }}
              {...textFieldProps}
              id={`${textFieldProps.id}-${key}-2`}
              {...{ [property]: value }}
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

const TemplateColumnWithStates: StoryFn<TemplateStateProps> = (args) => {
  const { array, ...textFieldProps } = args;

  return (
    <div className="state-example">
      {array.map((state, index) => (
        <Row key={index} className="padding-14-16">
          <Col width={2} className="display-flex align-items-center">
            <Text modifiers="bold">{state}</Text>
          </Col>
          <Col className="display-flex align-items-center">
            <TextField disabled={state === 'Disabled'} {...textFieldProps} id={state} />
          </Col>
        </Row>
      ))}
      <Row className="padding-14-16">
        <Col width={2} className="display-flex align-items-center">
          <Text modifiers="bold">Success</Text>
        </Col>
        <Col className="display-flex align-items-center">
          <TextField
            {...textFieldProps}
            id="success-textfield"
            helper={{
              text: 'Feedback text',
              type: 'valid',
            }}
          />
        </Col>
      </Row>
      <Row className="padding-14-16">
        <Col width={2} className="display-flex align-items-center">
          <Text modifiers="bold">Error</Text>
        </Col>
        <Col className="display-flex align-items-center">
          <TextField
            {...textFieldProps}
            id="error-textfield"
            helper={{
              text: 'Feedback text',
              type: 'error',
            }}
          />
        </Col>
      </Row>
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
    id: 'example-2',
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
    id: 'example-3',
    helper: {
      id: 'example-3',
      text: 'Hint text',
      type: 'hint',
    },
  },
};

export const Password: Story = {
  args: {
    ...Default.args,
    id: 'example-4',
    input: { type: 'password' },
    value: '123456789',
  },
};

export const Placeholder: Story = {
  args: {
    ...Default.args,
    id: 'example-5',
    placeholder: 'Text value',
  },
};
