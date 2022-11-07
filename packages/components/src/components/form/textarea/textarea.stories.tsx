import { Meta, Story } from '@storybook/react';
import React from 'react';

import TextArea, { TextAreaProps } from './textarea';

export default {
  title: 'components/Form/TextArea',
  component: TextArea,
} as Meta;

const Template: Story<TextAreaProps> = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'example-1',
  label: 'Label',
};
