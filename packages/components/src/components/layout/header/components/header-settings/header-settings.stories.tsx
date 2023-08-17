import { Meta, StoryObj } from '@storybook/react';

import { useLayout } from '../../../../../helpers/hooks/use-layout';
import Anchor from '../../../../anchor/anchor';
import { Card, CardContent } from '../../../../card';
import { List, ListItem } from '../../../../list';
import HeaderRole, { HeaderRoleProps } from '../header-role/header-role';
import { WithSecondaryInfo as HeaderRoleDefault } from '../header-role/header-role.stories';
import HeaderSettings from './header-settings';

const meta: Meta<typeof HeaderSettings> = {
  component: HeaderSettings,
};

export default meta;
type Story = StoryObj<typeof HeaderSettings>;

const DefaultContent = () => {
  const isMobile = useLayout(['mobile']);

  return (
    <List verticalSpacing={{ size: 0.75 }} element="ul">
      {isMobile && <ListItem>Custom Content</ListItem>}
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
  );
};

const ModalContent = () => (
  <>
    <HeaderRole
      {...(HeaderRoleDefault.args as HeaderRoleProps)}
      label={`${HeaderRoleDefault.args?.label}:`}
      renderModal={true}
    />
    <Card borderless={true}>
      <CardContent>
        <DefaultContent />
      </CardContent>
    </Card>
  </>
);

const Content = () => {
  const isMobileTablet = useLayout(['mobile', 'tablet']);

  return isMobileTablet ? <ModalContent /> : <DefaultContent />;
};

export const Default: Story = {
  args: {
    children: <Content />,
    onActionClick: () => console.log('Logout'),
  },
};

export const OnlyLogout: Story = {
  args: {
    onActionClick: () => console.log('Logout'),
  },
};
