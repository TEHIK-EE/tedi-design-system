import React from 'react';

import { useLayout } from '../../../../../helpers/hooks/use-layout';
import { useLabels } from '../../../../../providers/label-provider';
import Button, { ButtonProps } from '../../../../button/button';
import { Card, CardContent } from '../../../../card';
import Separator from '../../../../separator/separator';
import { Heading } from '../../../../typography/heading/heading';
import { VerticalSpacing } from '../../../../vertical-spacing';
import { LayoutContext } from '../../../layout-context';
import HeaderDropdown from '../header-dropdown/header-dropdown';
import HeaderModal from '../header-modal/header-modal';

export interface HeaderSettingsProps {
  /**
   * Called on different actions depending on type of the Header.
   * - On system header it is called on logout button click.
   * - On public header it is called on login button click.
   */
  onActionClick: () => void;
  /**
   * Content of HeaderDropdown
   * When using a function you have access to onToggle callback that can be used to close the menu
   */
  children?: ((props: { onToggle: (open: boolean) => void }) => React.ReactNode) | React.ReactNode;
  /**
   * Allow to change icon name
   */
  iconName?: string;
  /**
   * Close menu on login/logout click
   * @default true
   */
  closeOnAction?: boolean;
}

export const HeaderSettings: React.FC<HeaderSettingsProps> = (props) => {
  const { children, onActionClick, closeOnAction = true, iconName } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const isDesktop = useLayout(['desktop']);
  const isMobile = useLayout(['mobile']);
  const { getLabel } = useLabels();
  const { headerType } = React.useContext(LayoutContext);

  const triggerProps: ButtonProps = {
    children: getLabel('header.settings'),
    visualType: 'tertiary',
    icon: { name: iconName || 'account_circle', color: 'primary', size: 36 },
  };

  if (headerType === 'public') {
    return (
      <Button
        icon={isMobile ? { name: 'login', color: 'primary', size: 24 } : undefined}
        visualType={isMobile ? 'tertiary' : 'primary'}
        onClick={onActionClick}
      >
        {getLabel('header.login')}
      </Button>
    );
  }

  const getChildren = typeof children === 'function' ? children({ onToggle: setIsOpen }) : children;

  // If there is no children, render a simple logout button
  if (!getChildren) {
    return (
      <Button icon={{ name: 'logout', color: 'primary', size: 24 }} visualType="tertiary" onClick={onActionClick}>
        {getLabel('header.logout')}
      </Button>
    );
  }

  const LogOutAnchor = () => (
    <Button
      onClick={() => {
        onActionClick();
        closeOnAction && setIsOpen(false);
      }}
      iconLeft="logout"
      visualType="link"
    >
      {getLabel('header.logout')}
    </Button>
  );

  const dropdown = (
    <HeaderDropdown
      open={isOpen}
      onToggle={setIsOpen}
      tooltipProps={{ cardProps: { padding: 1 } }}
      triggerProps={triggerProps}
    >
      <VerticalSpacing size={1}>
        {getChildren}
        <Separator fullWidth />
        <LogOutAnchor />
      </VerticalSpacing>
    </HeaderDropdown>
  );

  const modal = (
    <HeaderModal
      open={isOpen}
      onToggle={setIsOpen}
      ariaLabelledby="header-settings-modal-label"
      triggerProps={triggerProps}
    >
      <Heading id="header-settings-modal-label" className="sr-only">
        {getLabel('header.settings')}
      </Heading>
      {getChildren}
      <Separator fullWidth />
      <Card borderless>
        <CardContent>
          <LogOutAnchor />
        </CardContent>
      </Card>
      <Separator fullWidth />
    </HeaderModal>
  );

  return isDesktop ? dropdown : modal;
};

HeaderSettings.displayName = 'HeaderSettings';

export default HeaderSettings;
