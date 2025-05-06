import cn from 'classnames';
import { UnknownType } from 'libs/react-components/src/tedi/types/commonTypes';
import React from 'react';

import { useLabels } from '../../../../../../tedi/providers/label-provider';
import Button from '../../../../buttons/button/button';
import styles from './sidenav-toggle.module.scss';

type SidenavToggleProps = {
  menuOpen: boolean;
  toggleMenu: () => void;
  referenceRef?: React.Ref<UnknownType>;
  getReferenceProps?: () => UnknownType;
  show?: boolean;
};

export const SidenavToggle = ({
  menuOpen,
  toggleMenu,
  referenceRef,
  getReferenceProps = () => ({}),
  show = true,
}: SidenavToggleProps) => {
  const { getLabel } = useLabels();
  const toggleLabel = getLabel('header.toggle');
  const BEM = cn(styles['sidenav-toggle'], {
    [styles['sidenav-toggle--open']]: menuOpen,
  });

  if (!show) return null;

  return (
    <Button
      {...getReferenceProps()}
      ref={referenceRef}
      icon={{
        name: menuOpen ? 'close' : 'menu',
        className: styles['sidenav-toggle__icon'],
      }}
      visualType="primary"
      className={BEM}
      onClick={toggleMenu}
    >
      {typeof toggleLabel === 'string' ? toggleLabel : toggleLabel(menuOpen)}
    </Button>
  );
};

export default SidenavToggle;
