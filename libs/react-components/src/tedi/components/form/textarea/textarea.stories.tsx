import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import TextArea, { TextAreaProps } from './textarea';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=3486-37618&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/25f281-text-area" target="_BLANK">Zeroheight ↗</a>
 */

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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=3486-37618&m=dev',
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
  const { array, ...textFieldProps } = args;

  return (
    <VerticalSpacing>
      {array.map((state, index) => (
        <Row key={index}>
          <Col width={2} className="display-flex align-items-center">
            <Text modifiers="bold">{state}</Text>
          </Col>
          <Col className="display-flex align-items-center">
            <TextArea disabled={state === 'Disabled'} {...textFieldProps} id={state} />
          </Col>
        </Row>
      ))}
    </VerticalSpacing>
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

const TemplateTextValue: StoryFn<TextAreaProps> = (args) => {
  const { value, ...props } = args;
  const [text, setText] = useState(value ?? '');
  return <TextArea value={text} onChange={(t) => setText(t)} {...props} />;
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

export const HintTextAndCharacterCount: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
    characterLimit: 400,
    helper: [{ text: 'Hint text' }],
  },
};

export const OnlyCharacterCount: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
    characterLimit: 400,
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
  render: TemplateTextValue,
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

export const DefaultValue: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
    defaultValue: 'Text value',
  },
};
