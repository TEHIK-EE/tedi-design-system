import { Meta, StoryObj } from '@storybook/react';

import HeaderLanguage from './header-language';

const meta: Meta<typeof HeaderLanguage> = {
  component: HeaderLanguage,
};

export default meta;
type Story = StoryObj<typeof HeaderLanguage>;

export const Default: Story = {
  args: {
    languages: [
      { label: 'EST', onClick: () => console.log('Selected EST'), isSelected: true },
      { label: 'ENG', onClick: () => console.log('Selected ENG'), isSelected: false },
      { label: 'RUS', onClick: () => console.log('Selected Rus'), isSelected: false },
    ],
  },
};
