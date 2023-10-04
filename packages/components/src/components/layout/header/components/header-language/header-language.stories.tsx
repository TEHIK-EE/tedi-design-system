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
      {
        label: 'EST',
        'aria-label': 'Estonian',
        onClick: ({ onToggle }) => {
          console.log('Selected EST');
          onToggle(false);
        },
        isSelected: true,
      },
      {
        label: 'ENG',
        'aria-label': 'English',
        onClick: ({ onToggle }) => {
          console.log('Selected ENG');
          onToggle(false);
        },
        isSelected: false,
      },
      {
        label: 'RUS',
        'aria-label': 'Russian',
        onClick: ({ onToggle }) => {
          console.log('Selected Rus');
          onToggle(false);
        },
        isSelected: false,
      },
    ],
  },
};
