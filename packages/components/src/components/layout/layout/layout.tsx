import { autoUpdate, useClick, useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react';
import cn from 'classnames';
import React from 'react';

import Section from '../../section/section';
import Breadcrumbs, { BreadcrumbsProps } from '../breadcrumbs/breadcrumbs';
import { Footer, FooterProps } from '../footer/footer';
import Header, { HeaderProps } from '../header/header';
import { LayoutContext } from '../layout-context';
import SideNav, { SideNavProps } from '../sidenav/sidenav';
import styles from './layout.module.scss';

export interface ILayoutProps<
  B extends React.ElementType = 'a',
  F extends React.ElementType = 'a',
  S extends React.ElementType = 'a',
  H extends React.ElementType = 'a'
> {
  /**
   * Main content of the application
   */
  children: React.ReactElement;
  /**
   * Header props passed to Header component
   */
  header: HeaderProps<H>;
  /**
   * SideNav props passed to SideNav component
   */
  sideNav?: SideNavProps<S>;
  /**
   * Main content id, used to navigate from skip-links
   */
  mainContentId?: string;
  /**
   * Footer props passed to Footer component
   */
  footer?: FooterProps<F>;
  /**
   * Breadcrumbs props passed to Breadcrumbs component
   */
  breadcrumbsProps?: BreadcrumbsProps<B>;
  /**
   * Logo shown on top-right of the main content area
   */
  mainLogo?: {
    src: string;
    alt: string;
    style: React.CSSProperties;
  };
}

export const Layout = <
  B extends React.ElementType = 'a',
  F extends React.ElementType = 'a',
  S extends React.ElementType = 'a',
  H extends React.ElementType = 'a'
>(
  props: ILayoutProps<B, F, S, H>
): JSX.Element => {
  const {
    children,
    header,
    sideNav,
    breadcrumbsProps,
    footer,
    mainContentId = 'main-content',
    mainLogo,
    ...rest
  } = props;
  const [menuOpen, setMenuOpen] = React.useState(false);

  const { y, reference, floating, context } = useFloating({
    placement: 'bottom-start',
    open: menuOpen,
    onOpenChange: setMenuOpen,
    whileElementsMounted: (...args) => autoUpdate(...args, { ancestorScroll: false }),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context, { role: 'dialog' }),
    useDismiss(context),
  ]);

  const mainBem = cn(styles['main'], { [styles['main--with-sidenav']]: !!props.sideNav });

  return (
    <LayoutContext.Provider
      value={{
        y,
        menuOpen,
        toggleMenu: () => setMenuOpen((o) => !o),
        reference,
        floating,
        context,
        getReferenceProps,
        getFloatingProps,
        hasSidenavItems: !!sideNav?.navItems?.length,
      }}
    >
      <div data-name="layout" {...rest} className={styles['container-wrapper']}>
        <Header {...header} />
        <div className={cn(styles['container'], { [styles['container--menu-open']]: menuOpen })}>
          {sideNav && <SideNav {...sideNav} />}
          <div className={mainBem}>
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
