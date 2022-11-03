import cn from 'classnames';
import Link from 'next/link';
import React from 'react';

import { LayoutContext } from '../layout-context';
import styles from './sidenav.module.scss';

export interface SideNavItem<Privilege = string> {
  /**
   * Title of the item
   */
  title: string;
  /**
   * href of the item
   */
  href: string;
  /**
   * Icon of the item
   */
  icon?: string;
  /**
   * If link is currently visited page/site
   */
  current?: boolean;
  /**
   * List of Privileges that should see this item
   * Pass undefined if it should be available for everyone
   */
  allowedPrivileges?: Privilege[];
}

export interface SideNavProps<Privilege = string> {
  /**
   * SideNav menu items
   */
  navItems: SideNavItem<Privilege>[];
  /**
   * SideNav menu aria-label used for
   */
  ariaLabel: string;
}

export function SideNav<Privilege = string>(props: SideNavProps<Privilege>) {
  const { navItems, ariaLabel } = props;
  const { menuOpen, toggleMenu } = React.useContext(LayoutContext);

  const BEM = cn(styles['sidenav'], { [styles['sidenav--open']]: menuOpen });

  return (
    <>
      <nav className={BEM} aria-label={ariaLabel}>
        <ul className={styles['sidenav__list']} role="menubar" aria-label={ariaLabel}>
          {navItems.map((item, key) => (
            <SideNavItem<Privilege> {...item} key={key} />
          ))}
        </ul>
      </nav>
      {menuOpen && <div className={styles['main-backdrop']} onClick={toggleMenu} />}
    </>
  );
}

function SideNavItem<Privilege = string>(props: SideNavItem<Privilege>) {
  const { href, title, icon, current } = props;
  const SideNavItemBEM = cn(styles['sidenav__item'], { [styles['sidenav__item--current']]: current });

  return (
    <li className={SideNavItemBEM}>
      <Link href={href} className={styles['sidenav__link']} role="menuitem">
        <span className={`${styles['sidenav__icon']} material-icons-outlined`}>{icon}</span>
        <span className={styles['sidenav__title']}>{title}</span>
      </Link>
    </li>
  );
}

export default SideNav;
