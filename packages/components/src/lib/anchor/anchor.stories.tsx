import { Meta, Story } from '@storybook/react';

import { Anchor, AnchorProps } from './anchor';

export default {
  component: Anchor,
  title: 'components/Anchor',
} as Meta;

const Template: Story<AnchorProps> = (args) => <Anchor {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Vaata lähemalt',
  url: '#',
};
