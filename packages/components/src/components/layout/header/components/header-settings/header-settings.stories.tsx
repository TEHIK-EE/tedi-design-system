import { Meta, StoryObj } from '@storybook/react';

import { useLayout } from '../../../../../helpers/hooks/use-layout';
import Anchor from '../../../../anchor/anchor';
import { Card, CardContent } from '../../../../card';
import Separator from '../../../../separator/separator';
import VerticalSpacing from '../../../../vertical-spacing/vertical-spacing';
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
    <VerticalSpacing>
      {isMobile && (
        <>
          <Anchor href="#">Custom Content</Anchor>
          <Separator fullWidth />
        </>
      )}
      <Anchor href="#">Minu andmed</Anchor>
      <Separator fullWidth />
      <Anchor href="#">Ligipääs andmetele</Anchor>
      <Separator fullWidth />
      <Anchor href="#">Tahteavaldused</Anchor>
      <Separator fullWidth />
      <Anchor href="#">Volitatud isikud</Anchor>
      <Separator fullWidth />
      <Anchor href="#">Kontaktisikud</Anchor>
    </VerticalSpacing>
  );
};

const ModalContent = () => (
  <>
    <HeaderRole
      {...(HeaderRoleDefault.args as HeaderRoleProps)}
      label={`${HeaderRoleDefault.args?.label}:`}
      renderModal={true}
    />
    <Card border="top-info-main">
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
