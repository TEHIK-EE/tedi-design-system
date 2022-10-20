import { Meta, Story } from '@storybook/react';

import { Breadcrumbs, BreadcrumbsProps } from './breadcrumbs';

export default {
  component: Breadcrumbs,
  title: 'components/Layout/Breadcrumbs',
} as Meta;

const Template: Story<BreadcrumbsProps> = (args) => <Breadcrumbs {...args} />;

export const Default = Template.bind({});
Default.args = {
  crumbs: [
    { path: '#', label: 'Home' },
    { path: '/volunteers', label: 'Volunteers' },
    { path: '/volunteers/20', label: '20', isLast: true },
  ],
};
