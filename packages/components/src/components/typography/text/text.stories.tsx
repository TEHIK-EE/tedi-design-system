import { Meta, Story } from '@storybook/react';
import React from 'react';

import { VerticalSpacing } from '../../vertical-spacing';
import Text, { TextProps } from './text';

export default {
  title: 'components/Typography/Text',
  component: Text,
  parameters: {
    docs: {
      description: {
        component: `<p>
          Text is helper component to use different color and modifiers on text. <br/>
          Modifiers prop accepts array of modifiers or single modifier. It helps you to combine modifiers if needed. <br/>
          Every modifier and color of text has it's own global css class also, but using Text component is highly recommended.</p>`,
      },
    },
  },
} as Meta;

const Template: Story<TextProps> = (args) => <Text {...args} />;

const ColorsTemplate: Story<{ examples: Array<{ color: TextProps['color']; text: string }> }> = ({ examples }) => {
  return (
    <VerticalSpacing>
      {examples.map(({ color, text }, key) => (
        <div key={key} style={color === 'inverted' ? { background: 'var(--color-bg-inverted)' } : undefined}>
          <Text color={color}>{text}</Text>
        </div>
      ))}
    </VerticalSpacing>
  );
};

const ModifiersTemplate: Story<{ examples: Array<{ modifier: TextProps['modifiers']; text: string }> }> = (args) => {
  return (
    <VerticalSpacing>
      {args.examples.map(({ modifier, text }, key) => (
        <Text key={key} {...args} modifiers={modifier}>
          {text}
        </Text>
      ))}
    </VerticalSpacing>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: 'Default text',
};

export const Colors = ColorsTemplate.bind({});
Colors.args = {
  examples: [
    { color: 'default', text: 'Default color text' },
    { color: 'muted', text: 'Muted color text' },
    { color: 'subtle', text: 'Subtle color text' },
    { color: 'disabled', text: 'Disabled color text' },
    { color: 'inverted', text: 'Inverted color text' },
    { color: 'primary', text: 'Primary color text' },
    { color: 'positive', text: 'Positive color text' },
    { color: 'important', text: 'Important color text' },
    { color: 'warning', text: 'Warning color text' },
  ],
};

export const Modifiers = ModifiersTemplate.bind({});
Modifiers.args = {
  examples: [
    { modifier: 'normal', text: 'Normal text' },
    { modifier: 'small', text: 'Small text' },
    { modifier: 'bold', text: 'Bold text' },
    { modifier: 'italic', text: 'Italic text' },
  ],
};

export const Alignment = ModifiersTemplate.bind({});
Alignment.args = {
  examples: [
    { modifier: 'left', text: 'This text is left' },
    { modifier: 'center', text: 'This text is center' },
    { modifier: 'right', text: 'This text is right' },
  ],
};

export const Capitalize = ModifiersTemplate.bind({});
Capitalize.args = {
  examples: [
    { modifier: 'capitalize', text: 'this text is Capitalized' },
    { modifier: 'capitalize-first', text: 'this text is Capitalize-first' },
    { modifier: 'lowercase', text: 'THIS text is Lowercase' },
    { modifier: 'uppercase', text: 'this text is Uppercase' },
  ],
};

export const Breaking = ModifiersTemplate.bind({});
const breakingLongText =
  ' Honorificabilitudinitatibus califragilisticexpialidocious Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu 次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉;';
Breaking.args = {
  examples: [
    {
      modifier: 'break-all',
      text: 'Break-all' + breakingLongText,
    },
    {
      modifier: 'break-word',
      text: 'break-word' + breakingLongText,
    },
    {
      modifier: 'nowrap',
      text: 'no-wrap' + breakingLongText,
    },
  ],
};
