import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../../layout/grid';
import { Spinner, SpinnerProps } from './spinner';

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2768-42334&mode=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/13d6ac-spinner" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: 'Tedi-Ready/Components/Loader/Spinner',
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
type Story = StoryObj<typeof Spinner>;

const sizeArray: SpinnerProps['size'][] = [10, 16, 48];

interface TemplateMultipleProps<Type = SpinnerProps['size'] | SpinnerProps['color'] | SpinnerProps['position']>
  extends SpinnerProps {
  array: Type[];
  property: keyof SpinnerProps;
}

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property, ...spinnerProps } = args;

  return (
    <div className="example-list w-50">
      {array.map((value, key) => (
        <Row className={`${key === array.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col>{value?.toString()}</Col>
          <Col className="d-flex">
            <Spinner {...spinnerProps} {...{ [property]: value }} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

const TemplateColors: StoryFn<TemplateMultipleProps> = () => {
  return (
    <Row alignItems="center">
      <Col md="auto">
        <Spinner color="primary" label="Loading..." size={48} />
      </Col>
      <Col md="auto">
        <div className="bg bg-primary">
          <Spinner color="secondary" label="Loading..." size={48} />
        </div>
      </Col>
      <Col md="auto">
        <div className="bg bg-danger">
          <Spinner color="secondary" label="Loading..." size={48} />
        </div>
      </Col>
      <Col md="auto">
        <div className="bg bg-success">
          <Spinner color="secondary" label="Loading..." size={48} />
        </div>
      </Col>
    </Row>
  );
};

const Template: StoryFn<SpinnerProps> = (args) => <Spinner {...args} />;

export const Default: Story = {
  render: Template,

  args: {
    size: 16,
    color: 'primary',
    label: 'Loading...',
  },
};

export const Size: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  name: 'Spinner size',

  args: {
    property: 'size',
    color: 'primary',
    array: sizeArray,
    label: 'Loading...',
  },
};

export const Color: StoryObj<TemplateMultipleProps> = {
  render: TemplateColors,
  name: 'Spinner colors',
};
