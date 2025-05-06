import { FloatingFocusManager, FloatingOverlay, useFloating } from '@floating-ui/react';
import cn from 'classnames';
import React, { useState } from 'react';

import Print from '../../../../tedi/components/misc/print/print';
import { Breakpoint, isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { AllowedHTMLTags } from '../../../helpers/polymorphic/types';
import { UnknownType } from '../../../types/commonTypes';
import { SideNavItem } from './components/sidenav-item/sidenav-item';
import styles from './sidenav.module.scss';

type ConditionalTypes<C extends React.ElementType = 'a'> =
  | {
      /**
       * Render all anchors (except logoLink and skipLink) as this component
       */
      linkAs: AllowedHTMLTags<C, 'a' | React.ComponentType<UnknownType>>;
      /**
       * Level 1 menu links
       */
      navItems: SideNavItem<C>[];
    }
  | {
      linkAs?: never;
      navItems: SideNavItem<UnknownType>[];
    };

export type SideNavProps<C extends React.ElementType = 'a'> = ConditionalTypes<C> & {
  /**
   * SideNav menu aria-label
   */
  ariaLabel: string;
  /**
   * Id of the navigation
   */
  id?: string;
  /**
   * Show dividers between navigation items
   * @default true
   */
  showDividers?: boolean;
  /**
   * Hide submenu icons
   * @default false
   */
  hideSubItemIcons?: boolean;
  /**
   * Additional class names for the sidenav component
   */
  className?: string;
  /**
   * Breakpoint at which to switch to mobile view
   * @default 'tablet'
   */
  mobileBreakpoint?: 'mobile' | 'tablet';
  /**
   * Whether to show the mobile overlay when in mobile view
   * @default true
   */
  showMobileOverlay?: boolean;
  /**
   * Callback when the mobile menu is toggled
   */
  onMenuToggle?: (isOpen: boolean) => void;
  useOverlay?: boolean;
  isOpen?: boolean;
};

export const SideNav: <C extends React.ElementType = 'a'>(props: SideNavProps<C>) => React.ReactElement | null = (
  props
) => {
  const {
    navItems,
    ariaLabel,
    linkAs,
    showDividers = true,
    hideSubItemIcons = false,
    className,
    mobileBreakpoint = 'tablet',
    showMobileOverlay = true,
    useOverlay = false,
    isOpen = true,
    onMenuToggle,
    ...rest
  } = props;

  const isControlled = typeof isOpen === 'boolean';
  const [internalOpen, setInternalOpen] = useState(false);
  const isMenuOpen = isControlled ? isOpen : internalOpen;

  const setMenuOpen = (open: boolean) => {
    if (!isControlled) {
      setInternalOpen(open);
    }
    onMenuToggle?.(open);
  };

  const mapToBreakpoint = (value: 'mobile' | 'tablet'): Breakpoint => {
    return value === 'mobile' ? 'md' : 'lg';
  };
  const breakpoint = useBreakpoint();
  const isMobileView = isBreakpointBelow(breakpoint, mapToBreakpoint(mobileBreakpoint));

  const { refs, floatingStyles, context } = useFloating({
    open: isMenuOpen,
    onOpenChange: setMenuOpen,
  });

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const BEM = cn(styles['tedi-sidenav'], className, {
    [styles['tedi-sidenav--has-dividers']]: showDividers,
    [styles['tedi-sidenav--hide-subitem-icons']]: hideSubItemIcons,
  });

  const sidebarContent = (
    <Print visibility="hide">
      <nav id={props.id} data-name="sidenav" {...rest} className={BEM} aria-label={ariaLabel}>
        <ul className={styles['tedi-sidenav__list']} role="menubar" aria-label={ariaLabel}>
          {navItems.map((item, key) => (
            <SideNavItem as={linkAs} {...item} key={key} onItemClick={toggleMenu} />
          ))}
        </ul>
      </nav>
    </Print>
  );

  if (!isMobileView) {
    return sidebarContent;
  }

  if (!showMobileOverlay) {
    return isMenuOpen ? sidebarContent : null;
  }

  if (!useOverlay) {
    return isMenuOpen ? sidebarContent : null;
  }

  return isMenuOpen ? (
    <FloatingOverlay lockScroll className={styles['tedi-sidenav__overlay']}>
      <FloatingFocusManager context={context} order={['reference', 'content']}>
        <div ref={refs.setFloating} style={floatingStyles} className={styles['tedi-sidenav']} aria-label={ariaLabel}>
          {sidebarContent}
        </div>
      </FloatingFocusManager>
    </FloatingOverlay>
  ) : null;
};

export default SideNav;
