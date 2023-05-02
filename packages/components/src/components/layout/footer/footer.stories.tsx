import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import useLayout from '../../../helpers/hooks/use-layout';
import Anchor from '../../anchor/anchor';
import { LinkBehaviour } from '../../anchor/anchor-helpers';
import { Col, Row } from '../../grid';
import Icon from '../../icon/icon';
import Footer, { FooterProps } from './footer';

const meta: Meta<typeof Footer> = {
  component: Footer,
  argTypes: {
    linkAs: {
      type: 'function',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

const exampleFooterCategories = [
  {
    heading: 'Category',
    icon: 'call_made',
    elements: [
      <Anchor key="link-1" href="#" color="inverted">
        Text link
      </Anchor>,
      <Anchor key="link-2" href="#" color="inverted">
        Text link
      </Anchor>,
      <Anchor key="link-3" href="#" color="inverted">
        Text link
      </Anchor>,
    ],
  },
  {
    heading: 'Category',
    icon: 'call_made',
    elements: [
      <Anchor key="link-1" href="#" color="inverted">
        Text link
      </Anchor>,
      <Anchor key="link-2" href="#" color="inverted">
        Text link
      </Anchor>,
      <Anchor key="link-3" href="#" color="inverted">
        Text link
      </Anchor>,
      <Anchor key="link-4" href="#" color="inverted">
        Text link
      </Anchor>,
    ],
  },
  {
    heading: 'Category',
    icon: 'call_made',
    elements: [
      <Anchor key="link-1" href="#" color="inverted">
        Text link
      </Anchor>,
      <Anchor key="link-2" href="#" color="inverted">
        Text link
      </Anchor>,
      <Anchor key="link-3" href="#" color="inverted">
        Text link
      </Anchor>,
      <Anchor key="link-4" href="#" color="inverted">
        Text link
      </Anchor>,
      <Anchor key="link-5" href="#" color="inverted">
        Text link
      </Anchor>,
    ],
  },
];

const Template: StoryFn<typeof Footer> = (args) => {
  const isMobileLayout = useLayout(['mobile']);

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

export const Default: Story = {
  render: Template,

  args: {
    linkAs: LinkBehaviour,
    categories: exampleFooterCategories,
  },
};

export const Laeh: Story = {
  render: Template,

  args: {
    ...Default.args,
    categories: [
      {
        heading: 'STAR kasutajatugi',
        icon: 'call_made',
        links: [
          {
            children: 'starteenusetugi@sotsiaalkindlustusamet.ee',
            href: 'mailto:starteenusetugi@sotsiaalkindlustusamet.ee',
          },
          { children: '+372 794 3906', href: 'tel:+3727943906' },
        ],
      },
    ],
  },
};

export const TextInFooter: Story = {
  render: Template,

  args: {
    ...Default.args,
    categories: [
      {
        heading: 'Category',
        icon: 'call_made',
        elements: [
          'Sotsiaalkindlustusamet',
          'Paldiski mnt 80, 15092 Tallinn',
          <span key="sample-phone-nr">
            Infotelefon <Icon name="info" display="inline" size={14} />: +372 612 1360
          </span>,
        ],
      },
      {
        heading: 'Category',
        icon: 'call_made',
        elements: [
          <Anchor key="link-1" href="#" color="inverted">
            Text link
          </Anchor>,
          <Anchor key="link-2" href="#" color="inverted">
            Text link
          </Anchor>,
          <Anchor key="link-3" href="#" color="inverted">
            Text link
          </Anchor>,
        ],
      },
      {
        heading: 'Category',
        icon: 'call_made',
        elements: [
          <Anchor key="link-1" href="#" color="inverted">
            Text link
          </Anchor>,
          <Anchor key="link-2" href="#" color="inverted">
            Text link
          </Anchor>,
          <Anchor key="link-3" href="#" color="inverted">
            Text link
          </Anchor>,
        ],
      },
    ],
  },
};

export const BottomRow: Story = {
  render: Template,

  args: {
    ...Default.args,
    bottomElement: (
      <Row justifyContent="center">
        <Col width="auto">Text</Col>
        <Col width="auto">
          <Anchor size="small" href="#" color="inverted">
            Link
          </Anchor>
        </Col>
      </Row>
    ),
  },
};
