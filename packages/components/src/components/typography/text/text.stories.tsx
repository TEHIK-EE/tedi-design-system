import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { VerticalSpacing } from '../../vertical-spacing';
import Text, { TextProps } from './text';

const meta: Meta<typeof Text> = {
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
};

export default meta;
type Story = StoryObj<typeof Text>;

interface ColorsTemplateProps {
  examples: Array<{ color: TextProps['color']; text: string }>;
}
const ColorsTemplate: StoryFn<ColorsTemplateProps> = ({ examples }) => {
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

interface ModifiersTemplateProps {
  examples: Array<{ modifier: TextProps['modifiers']; text: string }>;
}
const ModifiersTemplate: StoryFn<ModifiersTemplateProps> = (args) => {
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

export const Default: Story = {
  args: {
    children: 'Default text',
  },
};

export const Colors: StoryObj<ColorsTemplateProps> = {
  render: ColorsTemplate,

  args: {
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
  },
};

export const Modifiers: StoryObj<ModifiersTemplateProps> = {
  render: ModifiersTemplate,

  args: {
    examples: [
      { modifier: 'normal', text: 'Normal text' },
      { modifier: 'small', text: 'Small text' },
      { modifier: 'bold', text: 'Bold text' },
      { modifier: 'italic', text: 'Italic text' },
    ],
  },
};

export const Alignment: StoryObj<ModifiersTemplateProps> = {
  render: ModifiersTemplate,

  args: {
    examples: [
      { modifier: 'left', text: 'This text is left' },
      { modifier: 'center', text: 'This text is center' },
      { modifier: 'right', text: 'This text is right' },
    ],
  },
};

export const Capitalize: StoryObj<ModifiersTemplateProps> = {
  render: ModifiersTemplate,

  args: {
    examples: [
      { modifier: 'capitalize', text: 'this text is Capitalized' },
      { modifier: 'capitalize-first', text: 'this text is Capitalize-first' },
      { modifier: 'lowercase', text: 'THIS text is Lowercase' },
      { modifier: 'uppercase', text: 'this text is Uppercase' },
    ],
  },
};

const breakingLongText =
  ' Honorificabilitudinitatibus califragilisticexpialidocious Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu 次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉;';

export const Breaking: StoryObj<ModifiersTemplateProps> = {
  render: ModifiersTemplate,

  args: {
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
  },
};
