import { render } from '@testing-library/react';

import Col from './col';
import Row from './row';

import '@testing-library/jest-dom';

describe('Col Component', () => {
  test('renders a Col with default props', () => {
    const { getByTestId } = render(
      <Row>
        <Col>Column 1</Col>
      </Row>
    );

    const colElement = getByTestId('col');
    expect(colElement).toBeInTheDocument();
    expect(colElement).toHaveClass('col');
  });

  test('applies the correct classes based on props', () => {
    const { getByTestId } = render(
      <Row>
        <Col width={6} offset={2} order="first" align="center">
          Column 1
        </Col>
      </Row>
    );

    const colElement = getByTestId('col');
    expect(colElement).toHaveClass('col-6');
    expect(colElement).toHaveClass('offset-2');
    expect(colElement).toHaveClass('order-first');
    expect(colElement).toHaveClass('align-self-center');
  });

  test('applies responsive classes correctly', () => {
    const { getByTestId } = render(
      <Row>
        <Col xs={{ width: 12, order: 1 }} sm={{ width: 6, order: 'last' }} md={{ width: 4, offset: 1 }} lg={3}>
          Column 1
        </Col>
      </Row>
    );

    const colElement = getByTestId('col');
    expect(colElement).toHaveClass('col-12');
    expect(colElement).toHaveClass('order-1');
    expect(colElement).toHaveClass('col-sm-6');
    expect(colElement).toHaveClass('order-sm-last');
    expect(colElement).toHaveClass('col-md-4');
    expect(colElement).toHaveClass('offset-md-1');
    expect(colElement).toHaveClass('col-lg-3');
  });

  test('applies grow and shrink classes correctly', () => {
    const { getByTestId } = render(
      <Row>
        <Col grow={1} shrink={1}>
          Column 1
        </Col>
      </Row>
    );

    const colElement = getByTestId('col');
    expect(colElement).toHaveClass('flex-grow-1');
    expect(colElement).toHaveClass('flex-shrink-1');
  });

  test('renders the Col component with a different element', () => {
    const { getByTestId } = render(
      <Row element="ul">
        <Col element="dd">Column 1</Col>
      </Row>
    );

    const colElement = getByTestId('col');
    expect(colElement.tagName).toBe('DD');
  });

  test('renders Col component with custom className', () => {
    const { getByTestId } = render(
      <Row>
        <Col className="custom-col">Column 1</Col>
      </Row>
    );

    const colElement = getByTestId('col');
    expect(colElement).toHaveClass('custom-col');
  });

  test('applies all props together', () => {
    const { getByTestId } = render(
      <Row>
        <Col width={8} offset={2} order="last" align="end" grow={1} shrink={1} className="custom-col">
          Column 1
        </Col>
      </Row>
    );

    const colElement = getByTestId('col');
    expect(colElement).toHaveClass('col-8');
    expect(colElement).toHaveClass('offset-2');
    expect(colElement).toHaveClass('order-last');
    expect(colElement).toHaveClass('align-self-end');
    expect(colElement).toHaveClass('flex-grow-1');
    expect(colElement).toHaveClass('flex-shrink-1');
    expect(colElement).toHaveClass('custom-col');
  });
});
