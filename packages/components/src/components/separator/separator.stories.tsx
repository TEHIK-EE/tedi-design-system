import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Card, CardContent } from '../card';
import Separator, { SeparatorProps } from './separator';

export default {
  title: 'components/Separator',
  component: Separator,
} as Meta;

const Template: Story<SeparatorProps> = (args) => (
  <>
    <p className="text-secondary">Some content</p>
    <Separator {...args} />
    <p className="text-secondary">Some content</p>
  </>
);
const TemplateCard: Story<SeparatorProps> = (args) => (
  <Card>
    <CardContent>
      <p className="text-secondary">Some content</p>
      <Separator {...args} />
      <p className="text-secondary">Some content</p>
    </CardContent>
  </Card>
);

export const Default = Template.bind({});
Default.args = {};

export const PaddedUneven = Template.bind({});
PaddedUneven.args = { topSpacing: 2.5, bottomSpacing: 0.5 };

export const PaddedEven = Template.bind({});
PaddedEven.args = { spacing: 1 };

export const FullWidthInsideCard = TemplateCard.bind({});
FullWidthInsideCard.args = { fullWidth: true };
