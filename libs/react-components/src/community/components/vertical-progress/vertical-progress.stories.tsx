import { faker } from '@faker-js/faker';
import { Controls, Description, Primary, Stories, Title } from '@storybook/addon-docs';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import { VerticalSpacing } from '../../../tedi/components/vertical-spacing';
import Button from '../button/button';
import Heading from '../typography/heading/heading';
import Text from '../typography/text/text';
import { VerticalProgress, VerticalProgressItem, VerticalProgressItemProps, VerticalProgressProps } from '.';

const meta: Meta<typeof VerticalProgress> = {
  component: VerticalProgress,
  title: 'Community/VerticalProgress',
  subcomponents: { VerticalProgressItem } as never,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description />
          <Primary />
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
    },
  },
};

export default meta;

const items = (isToggableFirst?: boolean): VerticalProgressItemProps[] => [
  { title: 'Step one', isToggable: isToggableFirst, index: 0 },
  { title: 'Step two', isToggable: true, index: 1 },
  { title: 'Step three is longer heading', isToggable: true, index: 2 },
  { title: 'Step four', isToggable: true, index: 3 },
];

export interface VerticalProgressStory {
  VerticalProgressProps: VerticalProgressProps;
  items: VerticalProgressItemProps[];
  defaultActiveItem?: number;
}

type Story = StoryObj<VerticalProgressStory>;

const Template: StoryFn<VerticalProgressStory> = ({ items, defaultActiveItem, VerticalProgressProps }) => {
  const [activeItem, setActiveItem] = React.useState<number>(defaultActiveItem ?? 0);
  const [completedItems, setCompletedItems] = React.useState<number[]>(
    defaultActiveItem ? [defaultActiveItem - 1] : []
  );

  const getItemState = (index: number): VerticalProgressItemProps['state'] => {
    if (index === activeItem) {
      return 'active';
    }

    if (completedItems.includes(index)) {
      return 'completed';
    }

    if (activeItem < index && !completedItems.includes(index - 1)) {
      return 'disabled';
    }

    return undefined;
  };

  return (
    <VerticalProgress {...VerticalProgressProps} onItemOpen={(id) => setActiveItem(id)}>
      {items.map(({ title, isToggable }, index) => {
        const state = getItemState(index);
        const hasContent = state === 'active';
        return (
          <VerticalProgressItem
            key={index}
            isToggable={isToggable}
            index={index}
            title={<Heading element="h4">{title}</Heading>}
            state={state}
          >
            {hasContent && (
              <VerticalProgressContent
                onItemSubmit={() => {
                  setActiveItem(index + 1);
                  setCompletedItems((prev) => (prev.includes(index) ? prev : [...prev, index]));
                }}
                state={state}
              />
            )}
          </VerticalProgressItem>
        );
      })}
    </VerticalProgress>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    items: items(),
  },
};

export const FirstCompletedNotToggleable: Story = {
  render: Template,
  args: {
    items: items(false),
    defaultActiveItem: 1,
  },
};

interface VerticalProgressContentProps {
  onItemSubmit: () => void;
  state: VerticalProgressItemProps['state'];
}

const VerticalProgressContent = (props: VerticalProgressContentProps) => {
  const { onItemSubmit } = props;

  return (
    <VerticalSpacing>
      <Text>{faker.lorem.paragraphs(4)}</Text>
      <Button onClick={() => onItemSubmit()}>Save</Button>
    </VerticalSpacing>
  );
};
