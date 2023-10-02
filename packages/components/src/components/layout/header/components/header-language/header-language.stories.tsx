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
      { label: 'EST', 'aria-label': 'Estonian', onClick: () => console.log('Selected EST'), isSelected: true },
      { label: 'ENG', 'aria-label': 'English', onClick: () => console.log('Selected ENG'), isSelected: false },
      { label: 'RUS', 'aria-label': 'Russian', onClick: () => console.log('Selected Rus'), isSelected: false },
    ],
  },
};
