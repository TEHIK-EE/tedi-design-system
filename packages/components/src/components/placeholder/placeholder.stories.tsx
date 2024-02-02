import { Meta, StoryObj } from '@storybook/react';

import Anchor from '../anchor/anchor';
import { Card, CardContent } from '../card';
import CardHeader from '../card/card-header/card-header';
import Heading from '../typography/heading/heading';
import Placeholder from './placeholder';

const meta: Meta<typeof Placeholder> = {
  component: Placeholder,
};

export default meta;
type Story = StoryObj<typeof Placeholder>;

export const Default: Story = {
  args: {
    children: 'Sul puuduvad uuringute ja vastuvõttude saatekirjad.',
  },
};

export const InsideCard: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <Heading modifiers="h3">Menetlused</Heading>
      </CardHeader>
      <CardContent>
        <Placeholder isNested>
          Menetlused puuduvad. <br />
          <Anchor href="#">Lisa uus menetlus</Anchor>
        </Placeholder>
      </CardContent>
    </Card>
  ),
};

export const WithCustomRowProps: Story = {
  args: {
    children: 'Sul puuduvad uuringute ja vastuvõttude saatekirjad.',
    rowProps: { gutter: 0 },
  },

  parameters: {
    docs: {
      description: {
        story:
          'When custom Image or Icon component already has white-space, you can remove the default gutter by setting `rowProps` to `{ gutter: 0 }`.',
      },
    },
  },
};
