import cn from 'classnames';
import React, { useEffect, useState } from 'react';

import Print from '../../../../tedi/components/misc/print/print';
import { Breakpoint, isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { AllowedHTMLTags } from '../../../helpers/polymorphic/types';
import { UnknownType } from '../../../types/commonTypes';
import { SideNavDropdown } from './components/sidenav-dropdown/sidenav-dropdown';
import { SideNavItem, SideNavItemProps } from './components/sidenav-item/sidenav-item';
import { SideNavMobile } from './components/sidenav-mobile/sidenav-mobile';
import SidenavToggle from './components/sidenav-toggle/sidenav-toggle';
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
      navItems: SideNavItemProps<C>[];
    }
  | {
      linkAs?: never;
      navItems: SideNavItemProps<UnknownType>[];
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
  /**
   * Controls the open state of the mobile sidenav. When provided, the mobile menu becomes a controlled component.
   *
   * To control the menu externally (e.g. from a toggle button), pair this prop with `SideNav.Toggle`:
   *
   * ```tsx
   * const [isOpen, setIsOpen] = useState(true);
   *
   * <SideNav.Toggle menuOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
   * <SideNav isMobileOpen={isOpen} ariaLabel="Mobile menu" navItems={...} />
   * ```
   *
   * If not provided, the mobile menu manages its open state internally based on viewport size.
   */
  isMobileOpen?: boolean;
  /**
   * Whether the sidenav is collapsed (showing only icons/shortened text)
   * @default false
   */
  isCollapsed?: boolean;
  /**
   * Callback when the sidenav is toggled between collapsed/expanded
   */
  onCollapseToggle?: (isCollapsed: boolean) => void;
};

const SideNavComponent: <C extends React.ElementType = 'a'>(props: SideNavProps<C>) => React.ReactElement | null = (
  props
) => {
  const {
    navItems,
    ariaLabel,
    linkAs,
    showDividers = true,
    className,
    mobileBreakpoint = 'tablet',
    showMobileOverlay = true,
    isMobileOpen,
    isCollapsed: isCollapsedProp = false,
    onMenuToggle,
    onCollapseToggle,
    ...rest
  } = props;

  const mapToBreakpoint = (value: 'mobile' | 'tablet'): Breakpoint => {
    const map: Record<'mobile' | 'tablet', Breakpoint> = {
      mobile: 'md',
      tablet: 'lg',
    };
    return map[value];
  };
  const breakpoint = useBreakpoint();
  const isMobileView = isBreakpointBelow(breakpoint, mapToBreakpoint(mobileBreakpoint));
  const isControlled = isMobileOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(!isMobileView);
  const isMenuOpen = isControlled ? isMobileOpen : internalOpen;

  const [internalCollapsed, setInternalCollapsed] = useState(isCollapsedProp);
  const isCollapsed = isMobileView ? false : internalCollapsed;
  const isCollapsible = 'isCollapsed' in props;

  useEffect(() => {
    if (!isControlled) {
      setInternalOpen(!isMobileView);
    }
  }, [isMobileView, isControlled]);

  const setCollapsed = (collapsed: boolean) => {
    setInternalCollapsed(collapsed);
    onCollapseToggle?.(collapsed);
  };

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  const setMenuOpen = (open: boolean) => {
    if (!isControlled) {
      setInternalOpen(open);
    }
    onMenuToggle?.(open);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const BEM = cn(styles['tedi-sidenav'], className, {
    [styles['tedi-sidenav--has-dividers']]: showDividers,
    [styles['tedi-sidenav--collapsed']]: isCollapsed,
  });

  if (isMobileView) {
    return (
      <SideNavMobile
        navItems={navItems}
        ariaLabel={ariaLabel}
        linkAs={linkAs}
        isOpen={isMenuOpen}
        onClose={() => setMenuOpen(false)}
        showOverlay={showMobileOverlay}
        {...rest}
      />
    );
  }

  return (
    <Print visibility="hide">
      <nav id={props.id} data-name="sidenav" {...rest} className={BEM} aria-label={ariaLabel}>
        {isCollapsible && <SidenavToggle menuOpen={!isCollapsed} toggleMenu={toggleCollapse} variant="collapse" />}
        <ul className={styles['tedi-sidenav__list']} role="menubar" aria-label={ariaLabel}>
          {navItems.map((item, key) => (
            <SideNavItem as={linkAs} {...item} key={key} onItemClick={toggleMenu} isCollapsed={isCollapsed} />
          ))}
        </ul>
      </nav>
    </Print>
  );
};

export const SideNav = Object.assign(SideNavComponent, {
  Toggle: SidenavToggle,
  Item: SideNavItem,
  Dropdown: SideNavDropdown,
  Mobile: SideNavMobile,
});

export default SideNav;
