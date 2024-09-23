import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../../../../../tedi/src/components/grid';
import useLayout from '../../../helpers/hooks/use-layout';
import Anchor from '../../anchor/anchor';
import Icon from '../../icon/icon';
import Footer, { FooterProps } from './footer';

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: 'Community/Layout/Footer',
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
    src: isMobileLayout ? 'sf_logod.jpg' : 'sf_logod_vertikaalne.jpg',
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
    categories: exampleFooterCategories,
  },
};

export const Laeh: Story = {
  render: Template,

  args: {
    ...Default.args,
    categories: [
      {
        heading: 'STAR support',
        icon: 'call_made',
        elements: [
          <Anchor key="link-1" href="mailto:starteenusetugi@sotsiaalkindlustusamet.ee" color="inverted">
            starteenusetugi@sotsiaalkindlustusamet.ee
          </Anchor>,
          <Anchor key="link-2" href="tel:+3727943906" color="inverted">
            +372 794 3906
          </Anchor>,
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
          'Social insurance board',
          'Paldiski mnt 80, 15092 Tallinn',
          <span key="sample-phone-nr">
            Phone <Icon name="info" display="inline" size={14} />: +372 612 1360
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
