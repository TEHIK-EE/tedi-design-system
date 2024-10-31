import { Meta, StoryObj } from '@storybook/react';

import { List, ListItem } from '../../../../../../tedi/components/list';
import { VerticalSpacing } from '../../../../../../tedi/components/vertical-spacing';
import Anchor from '../../../../anchor/anchor';
import Button from '../../../../button/button';
import { Card, CardContent } from '../../../../card';
import Separator from '../../../../separator/separator';
import HeaderModal from './header-modal';

/**
 * HeaderModal is wrapper around Modal to provide a consistent modal for Header. <br />
 * **Note**: This component (or tooltip design) is not meant to be used outside of Header.
 */
const meta: Meta<typeof HeaderModal> = {
  component: HeaderModal,
  title: 'Community/Layout/Header/HeaderModal',
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
      <Card borderless>
        <CardContent>
          <VerticalSpacing>
            <Anchor href="#">My data</Anchor>
            <Separator fullWidth />
            <Anchor href="#">Representation rights</Anchor>
            <Separator fullWidth />
            <Anchor href="#">Access to health data</Anchor>
            <Separator fullWidth />
            <Anchor href="#">Statements of itention</Anchor>
            <Separator fullWidth />
            <Anchor href="#">Contacts</Anchor>
            <Separator fullWidth />
            <Anchor href="#" iconLeft="logout">
              Log out
            </Anchor>
            <Separator fullWidth />
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
      <Card borderless>
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
