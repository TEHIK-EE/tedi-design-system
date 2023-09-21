import { faker } from '@faker-js/faker';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import Button from '../button/button';
import Heading from '../typography/heading/heading';
import Text from '../typography/text/text';
import { VerticalSpacing } from '../vertical-spacing';
import { VerticalProgress, VerticalProgressItem, VerticalProgressItemProps } from '.';

const meta: Meta<typeof VerticalProgress> = {
  component: VerticalProgress,
  subcomponents: { VerticalProgressItem: VerticalProgressItem as any },
};

export default meta;
type Story = StoryObj<typeof VerticalProgress>;

const step = ['Step one', 'Step two', 'Step three is longer heading', 'Step four'];

const Template: StoryFn<typeof VerticalProgress> = (args) => {
  const [activeItem, setActiveItem] = React.useState<number>(0);
  const [completedItems, setCompletedItems] = React.useState<number[]>([]);

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
    <VerticalProgress {...args} onItemOpen={(id) => setActiveItem(id)}>
      {step.map((title, index) => {
        const state = getItemState(index);
        const hasContent = state === 'active';
        return (
          <VerticalProgressItem key={index} index={index} title={<Heading element="h4">{title}</Heading>} state={state}>
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
  args: {},
};

interface VerticalProgressContentProps {
  onItemSubmit: () => void;
  state: VerticalProgressItemProps['state'];
}

const VerticalProgressContent = (props: VerticalProgressContentProps) => {
  const { state, onItemSubmit } = props;

  return (
    <VerticalSpacing>
      <Text>{faker.lorem.paragraphs(4)}</Text>
      <Button onClick={() => onItemSubmit()}>Save</Button>
    </VerticalSpacing>
  );
};
