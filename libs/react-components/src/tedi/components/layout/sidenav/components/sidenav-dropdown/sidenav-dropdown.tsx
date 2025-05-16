import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import classNames from 'classnames';
import React, { useState } from 'react';

import Link from '../../../../navigation/link/link';
import { SideNavItem } from '../sidenav-item/sidenav-item';
import styles from './sidenav-dropdown.module.scss';

type SideNavDropdownProps<C extends React.ElementType = 'a'> = {
  trigger: React.ReactNode;
  groups: Group<C>[];
  onOpenChange?: (isOpen: boolean) => void;
  label?: string;
};

type Group<C extends React.ElementType> = {
  subHeading?: string;
  subItems: SideNavItem<C>[];
};

export const SideNavDropdown = <C extends React.ElementType = 'a'>({
  trigger,
  groups,
  onOpenChange,
  label = 'Side navigation dropdown',
}: SideNavDropdownProps<C>) => {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    middleware: [offset({ mainAxis: 8 }), flip(), shift()],
    whileElementsMounted: autoUpdate,
    placement: 'right-start',
    onOpenChange: (nextOpen) => {
      setOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    strategy: 'fixed',
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([useClick(context), useDismiss(context)]);

  function onItemClick() {
    throw new Error('Function not implemented.');
  }

  const renderDropdownItem = <C extends React.ElementType>(item: SideNavItem<C>) => {
    const hasChildren = item.subItemGroups || item.subItems;

    return (
      <li
        key={item.key || item.href || item.children?.toString()}
        role="none"
        className={classNames(
          styles['tedi-sidenav-dropdown__item'],
          hasChildren && styles['tedi-sidenav-dropdown__item--has-children']
        )}
      >
        <Link
          {...item}
          role="menuitem"
          className={styles['tedi-sidenav-dropdown__link']}
          data-active={item.isActive}
          aria-current={item.isActive ? 'page' : undefined}
          noStyle
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            item.onClick?.(e);
            onItemClick?.();
            setOpen(false);
          }}
        >
          {item.children}
          {hasChildren && <span className={styles['tedi-sidenav__bullet']}></span>}
        </Link>

        {hasChildren && (
          <ul className={styles['tedi-sidenav-dropdown__list']} role="menu">
            {(item.subItemGroups ?? (item.subItems ? [{ subItems: item.subItems }] : [])).map((group, idx) => (
              <React.Fragment key={idx}>
                {group.subHeading && (
                  <div className={styles['tedi-sidenav-dropdown__heading']} role="presentation">
                    {group.subHeading}
                  </div>
                )}
                {group.subItems.map((child) => renderDropdownItem(child))}
              </React.Fragment>
            ))}
          </ul>
        )}
      </li>
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  };

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={open}
        onKeyDown={handleKeyDown}
      >
        {trigger}
      </div>
      {open && (
        <FloatingOverlay lockScroll>
          <FloatingPortal>
            <FloatingFocusManager context={context} modal={false}>
              <div
                ref={refs.setFloating}
                style={floatingStyles}
                className={styles['tedi-sidenav-dropdown']}
                role="menu"
                aria-label={label}
                {...getFloatingProps()}
              >
                {groups.map((group, i) => (
                  <div key={i} className={styles['tedi-sidenav-dropdown__group']}>
                    {group.subHeading && (
                      <div className={styles['tedi-sidenav-dropdown__heading']} role="presentation">
                        {group.subHeading}
                      </div>
                    )}
                    <ul className={styles['tedi-sidenav-dropdown__list']} role="menu">
                      {group.subItems.map((item) => renderDropdownItem(item))}
                    </ul>
                  </div>
                ))}
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        </FloatingOverlay>
      )}
    </>
  );
};
