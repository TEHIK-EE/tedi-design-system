import { FloatingFocusManager, FloatingOverlay } from '@floating-ui/react';
import cn from 'classnames';
import React from 'react';

import useLayout from '../../../helpers/hooks/use-layout';
import { AllowedHTMLTags } from '../../../helpers/polymorphic/types';
import Anchor, { AnchorProps } from '../../anchor/anchor';
import Icon, { IconProps } from '../../icon/icon';
import Print from '../../print/print';
import { LayoutContext } from '../layout-context';
import styles from './sidenav.module.scss';

type ConditionalTypes<C extends React.ElementType = 'a'> =
  | {
      /**
       * Render all anchors (except logoLink and skipLink) as this component<br />
       * See [Anchor/CustomComponent](/?path=/docs/components-anchor--custom-component) for an example
       */
      linkAs: AllowedHTMLTags<C, 'a' | React.ComponentType<any>>;
      /**
       * Level 1 menu links
       */
      navItems: SideNavItem<C>[];
    }
  | {
      linkAs?: never;
      navItems: SideNavItem<any>[];
    };

export type SideNavProps<C extends React.ElementType = 'a'> = ConditionalTypes<C> & {
  /**
   * SideNav menu aria-label used for
   */
  ariaLabel: string;
  /**
   * Id of the navigation
   */
  id?: string;
};

export type SideNavItem<C extends React.ElementType = 'a'> = AnchorProps<C> & {
  /**
   * Icon of the item
   */
  icon?: string | IconProps;
};

export function SideNav<C extends React.ElementType = 'a'>(props: SideNavProps<C>) {
  const { navItems, ariaLabel, linkAs, ...rest } = props;
  const isSmallLayout = useLayout(['mobile', 'tablet']);
  const { menuOpen, context, getFloatingProps, floating, y } = React.useContext(LayoutContext);

  const renderSidebar = (
    <Print visibility="hide">
      <nav data-name="sidenav" {...rest} className={cn({ [styles['sidenav']]: !isSmallLayout })} aria-label={ariaLabel}>
        <ul className={styles['sidenav__list']} role="menubar" aria-label={ariaLabel}>
          {navItems.map((item, key) => (
            <SideNavItem as={linkAs} {...item} key={key} />
          ))}
        </ul>
      </nav>
    </Print>
  );

  return !isSmallLayout ? (
    renderSidebar
  ) : menuOpen ? (
    <FloatingOverlay lockScroll className={styles['sidenav__overlay']}>
      <FloatingFocusManager context={context} order={['reference', 'content']}>
        <div
          {...getFloatingProps({
            style: {
              paddingTop: y ?? 0,
            },
            className: styles['sidenav'],
            'aria-label': ariaLabel,
          })}
          ref={floating}
        >
          {renderSidebar}
        </div>
      </FloatingFocusManager>
    </FloatingOverlay>
  ) : null;
}

function SideNavItem<C extends React.ElementType = 'a'>(props: SideNavItem<C>) {
  const { icon, children, isActive, onClick, ...rest } = props;
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
    <li data-name="sidenav-item" className={SideNavItemBEM} role="presentation">
      <Anchor
        {...rest}
        onClick={handleClick}
        className={styles['sidenav__link']}
        noStyle={true}
        role="menuitem"
        aria-current={rest.isActive ? 'page' : undefined}
      >
        {icon && getIcon(icon)}
        <span className={styles['sidenav__title']}>{children}</span>
      </Anchor>
    </li>
  );
}

export default SideNav;
