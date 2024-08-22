import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import React from 'react';

import Col from '../../grid/col';
import Row from '../../grid/row';
import { Table } from '../../table';
import { VerticalSpacing } from '../../vertical-spacing';
import Text, { TextProps } from './text';

/**
 * Text is helper component to use different color and modifiers on text.<br/>
 * Modifiers prop accepts array of modifiers or single modifier. It helps you to combine modifiers if needed.<br/>
 * Every modifier and color of text has its own global css class also, but using Text component is highly recommended.<br/>
 * **NB!** Headings have dynamic font styles, which means that they have different font-size/font-weight/line-height values for desktop/mobile.
 */
const meta: Meta<typeof Text> = {
  component: Text,
  title: 'Community/Typography/Text',
};

export default meta;
type Story = StoryObj<typeof Text>;

interface TextTableRow {
  name: string;
  desktop: {
    fontSize: number;
    lineHeight: number;
  };
  mobile: {
    fontSize: number;
    lineHeight: number;
  };
  props: Partial<TextProps>;
}

const DefaultRows: TextTableRow[] = [
  {
    name: 'Heading 1',
    desktop: {
      fontSize: 2,
      lineHeight: 2.875,
    },
    mobile: {
      fontSize: 1.5,
      lineHeight: 2,
    },
    props: { element: 'h1' },
  },
  {
    name: 'Heading 2',
    desktop: {
      fontSize: 1.75,
      lineHeight: 2.25,
    },
    mobile: {
      fontSize: 1.375,
      lineHeight: 1.75,
    },
    props: { element: 'h2' },
  },
  {
    name: 'Heading 3',
    desktop: {
      fontSize: 1.5,
      lineHeight: 2,
    },
    mobile: {
      fontSize: 1.25,
      lineHeight: 1.625,
    },
    props: { element: 'h3' },
  },
  {
    name: 'Heading 4',
    desktop: {
      fontSize: 1.25,
      lineHeight: 1.625,
    },
    mobile: {
      fontSize: 1.125,
      lineHeight: 1.5,
    },
    props: { element: 'h4' },
  },
  {
    name: 'Heading 5',
    desktop: {
      fontSize: 1.125,
      lineHeight: 1.5,
    },
    mobile: {
      fontSize: 1,
      lineHeight: 1.5,
    },
    props: { element: 'h5' },
  },
  {
    name: 'Heading 6',
    desktop: {
      fontSize: 1,
      lineHeight: 1.5,
    },
    mobile: {
      fontSize: 1,
      lineHeight: 1.5,
    },
    props: { element: 'h6' },
  },
  {
    name: 'Body Regular',
    desktop: {
      fontSize: 1,
      lineHeight: 1.5,
    },
    mobile: {
      fontSize: 1,
      lineHeight: 1.5,
    },
    props: { element: 'p' },
  },
  {
    name: 'Body Regular Italic',
    desktop: {
      fontSize: 1,
      lineHeight: 1.5,
    },
    mobile: {
      fontSize: 1,
      lineHeight: 1.5,
    },
    props: { modifiers: ['italic'] },
  },
  {
    name: 'Body Regular Bold',
    desktop: {
      fontSize: 1,
      lineHeight: 1.5,
    },
    mobile: {
      fontSize: 1,
      lineHeight: 1.5,
    },
    props: { modifiers: ['bold'] },
  },
  {
    name: 'Body Small',
    desktop: {
      fontSize: 0.875,
      lineHeight: 1.25,
    },
    mobile: {
      fontSize: 0.875,
      lineHeight: 1.25,
    },
    props: { modifiers: ['small'] },
  },
  {
    name: 'Body Small Italic',
    desktop: {
      fontSize: 0.875,
      lineHeight: 1.25,
    },
    mobile: {
      fontSize: 0.875,
      lineHeight: 1.25,
    },
    props: { modifiers: ['small', 'italic'] },
  },
  {
    name: 'Body Small Bold',
    desktop: {
      fontSize: 0.875,
      lineHeight: 1.25,
    },
    mobile: {
      fontSize: 0.875,
      lineHeight: 1.25,
    },
    props: { modifiers: ['small', 'bold'] },
  },
  {
    name: 'Subtitles regular',
    desktop: {
      fontSize: 1,
      lineHeight: 1.5,
    },
    mobile: {
      fontSize: 1,
      lineHeight: 1.5,
    },
    props: { modifiers: ['uppercase', 'bold'] },
  },
  {
    name: 'Subtitles small',
    desktop: {
      fontSize: 0.875,
      lineHeight: 1.25,
    },
    mobile: {
      fontSize: 0.875,
      lineHeight: 1.25,
    },
    props: { modifiers: ['uppercase', 'small'] },
  },
];

const FontVariantRows: TextProps[] = [
  { children: 'roboto-300', modifiers: ['thin'] },
  { children: 'roboto-300-italic', modifiers: ['thin', 'italic'] },
  { children: 'roboto-400', modifiers: [] },
  { children: 'roboto-400-italic', modifiers: ['italic'] },
  { children: 'roboto-700', modifiers: ['bold'] },
  { children: 'roboto-700-italic', modifiers: ['bold', 'italic'] },
];

const columnHelper = createColumnHelper<TextTableRow>();

