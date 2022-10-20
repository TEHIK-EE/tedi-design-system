import cn from 'classnames';
import React from 'react';

import Section from '../../section/section';
import Breadcrumbs, { BreadcrumbsProps } from '../breadcrumbs/breadcrumbs';
import { Footer, FooterProps } from '../footer/footer';
import Header, { HeaderProps } from '../header/header';
import SideNav, { SideNavProps } from '../sidenav/sidenav';
import styles from './layout.module.scss';

export interface ILayoutProps {
  /**
   * Main content of the application
   */
  children: React.ReactElement;
  /**
   * Header props passed to Header component
   */
  header: HeaderProps;
  /**
   * SideNav props passed to SideNav component
   */
  sideNav: SideNavProps;
  /**
   * Main content id, used to navigate from skip-links
   */
  mainContentId?: string;
  /**
   * Footer props passed to Footer component
   */
  footer?: FooterProps;
  /**
   * Breadcrumbs props passed to Breadcrumbs component
   */
  breadcrumbsProps?: BreadcrumbsProps;
  /**
   * Logo shown on top-right of the main content area
   */
  mainLogo?: {
    src: string;
    alt: string;
    style: React.CSSProperties;
  };
}

export interface ILayoutContext {
  menuOpen: boolean;
  toggleMenu: () => void;
}

export const LayoutContext = React.createContext<ILayoutContext>({
  menuOpen: false,
  toggleMenu: () => null,
});

export const Layout = (props: ILayoutProps): JSX.Element => {
  const { children, header, sideNav, breadcrumbsProps, footer, mainContentId = 'main-content', mainLogo } = props;
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <LayoutContext.Provider value={{ menuOpen, toggleMenu: () => setMenuOpen((o) => !o) }}>
      <div className={styles['container-wrapper']}>
        <Header {...header} />
        <div className={cn(styles['container'], { [styles['container--menu-open']]: menuOpen })}>
          <SideNav {...sideNav} />
          <div className={styles['main']}>
            {mainLogo && (
              <img className={styles['main__logos']} src={mainLogo.src} alt={mainLogo.alt} style={mainLogo.style} />
            )}
            <main className={styles['main__content']} id={mainContentId}>
              {breadcrumbsProps && (
                <Section>
                  <Breadcrumbs className={styles['main__breadcrumbs']} {...breadcrumbsProps} />
                </Section>
              )}
              {children}
            </main>
          </div>
        </div>
        {footer && <Footer {...footer} />}
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
