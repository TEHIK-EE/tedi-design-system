import { Meta, StoryObj } from '@storybook/react';

import useLayout from '../../../helpers/hooks/use-layout';
import { renderCustomHeader } from './examples/renderCustomHeader';
import Header, { HeaderProps } from './header';

const meta: Meta<typeof Header> = {
  component: Header,
  parameters: {
    backgrounds: { default: 'light' },
    layout: 'fullscreen',
  },
  excludeStories: /.*CustomHeader$/,
};

export default meta;
type Story = StoryObj<typeof Header>;

const Template = (args: HeaderProps) => {
  const isSmallLayout = useLayout(['mobile', 'tablet']);

  return <Header {...args}>{renderCustomHeader(isSmallLayout)}</Header>;
};

export const Default: Story = {
  render: Template,

  args: {
    logoAnchor: { href: '#' },
    onLogoutClick: () => console.log('Logging out'),
    skipLinks: {
      links: [{ children: 'Skip to main content', href: '#main-content' }],
    },
  },

  parameters: {
    layout: 'fullscreen',
  },
};
