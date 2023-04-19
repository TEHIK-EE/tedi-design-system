import { Title } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';
import * as tokens from '@tehik/design-tokens/tokens.json';
import React from 'react';

import { Col, Row, Section, Separator, Text, VerticalSpacing, VerticalSpacingItem } from '..';
import Heading from '../components/typography/heading/heading';

export default {
  title: 'Documentation',
  parameters: {
    docs: {
      page: () => (
        <Section>
          <VerticalSpacing size={2}>
            <VerticalSpacingItem size={1}>
              <Title>Color Tokens</Title>
            </VerticalSpacingItem>
            <p>
              The same design tokens are used for Figma and development. For more detailed info look at{' '}
              <a href="#guidelines" target="_self">
                Guidelines
              </a>
              .
            </p>
            <p>
              Tokens are semantically named. Semantically incorrect uses are generally not tolerated, only in some rare
              usecases. This means that the developer should not, for example, use the border color as the background
              color. The tokens are divided into groups, which are described below. <br />
              Component library also export some helper functions for colors usage, which can be found under{' '}
              <a href="/?path=/docs/components-typography-text--default">Text</a> component and{' '}
              <a href="/?path=/docs/components-helpers-background-colors--background-colors">Background-colors</a>
            </p>

            <ColorTokens />
            <Separator />
            <GuideLines />
          </VerticalSpacing>
        </Section>
      ),
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
        title: 'primary',
        colors: mapToColors(tokens['color'].primary, 'color-primary'),
      },
      {
        title: 'accent',
        colors: mapToColors(tokens['color'].accent, 'color-accent'),
      },
    ],
  },
  {
    title: 'Neutrals',
    groups: [
      {
        title: 'text (& other foregrounds)',
        colors: mapToColors(tokens['color'].text, 'color-text'),
      },
      {
        title: 'background',
        colors: mapToColors(tokens['color'].bg, 'color-bg'),
      },
      {
        title: 'border ( & separators)',
        colors: mapToColors(tokens['color'].border, 'color-border'),
      },
      {
        title: 'shades',
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

const UpperGroup = ({ title, groups }: ISection) => (
  <VerticalSpacing>
    <VerticalSpacingItem size={0.25}>
      <Heading element="h2" id={title.toLowerCase().replaceAll(' ', '-')}>
        {title}
      </Heading>
      <Text modifiers="small" color="muted">
        (Click on the color or variable to copy it&apos;s value to clipboard.)
      </Text>
    </VerticalSpacingItem>
    <Separator />
    {groups?.map((group, key) => (
      <Group {...group} key={key} />
    ))}
  </VerticalSpacing>
);

const Group = ({ title, colors }: IGroup) => (
  <VerticalSpacing>
    <VerticalSpacingItem size={0.5}>
      <Heading element="h3" id={title.toLowerCase().replaceAll(' ', '-')}>
        {title}
      </Heading>
    </VerticalSpacingItem>
    <Row gutterY={2}>
      {colors?.map((group, key) => (
        <Col width="auto" key={key}>
          <Color {...group} />
        </Col>
      ))}
    </Row>
  </VerticalSpacing>
);

const Color = ({ name, variable, hex }: IColor) => {
  const id = name.replace('color-', '');
  return (
    <div className="color" id={id}>
      <VerticalSpacing size={0.5}>
        <button
          onClick={() => copyToClipboard(variable)}
          className="color__example"
          style={{ background: variable }}
          title={`Copy ${variable} to clipboard`}
        />
        <button title={`Copy ${name} to clipboard`} onClick={() => copyToClipboard(name)} className="color__text">
          {name}
        </button>
        <br />
        <button title={`Copy ${hex} to clipboard`} onClick={() => copyToClipboard(hex)} className="color__text">
          {hex}
        </button>
      </VerticalSpacing>
    </div>
  );
};

export const ColorTokens = () => {
  return (
    <VerticalSpacing size={2}>
      {jsonSections.map((section, key) => (
        <UpperGroup {...section} key={key} />
      ))}
    </VerticalSpacing>
  );
};

const ColorRows = ({ inverted }: { inverted?: boolean }) => (
  <Row>
    <Col md={6}>
      <img alt="text (fourgrounds) examples" src={`/colors/foregrounds${inverted ? '-inverted' : ''}.svg`} />
    </Col>
    <Col md={6}>
      <img alt="backgrounds examples" src={`/colors/backgrounds${inverted ? '-inverted' : ''}.svg`} />
    </Col>
  </Row>
);

const ColorExamples = ({
  children,
  title,
  inverted,
}: {
  children: React.ReactNode;
  title: string;
  inverted?: boolean;
}) => (
  <VerticalSpacing>
    <VerticalSpacingItem size={0.5}>
      <Heading element="h3">{title}</Heading>
    </VerticalSpacingItem>
    {children}
    {typeof inverted !== 'undefined' && <ColorRows inverted={inverted} />}
  </VerticalSpacing>
);

const Neutrals = () => (
  <VerticalSpacing>
    <VerticalSpacingItem size={0.5}>
      <Heading element="h3">Neutrals</Heading>
    </VerticalSpacingItem>
    <p>
      <a href="#neutrals" target="_self">
        Neutrals
      </a>{' '}
      are divided into 3 main groups:
    </p>
    <ul>
      <li>
        <b>text</b> - This includes all foregrounds such as text, icons, and other UI objects that need to be readable.
        Most used foreground is text, therefore the name is simplified to “text-...”.
      </li>
      <li>
        <b>bg</b> - Bg is short for background. These are the main colors of the interface.
      </li>
      <li>
        <b>borders</b> - This includes separators and input borders.
      </li>
    </ul>
  </VerticalSpacing>
);

const GuideLinesDescription = () => (
  <VerticalSpacing>
    <VerticalSpacingItem size={0.5}>
      <Heading element="h2" id="guidelines">
        Guidelines
      </Heading>
    </VerticalSpacingItem>
    <p>
      The color naming convention is optimised for fast navigation and clear overview of all variables. To optimise
      design hand-offs the same design tokens are used (naming convention) for{' '}
      <a
        href="https://www.figma.com/file/aw4UVf6HRaZEv0rQmED2cf/TEHIK-Design-System?node-id=19045-57&t=vm1fhotNyar5Ew5H-0"
        target="_blank"
        rel="noreferrer"
      >
        Figma
      </a>{' '}
      and development.
    </p>
  </VerticalSpacing>
);

const GuideLines = () => (
  <VerticalSpacing size={2}>
    <GuideLinesDescription />
    <Neutrals />
    <ColorExamples title="Brand and functional colors" inverted={false}>
      <p>
        In order to keep the color palette simple, brand and functional colors are not divided into the previous
        categories. Nevertheless, these colors can be used as bg, text and borders in a variety of ways to cover all the
        design needs.
      </p>
      <p>
        Keep in mind that all colors have to be used in accordance to the WCAG level AA contrast standards. In general
        overlaying “text” color tokens on “background” color tokens will guarantee at least AA level contrast.
      </p>
    </ColorExamples>
    <ColorExamples title="Inverted" inverted>
      <p>
        Inverted colors are used for inverted sections like footers, accent cards and so on. Dark mode is not available
        yet.
      </p>
    </ColorExamples>
    <ColorExamples title="Disabled">
      <p>
        <a href="#text-disabled" target="_self">
          text-disabled
        </a>{' '}
        and{' '}
        <a href="#bg-disabled" target="_self">
          bg-disabled
        </a>{' '}
        are designed to express disabled states. Keep in mind that disabled elements should be used with case and only
        if absolutely necessary. It’s good practice to consider other design patterns if possible.
      </p>
      <img alt="disabled examples" src="/colors/disabled.svg" />
    </ColorExamples>
  </VerticalSpacing>
);
