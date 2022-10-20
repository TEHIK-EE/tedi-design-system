import { render } from '@testing-library/react';

import Header from './header';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Header
        languageSelection={{ dropdown: { button: { text: 'EST' }, items: [] }, label: 'Keel:' }}
        roleSelection={{ dropdown: { button: { text: 'Roll1' }, items: [] }, label: 'Minu roll:' }}
        onLogoutClick={() => console.log('Log out')}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
