import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { VerticalSpacing } from '../../../tedi/components/vertical-spacing';
import Button from '../button/button';
import { Heading } from '../typography/heading/heading';
import { Text } from '../typography/text/text';
import { VerticalProgress, VerticalProgressItem } from '.';

const meta: Meta<typeof VerticalProgressItem> = {
  component: VerticalProgressItem,
  title: 'Community/VerticalProgress/VerticalProgressItem',
};

export default meta;
type Story = StoryObj<typeof VerticalProgressItem>;

const Template: StoryFn<typeof VerticalProgressItem> = (args) => {
  return (
    <VerticalProgress onItemOpen={(id) => console.log('opened')}>
      <VerticalProgressItem {...args} />
    </VerticalProgress>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    index: 0,
    title: <Heading element="h4">Step title</Heading>,
  },
};

export const Active: Story = {
  render: Template,
  args: {
    ...Default.args,
    state: 'active',
    children: (
      <VerticalSpacing>
        <Text modifiers="bold">Custom active content</Text>
        <Text>
          Content can be visible in every states, application should decide which content to render and if to render.
          <br />
          In active state there also should be always a next button.
        </Text>
        <Button>Next</Button>
      </VerticalSpacing>
    ),
  },
};

export const Completed: Story = {
  render: Template,
  args: {
    ...Default.args,
    state: 'completed',
    children: (
      <VerticalSpacing>
        <Text modifiers="bold">Completed content</Text>
        <Text>
          Content can be visible in every states, application should decide which content to render and if to render.
          <br />
          In completed state there can be brief summary of step. Also There should not be any buttons or actions
          usually.
        </Text>
      </VerticalSpacing>
    ),
  },
};

export const Error: Story = {
  render: Template,
  args: {
    ...Default.args,
    state: 'error',
    children: (
      <VerticalSpacing>
        <Text modifiers="bold">Error content</Text>
        <Text>
          Content can be visible in every states, application should decide which content to render and if to render.
          <br />
          In Error state there can be brief summary of the error. Also There should not be any buttons or actions
          usually. User can move back to step by Edit button next to title.
        </Text>
      </VerticalSpacing>
    ),
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    ...Default.args,
    state: 'disabled',
    children: (
      <VerticalSpacing>
        <Text modifiers="bold">Disabled content</Text>
        <Text>
          Content can be visible in every states, application should decide which content to render and if to render.
          <br />
          In Disabled state there can be brief summary why this step is disabled.
          <b>Usually there is no content in disabled states. </b>
          <br /> <br />
          Disabled steps do not show edit button, because user should not be able to open disabled items.
        </Text>
      </VerticalSpacing>
    ),
  },
};

export const DisabledWithoutContent: Story = {
  render: Template,
  args: {
    ...Disabled.args,
    state: 'disabled',
    children: undefined,
  },
};
