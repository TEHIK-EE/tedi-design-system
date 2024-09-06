import { Col, Row } from '../../../../tedi/src/components/grid';
import { VerticalSpacing, VerticalSpacingItem } from '../../../../tedi/src/components/vertical-spacing';
import { Heading } from '../../index';

const ColorRows = ({ inverted }: { inverted?: boolean }) => (
  <Row>
    <Col md={6}>
      <img alt="text (fourgrounds) examples" src={`colors/foregrounds${inverted ? '-inverted' : ''}.svg`} />
    </Col>
    <Col md={6}>
      <img alt="backgrounds examples" src={`colors/backgrounds${inverted ? '-inverted' : ''}.svg`} />
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
      <Heading element="h1" id="guidelines">
        Color Guidelines
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
      <img alt="disabled examples" src="colors/disabled.svg" />
    </ColorExamples>
  </VerticalSpacing>
);

export default GuideLines;
