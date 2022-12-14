import { Meta, Story } from '@storybook/react';

import Anchor from '../anchor/anchor';
import { Card, CardContent } from '../card';
import CardHeader from '../card/card-header/card-header';
import Heading from '../heading/heading';
import Placeholder, { PlaceholderProps } from './placeholder';

export default {
  title: 'components/Placeholder',
  component: Placeholder,
} as Meta;

const Template: Story<PlaceholderProps> = (args) => <Placeholder {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Sul puuduvad uuringute ja vastuvõttude saatekirjad.',
};

export const InsideCard: Story<PlaceholderProps> = () => (
  <Card>
    <CardHeader>
      <Heading className="h3">Menetlused</Heading>
    </CardHeader>
    <CardContent>
      <Placeholder isNested>
        Menetlused puuduvad. <br />
        <Anchor href="#">Lisa uus menetlus</Anchor>
      </Placeholder>
    </CardContent>
  </Card>
);
