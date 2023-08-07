import { faker } from '@faker-js/faker';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import Button from '../button/button';
import { Card, CardContent } from '../card';
import Heading from '../typography/heading/heading';
import Text from '../typography/text/text';
import VerticalSpacing, { VerticalSpacingProps } from './vertical-spacing';
import VerticalSpacingItem from './vertical-spacing-item';

const meta: Meta<typeof VerticalSpacing> = {
  component: VerticalSpacing,
  subcomponents: { VerticalSpacingItem } as never,
};

export default meta;
type Story = StoryObj<typeof VerticalSpacing>;

const Template: StoryFn<VerticalSpacingProps> = (args) => (
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

    <Text color="muted" modifiers="small">
      Some tiny text. Morbi et velit enim. Nulla facilisi. Curabitur tincidunt viverra nulla, a varius leo pharetra
      vitae.
    </Text>
    <Heading element="h2">Heading 2</Heading>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium lacinia urna in efficitur. Suspendisse
      mattis ornare imperdiet. Aenean iaculis, augue a viverra tincidunt, orci tellus tempus enim, ut tempor nunc leo ac
      erat.
    </Text>
  </VerticalSpacing>
);

const CardTemplate: StoryFn<VerticalSpacingProps> = (args) => (
  <Card>
    <CardContent>
      <VerticalSpacing {...args}>
        {faker.lorem
          .paragraphs(4, ',')
          .split(',')
          .map((p, key) => (
            <VerticalSpacingItem key={key}>
              <p>{p}</p>
            </VerticalSpacingItem>
          ))}
      </VerticalSpacing>
    </CardContent>
  </Card>
);

export const Default: Story = {
  render: Template,

  args: {
    size: 1,
  },
};

export const InsideCard: Story = {
  render: CardTemplate,
};
