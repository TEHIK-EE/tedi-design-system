import { Meta } from '@storybook/react';
import * as tokens from '@tehik/design-tokens/tokens.json';
import React from 'react';

import { Col, Row, Section, Separator, VerticalSpacing, VerticalSpacingItem } from '../..';
import styles from './tokens.module.scss';

export default {
  title: 'Documentation/Tokens',
  parameters: {
    viewMode: 'story',
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
} as Meta;

interface ISection {
  title: string;
  groups?: IGroup[];
}

interface IGroup {
  title: string;
  colors?: IColor[];
}

interface IColor {
  name: string;
  hex: string;
  variable: string;
  text?: string;
}

function copyToClipboard(str: string) {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

const mapToColors = (obj: { [key: string]: string }, prefix: string): IColor[] =>
  Object.entries(obj).map(([key, value]) => {
    const name = `${prefix}-${key}`;
    return {
      name: name,
      hex: value.includes('gradient') ? '-' : (value as string).toUpperCase(),
      variable: `var(--${name})`,
    };
  });

const jsonSections: ISection[] = [
  {
    title: 'Brand colors',
    groups: [
      {
        title: 'Primary',
        colors: mapToColors(tokens['color'].primary, 'color-primary'),
      },
      {
        title: 'Accent',
        colors: mapToColors(tokens['color'].accent, 'color-accent'),
      },
    ],
  },
  {
    title: 'Neutral colors',
    groups: [
      {
        title: 'Text',
        colors: mapToColors(tokens['color'].text, 'color-text'),
      },
      {
        title: 'Background',
        colors: mapToColors(tokens['color'].bg, 'color-bg'),
      },
      {
        title: 'Border (separators)',
        colors: mapToColors(tokens['color'].border, 'color-border'),
      },
      {
        title: 'Shades',
        colors: mapToColors({ black: tokens['color'].black, white: tokens['color'].white }, 'color'),
      },
    ],
  },
  {
    title: 'Functional colors',
    groups: [
      {
        title: 'Positive',
        colors: mapToColors(tokens['color'].positive, 'color-positive'),
      },
      {
        title: 'Important',
        colors: mapToColors(tokens['color'].important, 'color-important'),
      },
      {
        title: 'Info',
        colors: mapToColors(tokens['color'].info, 'color-info'),
      },
      {
        title: 'Warning',
        colors: mapToColors(tokens['color'].warning, 'color-warning'),
      },
      {
        title: 'Gradients',
        colors: mapToColors(tokens['color'].gradient, 'color-gradient'),
      },
    ],
  },
];

const UpperGroup = (props: ISection) => (
  <VerticalSpacing>
    <VerticalSpacingItem size={0.25}>
      <h2>{props.title}</h2>
    </VerticalSpacingItem>
    <Separator />
    {props.groups?.map((group, key) => (
      <Group {...group} key={key} />
    ))}
  </VerticalSpacing>
);

const Group = (props: IGroup) => (
  <VerticalSpacing>
    <VerticalSpacingItem size={0.5}>
      <h3>{props.title}</h3>
    </VerticalSpacingItem>
    <Row gutterY={2}>
      {props.colors?.map((group, key) => (
        <Col width="auto" key={key}>
          <Color {...group} />
        </Col>
      ))}
    </Row>
  </VerticalSpacing>
);

const Color = ({ name, variable, hex }: IColor) => (
  <VerticalSpacing size={0.5} className={styles['color']}>
    <button
      onClick={() => copyToClipboard(variable)}
      className={styles['color__example']}
      style={{ background: variable }}
      title={`Copy ${variable} to clipboard`}
    />
    <button title={`Copy ${name} to clipboard`} onClick={() => copyToClipboard(name)} className={styles['color__text']}>
      {name}
    </button>
    <br />
    <button title={`Copy ${hex} to clipboard`} onClick={() => copyToClipboard(hex)} className={styles['color__text']}>
      {hex}
    </button>
  </VerticalSpacing>
);

export const Tokens = () => {
  return (
    <Section className={styles['colors-wrapper']}>
      <VerticalSpacing size={2}>
        <VerticalSpacingItem size={0.5}>
          <h1>Design Tokens</h1>
        </VerticalSpacingItem>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis semper nisi, a porta tortor. Donec arcu
          urna, rutrum in iaculis nec, tincidunt eget leo. Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Maecenas cursus elit id tellus tempus, ut lacinia nisi imperdiet. Proin venenatis vulputate ligula ac
          venenatis.
        </p>

        <VerticalSpacing size={2}>
          {jsonSections.map((section, key) => (
            <UpperGroup {...section} key={key} />
          ))}
        </VerticalSpacing>
      </VerticalSpacing>
    </Section>
  );
};
