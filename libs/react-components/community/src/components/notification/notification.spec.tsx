import { render } from '@testing-library/react';

import Notification from './notification';

describe('Anchor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Notification />);
    expect(baseElement).toBeTruthy();
  });
});
