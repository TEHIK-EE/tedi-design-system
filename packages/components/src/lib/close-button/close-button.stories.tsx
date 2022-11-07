import { Meta, Story } from '@storybook/react';
import React from 'react';

import CloseButton, { CloseButtonProps } from './close-button';

export default {
  title: 'components/CloseButton',
  component: CloseButton,
} as Meta<CloseButtonProps>;

const Template: Story<CloseButtonProps> = (args) => <CloseButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Close',
  onClick: () => console.log('clicked'),
};
