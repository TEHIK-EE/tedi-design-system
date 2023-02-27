import { Meta, Story } from '@storybook/react';

import { LinkBehaviour } from '../../anchor/anchor-helpers';
import { Breadcrumbs, BreadcrumbsProps } from './breadcrumbs';

export default {
  component: Breadcrumbs,
  title: 'components/Layout/Breadcrumbs',
  argTypes: {
    linkAs: {
      type: 'function',
    },
  },
} as Meta<BreadcrumbsProps>;

const Template: Story<BreadcrumbsProps<typeof LinkBehaviour>> = (args) => <Breadcrumbs {...args} />;

export const Default = Template.bind({});
Default.args = {
  linkAs: LinkBehaviour,
  crumbs: [
    { href: '/', children: 'Home' },
    { href: { pathname: '/volunteers' }, children: 'Volunteers' },
    {
      href: { pathname: '/volunteers/volunteer', query: { id: '20' } },
      children: '20',
      isLast: true,
    },
  ],
};

export const ForcedMinimalCrumbs = Template.bind({});
ForcedMinimalCrumbs.args = {
  linkAs: LinkBehaviour,
  showMinimalCrumbs: true,
  crumbs: [
    { href: '/', children: 'Home' },
    { href: { pathname: '/volunteers' }, children: 'Volunteers' },
    {
      href: { pathname: '/volunteers/volunteer', query: { id: '20' } },
      children: '20',
      isLast: true,
    },
  ],
};
ForcedMinimalCrumbs.parameters = {
  docs: {
    description: {
      story: `By default we only show last interactive crumb on mobile and tablet.
      This can be controlled with \`showMinimalCrumbs\` prop. We can force the minimal view
      or define our own layouts/breakpoints for when the switch happens`,
    },
  },
};
