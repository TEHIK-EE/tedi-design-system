import { Meta, Story } from '@storybook/react';
import React from 'react';

import useBreakpoint from '../../../helpers/hooks/use-breakpoint';
import Footer, { FooterProps } from './footer';

export default {
  title: 'components/Layout/Footer',
  component: Footer,
} as Meta;

const Template: Story<FooterProps> = (args) => {
  const breakpoint = useBreakpoint();
  const isMobileLayout = ['xs', 'sm'].includes(breakpoint || '');

  const logo: FooterProps['logo'] = {
    src: isMobileLayout ? '/sf_logod.jpg' : '/sf_logod_vertikaalne.jpg',
    alt: 'logo',
    style: isMobileLayout
      ? {
          width: '9rem',
          height: '5.25rem',
          borderRadius: '0.25rem',
        }
      : {
          width: '3.75rem',
          height: '7rem',
          borderRadius: '0.25rem',
        },
  };
  return <Footer {...args} logo={logo} />;
};

export const Default = Template.bind({});
Default.args = {
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

export const Laeh = Template.bind({});
Laeh.args = {
  ...Default.args,
  categories: [
    {
      heading: 'STAR kasutajatugi',
      icon: 'call_made',
      links: [
        { text: 'starteenusetugi@sotsiaalkindlustusamet.ee', url: 'mailto:starteenusetugi@sotsiaalkindlustusamet.ee' },
        { text: '+372 794 3906', url: 'tel:+3727943906' },
      ],
    },
  ],
};
