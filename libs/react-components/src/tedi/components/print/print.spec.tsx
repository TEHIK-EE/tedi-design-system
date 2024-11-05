import { render } from '@testing-library/react';
import React from 'react';

import { Print } from './print';

import '@testing-library/jest-dom';

describe('Print Component', () => {
  it('renders child elements correctly', () => {
    const { getByTestId } = render(
      <Print>
        <div data-testid="child">Test content</div>
      </Print>
    );
    const childElement = getByTestId('child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Test content');
  });

  it('applies visibility classes correctly when set to hide', () => {
    const { getByTestId } = render(
      <Print visibility="hide">
        <div data-testid="child">Hidden content</div>
      </Print>
    );
    const childElement = getByTestId('child');
    expect(childElement).toHaveClass('no-print');
  });

  it('applies visibility classes correctly when set to show', () => {
    const { getByTestId } = render(
      <Print visibility="show">
        <div data-testid="child">Visible content</div>
      </Print>
    );
    const childElement = getByTestId('child');
    expect(childElement).toHaveClass('show-print');
  });

  it('applies breakBefore, breakAfter, and breakInside classes correctly', () => {
    const { getByTestId } = render(
      <Print breakBefore="avoid" breakAfter="auto" breakInside="avoid-page">
        <div data-testid="child">Content with breaks</div>
      </Print>
    );
    const childElement = getByTestId('child');
    expect(childElement).toHaveClass('break-before-avoid');
    expect(childElement).toHaveClass('break-after-auto');
    expect(childElement).toHaveClass('break-inside-avoid-page');
  });

  it('renders multiple children correctly', () => {
    const { getByTestId } = render(
      <Print>
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
      </Print>
    );
    const childElement1 = getByTestId('child1');
    const childElement2 = getByTestId('child2');
    expect(childElement1).toBeInTheDocument();
    expect(childElement2).toBeInTheDocument();
    expect(childElement1).toHaveTextContent('Child 1');
    expect(childElement2).toHaveTextContent('Child 2');
  });

  it('does not apply break or visibility classes when props are not provided', () => {
    const { getByTestId } = render(
      <Print>
        <div data-testid="child">No special classes</div>
      </Print>
    );
    const childElement = getByTestId('child');
    expect(childElement).not.toHaveClass('no-print');
    expect(childElement).not.toHaveClass('show-print');
    expect(childElement).not.toHaveClass('break-before-avoid');
    expect(childElement).not.toHaveClass('break-after-auto');
    expect(childElement).not.toHaveClass('break-inside-avoid-page');
  });
});
