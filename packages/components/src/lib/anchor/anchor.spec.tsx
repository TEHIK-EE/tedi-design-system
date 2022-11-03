import { render } from '@testing-library/react';

import Anchor from './anchor';

describe('Anchor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Anchor url="#" text="Anchor" />);
    expect(baseElement).toBeTruthy();
  });
});
