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
 * Every modifier and color of text has its own global css class also, but using Text component is highly recommended.
 */
const meta: Meta<typeof Text> = {
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

interface TextTableRow {
  name: string;
  rem: string;
  px: string;
  props: Partial<TextProps>;
}

const DefaultRows: TextTableRow[] = [
  { name: 'Heading 1', rem: '2/3', px: '32/48', props: { element: 'h1' } },
  { name: 'Heading 2', rem: '1.75/2.625', px: '28/42', props: { element: 'h2' } },
  { name: 'Heading 3', rem: '1.5/2.25', px: '24/36', props: { element: 'h3' } },
  { name: 'Heading 4', rem: '1.25/1.875', px: '20/30', props: { element: 'h4' } },
  { name: 'Heading 5', rem: '1.125/1.625', px: '18/26', props: { element: 'h5' } },
  { name: 'Heading 6', rem: '1/1.5', px: '16/24', props: { element: 'h6' } },
  { name: 'Body Regular', rem: '1/1.5', px: '16/24', props: { element: 'p' } },
  { name: 'Body Regular Italic', rem: '1/1.5', px: '16/24', props: { modifiers: ['italic'] } },
  { name: 'Body Regular Bold', rem: '1/1.5', px: '16/24', props: { modifiers: ['bold'] } },
  { name: 'Body Small', rem: '0.875/1.25', px: '14/20', props: { modifiers: ['small'] } },
  { name: 'Body Small Italic', rem: '0.875/1.25', px: '14/20', props: { modifiers: ['small', 'italic'] } },
  { name: 'Body Small Bold', rem: '0.875/1.25', px: '14/20', props: { modifiers: ['small', 'bold'] } },
  { name: 'Subtitles regular', rem: '1/1.5', px: '16/24', props: { modifiers: ['uppercase', 'bold'] } },
  { name: 'Subtitles small', rem: '0.875/1.25', px: '14/20', props: { modifiers: ['uppercase', 'small'] } },
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
  columnHelper.accessor('rem', {
    header: 'font size/line-height (rem)',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('px', {
    header: 'font size/line-height (px)',
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
