import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Icon } from '../../base/icon/icon';
import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import { VerticalSpacing, VerticalSpacingProps } from './vertical-spacing';

/**
 * <a href="https://zeroheight.com/1ee8444b7/p/759180-verticalspacing" target="_BLANK">Zeroheight ↗</a>
 **/

const meta: Meta<typeof VerticalSpacing> = {
  component: VerticalSpacing,
  title: 'Tedi-Ready/Components/Helpers/VerticalSpacing',
  subcomponents: {
    'VerticalSpacing.Item': VerticalSpacing.Item,
  } as never,
  parameters: {
    status: {
      type: [
        'devComponent',
        { name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' },
      ],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    docs: {
      source: {
        transform: (code: string) => {
          return code.replaceAll('VerticalSpacingItem', 'VerticalSpacing.Item');
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VerticalSpacing>;

const sizeArray: VerticalSpacingProps['size'][] = [0, 0.5, 1, 2, 4];

const Template: StoryFn<VerticalSpacingProps> = (args) => (
  <VerticalSpacing {...args}>
    <Heading>This is VerticalSpacing example</Heading>
    <p>VerticalSpacing component is used to give space vertically between its children.</p>
    <p>
      Use <code>size</code> prop to change margin between its children.
    </p>
    <VerticalSpacing.Item size={0}>
      <p>Use VerticalSpacingItem to overwrite one element spacing.</p>
    </VerticalSpacing.Item>

    <Text color="primary" modifiers="small">
      Some tiny text. Morbi et velit enim. Nulla facilisi. Curabitur tincidunt viverra nulla, a varius leo pharetra
      vitae.
    </Text>
    <Heading element="h2">Heading 2</Heading>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium lacinia urna in efficitur. Suspendisse
      mattis ornare imperdiet. Aenean iaculis, augue a viverra tincidunt, orci tellus tempus enim, ut tempor nunc leo ac
      erat.
    </Text>
  </VerticalSpacing>
);

const TemplateWithSizes: StoryFn<VerticalSpacingProps> = (args) => {
  return (
    <>
      <div className="example-list">
        {sizeArray.map((size, key) => (
          <div className={`row ${key === sizeArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
            <VerticalSpacing {...args} size={size}>
              <p>VerticalSpacing component with size {size} between its children.</p>
              <VerticalSpacing.Item size={0}>
                <p>Use VerticalSpacingItem to overwrite one elements spacing.</p>
              </VerticalSpacing.Item>
            </VerticalSpacing>
          </div>
        ))}
      </div>
    </>
  );
};

const NestedTemplate: StoryFn<VerticalSpacingProps> = (args) => (
  <VerticalSpacing {...args}>
    <Heading>Outer VerticalSpacing</Heading>
    <VerticalSpacing size={0.5}>
      <Heading element="h2">Nested VerticalSpacing</Heading>
      <Text>Content inside nested VerticalSpacing.</Text>
    </VerticalSpacing>
  </VerticalSpacing>
);

const MixedContentTemplate: StoryFn<VerticalSpacingProps> = (args) => (
  <VerticalSpacing {...args}>
    <Heading element="h1">Mixed Content Example</Heading>
    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium lacinia urna in efficitur.</Text>
    <Heading element="h4">Mixed Content Example</Heading>
    <img width={200} src="tehik_logo.png" alt="tehik.ee" />
    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium lacinia urna in efficitur.</Text>
    <Icon name="home" />
  </VerticalSpacing>
);

const OverwriteItemSpacingTemplate: StoryFn<VerticalSpacingProps> = (args) => (
  <VerticalSpacing {...args}>
    <p>Default spacing between items</p>
    <VerticalSpacing.Item size={3}>
      <p>Overwritten spacing for this item</p>
    </VerticalSpacing.Item>
    <p>Default spacing resumed</p>
  </VerticalSpacing>
);

export const Default: Story = {
  render: Template,
  args: {
    size: 1,
  },
};

export const Sizes: Story = {
  render: TemplateWithSizes,
  args: {
    element: 'div',
  },
};

export const AsSection: Story = {
  render: Template,
  args: {
    element: 'section',
    size: 1,
  },
};

export const WithCustomClassName: Story = {
  render: Template,
  args: {
    size: 1,
    className: 'example-list padding-14-16',
  },
};

export const NestedSpacing: Story = {
  render: NestedTemplate,
  args: {
    size: 2,
  },
};

export const MixedContent: Story = {
  render: MixedContentTemplate,
  args: {
    size: 1.5,
  },
};

export const OverwriteItemSpacing: Story = {
  render: OverwriteItemSpacingTemplate,
  args: {
    size: 1,
  },
};
