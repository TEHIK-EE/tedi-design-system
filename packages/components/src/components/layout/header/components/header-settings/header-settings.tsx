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
   */
  children?: React.ReactNode;
  /**
   * Allow to change icon name
   */
  iconName?: string;
}

export const HeaderSettings = (props: HeaderSettingsProps) => {
  const { children, onActionClick, iconName } = props;
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

  // If there is no children, render a simple logout button
  if (!children) {
    return (
      <Button icon={{ name: 'logout', color: 'primary', size: 24 }} visualType="tertiary" onClick={onActionClick}>
        {getLabel('header.logout')}
      </Button>
    );
  }

  const LogOutAnchor = () => (
    <Button onClick={onActionClick} iconLeft="logout" visualType="link">
      {getLabel('header.logout')}
    </Button>
  );

  const dropdown = (
    <HeaderDropdown tooltipProps={{ cardProps: { padding: 1 } }} triggerProps={triggerProps}>
      <VerticalSpacing size={1}>
        {children}
        <Separator />
        <LogOutAnchor />
      </VerticalSpacing>
    </HeaderDropdown>
  );

  const modal = (
    <HeaderModal ariaLabelledby="header-settings-modal-label" triggerProps={triggerProps}>
      <Heading id="header-settings-modal-label" className="sr-only">
        {getLabel('header.settings')}
      </Heading>
      {children}
      <Card borderless={true}>
        <CardContent>
          <VerticalSpacing>
            <Separator fullWidth={true} />
            <LogOutAnchor />
          </VerticalSpacing>
        </CardContent>
      </Card>
    </HeaderModal>
  );

  return isDesktop ? dropdown : modal;
};

export default HeaderSettings;
