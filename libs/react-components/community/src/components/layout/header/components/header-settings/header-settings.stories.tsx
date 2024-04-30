import { Meta, StoryObj } from '@storybook/react';

import { useLayout } from '../../../../../helpers/hooks/use-layout';
import Anchor from '../../../../anchor/anchor';
import { Card, CardContent } from '../../../../card';
import Separator from '../../../../separator/separator';
import VerticalSpacing from '../../../../vertical-spacing/vertical-spacing';
import HeaderRole, { HeaderRoleProps } from '../header-role/header-role';
import { WithSecondaryInfo as HeaderRoleDefault } from '../header-role/header-role.stories';
import HeaderSettings from './header-settings';

/**
 * HeaderSettings is wrapper around HeaderDropdown to allow passing it to Header as direct children and automatically position
 * it. That allows to pass custom content to settings dropdown. <br />
 * HeaderSettings also automatically adds logout or login buttons to header. <br />
 * When headerType from Layout properties is set to **'public'**, HeaderSettings renders only login button. <br /> When headerType
 * from Layout properties is set to **'system'**, HeaderSettings renders logout button after children, if no children presents
 * renders only logout button. <br />
 * **Note**: This component is not meant to be used outside of Header.
 */
const meta: Meta<typeof HeaderSettings> = {
  component: HeaderSettings,
  title: 'Community-components/Layout/Header/HeaderSettings',
};

export default meta;
type Story = StoryObj<typeof HeaderSettings>;

const DefaultContent = ({ onToggle }: { onToggle?: (open: boolean) => void }) => {
  const isMobile = useLayout(['mobile']);
  const renderAnchor = (label: string) => (
    <Anchor href="#" onClick={() => onToggle?.(false)}>
      {label}
    </Anchor>
  );

  return (
    <VerticalSpacing>
      {isMobile && (
        <>
          {renderAnchor('Custom Content')}
          <Separator fullWidth />
        </>
      )}
      {renderAnchor('My data')}
      <Separator fullWidth />
      {renderAnchor('Representation rights')}
      <Separator fullWidth />
      {renderAnchor('Access to health data')}
      <Separator fullWidth />
      {renderAnchor('Statements of intention')}
      <Separator fullWidth />
      {renderAnchor('Contacts')}
    </VerticalSpacing>
  );
};

const ModalContent = ({ onToggle }: { onToggle?: (open: boolean) => void }) => (
  <>
    <HeaderRole
      {...(HeaderRoleDefault.args as HeaderRoleProps)}
      label={`${HeaderRoleDefault.args?.label}:`}
      renderModal={true}
    />
    <Card border="top-info-main">
      <CardContent>
        <DefaultContent onToggle={onToggle} />
      </CardContent>
    </Card>
  </>
);

const Content = ({ onToggle }: { onToggle?: (open: boolean) => void }) => {
  const isMobileTablet = useLayout(['mobile', 'tablet']);

  return isMobileTablet ? <ModalContent onToggle={onToggle} /> : <DefaultContent onToggle={onToggle} />;
};

export const Default: Story = {
  args: {
    children: ({ onToggle }) => <Content onToggle={onToggle} />,
    onActionClick: () => console.log('Logout'),
  },
};

export const OnlyLogout: Story = {
  args: {
    onActionClick: () => console.log('Logout'),
  },
};
