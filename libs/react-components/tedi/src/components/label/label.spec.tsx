import { render } from '@testing-library/react';

import { Label } from './label';

import '@testing-library/jest-dom';

describe('Label component', () => {
  it('renders with default props', () => {
    const { container } = render(<Label>Label</Label>);
    const label = container.querySelector('.tedi-label');
    expect(label).toHaveTextContent('Label');
  });

  it('renders with custom props', () => {
    const { container } = render(
      <Label bold required>
        Label
      </Label>
    );
    const label = container.querySelector('.tedi-label');
    const required = container.querySelector('.tedi-label__required') as HTMLElement;
    expect(label).toHaveClass('tedi-label--bold');
    expect(label).toContainElement(required);
  });
});
