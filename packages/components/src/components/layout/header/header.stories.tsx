import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import Anchor from '../../anchor/anchor';
import { Col, Row } from '../../grid';
import StretchContent from '../../stretch-content/stretch-content';
import { Notice as BottomContentNotice } from './components/header-bottom-content/header-bottom-content.stories';
import HeaderContent from './components/header-content/header-content';
import HeaderLanguage, { HeaderLanguageProps } from './components/header-language/header-language';
import { Default as HeaderLanguageDefault } from './components/header-language/header-language.stories';
import HeaderRole, { HeaderRoleProps } from './components/header-role/header-role';
import { Default as HeaderRoleDefault, WithLongContent } from './components/header-role/header-role.stories';
import HeaderSettings, { HeaderSettingsProps } from './components/header-settings/header-settings';
import { Default as HeaderSettingsDefault } from './components/header-settings/header-settings.stories';
import Header, { HeaderProps } from './header/header';

export default {
  component: Header,
} as Meta;
type Story = StoryObj<typeof Header>;

const Template: StoryFn<HeaderProps<'a'>> = (args) => <Header {...args} />;

export const Default: Story = {
  render: Template,
  args: {
    logo: {
      imageUrl: '/logo.svg',
      anchorProps: {
        href: '#',
      },
    },
    skipLinks: {
      links: [{ children: 'Skip to main content', href: '#main-content' }],
    },
    children: (
      <>
        <HeaderSettings {...(HeaderSettingsDefault.args as HeaderSettingsProps)} />
        <HeaderLanguage {...(HeaderLanguageDefault.args as HeaderLanguageProps)} />
        <HeaderRole {...(HeaderRoleDefault.args as HeaderRoleProps)} />
        <HeaderContent>
          <StretchContent>
            <Row justifyContent="center" alignItems="center">
              <Col width="auto">Custom content</Col>
            </Row>
          </StretchContent>
        </HeaderContent>
        <Anchor href="#">Accessibilty</Anchor>
      </>
    ),
    minimalSettingsArea: ['mobile', 'tablet'],
  },

  parameters: {
    layout: 'fullscreen',
  },
};

export const Public: Story = {
  render: Template,
  args: {
    ...Default.args,
    children: (
      <>
        <HeaderSettings {...(HeaderSettingsDefault.args as HeaderSettingsProps)} />
        <HeaderLanguage {...(HeaderLanguageDefault.args as HeaderLanguageProps)} />
      </>
    ),
  },

  parameters: {
    docs: {
      description: {
        story:
          'Public header depends on LayoutContext to determine if the header is `public`. To see how public header works, please check the `Layout` component examples.',
      },
    },

    layout: 'fullscreen',
  },
};

export const BottomContent: Story = {
  render: Template,
  args: {
    ...Default.args,
    bottomContent: BottomContentNotice.args,
  },

  parameters: {
    layout: 'fullscreen',
  },
};

export const HeaderWithLongRoleList: Story = {
  render: Template,
  args: {
    ...Default.args,
    children: (
      <>
        <HeaderSettings {...(HeaderSettingsDefault.args as HeaderSettingsProps)} />
        <HeaderLanguage {...(HeaderLanguageDefault.args as HeaderLanguageProps)} />
        <HeaderRole {...(WithLongContent.args as HeaderRoleProps)} />
        <HeaderContent>
          <StretchContent>
            <Row justifyContent="center" alignItems="center">
              <Col width="auto">Custom content</Col>
            </Row>
          </StretchContent>
        </HeaderContent>
        <Anchor href="#">Accessibilty</Anchor>
      </>
    ),
  },
  parameters: {
    layout: 'fullscreen',
  },
};
