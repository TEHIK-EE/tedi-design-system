import { render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../../../helpers';
import styles from '../../card.module.scss';
import { CardContext } from '../card-context';
import CardHeader, { CardHeaderProps } from './card-header';

jest.mock('../../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('CardHeader', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  const renderComponent = (props?: CardHeaderProps, contextValue?: any) => {
    const context = contextValue || {};
    return render(
      <CardContext.Provider value={context}>
        <CardHeader {...props}>Test Header</CardHeader>
      </CardContext.Provider>
    );
  };

  it('renders without crashing with default props', () => {
    renderComponent();
    const header = screen.getByText('Test Header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass(styles['tedi-card__header']);
  });

  it('applies additional className', () => {
    renderComponent({ className: 'extra-class' });
    const header = screen.getByText('Test Header');
    expect(header).toHaveClass('extra-class');
  });

  it('applies numeric padding correctly', () => {
    renderComponent({ padding: 1.5 });
    const header = screen.getByText('Test Header');
    expect(header).toHaveAttribute('data-padding', '1.5rem');
  });

  it('applies object-based padding styles', () => {
    renderComponent({ padding: { vertical: 1, horizontal: 2 } });
    const header = screen.getByText('Test Header');
    expect(header).toHaveStyle({
      '--card-content-padding-top': '1rem',
      '--card-content-padding-bottom': '1rem',
      '--card-content-padding-left': '2rem',
      '--card-content-padding-right': '2rem',
    });
  });

  it('applies background properties correctly', () => {
    renderComponent({
      backgroundImage: 'test-image.jpg',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    });
    const header = screen.getByText('Test Header');
    expect(header).toHaveStyle({
      backgroundImage: 'url(test-image.jpg)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    });
  });

  it('renders with separator class when hasSeparator is true', () => {
    renderComponent({ hasSeparator: true });
    const header = screen.getByText('Test Header');
    expect(header).toHaveClass(styles['tedi-card__content--separator']);
  });

  it('renders as a button when role="button" is provided', () => {
    renderComponent({ role: 'button' });
    const header = screen.getByRole('button');
    expect(header).toBeInTheDocument();
  });

  it('renders as a div by default', () => {
    renderComponent();
    const header = screen.getByText('Test Header');
    expect(header.tagName).toBe('DIV');
  });
});
