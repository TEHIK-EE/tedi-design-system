import { Unstyled } from '@storybook/blocks';
import * as tokens from '@tehik-ee/design-tokens/tokens.json';

import { Col, Heading, Row, VerticalSpacing, VerticalSpacingItem } from '../../../community/src/index';

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
    </VerticalSpacingItem>
    {groups?.map((group, key) => (
      <Group {...group} key={key} />
    ))}
  </VerticalSpacing>
);

const Group = ({ title, colors }: IGroup) => (
  <Unstyled>
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
  </Unstyled>
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

const ColorTokens = () => {
  return (
    <VerticalSpacing size={2}>
      {jsonSections.map((section, key) => (
        <UpperGroup {...section} key={key} />
      ))}
    </VerticalSpacing>
  );
};

export default ColorTokens;
