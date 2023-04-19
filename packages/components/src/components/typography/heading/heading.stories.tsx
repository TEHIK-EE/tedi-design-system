import { Meta, Story } from '@storybook/react';

import Heading, { HeadingProps } from './heading';

export default {
  component: Heading,
  title: 'components/Typography/Heading',
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
} as Meta;

const Template: Story<HeadingProps> = (args) => <Heading {...args} />;

const LevelTemplate: Story<{ examples: HeadingProps[] }> = ({ examples }) => {
  return (
    <div>
      {examples.map((args, key) => (
        <Heading key={key} {...args} />
      ))}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: 'This is heading',
};

export const Element = LevelTemplate.bind({});
Element.args = {
  examples: [
    { children: 'This is heading level 1', element: 'h1' },
    { children: 'This is heading level 2', element: 'h2' },
    { children: 'This is heading level 3', element: 'h3' },
    { children: 'This is heading level 4', element: 'h4' },
    { children: 'This is heading level 5', element: 'h5' },
    { children: 'This is heading level 6', element: 'h6' },
  ],
};

export const Custom = Template.bind({});
Custom.args = {
  children: 'This is heading Level 1, with looks of h4',
  modifiers: 'h4',
};
