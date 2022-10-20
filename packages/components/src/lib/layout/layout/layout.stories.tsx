import { Meta } from '@storybook/react';

import Button from '../../button/button';
import { DropdownItem } from '../../dropdown/dropdown';
import { useBreakpoint } from '../../helper';
import Section from '../../section/section';
import { VerticalSpacing } from '../../vertical-spacing';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Footer, { FooterProps } from '../footer/footer';
import Header from '../header/header';
import SideNav, { SideNavItem } from '../sidenav/sidenav';
import { Layout } from './layout';

export default {
  title: 'components/Layout/Layout',
  component: Layout,
  subcomponents: { Header, SideNav, Footer, Breadcrumbs },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const roleOptions: DropdownItem[] = [
  { label: 'Roll1', isActive: false, onClick: () => console.log('Roll valitud'), url: '#' },
  { label: 'Roll2', isActive: true, onClick: () => console.log('Roll valitud'), url: '#' },
  { label: 'Roll3', isActive: false, onClick: () => console.log('Roll valitud'), url: '#' },
];

const langOptions: DropdownItem[] = [
  { label: 'EST', isActive: false, onClick: () => console.log('Keel valitud'), url: '#' },
  { label: 'RUS', isActive: true, onClick: () => console.log('Keel valitud'), url: '#' },
  { label: 'ENG', isActive: false, onClick: () => console.log('Keel valitud'), url: '#' },
];

const navItems: SideNavItem[] = [
  { href: '#', title: 'Avaleht', icon: 'home' },
  { href: '#', title: 'Kliendid', icon: 'account_box' },
  { href: '/', title: 'Lapsed', icon: 'child_care', current: true },
  { href: '#', title: 'Menetlused', icon: 'assignment' },
  { href: '#', title: 'Menetlused', icon: 'assignment' },
  { href: '#', title: 'Menetlused', icon: 'assignment' },
  { href: '#', title: 'Menetlused', icon: 'assignment' },
  { href: '#', title: 'Menetlused', icon: 'assignment' },
  { href: '#', title: 'Menetlused', icon: 'assignment' },
  { href: '#', title: 'Menetlused', icon: 'assignment' },
  { href: '#', title: 'Menetlused', icon: 'assignment' },
];

const footerProps: FooterProps = {
  categories: [
    {
      heading: 'Category',
      icon: 'call_made',
      links: [
        { text: 'Text link', url: '#' },
        { text: 'Text link', url: '#' },
        { text: 'Text link', url: '#' },
      ],
    },
    {
      heading: 'Category',
      icon: 'call_made',
      links: [
        { text: 'Text link', url: '#' },
        { text: 'Text link', url: '#' },
        { text: 'Text link', url: '#' },
      ],
    },
    {
      heading: 'Category',
      icon: 'call_made',
      links: [
        { text: 'Text link', url: '#' },
        { text: 'Text link', url: '#' },
        { text: 'Text link', url: '#' },
      ],
    },
  ],
};

export const Default = () => {
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
        onLogoutClick: () => console.log('Logi välja'),
        languageSelection: {
          label: 'Keel:',
          dropdown: { button: { text: 'EST' }, items: langOptions },
        },
        roleSelection: {
          label: 'Minu Roll:',
          dropdown: { button: { text: roleOptions[1].label }, items: roleOptions },
        },
        skipLinks: {
          links: [{ children: 'Liigu edasi põhisisu juurde', url: '#main-content' }],
        },
      }}
      sideNav={{
        navItems,
        ariaLabel: 'Menüü',
      }}
      breadcrumbsProps={{
        crumbs: [
          { path: '#', label: 'Home' },
          { path: '/volunteers', label: 'Volunteers' },
          { path: '/volunteers/20', label: '20', isLast: true },
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
          <Button text="Focusable item" />
        </VerticalSpacing>
      </Section>
    </Layout>
  );
};
