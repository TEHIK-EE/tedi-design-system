import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import Comparison, { ComparisonProps } from './comparison';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=347-72393&m=dev" target="_BLANK">Figma ↗</a><br/>
 */

const meta: Meta<typeof Comparison> = {
  component: Comparison,
  title: 'Community/Map components/Comparison',
};

export default meta;
type Story = StoryObj<typeof Comparison>;

const TemplateColumn: StoryFn<ComparisonProps> = (args) => {
  return (
    <div style={{ width: '800px', height: '500px' }}>
      <Comparison
        {...args}
        left={
          <img
            src="https://snazzy-maps-cdn.azureedge.net/assets/8097-wy.png"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt="Layer A"
          />
        }
        right={
          <img
            src="https://snazzy-maps-cdn.azureedge.net/assets/72543-assassins-creed-iv.png"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt="Layer B"
          />
        }
      />
    </div>
  );
};

export const Default: Story = {
  render: TemplateColumn,
};

export const WithPrimaryLeft: Story = {
  render: TemplateColumn,
  args: {
    primary: 'left',
  },
};

export const WithPrimaryRight: Story = {
  render: TemplateColumn,
  args: {
    primary: 'right',
  },
};

export const WithCustomDimensions: Story = {
  args: {
    left: (
      <img
        src="https://snazzy-maps-cdn.azureedge.net/assets/8097-wy.png"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        alt="Layer A"
      />
    ),
    right: (
      <img
        src="https://snazzy-maps-cdn.azureedge.net/assets/72543-assassins-creed-iv.png"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        alt="Layer B"
      />
    ),
    width: '300px',
    height: '200px',
  },
};

export const WithCloseButton: Story = {
  render: TemplateColumn,
  args: {
    primary: 'right',
    onClose: () => {
      console.log('hello world');
    },
  },
};
