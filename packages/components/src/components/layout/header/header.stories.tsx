import { Meta, Story } from '@storybook/react';

import useLayout from '../../../helpers/hooks/use-layout';
import { renderCustomHeader } from './examples/renderCustomHeader';
import Header, { HeaderProps } from './header';

export default {
  title: 'components/Layout/Header',
  component: Header,
  layout: 'fullscreen',
  parameters: {
    backgrounds: { default: 'light' },
  },
  excludeStories: /.*CustomHeader$/,
} as Meta;

export const Default: Story<HeaderProps> = (args) => {
  const isSmallLayout = useLayout(['mobile', 'tablet']);

  return <Header {...args}>{renderCustomHeader(isSmallLayout)}</Header>;
};
Default.args = {
  logoAnchor: { href: '#' },
  onLogoutClick: () => console.log('Logging out'),
  skipLinks: {
    links: [{ children: 'Skip to main content', href: '#main-content' }],
  },
};
Default.parameters = {
  layout: 'fullscreen',
};
