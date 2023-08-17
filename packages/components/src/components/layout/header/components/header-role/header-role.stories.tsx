import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { useLayout } from '../../../../../helpers/hooks/use-layout';
import RoleSelection from './header-role';

const meta: Meta<typeof RoleSelection> = {
  component: RoleSelection,
};

export default meta;
type Story = StoryObj<typeof RoleSelection>;

const Template: StoryFn<typeof RoleSelection> = (args) => {
  const renderModal = useLayout(['mobile']);
  return <RoleSelection {...args} renderModal={renderModal} />;
};

export const Default: Story = {
  render: Template,
  args: {
    children: 'Any content',
    primaryInfo: 'Kristo Käärmann',
  },
};

export const WithSecondaryInfo: Story = {
  render: Template,
  args: {
    ...Default.args,
    children: 'Any content',
    primaryInfo: 'Ida-Tallinna Keskhaigla',
    secondaryInfo: 'Perearst',
    label: 'Kristo Käärmann',
  },
};

export const WithoutOptions: Story = {
  render: Template,
  args: {
    ...Default.args,
    primaryInfo: 'Tartu Linnavalitsus',
    label: 'Kristo Käärmann',
    children: undefined,
  },
};
