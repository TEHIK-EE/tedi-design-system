import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../../../../../tedi/providers/label-provider';
import Button from '../../../../button/button';
import { LayoutContext } from '../../../layout-context';
import styles from './sidenav-toggle.module.scss';

export const SidenavToggle = () => {
  const { menuOpen, toggleMenu, reference, getReferenceProps, sideNavProps, onHeaderSidenavToggle } =
    React.useContext(LayoutContext);
  const { getLabel } = useLabels();
  const toggleLabel = getLabel('header.toggle', menuOpen);

  const BEM = cn(styles['sidenav-toggle'], { [styles['sidenav-toggle--open']]: menuOpen });

  if (!sideNavProps?.navItems.length && !onHeaderSidenavToggle) {
    return null;
  }

  const buttonProps = onHeaderSidenavToggle ? { onClick: toggleMenu } : { ...getReferenceProps(), ref: reference };

  return (
    <Button
      {...buttonProps}
      icon={{
        name: menuOpen ? 'close' : 'menu',
        className: styles['sidenav-toggle__icon'],
      }}
      visualType="primary"
      className={BEM}
    >
      {toggleLabel}
    </Button>
  );
};

export default SidenavToggle;
