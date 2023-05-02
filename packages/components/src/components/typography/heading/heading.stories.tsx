import { Meta, StoryFn, StoryObj } from '@storybook/react';

import Heading, { HeadingProps } from './heading';

const meta: Meta<typeof Heading> = {
  component: Heading,
  parameters: {
    docs: {
      description: {
        component: `<p>
            This component is a wrapper for the \`<Text>\` component. It should only be used when we want to semantically render h1-h6 tags.<br />
            The same result can be achieved by using the \`<Text element="h1">\`, but using this component gives a better indicator in code that we are using semantic headings.
        </p>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

const LevelTemplate: StoryFn<typeof Heading> = () => {
  const items: HeadingProps[] = [
    { children: 'This is heading level 1', element: 'h1' },
    { children: 'This is heading level 2', element: 'h2' },
    { children: 'This is heading level 3', element: 'h3' },
    { children: 'This is heading level 4', element: 'h4' },
    { children: 'This is heading level 5', element: 'h5' },
    { children: 'This is heading level 6', element: 'h6' },
  ];

  return (
    <div>
      {items.map((args, key) => (
        <Heading key={key} {...args} />
      ))}
    </div>
  );
};

export const Default: Story = {
  args: {
    children: 'This is heading',
  },
};

export const Element: Story = {
  render: LevelTemplate,
};

export const Custom: Story = {
  args: {
    children: 'This is heading Level 1, with looks of h4',
    modifiers: 'h4',
  },
};
