import { Meta } from '@storybook/react';

import { useBreakpoint } from '../../../helpers';
import Button from '../../button/button';
import Section from '../../section/section';
import { VerticalSpacing } from '../../vertical-spacing';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Footer, { FooterProps } from '../footer/footer';
import Header from '../header/header';
import { Default as HeaderDefault, renderCustomHeader } from '../header/header.stories';
import SideNav, { SideNavItem } from '../sidenav/sidenav';
import { Layout } from './layout';

export default {
  title: 'components/Layout/Layout',
  component: Layout,
  subcomponents: { Header, SideNav, Footer, Breadcrumbs },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
  },
} as Meta;

const navItems: SideNavItem[] = [
  { href: '#', children: 'Avaleht', icon: 'home' },
  { href: '#', children: 'Kliendid', icon: 'account_box' },
  { href: '/', children: 'Lapsed', icon: 'child_care', isActive: true },
  { href: '#', children: 'Mingi väga pikk tekst miseimahukuidagigisiiaära', icon: 'assignment' },
  { href: '#', children: 'Menetlused', icon: 'assignment' },
  { href: '#', children: 'Menetlused', icon: 'assignment' },
  { href: '#', children: 'Menetlused', icon: 'assignment' },
];

const footerProps: FooterProps = {
  categories: [
    {
      heading: 'Category',
      icon: 'call_made',
      links: [
        { children: 'Text link', href: '#' },
        { children: 'Text link', href: '#' },
        { children: 'Text link', href: '#' },
      ],
    },
    {
      heading: 'Category',
      icon: 'call_made',
      links: [
        { children: 'Text link', href: '#' },
        { children: 'Text link', href: '#' },
        { children: 'Text link', href: '#' },
      ],
    },
    {
      heading: 'Category',
      icon: 'call_made',
      links: [
        { children: 'Text link', href: '#' },
        { children: 'Text link', href: '#' },
        { children: 'Text link', href: '#' },
      ],
    },
  ],
};

export const Default = () => {
  const breakpoint = useBreakpoint();
  const isMobileLayout = ['xs', 'sm', 'md'].includes(breakpoint || '');

  const footerLogo: FooterProps['logo'] = {
    src: isMobileLayout ? '/sf_logod.jpg' : '/sf_logod_vertikaalne.jpg',
    alt: 'logo',
    style: isMobileLayout
      ? { width: '9rem', height: '5.25rem', borderRadius: '0.25rem' }
      : { width: '3.75rem', height: '7rem', borderRadius: '0.25rem' },
  };

  return (
    <Layout
      header={{ ...HeaderDefault.args, children: renderCustomHeader(isMobileLayout) }}
      sideNav={{
        navItems,
        ariaLabel: 'Menüü',
      }}
      breadcrumbsProps={{
        crumbs: [
          { href: '#', children: 'Home' },
          { href: '/volunteers', children: 'Volunteers' },
          { href: '/volunteers/20', children: '20', isLast: true },
        ],
      }}
      footer={{ ...footerProps, logo: footerLogo }}
      mainLogo={{
        src: '/sf_logod.jpg',
        alt: 'Euroopa struktuuri- ja investeerimisfondide logo',
        style: { width: '6.625rem', height: '4rem', borderRadius: '0.25rem' },
      }}
    >
      <Section>
        <VerticalSpacing>
          <h1>Page title & content</h1>
          <Button>Focusable item</Button>
        </VerticalSpacing>
      </Section>
    </Layout>
  );
};

export const Simple = () => {
  const breakpoint = useBreakpoint();
  const isMobileLayout = ['xs', 'sm'].includes(breakpoint || '');

  const footerLogo: FooterProps['logo'] = {
    src: isMobileLayout ? '/sf_logod.jpg' : '/sf_logod_vertikaalne.jpg',
    alt: 'logo',
    style: isMobileLayout
      ? { width: '9rem', height: '5.25rem', borderRadius: '0.25rem' }
      : { width: '3.75rem', height: '7rem', borderRadius: '0.25rem' },
  };

  return (
    <Layout
      header={{
        hideToggle: true,
        logoAnchor: { href: '#' },
        onLogoutClick: () => console.log('Logging out'),
        skipLinks: {
          links: [{ children: 'Liigu edasi põhisisu juurde', href: '#main-content' }],
        },
      }}
      footer={{ ...footerProps, logo: footerLogo }}
      mainLogo={{
        src: '/sf_logod.jpg',
        alt: 'Euroopa struktuuri- ja investeerimisfondide logo',
        style: { width: '6.625rem', height: '4rem', borderRadius: '0.25rem' },
      }}
    >
      <Section>
        <VerticalSpacing>
          <h1>Page title & content</h1>
          <Button>Focusable item</Button>
        </VerticalSpacing>
      </Section>
    </Layout>
  );
};
