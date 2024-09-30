import { render } from '@testing-library/react';

import Col from './col';
import Row from './row';

import '@testing-library/jest-dom';

describe('Row Component', () => {
  test('renders a Row with default props', () => {
    const { getByTestId } = render(
      <Row>
        <Col>Column 1</Col>
        <Col>Column 2</Col>
      </Row>
    );

    const rowElement = getByTestId('row');
    expect(rowElement).toBeInTheDocument();
    expect(rowElement).toHaveClass('row');
  });

  test('applies the correct classes based on props', () => {
    const { getByTestId } = render(
      <Row cols={4} justifyContent="center" alignItems="start" gap={2} gutter={3} direction="row-reverse" wrap="nowrap">
        <Col>Column 1</Col>
        <Col>Column 2</Col>
      </Row>
    );

    const rowElement = getByTestId('row');
    expect(rowElement).toHaveClass('row-cols-4');
    expect(rowElement).toHaveClass('justify-content-center');
    expect(rowElement).toHaveClass('align-items-start');
    expect(rowElement).toHaveClass('gap-2');
    expect(rowElement).toHaveClass('g-3');
    expect(rowElement).toHaveClass('flex-row-reverse');
    expect(rowElement).toHaveClass('flex-nowrap');
  });

  test('applies responsive classes correctly', () => {
    const { getByTestId } = render(
      <Row xs={{ cols: 6, justifyContent: 'between' }} sm={{ cols: 8, alignItems: 'center' }} md={10} lg={12}>
        <Col>Column 1</Col>
        <Col>Column 2</Col>
      </Row>
    );

    const rowElement = getByTestId('row');
    expect(rowElement).toHaveClass('row-cols-6');
    expect(rowElement).toHaveClass('justify-content-between');
    expect(rowElement).toHaveClass('row-cols-sm-8');
    expect(rowElement).toHaveClass('align-items-sm-center');
    expect(rowElement).toHaveClass('row-cols-md-10');
    expect(rowElement).toHaveClass('row-cols-lg-12');
  });

  test('applies gutterX and gutterY classes correctly', () => {
    const { getByTestId } = render(
      <Row gutterX={4} gutterY={2}>
        <Col>Column 1</Col>
        <Col>Column 2</Col>
      </Row>
    );

    const rowElement = getByTestId('row');
    expect(rowElement).toHaveClass('gx-4');
    expect(rowElement).toHaveClass('gy-2');
  });

  test('renders the Row component with a different element', () => {
    const { getByTestId } = render(
      <Row element="ul">
        <Col>Column 1</Col>
        <Col>Column 2</Col>
      </Row>
    );

    const rowElement = getByTestId('row');
    expect(rowElement.tagName).toBe('UL');
  });

  test('renders Row component with custom className', () => {
    const { getByTestId } = render(
      <Row className="custom-row">
        <Col>Column 1</Col>
        <Col>Column 2</Col>
      </Row>
    );

    const rowElement = getByTestId('row');
    expect(rowElement).toHaveClass('custom-row');
  });
});
