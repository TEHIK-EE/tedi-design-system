import { FloatingFocusManager, FloatingOverlay } from '@floating-ui/react';
import cn from 'classnames';
import React from 'react';

import { useBreakpoint } from '../../../helpers';
import { AllowedHTMLTags } from '../../../helpers/polymorphic/types';
import Anchor, { AnchorProps } from '../../anchor/anchor';
import Icon, { IconProps } from '../../icon/icon';
import { LayoutContext } from '../layout-context';
import styles from './sidenav.module.scss';

type ConditionalTypes<C extends React.ElementType = 'a', Privilege = string> =
  | {
      /**
       * Render all anchors (except logoLink and skipLink) as this component<br />
       * See [Anchor/CustomComponent](/?path=/docs/components-anchor--custom-component) for an example
       */
      linkAs: AllowedHTMLTags<C, 'a' | React.ComponentType<any>>;
      /**
       * Level 1 menu links
       */
      navItems: SideNavItem<C, Privilege>[];
    }
  | {
      linkAs?: never;
      navItems: SideNavItem<any, Privilege>[];
    };

export type SideNavProps<C extends React.ElementType = 'a', Privilege = string> = ConditionalTypes<C, Privilege> & {
  /**
   * SideNav menu aria-label used for
   */
  ariaLabel: string;
  /**
   * Id of the navigation
   */
  id?: string;
};

export type SideNavItem<C extends React.ElementType = 'a', Privilege = string> = AnchorProps<C> & {
  /**
   * Icon of the item
   */
  icon?: string | IconProps;
  /**
   * List of Privileges that should see this item
   * Pass undefined if it should be available for everyone
   */
  allowedPrivileges?: Privilege[];
};

export function SideNav<C extends React.ElementType = 'a', Privilege = string>(props: SideNavProps<C, Privilege>) {
  const { navItems, ariaLabel, linkAs, ...rest } = props;
  const breakpoint = useBreakpoint();
  const isMobileLayout = ['xs', 'sm', 'md'].includes(breakpoint || '');
  const { menuOpen, context, getFloatingProps, floating, y } = React.useContext(LayoutContext);

  const renderSidebar = (
    <nav data-name="sidenav" {...rest} className={cn({ [styles['sidenav']]: !isMobileLayout })} aria-label={ariaLabel}>
      <ul className={styles['sidenav__list']} role="menubar" aria-label={ariaLabel}>
        {navItems.map((item, key) => (
          <SideNavItem as={linkAs} {...item} key={key} />
        ))}
      </ul>
    </nav>
  );

  return !isMobileLayout ? (
    renderSidebar
  ) : menuOpen ? (
    <FloatingOverlay lockScroll className={styles['sidenav__overlay']}>
      <FloatingFocusManager context={context} order={['reference', 'content']}>
        <div
          {...getFloatingProps({
            ref: floating,
            style: {
              paddingTop: y ?? 0,
            },
            className: styles['sidenav'],
            'aria-label': ariaLabel,
          })}
        >
          {renderSidebar}
        </div>
      </FloatingFocusManager>
    </FloatingOverlay>
  ) : null;
}

function SideNavItem<C extends React.ElementType = 'a', Privilege = string>(props: SideNavItem<C, Privilege>) {
  const { icon, allowedPrivileges, children, isActive, onClick, ...rest } = props;
  const { toggleMenu } = React.useContext(LayoutContext);
  const SideNavItemBEM = cn(styles['sidenav__item'], { [styles['sidenav__item--current']]: isActive });

  const getIcon = (icon: string | IconProps) => {
    const iconBEM = cn(styles['sidenav__icon']);
    const defaultIconProps: Partial<IconProps> = { className: iconBEM };
    const iconProps: IconProps =
      typeof icon === 'string'
        ? { ...defaultIconProps, name: icon }
        : { ...defaultIconProps, ...icon, className: cn(defaultIconProps.className, icon?.className) };

    return <Icon {...iconProps} />;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    toggleMenu();
  };

  return (
    <li data-name="sidenav-item" className={SideNavItemBEM}>
      <Anchor {...rest} onClick={handleClick} className={styles['sidenav__link']} noStyle={true} role="menuitem">
        {icon && getIcon(icon)}
        <span className={styles['sidenav__title']}>{children}</span>
      </Anchor>
    </li>
  );
}

export default SideNav;
