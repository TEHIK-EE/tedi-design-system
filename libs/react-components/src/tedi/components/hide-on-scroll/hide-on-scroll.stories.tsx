import { faker } from '@faker-js/faker';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

import FloatingButton from '../buttons/floating-button/floating-button';
import { Text } from '../typography/text/text';
import HideOnScroll from './hide-on-scroll';

const CONTAINER_HEIGHT = 200;

const meta: Meta<typeof HideOnScroll> = {
  component: HideOnScroll,
  title: 'Tedi-ready/Components/HideOnScroll/HideOnScroll',
  args: {
    children: (
      <FloatingButton position="fixed" placement={{ vertical: 'bottom', horizontal: 'center' }}>
        Scroll Up
      </FloatingButton>
    ),
    scrollDirection: 'down',
    animationDirection: 'center',
  },
};

export default meta;

const lorem = [...Array(5).keys()].map(() => faker.lorem.paragraphs(4));
type Story = StoryObj<typeof HideOnScroll>;

const DocumentTemplate: StoryFn<typeof HideOnScroll> = (args) => {
  return (
    <>
      <Text>{lorem.map((text) => text)}</Text>
      <HideOnScroll {...args} />
    </>
  );
};

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

export const Default: Story = {
  render: DivTemplate,
};

export const DocumentContainer: Story = {
  render: DocumentTemplate,
  parameters: {
    docs: { story: { inline: false, iframeHeight: CONTAINER_HEIGHT } },
    layout: 'fullscreen',
  },
};

export const DivContainer: Story = {
  render: DivTemplate,
};
