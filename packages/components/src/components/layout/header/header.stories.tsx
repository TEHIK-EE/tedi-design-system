import { Meta, StoryObj } from '@storybook/react';

import useLayout from '../../../helpers/hooks/use-layout';
import Anchor from '../../anchor/anchor';
import { Col, Row } from '../../grid';
import StretchContent from '../../stretch-content/stretch-content';
import { renderCustomHeader } from './examples/renderCustomHeader';
import Header, { HeaderProps } from './header';

const meta: Meta<typeof Header> = {
  component: Header,
  parameters: {
    backgrounds: { default: 'light' },
    layout: 'fullscreen',
  },
  excludeStories: /.*CustomHeader$/,
};

export default meta;
type Story = StoryObj<typeof Header>;

const Template = (args: HeaderProps) => {
  const isSmallLayout = useLayout(['mobile', 'tablet']);

  return <Header {...args}>{renderCustomHeader(isSmallLayout)}</Header>;
};

export const Default: Story = {
  render: Template,

  args: {
    logoAnchor: { href: '#' },
    onLogoutClick: () => console.log('Logging out'),
    skipLinks: {
      links: [{ children: 'Skip to main content', href: '#main-content' }],
    },
  },

  parameters: {
    layout: 'fullscreen',
  },
};

export const HeaderWithBottomContent: Story = {
  render: Template,

  args: {
    logoAnchor: { href: '#' },
    onLogoutClick: () => console.log('Logging out'),
    skipLinks: {
      links: [{ children: 'Skip to main content', href: '#main-content' }],
    },
    bottomContent: (
      <StretchContent direction="horizontal">
        <Row justifyContent="center" alignItems="center" gutter={0} gap={2}>
          <Col width="auto">
            <Anchor href="#">Link 1</Anchor>
          </Col>
          <Col width="auto">
            <Anchor href="#">Link 2</Anchor>
          </Col>
          <Col width="auto">
            <Anchor href="#">Link 3</Anchor>
          </Col>
        </Row>
      </StretchContent>
    ),
  },

  parameters: {
    layout: 'fullscreen',
  },
};
