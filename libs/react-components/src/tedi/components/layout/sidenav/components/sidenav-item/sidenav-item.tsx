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
   * Submenu items (legacy)
   */
  subItems?: SideNavItem<C>[];
  /**
   * Grouped submenu items (preferred for headings)
   */
  subItemGroups?: {
    subHeading?: string;
    subItems: SideNavItem<C>[];
  }[];
};

export const SideNavItem = <C extends React.ElementType = 'a'>(
  props: SideNavItem<C> & { onItemClick?: () => void; level?: number }
) => {
  const {
    icon,
    children,
    isActive,
    onClick,
    subItems,
    subItemGroups,
    as,
    onItemClick,
    className,
    level = 1,
    ...rest
  } = props;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const collapseId = React.useId();

  const groupsToRender = subItemGroups ?? (subItems ? [{ subItems }] : null);
  const hasChildren = !!groupsToRender;

  const SideNavItemBEM = cn(
    styles['tedi-sidenav__item'],
    {
      [styles['tedi-sidenav__item--current']]: isActive,
      [styles['tedi-sidenav__item--has-children']]: hasChildren && level === 2,
    },
    className
  );

  const getIcon = (icon: string | IconWithoutBackgroundProps) => {
    const iconBEM = cn(styles['tedi-sidenav__icon']);
    const defaultIconProps: Partial<IconWithoutBackgroundProps> = {
      color: 'white',
      className: iconBEM,
    };
    const iconProps: IconWithoutBackgroundProps =
      typeof icon === 'string'
        ? { ...defaultIconProps, name: icon }
        : {
            ...defaultIconProps,
            ...icon,
            className: cn(defaultIconProps.className, icon?.className),
          };

    return <Icon {...iconProps} />;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (!hasChildren) {
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

  const renderChildren = () =>
    groupsToRender?.map((group, index) => (
      <div key={index}>
        {group?.subHeading && <div className={styles['tedi-sidenav__subheading']}>{group.subHeading}</div>}
        <ul className={styles['tedi-sidenav__list']} role="menubar">
          {group.subItems?.map((item, key) => (
            <SideNavItem
              as={as}
              {...item}
              key={key}
              level={level + 1}
              onItemClick={onItemClick}
              className={cn(styles['tedi-sidenav__sub-item'], item.className)}
            />
          ))}
        </ul>
      </div>
    ));

  return (
    <li data-name="sidenav-item" className={SideNavItemBEM} role="presentation">
      {hasChildren && level === 1 ? (
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
          {renderChildren()}
        </Collapse>
      ) : hasChildren ? (
        <>
          <Link {...linkProps}>
            {icon && getIcon(icon)}
            <span className={styles['tedi-sidenav__title']}>{children}</span>
            <span className={styles['tedi-sidenav__bullet']}></span>
          </Link>
          {renderChildren()}
        </>
      ) : (
        <Link {...linkProps}>
          {icon && getIcon(icon)}
          <span className={styles['tedi-sidenav__title']}>{children}</span>
        </Link>
      )}
    </li>
  );
};
