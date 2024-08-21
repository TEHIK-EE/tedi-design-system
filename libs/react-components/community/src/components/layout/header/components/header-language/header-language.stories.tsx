import { Meta, StoryObj } from '@storybook/react';

import HeaderLanguage from './header-language';

/**
 * HeaderLanguage return a list of languages in HeaderDropdown. Pass it as direct children of Header and it will be automatically
positioned. <br />
 * **Note**: This component is not meant to be used outside of Header.
 */
const meta: Meta<typeof HeaderLanguage> = {
  component: HeaderLanguage,
  title: 'Community/Layout/Header/HeaderLanguage',
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
