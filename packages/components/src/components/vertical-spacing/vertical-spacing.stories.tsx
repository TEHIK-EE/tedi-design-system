import { Meta, Story } from '@storybook/react';
import React from 'react';

import Button from '../button/button';
import Heading from '../heading/heading';
import VerticalSpacing, { VerticalSpacingProps } from './vertical-spacing';
import VerticalSpacingItem from './vertical-spacing-item';

export default {
  title: 'components/VerticalSpacing',
  component: VerticalSpacing,
} as Meta;

const Template: Story<VerticalSpacingProps> = (args) => (
  <VerticalSpacing {...args}>
    <Heading>This is VerticalSpacing example</Heading>
    <p>VerticalSpacing component is used to give space vertically between its children.</p>
    <p>
      Use <code>size</code> prop to change margin between its children.
    </p>
    <VerticalSpacingItem size={0}>
      <p>Use VerticalSpacingItem to overwrite one element spacing.</p>
    </VerticalSpacingItem>

    <Button>Button text</Button>

    <p className="text-small text-secondary">
      Some tiny text. Morbi et velit enim. Nulla facilisi. Curabitur tincidunt viverra nulla, a varius leo pharetra
      vitae.
    </p>
    <h2>Heading 2</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium lacinia urna in efficitur. Suspendisse
      mattis ornare imperdiet. Aenean iaculis, augue a viverra tincidunt, orci tellus tempus enim, ut tempor nunc leo ac
      erat.
    </p>
  </VerticalSpacing>
);

export const Default = Template.bind({});
Default.args = {
  size: 1,
};