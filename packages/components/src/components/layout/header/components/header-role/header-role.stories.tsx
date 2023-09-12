import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { useLayout } from '../../../../../helpers/hooks/use-layout';
import Text from '../../../../typography/text/text';
import VerticalSpacing from '../../../../vertical-spacing/vertical-spacing';
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
    children: 'Any content',
    primaryInfo: 'Ida-Tallinna Keskhaigla',
    secondaryInfo: 'Perearst',
    label: 'Kristo Käärmann',
  },
};

export const WithoutOptions: Story = {
  render: Template,
  args: {
    primaryInfo: 'Tartu Linnavalitsus',
    label: 'Kristo Käärmann',
    children: undefined,
  },
};

export const WithLongContent: Story = {
  render: Template,
  args: {
    primaryInfo: 'Tartu Linnavalitsus',
    label: 'Kristo Käärmann',
    children: (
      <VerticalSpacing>
        <Text>Role 1</Text>
        <Text>Role 2</Text>
        <Text>Role 3</Text>
        <Text>Role 4</Text>
        <Text>Role 5</Text>
        <Text>Role 6</Text>
        <Text>Role 7</Text>
        <Text>Role 8</Text>
        <Text>Role 9</Text>
        <Text>Role 10</Text>
        <Text>Role 11</Text>
      </VerticalSpacing>
    ),
  },
};
