import { Meta, StoryObj } from '@storybook/react';

import { LinkBehaviour } from '../../anchor/anchor-helpers';
import { Breadcrumbs } from './breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
  title: 'Community-components/Layout/Breadcrumbs',
  argTypes: {
    linkAs: {
      type: 'function',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

// eslint-disable-next-line storybook/prefer-pascal-case
const exampleCrumbs = [
  { href: '/', children: 'Home' },
  { href: { pathname: '/volunteers' }, children: 'Volunteers' },
  {
    href: { pathname: '/volunteers/volunteer', query: { id: '20' } },
    children: '20',
    isLast: true,
  },
];

export const Default: Story = {
  args: {
    linkAs: LinkBehaviour,
    crumbs: exampleCrumbs,
  },
};

/**
 * By default, we only show last interactive crumb on mobile and tablet.<br/>
 * This can be controlled with `showMinimalCrumbs` prop. We can force the minimal view or define our own layouts/breakpoints for when the switch happens.
 */
export const ForcedMinimalCrumbs: Story = {
  args: {
    ...Default.args,
    showMinimalCrumbs: true,
  },
};
