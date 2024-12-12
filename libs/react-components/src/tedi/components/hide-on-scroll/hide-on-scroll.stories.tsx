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

const DocumentTemplate: StoryFn<typeof HideOnScroll> = (args) => {
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
  render: NavigationTemplate,
  args: {
    children: (
      <nav
        style={{
          position: 'sticky',
          top: 0,
          background: 'white',
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

export const DocumentContainer: Story = {
  render: DocumentTemplate,
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
    animationDirection: 'down',
    visibility: 'show',
  },
  parameters: {
    docs: { story: { inline: false, iframeHeight: CONTAINER_HEIGHT } },
    layout: 'fullscreen',
  },
};
