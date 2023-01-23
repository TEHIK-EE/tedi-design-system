import { Meta, Story } from '@storybook/react';
import React from 'react';

import Anchor from '../../anchor/anchor';
import Dropdown from '../../dropdown/dropdown';
import { Col, Row } from '../../grid';
import Separator from '../../separator/separator';
import Header, { HeaderProps } from './header';

export default {
  title: 'components/Layout/Header',
  component: Header,
  layout: 'fullscreen',
  parameters: {
    backgrounds: { default: 'light' },
  },
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Default: Story<HeaderProps> = Template.bind({});
Default.args = {
  children: (
    <Row xs={{ gutter: 2 }} lg={{ gutter: 4 }}>
      <Col width="auto" align="center">
        <Anchor href="#">Accessibility</Anchor>
      </Col>

      <Col width="auto">
        <Separator axis="vertical" />
      </Col>
      <Col width="auto">
        <p>Role:</p>
        <Anchor href="#">Kairi Sarapuu</Anchor>
      </Col>
      <Col width="auto">
        <Separator axis="vertical" />
      </Col>
      <Col>
        <p>Language:</p>
        <Dropdown
          button={{ children: 'EST', visualType: 'link', iconRight: 'expand_more' }}
          items={[
            { children: 'EST', href: '#' },
            { children: 'ENG', href: '#' },
            { children: 'RUS', href: '#' },
          ]}
        />
      </Col>
    </Row>
  ),
  onLogoutClick: () => console.log('Logging out'),
  skipLinks: {
    links: [{ children: 'Skip to main content', href: '#main-content' }],
  },
};

Default.parameters = {
  layout: 'fullscreen',
};
