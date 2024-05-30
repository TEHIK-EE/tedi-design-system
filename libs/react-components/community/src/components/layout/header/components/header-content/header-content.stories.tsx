import { Meta, StoryObj } from '@storybook/react';

import HeaderContent from './header-content';

/**
 * HeaderContent holds custom content of header and is used to place content in the middle of header. <br />
 * **Note**: This component is not meant to be used outside of Header.
 */
const meta: Meta<typeof HeaderContent> = {
  component: HeaderContent,
  title: 'Community-components/Layout/Header/HeaderContent',
};

export default meta;
type Story = StoryObj<typeof HeaderContent>;

export const Default: Story = {
  args: {
    children: 'Any content',
  },
};