// eslint-disable-next-line
const columns: ColumnDef<TextTableRow, any>[] = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => <Text {...info.row.original.props}>{info.renderValue()}</Text>,
  }),
  columnHelper.accessor('desktop', {
    header: 'desktop',
    cell: (info) => {
      const { fontSize, lineHeight } = info.row.original.desktop ?? {};
      return (
        <VerticalSpacing size={0}>
          <Text>
            font-size: <Text element="span" modifiers="bold">{`${fontSize * 16}px/${fontSize}rem`}</Text>
          </Text>
          <Text>
            line-height: <Text element="span" modifiers="bold">{`${lineHeight * 16}px/${lineHeight}rem`}</Text>
          </Text>
        </VerticalSpacing>
      );
    },
  }),
  columnHelper.accessor('mobile', {
    header: 'mobile',
    cell: (info) => {
      const { fontSize, lineHeight } = info.row.original.mobile ?? {};
      return (
        <VerticalSpacing size={0}>
          <Text>
            font-size: <Text element="span" modifiers="bold">{`${fontSize * 16}px/${fontSize}rem`}</Text>
          </Text>
          <Text>
            line-height: <Text element="span" modifiers="bold">{`${lineHeight * 16}px/${lineHeight}rem`}</Text>
          </Text>
        </VerticalSpacing>
      );
    },
  }),
];

const DefaultTemplate: StoryFn = () => {
  return (
    <Table<TextTableRow>
      id="default-text-table"
      data={DefaultRows}
      columns={columns}
      hideCardBorder
      hidePagination
      enableSorting={false}
    />
  );
};

const AlphabetTemplate: StoryFn = () => {
  const etAlphabet = 'ABCDEFGHIJKLMNOPQRSŠZŽTUVWÕÄÖÜXYabcdefghijklmnopqrsšzžtuvwõäöüxy';
  const ruAlphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя';

  return (
    <VerticalSpacing>
      {FontVariantRows.map(({ children, ...variant }, index) => (
        <Row key={index} alignItems="center">
          <Col width={2}>{children}</Col>
          <Col>
            <VerticalSpacing size={0}>
              <Text {...variant}>
                <Text element="span" modifiers="break-word">
                  {etAlphabet}
                </Text>
              </Text>
              <Text {...variant}>
                <Text element="span" modifiers="break-word">
                  {ruAlphabet}
                </Text>
              </Text>
            </VerticalSpacing>
          </Col>
        </Row>
      ))}
    </VerticalSpacing>
  );
};

interface ModifiersTemplateProps {
  examples: TextProps[];
}
const ModifiersTemplate: StoryFn<ModifiersTemplateProps> = (args) => {
  return (
    <VerticalSpacing>
      {args.examples.map(({ children, ...rest }, key) => (
        <div key={key} style={rest.color === 'inverted' ? { background: 'var(--color-bg-inverted)' } : undefined}>
          <Text {...rest}>{children}</Text>
        </div>
      ))}
    </VerticalSpacing>
  );
};

export const Default: Story = {
  render: DefaultTemplate,
};

export const Colors: StoryObj<ModifiersTemplateProps> = {
  render: ModifiersTemplate,

  args: {
    examples: [
      { color: 'default', children: 'Default color text' },
      { color: 'muted', children: 'Muted color text' },
      { color: 'subtle', children: 'Subtle color text' },
      { color: 'disabled', children: 'Disabled color text' },
      { color: 'inverted', children: 'Inverted color text' },
      { color: 'primary', children: 'Primary color text' },
      { color: 'positive', children: 'Positive color text' },
      { color: 'important', children: 'Important color text' },
      { color: 'warning', children: 'Warning color text' },
    ],
  },
};

export const Modifiers: StoryObj<ModifiersTemplateProps> = {
  render: ModifiersTemplate,

  args: {
    examples: [
      { modifiers: 'normal', children: 'Normal text' },
      { modifiers: 'small', children: 'Small text' },
      { modifiers: 'bold', children: 'Bold text' },
      { modifiers: 'italic', children: 'Italic text' },
    ],
  },
};

export const Alignment: StoryObj<ModifiersTemplateProps> = {
  render: ModifiersTemplate,

  args: {
    examples: [
      { modifiers: 'left', children: 'This text is left' },
      { modifiers: 'center', children: 'This text is center' },
      { modifiers: 'right', children: 'This text is right' },
    ],
  },
};

export const Capitalize: StoryObj<ModifiersTemplateProps> = {
  render: ModifiersTemplate,

  args: {
    examples: [
      { modifiers: 'capitalize', children: 'this text is Capitalized' },
      { modifiers: 'capitalize-first', children: 'this text is Capitalize-first' },
      { modifiers: 'lowercase', children: 'THIS text is Lowercase' },
      { modifiers: 'uppercase', children: 'this text is Uppercase' },
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
        modifiers: 'break-all',
        children: 'Break-all' + breakingLongText,
      },
      {
        modifiers: 'break-word',
        children: 'break-word' + breakingLongText,
      },
      {
        modifiers: 'nowrap',
        children: 'no-wrap' + breakingLongText,
      },
    ],
  },
};

export const WithBreakpointProps: StoryObj<ModifiersTemplateProps> = {
  render: ModifiersTemplate,

  args: {
    examples: [
      {
        element: 'h1',
        modifiers: 'small',
        sm: { modifiers: 'normal' },
        md: { modifiers: 'h5' },
        lg: { modifiers: 'h3' },
        xl: { modifiers: 'h1' },
        children: 'Smaller text on smaller screens',
      },
      {
        modifiers: 'h1',
        sm: { modifiers: 'h3' },
        md: { modifiers: 'h5' },
        lg: { modifiers: 'normal' },
        xl: { modifiers: 'small' },
        children: 'Bigger text on bigger screens',
      },
    ],
  },
};

/**
 * Displays all the different Roboto font variations that we support. In total there are 24 different font files.
 * * Font weight: 300, 400, 700
 * * Font style: normal, italic
 * * Characters: latin, latin-extended, cyrillic, cyrillic-extended
 */
export const FontVariants: Story = {
  render: AlphabetTemplate,
};
