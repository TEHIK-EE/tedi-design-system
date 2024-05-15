import { Meta, StoryFn, StoryObj } from '@storybook/react';

import Heading, { HeadingProps } from './heading';

/**
 * This component is a wrapper for the `<Text>` component. It should only be used when we want to semantically render h1-h6 tags.<br />
 * The same result can be achieved by using the `<Text element="h1">`, but using this component gives a better indicator in code that we are using semantic headings.<br/>
 * **NB!** Headings have dynamic font styles, which means that they have different font-size/font-weight/line-height values for desktop/mobile.
 */
const meta: Meta<typeof Heading> = {
  component: Heading,
};

export default meta;
type Story = StoryObj<typeof Heading>;

const LevelTemplate: StoryFn<typeof Heading> = () => {
  const items: HeadingProps[] = [
    { children: 'This is heading element h1', element: 'h1' },
    { children: 'This is heading element h2', element: 'h2' },
    { children: 'This is heading element h3', element: 'h3' },
    { children: 'This is heading element h4', element: 'h4' },
    { children: 'This is heading element h5', element: 'h5' },
    { children: 'This is heading element h6', element: 'h6' },
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

export const DifferentElements: Story = {
  render: LevelTemplate,
};

export const CustomModifier: Story = {
  args: {
    children: 'This is heading element h1, with looks of h4',
    modifiers: 'h4',
  },
};
