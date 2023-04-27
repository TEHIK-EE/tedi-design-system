import cn from 'classnames';
import React from 'react';

import { useLayout } from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import { Anchor, AnchorProps } from '../../anchor/anchor';
import { Button } from '../../button/button';
import Print from '../../print/print';
import SkipLinks, { SkipLinksProps } from '../../skip-links/skip-links';
import { LayoutContext } from '../layout-context';
import styles from './header.module.scss';

export interface HeaderProps<H extends React.ElementType = 'a'> {
  /**
   * Custom content of header
   */
  children?: React.ReactNode;
  /**
   * Additional classname
   */
  className?: string;
  /**
   * Skiplinks properties. See more @skip-links
   */
  skipLinks?: SkipLinksProps;
  /**
   * Url to logo
   * @default /logo.svg
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
   * Use when no sidenav is needed, so in mobile there is no toggle icon for sidenav.
   * @deprecated - When no navItems for sideNav are defined, then we hide the toggle anyway.
   */
  hideToggle?: boolean;
}

export const Header = <H extends React.ElementType = 'a'>(props: HeaderProps<H>) => {
  const { getLabel } = useLabels();
  const { skipLinks, logo = '/logo.svg', className, logoAnchor, onLogoutClick, children, hideToggle, ...rest } = props;
  const { menuOpen, reference, getReferenceProps, hasSidenavItems } = React.useContext(LayoutContext);
  const toggleLabel = getLabel('header.toggle');
  const LogoWrapper = logoAnchor ? Anchor : React.Fragment;
  const isMobile = useLayout(['mobile']);

  const BEM = cn(styles['header'], className);
  const toggleBEM = cn(styles['header__toggle'], { [styles['header__toggle--open']]: menuOpen });

  return (
    <>
      {skipLinks && <SkipLinks {...skipLinks} />}
      <Print visibility="hide">
        <header data-name="header" {...rest} className={BEM}>
          {!hideToggle && hasSidenavItems ? (
            <Button
              {...getReferenceProps({ ref: reference })}
              icon={{
                name: menuOpen ? 'close' : 'menu',
                className: styles['header__toggle-icon'],
              }}
              visualType="primary"
              className={toggleBEM}
            >
              {typeof toggleLabel === 'string' ? toggleLabel : toggleLabel(menuOpen)}
            </Button>
          ) : null}
          {logo && (
            <div className={styles['header__logo-wrapper']}>
              <LogoWrapper {...(logoAnchor as AnchorProps<H>)}>
                <img src={logo} alt="Logo" className={styles['header__logo']} />
              </LogoWrapper>
            </div>
          )}
          {children && (
            <div className={styles['header__content']} data-padding="medium">
              {children}
            </div>
          )}
          {onLogoutClick && (
            <Button
              className={styles['header__logout']}
              icon={isMobile ? { name: 'logout', size: 24 } : undefined}
              visualType="link"
              onClick={onLogoutClick}
            >
              {getLabel('header.logout')}
            </Button>
          )}
        </header>
      </Print>
    </>
  );
};

export default Header;
