import { render } from '@testing-library/react';

import SideNav from './sidenav';

describe('Sidenav', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SideNav ariaLabel="Menu" navItems={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
