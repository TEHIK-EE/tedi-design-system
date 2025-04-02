import { Meta, StoryObj } from '@storybook/react';

import { List, ListItem } from '../../../../../../tedi/components/content/list';
import { VerticalSpacing } from '../../../../../../tedi/components/layout/vertical-spacing';
import Separator from '../../../../../../tedi/components/misc/separator/separator';
import Anchor from '../../../../anchor/anchor';
import Button from '../../../../button/button';
import HeaderDropdown from './header-dropdown';

/**
 * HeaderDropdown is wrapper around Tooltip to provide a consistent dropdown menu for Header. <br />
 * **Note**: This component (or tooltip design) is not meant to be used outside of Header.
 */
const meta: Meta<typeof HeaderDropdown> = {
  component: HeaderDropdown,
  title: 'Community/Layout/Header/HeaderDropdown',
};

export default meta;
type Story = StoryObj<typeof HeaderDropdown>;

export const Default: Story = {
  args: {
    tooltipProps: {
      cardProps: {
        padding: 1,
      },
    },
    triggerProps: {
      children: 'Settings',
      visualType: 'tertiary',
      icon: { name: 'account_circle', color: 'primary', size: 36 },
    },
    children: (
      <VerticalSpacing size={1}>
        <List verticalSpacing={{ size: 0.75 }} element="ul">
          <ListItem>
            <Anchor href="#">My data</Anchor>
          </ListItem>
          <ListItem>
            <Anchor href="#">Representation rights</Anchor>
          </ListItem>
          <ListItem>
            <Anchor href="#">Access to health data</Anchor>
          </ListItem>
          <ListItem>
            <Anchor href="#">Statements of itention</Anchor>
          </ListItem>
          <ListItem>
            <Anchor href="#">Contacts</Anchor>
          </ListItem>
        </List>
        <Separator />
        <Anchor iconLeft="logout">Log out</Anchor>
      </VerticalSpacing>
    ),
  },
};

export const Language: Story = {
  args: {
    shouldAnimate: true,
    tooltipProps: {
      cardProps: {
        padding: 1,
      },
    },
    triggerProps: {
      children: 'EST',
      visualType: 'link',
      iconRight: { name: 'keyboard_arrow_down', color: 'primary', size: 24 },
    },
    children: (
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
    ),
  },
};
