import { Meta, StoryObj } from '@storybook/react';

import Anchor from '../../../../anchor/anchor';
import Button from '../../../../button/button';
import { List, ListItem } from '../../../../list';
import Separator from '../../../../separator/separator';
import { VerticalSpacing } from '../../../../vertical-spacing';
import HeaderDropdown from './header-dropdown';

const meta: Meta<typeof HeaderDropdown> = {
  component: HeaderDropdown,
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
        <Anchor iconLeft="logout">Logi välja</Anchor>
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
