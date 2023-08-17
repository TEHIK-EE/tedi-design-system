import { Meta, StoryObj } from '@storybook/react';

import Anchor from '../../../../anchor/anchor';
import Button from '../../../../button/button';
import { Card, CardContent } from '../../../../card';
import { List, ListItem } from '../../../../list';
import Separator from '../../../../separator/separator';
import { VerticalSpacing } from '../../../../vertical-spacing';
import HeaderModal from './header-modal';

const meta: Meta<typeof HeaderModal> = {
  component: HeaderModal,
};

export default meta;
type Story = StoryObj<typeof HeaderModal>;

export const Default: Story = {
  args: {
    triggerProps: {
      children: 'Settings',
      visualType: 'tertiary',
      icon: { name: 'account_circle', color: 'primary', size: 36 },
    },
    children: (
      <Card border="top-border-default">
        <CardContent>
          <VerticalSpacing size={1}>
            <List verticalSpacing={{ size: 0.75 }} element="ul">
              <ListItem>
                <Anchor href="#">Minu andmed</Anchor>
              </ListItem>
              <ListItem>
                <Anchor href="#">Ligipääs andmetele</Anchor>
              </ListItem>
              <ListItem>
                <Anchor href="#">Tahteavaldused</Anchor>
              </ListItem>
              <ListItem>
                <Anchor href="#">Volitatud isikud</Anchor>
              </ListItem>
              <ListItem>
                <Anchor href="#">Kontaktisikud</Anchor>
              </ListItem>
            </List>
            <Separator />
            <Anchor href="#" iconLeft="logout">
              Logi välja
            </Anchor>
          </VerticalSpacing>
        </CardContent>
      </Card>
    ),
  },
};

export const Language: Story = {
  args: {
    triggerProps: {
      children: 'EST',
      visualType: 'link',
      iconRight: { name: 'keyboard_arrow_down', color: 'primary', size: 24 },
    },
    children: (
      <Card border="top-border-default">
        <CardContent>
          <List verticalSpacing={{ size: 0.75 }} element="ul">
            <ListItem>
              <Button visualType="link">EST</Button>
            </ListItem>
            <ListItem>
              <Button visualType="link">ENG</Button>
            </ListItem>
            <ListItem>
              <Button visualType="link">RUS</Button>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    ),
  },
};
