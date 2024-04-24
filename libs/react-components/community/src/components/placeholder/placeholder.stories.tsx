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
    children: 'You have no data to display.',
  },
};

export const InsideCard: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <Heading modifiers="h3">Assignments</Heading>
      </CardHeader>
      <CardContent>
        <Placeholder isNested>
          Assignments missing. <br />
          <Anchor href="#">Add new assignment</Anchor>
        </Placeholder>
      </CardContent>
    </Card>
  ),
};

/**
 * When custom Image or Icon component already has white-space, you can remove the default gutter by setting `rowProps` to `{ gutter: 0 }`.
 */
export const WithCustomRowProps: Story = {
  args: {
    children: 'You have no data to display.',
    rowProps: { gutter: 0 },
  },
};
