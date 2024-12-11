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

const DivTemplate: StoryFn<typeof HideOnScroll> = (args) => {
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | undefined>(undefined);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setScrollContainer(node);
    }
  }, []);

  return (
    <div ref={containerRef} style={{ height: CONTAINER_HEIGHT, overflow: 'auto' }}>
      <Text>{lorem.map((text) => text)}</Text>
      <HideOnScroll {...args} scrollContainer={scrollContainer} />
    </div>
  );
};

const DocumentTemplate: StoryFn<typeof HideOnScroll> = (args) => {
  return (
    <>
      <Text>{lorem.map((text) => text)}</Text>
      <HideOnScroll {...args} />
    </>
  );
};

const NavigationTemplate: StoryFn<typeof HideOnScroll> = (args) => {
  return (
    <>
      <HideOnScroll {...args}>
        <div
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
        </div>
      </HideOnScroll>
      <Text>{lorem.map((text) => text)}</Text>
    </>
  );
};

export const Default: Story = {
  render: DivTemplate,
  args: {
    children: (
      <FloatingButton position="fixed" placement={{ vertical: 'bottom', horizontal: 'center' }}>
        Scroll Up
      </FloatingButton>
    ),
    animationDirection: 'center',
    visibility: 'show',
  },
};

export const DivContainer: Story = {
  render: DivTemplate,
  args: {
    children: (
      <FloatingButton position="fixed" placement={{ vertical: 'bottom', horizontal: 'center' }}>
        Scroll Up
      </FloatingButton>
    ),
    animationDirection: 'center',
    visibility: 'show',
  },
};

export const DocumentContainer: Story = {
  render: DocumentTemplate,
  args: {
    children: (
      <FloatingButton position="fixed" placement={{ vertical: 'bottom', horizontal: 'center' }}>
        Scroll Up
      </FloatingButton>
    ),
    animationDirection: 'center',
    visibility: 'show',
  },
  parameters: {
    docs: { story: { inline: false, iframeHeight: CONTAINER_HEIGHT } },
    layout: 'fullscreen',
  },
};

export const Hide: Story = {
  render: NavigationTemplate,
  args: {
    animationDirection: 'up',
    visibility: 'hide',
    scrollDistance: NAVIGATION_HEIGHT,
  },
  parameters: {
    docs: { story: { inline: false, iframeHeight: CONTAINER_HEIGHT } },
    layout: 'fullscreen',
  },
};
