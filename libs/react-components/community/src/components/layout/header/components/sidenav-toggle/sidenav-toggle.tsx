import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../../../../../../tedi/src/providers/label-provider';
import Button from '../../../../button/button';
import { LayoutContext } from '../../../layout-context';
import styles from './sidenav-toggle.module.scss';

export const SidenavToggle = () => {
  const { menuOpen, reference, getReferenceProps, sideNavProps } = React.useContext(LayoutContext);
  const { getLabel } = useLabels();
  const toggleLabel = getLabel('header.toggle');

  const BEM = cn(styles['sidenav-toggle'], { [styles['sidenav-toggle--open']]: menuOpen });

  if (!sideNavProps?.navItems.length) {
    return null;
  }

  return (
    <Button
      {...getReferenceProps()}
      ref={reference}
      icon={{
        name: menuOpen ? 'close' : 'menu',
        className: styles['sidenav-toggle__icon'],
      }}
      visualType="primary"
      className={BEM}
    >
      {typeof toggleLabel === 'string' ? toggleLabel : toggleLabel(menuOpen)}
    </Button>
  );
};

export default SidenavToggle;
