import { render } from '@testing-library/react';

import Anchor from './anchor';

describe('Anchor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Anchor href="#">Link</Anchor>);
    expect(baseElement).toBeTruthy();
  });
});
