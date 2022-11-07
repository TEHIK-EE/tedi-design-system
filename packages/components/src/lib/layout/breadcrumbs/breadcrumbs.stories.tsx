import { Meta, Story } from '@storybook/react';
import Link from 'next/link';

import { LinkBehaviour } from '../../anchor/anchor-helpers';
import { Breadcrumbs, BreadcrumbsProps } from './breadcrumbs';

export default {
  component: Breadcrumbs,
  title: 'components/Layout/Breadcrumbs',
} as Meta<BreadcrumbsProps>;

const Template: Story<BreadcrumbsProps<typeof Link>> = (args) => <Breadcrumbs {...args} />;

export const Default = Template.bind({});
Default.args = {
  linkAs: LinkBehaviour,
  crumbs: [
    { href: '/', children: 'Home' },
    { href: { pathname: '/volunteers' }, children: 'Volunteers' },
    { href: { pathname: '/volunteers/volunteer', query: { id: '20' } }, children: '20', isLast: true },
  ],
};
