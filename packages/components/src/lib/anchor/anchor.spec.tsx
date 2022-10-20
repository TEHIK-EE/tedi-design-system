import { render } from '@testing-library/react';

import Anchor from './anchor';

describe('Anchor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Anchor url="#">Link</Anchor>);
    expect(baseElement).toBeTruthy();
  });
});
