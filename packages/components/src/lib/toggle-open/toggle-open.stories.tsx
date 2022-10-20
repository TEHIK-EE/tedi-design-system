import { ArgsTable, Description, Primary, PRIMARY_STORY, Stories, Subtitle, Title } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';
import React from 'react';

import ToggleOpen from './toggle-open';

export default {
  title: 'components/ToggleOpen',
  component: ToggleOpen,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>Toggle helper that toggles the button open-close with expand_more icon.</Subtitle>
          <Description>Button is already used in Accordion component.</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
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
      type="secondary"
      onClick={() => setOpen(!open)}
      classNameIcon="text-bold"
    />
  );
};
