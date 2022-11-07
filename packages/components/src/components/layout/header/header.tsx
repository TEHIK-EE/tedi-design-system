import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Button } from '../../button/button';
import SkipLinks, { SkipLinksProps } from '../../skip-links/skip-links';
import { LayoutContext } from '../layout-context';
import styles from './header.module.scss';

export interface HeaderProps {
  children?: React.ReactNode;
  skipLinks?: SkipLinksProps;
  logo?: string;
  onLogoutClick: () => void;
}

export const Header = (props: HeaderProps) => {
  const { getLabel } = useLabels();
  const { skipLinks, logo = '/logo.svg', onLogoutClick, children } = props;
  const { toggleMenu, menuOpen } = React.useContext(LayoutContext);

  return (
    <>
      {skipLinks && <SkipLinks {...skipLinks} />}
      <header className={styles['header']}>
        <Button
          icon={menuOpen ? 'close' : 'menu'}
          visualType="primary"
          className={styles['header__toggle']}
          classNameIcon={styles['header__toggle-icon']}
          onClick={toggleMenu}
        >
          {menuOpen ? getLabel('header.close') : getLabel('header.open')}
        </Button>
        <img src={logo} alt="Logo" className={styles['header__logo']} />
        <div className={styles['header__content']}>{children}</div>
        <Button
          className={cn(styles['header__logout'], styles['header__logout--mobile'])}
          classNameIcon={styles['header__logout-icon']}
          icon="logout"
          visualType="link"
          onClick={onLogoutClick}
        >
          {getLabel('header.logout')}
        </Button>
        <Button className={styles['header__logout']} visualType="link" onClick={onLogoutClick}>
          {getLabel('header.logout')}
        </Button>
      </header>
    </>
  );
};

export default Header;
