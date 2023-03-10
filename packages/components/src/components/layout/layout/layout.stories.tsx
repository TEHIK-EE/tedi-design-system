import { Meta, Story } from '@storybook/react';

import useLayout from '../../../helpers/hooks/use-layout';
import Button from '../../button/button';
import Section from '../../section/section';
import StretchContent from '../../stretch-content/stretch-content';
import { VerticalSpacing } from '../../vertical-spacing';
import Breadcrumbs, { BreadcrumbsProps } from '../breadcrumbs/breadcrumbs';
import { Default as BreadcrumbsDefault } from '../breadcrumbs/breadcrumbs.stories';
import Footer, { FooterProps } from '../footer/footer';
import { Default as FooterDefault } from '../footer/footer.stories';
import Header from '../header/header';
import { Default as HeaderDefault } from '../header/header.stories';
import SideNav, { SideNavProps } from '../sidenav/sidenav';
import { Default as SidenavDefault } from '../sidenav/sidenav.stories';
import { ILayoutProps, Layout } from './layout';

const defaultContent = (
  <Section>
    <VerticalSpacing>
      <h1>Page title & content</h1>
      <Button>Focusable item</Button>
    </VerticalSpacing>
  </Section>
);

export default {
  title: 'components/Layout/Layout',
  component: Layout,
  subcomponents: { Header, SideNav, Footer, Breadcrumbs },
  argTypes: {
    children: {
      control: { type: 'function' },
    },
  },
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 700,
    },
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
  },
} as Meta;

const Template: Story<ILayoutProps> = (args) => {
  const isSmallLayout = useLayout(['mobile', 'tablet']);

  const footerLogo: FooterProps['logo'] = {
    src: isSmallLayout ? '/sf_logod.jpg' : '/sf_logod_vertikaalne.jpg',
    alt: 'logo',
    style: isSmallLayout
      ? { width: '9rem', height: '5.25rem', borderRadius: '0.25rem' }
      : { width: '3.75rem', height: '7rem', borderRadius: '0.25rem' },
  };

  const footerProps = { ...args.footer, logo: footerLogo } as FooterProps;

  return (
    <Layout {...args} footer={footerProps}>
      {args.children}
    </Layout>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: defaultContent,
  header: HeaderDefault.args,
  sideNav: SidenavDefault.args as SideNavProps,
  footer: FooterDefault.args as FooterProps,
  breadcrumbsProps: BreadcrumbsDefault.args as BreadcrumbsProps,
  mainLogo: {
    src: '/sf_logod.jpg',
    alt: 'Euroopa struktuuri- ja investeerimisfondide logo',
    style: { width: '6.625rem', height: '4rem', borderRadius: '0.25rem' },
  },
};

export const Simple = Template.bind({});
Simple.args = {
  ...Default.args,
  breadcrumbsProps: undefined,
  sideNav: undefined,
};

export const MainGrow = Template.bind({});
MainGrow.args = {
  ...Default.args,
  growMainContent: true,
  sideNav: undefined,
  breadcrumbsProps: undefined,
  mainLogo: undefined,
  children: (
    <>
      {/* NB! This is only an example. Illustrations responsiveness must be implemented in app. */}
      <StretchContent className="not-found">
        <img alt="404 Page" src="/404.svg" className="not-found__image" />
      </StretchContent>
    </>
  ),
};
MainGrow.parameters = {
  docs: {
    description: {
      story:
        'When we need to have the main content take all available space. For example a 404 page with illustration.',
    },
  },
};
