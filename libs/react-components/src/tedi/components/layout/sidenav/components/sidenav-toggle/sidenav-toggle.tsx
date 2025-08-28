import cn from 'classnames';
import { UnknownType } from 'libs/react-components/src/tedi/types/commonTypes';
import React from 'react';

import { useLabels } from '../../../../../../tedi/providers/label-provider';
import Button from '../../../../buttons/button/button';
import FloatingButton from '../../../../buttons/floating-button/floating-button';
import styles from './sidenav-toggle.module.scss';

export type SidenavToggleVariant = 'mobile' | 'collapse';

export type SidenavToggleProps = {
  /**
   * Is the menu open (for mobile) or expanded (for collapse)
   */
  menuOpen: boolean;
  /**
   * Toggle open/collapse state
   */
  toggleMenu: (open: boolean) => void;
  /**
   * Optional ref to attach to button (for floating UI etc.)
   */
  referenceRef?: React.Ref<UnknownType>;
  /**
   * Optional props passed from floating UI
   */
  getReferenceProps?: () => UnknownType;
  /**
   * Variant of toggle (mobile overlay or collapse control)
   */
  variant?: SidenavToggleVariant;
};

export const SidenavToggle = ({
  menuOpen,
  toggleMenu,
  referenceRef,
  getReferenceProps = () => ({}),
  variant = 'mobile',
}: SidenavToggleProps) => {
  const { getLabel } = useLabels();

  const toggleLabel = getLabel('header.toggle', menuOpen);

  const BEM = cn(styles['tedi-sidenav-toggle'], {
    [styles['tedi-sidenav-toggle--open']]: menuOpen,
    [styles[`tedi-sidenav-toggle--${variant}`]]: true,
  });

  const Element = variant === 'collapse' ? FloatingButton : Button;

  return (
    <Element
      {...getReferenceProps()}
      ref={referenceRef}
      icon={{
        name:
          variant === 'collapse' ? (menuOpen ? 'right_panel_open' : 'left_panel_open') : menuOpen ? 'close' : 'menu',
        className: styles['tedi-sidenav-toggle__icon'],
        size: variant === 'collapse' ? 18 : 24,
      }}
      visualType={variant === 'collapse' ? 'secondary' : 'primary'}
      className={BEM}
      onClick={toggleMenu}
      position={variant === 'collapse' ? 'absolute' : 'static'}
      size={variant === 'collapse' ? 'small' : ''}
    >
      {toggleLabel}
    </Element>
  );
};

export default SidenavToggle;
