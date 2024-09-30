import { render } from '@testing-library/react';
import React from 'react';

import { TextGroup } from './text-group';

import '@testing-library/jest-dom';

describe('TextGroup component', () => {
  it('renders with default props', () => {
    const { container } = render(<TextGroup label="Label" value="Value" />);
    const textGroup = container.querySelector('.tedi-text-group');

    expect(textGroup).toHaveClass('tedi-text-group--vertical');
    expect(textGroup).toHaveStyle('--label-width: auto');

    const labelElement = container.querySelector('dt');
    const valueElement = container.querySelector('dd');

    expect(labelElement).toHaveClass('tedi-text-group__label');
    expect(valueElement).toHaveClass('tedi-text-group__value');
    expect(labelElement).toHaveTextContent('Label');
    expect(valueElement).toHaveTextContent('Value');
  });

  it('renders with custom props (horizontal layout, custom labelWidth)', () => {
    const { container } = render(
      <TextGroup label="Custom Label" value="Custom Value" type="horizontal" labelWidth="200px" />
    );
    const textGroup = container.querySelector('.tedi-text-group');

    expect(textGroup).toHaveClass('tedi-text-group--horizontal');
    expect(textGroup).toHaveStyle('--label-width: 200px');

    const labelElement = container.querySelector('dt');
    const valueElement = container.querySelector('dd');

    expect(labelElement).toHaveTextContent('Custom Label');
    expect(valueElement).toHaveTextContent('Custom Value');
  });

  it('applies custom className', () => {
    const { container } = render(<TextGroup label="Label" value="Value" className="custom-class" />);
    const textGroup = container.querySelector('.tedi-text-group');

    expect(textGroup).toHaveClass('custom-class');
  });

  it('handles number for labelWidth as percentage', () => {
    const { container } = render(<TextGroup label="Label" value="Value" labelWidth={50} />);
    const textGroup = container.querySelector('.tedi-text-group');

    expect(textGroup).toHaveStyle('--label-width: 50%');
  });
});
