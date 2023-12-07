import cn from 'classnames';
import React from 'react';

import { Layouts, useLayout } from '../../../../helpers';
import Affix from '../../../affix/affix';
import Anchor from '../../../anchor/anchor';
import { Col, Row } from '../../../grid';
import Print from '../../../print/print';
import { LayoutContext } from '../../layout-context';
import { useSidenavRendered } from '../../sidenav/utility';
import HeaderBottomContent, {
  HeaderBottomContentProps,
} from '../components/header-bottom-content/header-bottom-content';
import HeaderContent from '../components/header-content/header-content';
import HeaderLanguage from '../components/header-language/header-language';
import HeaderNavigation from '../components/header-navigation/header-navigation';
import HeaderNotification, { HeaderNotificationProps } from '../components/header-notification/header-notification';
import HeaderRole from '../components/header-role/header-role';
import HeaderSettings from '../components/header-settings/header-settings';
import Logo, { LogoProps } from '../components/logo/logo';
import SidenavToggle from '../components/sidenav-toggle/sidenav-toggle';
import SkipLinks, { SkipLinksProps } from '../components/skip-links/skip-links';
import styles from './header.module.scss';

export interface HeaderProps<H extends React.ElementType> {
  /**
   * Custom content of header
   */
  children?: React.ReactNode[] | React.ReactNode;
  /**
   * Skiplinks properties. See more @skip-links
   */
  skipLinks: SkipLinksProps;
  /**
   * Logo properties see more @logo
   */
  logo: LogoProps<H>;
  /**
   * Props of HeaderBottomContent
   */
  bottomContent?: HeaderBottomContentProps;
  /**
   * In which breakpoints header should render minimal settings module.
   * That means in those breakpoints only HeaderSettings and HeaderLanguage are rendered.
   * RoleSelection and custom Anchors are not rendered. They should move to HeaderSettings dropdown/modal
   * @default ['mobile']
   */
  minimalSettingsArea?: Layouts;
  /**
   * In which breakpoints header should render custom content.
   * That means in those breakpoints only HeaderContent children is rendered.
   * @default ['desktop', 'tablet']
   */
  showSystemCustomContent?: Layouts;
  /**
   * Props of notification bar above the header.
   */
  notification?: HeaderNotificationProps;
}

export const Header = <H extends React.ElementType = 'a'>(props: HeaderProps<H>) => {
  const {
    skipLinks,
    logo,
    children,
    bottomContent,
    notification,
    minimalSettingsArea = ['mobile'],
    showSystemCustomContent = ['desktop', 'tablet'],
    ...rest
  } = props;
  const renderSystemCustomContent = useLayout(showSystemCustomContent);
  const renderMinimalSettingsArea = useLayout(minimalSettingsArea);
  const { headerType, sideNavProps, headerElement } = React.useContext(LayoutContext);
  const { shouldBreakToBottomContent, shouldBreakToHeader } = useSidenavRendered(headerType, sideNavProps);

  // Different Header area accepted components and their order
  const SettingsAreaComponentOrder = [
    (Anchor as React.FC).displayName,
    HeaderRole.displayName,
    HeaderLanguage.displayName,
    HeaderSettings.displayName,
  ];
  const SettingsAreaMinimalComponentOrder = [HeaderLanguage.displayName, HeaderSettings.displayName];
  const ContentAreaComponentOrder = [HeaderContent.displayName];

  const getComponentDisplayName = (element: React.ReactElement<unknown, any>) => {
    return element.type.displayName;
  };

  const getSettingsAreaComponents = (children: React.ReactNode[] | React.ReactNode): React.ReactNode[] => {
    const acceptedChildren = renderMinimalSettingsArea ? SettingsAreaMinimalComponentOrder : SettingsAreaComponentOrder;
    return reorderHeaderDirectChildren(filterHeaderDirectChildren(children, acceptedChildren));
  };

  const filterHeaderDirectChildren = (
    children: React.ReactNode[] | React.ReactNode,
    acceptedArray = SettingsAreaComponentOrder
  ): React.ReactNode[] => {
    const filteredChildren: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        const displayName = getComponentDisplayName(child);
        if (acceptedArray.includes(displayName)) {
          filteredChildren.push(child);
        } else if (child.type === React.Fragment) {
          filteredChildren.push(...filterHeaderDirectChildren(child.props.children, acceptedArray));
        }
      }
    });

    return filteredChildren;
  };

  const reorderHeaderDirectChildren = (
    children: React.ReactNode[] | React.ReactNode,
    orderArray = SettingsAreaComponentOrder
  ): React.ReactNode[] => {
    const orderedChildren: React.ReactNode[] = [];

    // Add children in the order specified by the `orderArray` array
    orderArray.forEach((componentName) => {
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && getComponentDisplayName(child) === componentName) {
          orderedChildren.push(child);
        }
      });
    });

    return orderedChildren;
  };

  const BEM = cn(styles['header'], {
    [styles['header--with-bottom-content']]: shouldBreakToBottomContent || !!bottomContent,
  });

  return (
    <Print visibility="hide">
      {skipLinks && <SkipLinks {...skipLinks} />}
      {notification && <HeaderNotification {...notification} />}
      <header data-name="header" {...rest} ref={headerElement} className={BEM}>
        <SidenavToggle />
        <Logo {...logo} />
        <div className={styles['header__content']}>
          <div className={styles['header__content-left']}>
            {headerType === 'system' &&
              renderSystemCustomContent &&
              filterHeaderDirectChildren(children, ContentAreaComponentOrder)}
            {shouldBreakToHeader && <HeaderNavigation />}
          </div>
          <Row
            className={styles['header__content-right']}
            wrap="nowrap"
            alignItems="center"
            gutterX={4}
            xl={{ gutterX: 5 }}
          >
            {getSettingsAreaComponents(children).map((child: React.ReactNode, index: number) => (
              <Col width="auto" key={index} className={styles['header__content-item']}>
                {child}
              </Col>
            ))}
          </Row>
        </div>
      </header>
      {bottomContent && !shouldBreakToBottomContent && (
        <Affix position="sticky" top={0} relative="window" className={styles['header__affix']}>
          <HeaderBottomContent {...bottomContent} />
        </Affix>
      )}
      {shouldBreakToBottomContent && (
        <HeaderBottomContent
          cardProps={{
            border: 'top-border-default',
            padding: 0.75,
            borderRadius: false,
          }}
        >
          <HeaderNavigation />
        </HeaderBottomContent>
      )}
    </Print>
  );
};

export default Header;
