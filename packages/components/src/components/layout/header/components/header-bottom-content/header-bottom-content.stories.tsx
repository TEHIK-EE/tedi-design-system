import { Meta, StoryObj } from '@storybook/react';

import Text from '../../../../typography/text/text';
import HeaderBottomContent from './header-bottom-content';

/**
 * HeaderContent holds custom content of header and is used to place content in the middle of header. <br />
 * **Note**: This component is not meant to be used outside of Header.
 */
const meta: Meta<typeof HeaderBottomContent> = {
  component: HeaderBottomContent,
};

export default meta;
type Story = StoryObj<typeof HeaderBottomContent>;

export const Default: Story = {
  args: {
    children: 'Any content',
    cardProps: {
      border: 'top-border-default',
    },
  },
};

export const Notice: Story = {
  args: {
    children: (
      <Text modifiers="center">
        Vaatamisõiguslik roll: <b>Asta Sarapuu</b>
      </Text>
    ),
    cardProps: {
      border: 'top-warning-main',
      background: 'warning-highlight',
    },
  },
};
