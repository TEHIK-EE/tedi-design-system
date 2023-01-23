import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Anchor, AnchorProps } from '../../anchor/anchor';
import { Button } from '../../button/button';
import SkipLinks, { SkipLinksProps } from '../../skip-links/skip-links';
import { LayoutContext } from '../layout-context';
import styles from './header.module.scss';

export interface HeaderProps<H extends React.ElementType = 'a'> {
  /**
   * Custom content of header
   */
  children?: React.ReactNode;
  /**
   * Skiplinks properties. See more @skip-links
   */
  skipLinks?: SkipLinksProps;
  /**
   * Url to logo
   */
  logo?: string;
  /**
   * Wrap logo with Anchor. Children are ignored.
   */
  logoAnchor?: Partial<AnchorProps<H>>;
  /**
   * When included logout buttons are added to header
   */
  onLogoutClick?: () => void;
  /**
   * Use when no sidenav is need, so in mobile there is no toggle icon for sidenav.
   */
  hideToggle?: boolean;
}

export const Header = <H extends React.ElementType = 'a'>(props: HeaderProps<H>) => {
  const { getLabel } = useLabels();
  const { skipLinks, logo = '/logo.svg', logoAnchor, onLogoutClick, children, hideToggle, ...rest } = props;
  const { toggleMenu, menuOpen } = React.useContext(LayoutContext);
  const toggleLabel = getLabel('header.toggle');
  const LogoWrapper = logoAnchor ? Anchor : React.Fragment;

  return (
    <>
      {skipLinks && <SkipLinks {...skipLinks} />}
      <header data-name="header" {...rest} className={styles['header']}>
        {!hideToggle && (
          <Button
            icon={menuOpen ? 'close' : 'menu'}
            visualType="primary"
            className={styles['header__toggle']}
            classNameIcon={styles['header__toggle-icon']}
            onClick={toggleMenu}
          >
            {typeof toggleLabel === 'string' ? toggleLabel : toggleLabel(menuOpen)}
          </Button>
        )}
        {logo && (
          <div className={styles['header__logo-wrapper']}>
            <LogoWrapper {...(logoAnchor as AnchorProps<H>)}>
              <img src={logo} alt="Logo" className={styles['header__logo']} />
            </LogoWrapper>
          </div>
        )}
        {children && <div className={styles['header__content']}>{children}</div>}
        {onLogoutClick && (
          <>
            <Button
              className={cn(styles['header__logout'], styles['header__logout--mobile'])}
              icon={{ name: 'logout', size: 24 }}
              visualType="link"
              onClick={onLogoutClick}
            >
              {getLabel('header.logout')}
            </Button>
            <Button className={styles['header__logout']} visualType="link" onClick={onLogoutClick}>
              {getLabel('header.logout')}
            </Button>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
