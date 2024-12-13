import { faker } from '@faker-js/faker';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

import FloatingButton from '../buttons/floating-button/floating-button';
import { Text } from '../typography/text/text';
import HideOnScroll from './hide-on-scroll';

const CONTAINER_HEIGHT = 300;

const meta: Meta<typeof HideOnScroll> = {
  component: HideOnScroll,
  title: 'Tedi-ready/Components/HideOnScroll/HideOnScroll',
};

export default meta;

const lorem = [...Array(5).keys()].map(() => faker.lorem.paragraphs(4));
const NAVIGATION_HEIGHT = 48;
type Story = StoryObj<typeof HideOnScroll>;

const NavigationTemplate: StoryFn<typeof HideOnScroll> = (args) => {
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | undefined>(undefined);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setScrollContainer(node);
    }
  }, []);

  return (
    <div ref={containerRef} style={{ height: CONTAINER_HEIGHT, overflowY: 'auto' }}>
      <HideOnScroll {...args} scrollContainer={scrollContainer} />
      <Text>{lorem.map((text) => text)}</Text>
    </div>
  );
};

const AnimationDirectionTemplate: StoryFn<typeof HideOnScroll> = (args) => {
  return (
    <>
      <HideOnScroll {...args} animationDirection="up">
        <nav
          style={{
            width: '100%',
            position: 'fixed',
            top: 0,
            background: 'rgb(0, 72, 130)',
            color: 'white',
            borderBottom: '1px solid black',
            height: NAVIGATION_HEIGHT,
            alignContent: 'center',
            textAlign: 'center',
          }}
        >
          Up
        </nav>
      </HideOnScroll>
      <HideOnScroll {...args} animationDirection="left">
        <nav
          style={{
            width: NAVIGATION_HEIGHT,
            position: 'fixed',
            top: 0,
            left: 0,
            background: 'rgb(0, 72, 130)',
            color: 'white',
            borderBottom: '1px solid black',
            height: CONTAINER_HEIGHT,
            alignContent: 'center',
            textAlign: 'center',
          }}
        >
          Left
        </nav>
      </HideOnScroll>
      <HideOnScroll {...args} animationDirection="right">
        <nav
          style={{
            width: NAVIGATION_HEIGHT,
            position: 'fixed',
            top: 0,
            right: 0,
            background: 'rgb(0, 72, 130)',
            color: 'white',
            borderBottom: '1px solid black',
            height: CONTAINER_HEIGHT,
            alignContent: 'center',
            textAlign: 'center',
          }}
        >
          Right
        </nav>
      </HideOnScroll>
      <HideOnScroll {...args} animationDirection="down">
        <nav
          style={{
            width: '100%',
            position: 'fixed',
            bottom: 0,
            background: 'rgb(0, 72, 130)',
            color: 'white',
            borderBottom: '1px solid black',
            height: NAVIGATION_HEIGHT,
            alignContent: 'center',
            textAlign: 'center',
          }}
        >
          Down
        </nav>
      </HideOnScroll>
      <Text>{lorem.map((text) => text)}</Text>
    </>
  );
};

const FloatingButtonTemplate: StoryFn<typeof HideOnScroll> = (args) => {
  return (
    <>
      <HideOnScroll {...args} />
      <Text element="h3" modifiers="center">
        Scroll down to see Floating Button
      </Text>
      <Text>{lorem.map((text) => text)}</Text>
    </>
  );
};

export const Default: Story = {
  render: FloatingButtonTemplate,
  args: {
    children: (
      <FloatingButton
        position="fixed"
        placement={{ vertical: 'bottom', horizontal: 'right' }}
        offset={{ right: 32, bottom: 32 }}
        onClick={() => scrollTo({ top: 0 })}
        icon="arrow_upward"
      >
        Scroll Up
      </FloatingButton>
    ),
    enabled: true,
    visibility: 'show',
    toggleVisibility: false,
    scrollDirection: 'down',
    scrollDistance: 30,
    animationDirection: 'down',
  },
  parameters: {
    docs: { story: { inline: false, iframeHeight: CONTAINER_HEIGHT } },
    layout: 'fullscreen',
  },
};

export const ToggleVisibility: Story = {
  render: NavigationTemplate,
  args: {
    children: (
      <nav
        style={{
          position: 'sticky',
          top: 0,
          background: 'rgb(0, 72, 130)',
          color: 'white',
          borderBottom: '1px solid black',
          height: NAVIGATION_HEIGHT,
          alignContent: 'center',
          padding: '0 16px',
        }}
      >
        Navigation
      </nav>
    ),
    enabled: true,
    visibility: 'hide',
    toggleVisibility: true,
    scrollDirection: 'down',
    scrollDistance: NAVIGATION_HEIGHT,
    animationDirection: 'up',
  },
};

export const AnimationDirection: Story = {
  render: AnimationDirectionTemplate,
  args: {
    visibility: 'hide',
    scrollDistance: NAVIGATION_HEIGHT,
  },
  parameters: {
    docs: { story: { inline: false, iframeHeight: CONTAINER_HEIGHT } },
    layout: 'fullscreen',
  },
};
