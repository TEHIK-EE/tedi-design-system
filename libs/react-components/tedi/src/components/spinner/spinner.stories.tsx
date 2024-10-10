import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Spinner, SpinnerProps } from './spinner';

/**
 * [Figma ↗](https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2768-42334&mode=dev)<br/>
 * [Zeroheight ↗](https://zeroheight.com/1ee8444b7/p/13d6ac-spinner/b/78b62d)
 */

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: 'Tedi-ready/Loader/Spinner',
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
        <div className={`row ${key === array.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <div className="column w-50">{value?.toString()}</div>
          <div className="column w-50">
            <div className="display-flex">
              <Spinner {...spinnerProps} {...{ [property]: value }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const TemplateColors: StoryFn<TemplateMultipleProps> = () => {
  return (
    <div className="row w-50">
      <div className="column">
        <Spinner color="primary" label="Loading..." size={48} />
      </div>
      <div className="column">
        <div className="bg bg-primary">
          <Spinner color="secondary" label="Loading..." size={48} />
        </div>
      </div>
      <div className="column">
        <div className="bg bg-danger">
          <Spinner color="secondary" label="Loading..." size={48} />
        </div>
      </div>
      <div className="column">
        <div className="bg bg-success">
          <Spinner color="secondary" label="Loading..." size={48} />
        </div>
      </div>
    </div>
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
