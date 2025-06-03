import cn from 'classnames';
import React, { useState } from 'react';

import { Icon, IconWithoutBackgroundProps } from '../../../../base/icon/icon';
import Collapse from '../../../../buttons/collapse/collapse';
import Link, { LinkProps } from '../../../../navigation/link/link';
import { Tooltip } from '../../../../overlays/tooltip';
import { SideNavItemSize } from '../../sidenav';
import styles from '../../sidenav.module.scss';
import { SideNavDropdown } from '../sidenav-dropdown/sidenav-dropdown';

export type SideNavItemProps<C extends React.ElementType = 'a'> = LinkProps<C> & {
  /**
   * Icon of the item
   */
  icon?: string | IconWithoutBackgroundProps;
  /**
   * Submenu items (legacy)
   */
  subItems?: SideNavItemProps<C>[];
  /**
   * Grouped submenu items (preferred for headings)
   */
  subItemGroups?: {
    subHeading?: string;
    subItems: SideNavItemProps<C>[];
  }[];
  /**
   * Whether the sidenav is currently collapsed
   */
  isCollapsed?: boolean;
  /**
   * Whether this item with children should be open initially
   */
  isDefaultOpen?: boolean;
  /**
   * Height of the SideNavIem
   * <br/> Medium/small better for dashboards
   * @default default
   */
  sideNavItemSize?: SideNavItemSize;
};

export const SideNavItem = <C extends React.ElementType = 'a'>(
  props: SideNavItemProps<C> & {
    onItemClick?: () => void;
    level?: number;
    isCollapsed?: boolean;
  }
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
    isCollapsed = false,
    isDefaultOpen = false,
    sideNavItemSize = 'default',
    ...rest
  } = props;

  const [isCollapsedInternal, setIsCollapsedInternal] = useState(isDefaultOpen ?? false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const collapseId = React.useId();

  const groupsToRender = subItemGroups ?? (subItems ? [{ subItems }] : null);
  const hasChildren = !!groupsToRender;

  const SideNavItemBEM = cn(
    styles['tedi-sidenav__item'],
    styles[`tedi-sidenav__item--${sideNavItemSize}`],
    {
      [styles[`tedi-sidenav__item--level-${level}`]]: level > 1,
      [styles['tedi-sidenav__item--current']]: isActive,
      [styles['tedi-sidenav__item--has-children']]: hasChildren,
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
    setIsCollapsedInternal(isOpen);
  };

  const isLinkedParent = hasChildren && (rest.href || rest.to);
  const linkProps = {
    ...rest,
    as,
    onClick: handleClick,
    className: cn(styles['tedi-sidenav__link'], isLinkedParent && styles['tedi-sidenav__link--has-children-link']),
    noStyle: true,
    role: 'menuitem',
    'aria-current': isActive ? 'page' : undefined,
    'aria-label': isCollapsed && typeof children === 'string' ? children : undefined,
  } as unknown as LinkProps<C>;

  const renderChildren = () =>
    !isCollapsed &&
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
              isCollapsed={isCollapsed}
              className={cn(styles['tedi-sidenav__sub-item'], item.className)}
            />
          ))}
        </ul>
      </div>
    ));

  const content = (
    <li data-name="sidenav-item" className={SideNavItemBEM} role="presentation">
      {hasChildren && isCollapsed ? (
        <SideNavDropdown
          trigger={
            <Tooltip.Trigger>
              <span
                className={cn(styles['tedi-sidenav__link'], isDropdownOpen && styles['tedi-sidenav__link--active'])}
              >
                {icon && getIcon(icon)}
                <Icon
                  name={!isDropdownOpen ? 'expand_more' : 'chevron_right'}
                  color="white"
                  className={styles['tedi-sidenav__toggle-icon']}
                  size={18}
                />
                <span className={styles['tedi-sidenav__title']}>{children}</span>
              </span>
            </Tooltip.Trigger>
          }
          groups={groupsToRender}
          onOpenChange={setIsDropdownOpen}
        />
      ) : hasChildren && level === 1 ? (
        rest.href || rest.to ? (
          <>
            <Link {...linkProps}>
              {icon && getIcon(icon)}
              <span className={styles['tedi-sidenav__title']}>{children}</span>
            </Link>
            <div className={styles['tedi-sidenav__link-collapse-wrapper']}>
              <Collapse
                id={collapseId}
                hideCollapseText
                open={isCollapsedInternal}
                onToggle={handleCollapseToggle}
                className={styles['tedi-sidenav__collapse']}
              >
                {renderChildren()}
              </Collapse>
            </div>
          </>
        ) : (
          <Collapse
            id={collapseId}
            hideCollapseText
            open={isCollapsedInternal}
            onToggle={handleCollapseToggle}
            className={styles['tedi-sidenav__collapse']}
            title={
              <span
                className={cn(
                  styles['tedi-sidenav__link'],
                  isCollapsedInternal && styles['tedi-sidenav__link--active']
                )}
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
        )
      ) : hasChildren ? (
        <>
          <Link {...linkProps}>
            {icon && getIcon(icon)}
            <span className={styles['tedi-sidenav__title']}>{children}</span>
            <i className={styles['tedi-sidenav__bullet']} />
          </Link>
          {renderChildren()}
        </>
      ) : (
        <Tooltip.Trigger>
          <Link {...linkProps}>
            {icon && getIcon(icon)}
            <span className={styles['tedi-sidenav__title']}>{children}</span>
          </Link>
        </Tooltip.Trigger>
      )}
    </li>
  );

  return level === 1 && isCollapsed ? (
    <Tooltip placement="right">
      <Tooltip.Content maxWidth="medium">{children}</Tooltip.Content>
      {content}
    </Tooltip>
  ) : (
    content
  );
};
