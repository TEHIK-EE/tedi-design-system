import { Meta, Story } from '@storybook/react';

import { Heading, HeadingProps } from './heading';

export default {
  component: Heading,
  title: 'components/Typography/Heading',
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

export const Level = LevelTemplate.bind({});
Level.args = {
  examples: [
    { children: 'This is heading level 1', level: 1 },
    { children: 'This is heading level 2', level: 2 },
    { children: 'This is heading level 3', level: 3 },
    { children: 'This is heading level 4', level: 4 },
    { children: 'This is heading level 5', level: 5 },
    { children: 'This is heading level 6', level: 6 },
  ],
};

export const Custom = Template.bind({});
Custom.args = {
  children: 'This is heading Level 1, with looks of h4',
  className: 'h4',
};
