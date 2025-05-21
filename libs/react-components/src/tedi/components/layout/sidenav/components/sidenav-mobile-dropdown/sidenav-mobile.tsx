import { FloatingOverlay } from '@floating-ui/react';
import classNames from 'classnames';
import React, { useState } from 'react';

import { Icon } from '../../../../base/icon/icon';
import styles from '../../sidenav.module.scss';
import { SideNavItem, SideNavItem as SideNavItemType } from '../sidenav-item/sidenav-item';

type NavigationLevel<C extends React.ElementType> = {
  items: SideNavItemType<C>[];
  parent?: SideNavItemType<C>;
  renderParentLink?: boolean;
};

type SideNavMobileProps<C extends React.ElementType = 'a'> = {
  navItems: SideNavItemType<C>[];
  ariaLabel: string;
  linkAs?: C;
  isOpen: boolean;
  onClose: () => void;
  showOverlay?: boolean;
};

export const SideNavMobile = <C extends React.ElementType = 'a'>({
  navItems,
  ariaLabel,
  linkAs,
  isOpen,
  onClose,
  showOverlay = true,
}: SideNavMobileProps<C>) => {
  const [navigationStack, setNavigationStack] = useState<NavigationLevel<C>[]>([{ items: navItems }]);

  const currentLevel = navigationStack[navigationStack.length - 1];
  const isRootLevel = navigationStack.length === 1;

  const handleItemClick = (item: SideNavItemType<C>) => {
    const hasChildren = !!(item.subItems || item.subItemGroups);
    const isLinked = !!(item.href || item.to);

    if (!hasChildren) {
      onClose();
      return;
    }

    const nextLevelItems = item.subItemGroups?.flatMap((group) => group.subItems) || item.subItems || [];
    setNavigationStack([
      ...navigationStack,
      {
        items: nextLevelItems,
        parent: item,
        renderParentLink: isLinked,
      },
    ]);
  };

  const handleBackClick = () => {
    setNavigationStack(navigationStack.slice(0, -1));
  };

  const parentHasChildren = currentLevel.parent?.subItems?.length ?? currentLevel.parent?.subItemGroups?.length;
  const shouldRenderSubheading = navigationStack.length > 1 && !(currentLevel.renderParentLink && parentHasChildren);

  const renderMobileItem = (item: SideNavItemType<C>, level: number) => {
    if (level === 1) {
      const hasChildren = !!(item.subItems || item.subItemGroups);

      if (!hasChildren) {
        return (
          <SideNavItem
            {...item}
            as={linkAs}
            level={level}
            onItemClick={onClose}
            className={classNames(styles['tedi-sidenav__item--mobile'], item.className)}
          />
        );
      }

      return (
        <li className={classNames(styles['tedi-sidenav__item'], styles['tedi-sidenav__item--mobile'])}>
          <button onClick={() => handleItemClick(item)} className={styles['tedi-sidenav__link']}>
            {item.icon && (
              <Icon
                name={typeof item.icon === 'string' ? item.icon : item.icon.name}
                color="white"
                className={styles['tedi-sidenav__icon']}
              />
            )}
            <span className={styles['tedi-sidenav__title']}>{item.children}</span>
            <Icon name="expand_more" color="white" className={styles['tedi-sidenav__toggle-icon']} />
          </button>
        </li>
      );
    }

    return renderNestedMobileItem(item, level);
  };

  const renderNestedMobileItem = (item: SideNavItemType<C>, level: number) => {
    const isLink = !!(item.href || item.to);
    const hasChildren = !!(item.subItems || item.subItemGroups);

    if (isLink) {
      const itemContent = (
        <SideNavItem
          {...item}
          as={linkAs}
          level={level}
          icon={undefined}
          onItemClick={onClose}
          className={classNames(styles['tedi-sidenav__sub-item'], item.className)}
        />
      );

      return hasChildren ? (
        <div className={classNames(styles['tedi-sidenav__collapse'])}>{itemContent}</div>
      ) : (
        itemContent
      );
    }

    return (
      <li className={classNames(styles['tedi-sidenav__item'])}>
        <button
          onClick={() => (hasChildren ? handleItemClick(item) : onClose())}
          className={styles['tedi-sidenav__link']}
        >
          <span className={styles['tedi-sidenav__title']}>{item.children}</span>
          {hasChildren ? (
            <Icon name="expand_more" color="white" className={styles['tedi-sidenav__toggle-icon']} />
          ) : null}
        </button>
      </li>
    );
  };

  const content = (
    <nav
      data-name="mobile-sidenav"
      className={classNames(styles['tedi-sidenav'], styles['tedi-sidenav--mobile'])}
      aria-label={ariaLabel}
    >
      <div className={styles['tedi-sidenav__list']}>
        {!isRootLevel && (
          <div className={styles['tedi-sidenav__back-buttons']}>
            {navigationStack.length > 1 && (
              <button
                onClick={handleBackClick}
                className={classNames(styles['tedi-sidenav__link'], styles['tedi-sidenav__back-button'])}
                aria-label="Back to main menu"
              >
                <Icon name="arrow_back" size={16} color="white" />
                <span>Peamenüüse</span>
              </button>
            )}

            {navigationStack.length > 2 && (
              <button
                onClick={handleBackClick}
                className={classNames(styles['tedi-sidenav__link'], styles['tedi-sidenav__back-button'])}
                aria-label="Back to 2nd level"
              >
                <Icon name="arrow_back" size={16} color="white" />
                <span>{navigationStack[navigationStack.length - 2]?.parent?.children + ' menuüsse'}</span>
              </button>
            )}
          </div>
        )}
      </div>
      {shouldRenderSubheading && (
        <div className={classNames(styles['tedi-sidenav__subheading'], styles['tedi-sidenav__subheading--mobile'])}>
          {currentLevel.parent?.children}
        </div>
      )}
      <ul className={styles['tedi-sidenav__list']} role="menubar">
        {currentLevel.renderParentLink && currentLevel.parent && (
          <li className={styles['tedi-sidenav__list-item']}>
            {renderMobileItem(currentLevel.parent, navigationStack.length)}
          </li>
        )}
        {currentLevel.items.map((item) => (
          <>{renderMobileItem(item, navigationStack.length)}</>
        ))}
      </ul>
    </nav>
  );

  if (!isOpen) return null;

  return showOverlay ? (
    <FloatingOverlay lockScroll className={styles['tedi-sidenav__overlay']}>
      {content}
    </FloatingOverlay>
  ) : (
    content
  );
};
