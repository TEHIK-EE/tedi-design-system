import { Meta } from '@storybook/react';
import React from 'react';

import ToggleOpen from './toggle-open';

export default {
  title: 'components/ToggleOpen',
  component: ToggleOpen,
  parameters: {
    docs: {
      description: {
        component:
          'Toggle helper that toggles the button open-close with expand_more icon. Toggle is already used in Accordion component.',
      },
    },
  },
} as Meta;

export const Default = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <ToggleOpen
      openText="Avan"
      closeText="Sulgen"
      isActive={false}
      isOpen={open}
      visualType="secondary"
      onClick={() => setOpen(!open)}
      classNameIcon="text-bold"
    />
  );
};
