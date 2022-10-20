import { Meta, Story } from '@storybook/react';

import { Heading, HeadingProps } from './heading';

export default {
  component: Heading,
  title: 'components/Heading',
} as Meta;

const Template: Story<HeadingProps> = (args) => <Heading {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'This is heading',
};
