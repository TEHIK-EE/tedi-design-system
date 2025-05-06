import cn from 'classnames';
import React, { useState } from 'react';

import { Icon, IconWithoutBackgroundProps } from '../../../../base/icon/icon';
import Collapse from '../../../../buttons/collapse/collapse';
import Link, { LinkProps } from '../../../../navigation/link/link';
import styles from '../../sidenav.module.scss';

export type SideNavItem<C extends React.ElementType = 'a'> = LinkProps<C> & {
  /**
   * Icon of the item
   */
  icon?: string | IconWithoutBackgroundProps;
  /**
   * Submenu items
   */
  subItems?: SideNavItem<C>[];
};

export const SideNavItem = <C extends React.ElementType = 'a'>(
  props: SideNavItem<C> & { onItemClick?: () => void }
) => {
  const { icon, children, isActive, onClick, subItems, as, onItemClick, ...rest } = props;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const SideNavItemBEM = cn(styles['tedi-sidenav__item'], {
    [styles['tedi-sidenav__item--current']]: isActive,
  });
  const collapseId = React.useId();

  const getIcon = (icon: string | IconWithoutBackgroundProps) => {
    const iconBEM = cn(styles['tedi-sidenav__icon']);
    const defaultIconProps: Partial<IconWithoutBackgroundProps> = { color: 'white', className: iconBEM };
    const iconProps: IconWithoutBackgroundProps =
      typeof icon === 'string'
        ? { ...defaultIconProps, name: icon }
        : { ...defaultIconProps, ...icon, className: cn(defaultIconProps.className, icon?.className) };

    return <Icon {...iconProps} />;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (!subItems) {
      onItemClick?.();
    }
  };

  const handleCollapseToggle = (isOpen: boolean) => {
    setIsCollapsed(isOpen);
  };

  const linkProps = {
    ...rest,
    as,
    onClick: handleClick,
    className: styles['tedi-sidenav__link'],
    noStyle: true,
    role: 'menuitem',
    'aria-current': isActive ? 'page' : undefined,
  } as unknown as LinkProps<C>;

  return (
    <li data-name="sidenav-item" className={SideNavItemBEM} role="presentation">
      {subItems ? (
        <Collapse
          id={collapseId}
          hideCollapseText
          open={isCollapsed}
          onToggle={handleCollapseToggle}
          className={styles['tedi-sidenav__collapse']}
          title={
            <span
              {...(({ _href, ...spanRest }) => spanRest)(rest)}
              className={styles['tedi-sidenav__link']}
              noStyle={true}
              role="menuitem"
              aria-current={isActive ? 'page' : undefined}
            >
              {icon && getIcon(icon)}
              <span className={styles['tedi-sidenav__title']}>{children}</span>
            </span>
          }
        >
          <ul className={styles['tedi-sidenav__list']} role="menubar">
            {subItems.map((item, key) => (
              <SideNavItem as={as} {...item} key={key} onItemClick={onItemClick} />
            ))}
          </ul>
        </Collapse>
      ) : (
        <Link {...linkProps}>
          {icon && getIcon(icon)}
          <span className={styles['tedi-sidenav__title']}>{children}</span>
        </Link>
      )}
    </li>
  );
};
