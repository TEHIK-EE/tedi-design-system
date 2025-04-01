import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Search, SearchProps } from './search';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4620-82860&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/4013b4-search" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<SearchProps> = {
  component: Search,
  title: 'TEDI-Ready/Components/Form/Search',
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4620-82860&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<SearchProps>;

const stateArray = ['Default', 'Hover', 'Focus', 'Active', 'Disabled'];

interface TemplateStateProps extends SearchProps {
  array: typeof stateArray;
}

const sizeArray: SearchProps['size'][] = ['small', 'default', 'large'];

interface TemplateMultipleProps<Type = SearchProps['size']> extends SearchProps {
  array: Type[];
  property: keyof SearchProps;
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
          <Col>
            <VerticalSpacing>
              <Search {...textFieldProps} {...{ [property]: value }} />
              <Search {...textFieldProps} button={{ icon: 'search', size: value }} {...{ [property]: value }} />
              <Search
                {...textFieldProps}
                button={{ iconLeft: 'search', children: 'Otsi', size: value }}
                {...{ [property]: value }}
              />
            </VerticalSpacing>
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
          <Col lg={2} md={12} className="display-flex align-items-center">
            <Text modifiers="bold">{state}</Text>
          </Col>
          <Col lg={10} md={12} className="display-flex align-items-center">
            <Search disabled={state === 'Disabled'} {...textFieldProps} id={state} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export const Default: Story = {
  args: {
    id: 'example-1',
    label: 'Search',
  },
};

export const Sizes: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,

  args: {
    id: 'example-1',
    label: 'Search',
    property: 'size',
    array: sizeArray,
  },
};

export const States: StoryObj<TemplateStateProps> = {
  render: TemplateColumnWithStates,
  args: {
    array: stateArray,
    label: 'Search',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      focus: '#Focus',
      active: '#Active',
    },
  },
};

export const Placeholder: Story = {
  args: {
    id: 'example-1',
    label: 'Search',
    placeholder: 'Name',
  },
};

export const Clearable: Story = {
  args: {
    id: 'example-1',
    label: 'Search',
    isClearable: true,
    value: 'Lorem ipsum',
  },
};

export const ClearableButton: Story = {
  args: {
    id: 'example-1',
    label: 'Search',
    isClearable: true,
    value: 'Lorem ipsum',
    button: { iconLeft: 'search', children: 'Otsi' },
  },
};

export const HintText: Story = {
  args: {
    id: 'example-1',
    label: 'Search',
    helper: { text: 'Hint text' },
  },
};
