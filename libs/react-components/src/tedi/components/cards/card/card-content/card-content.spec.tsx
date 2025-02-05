import { render, screen } from '@testing-library/react';
import { UnknownType } from 'libs/react-components/src/tedi/types/commonTypes';

import { useBreakpointProps } from '../../../../helpers';
import { CardContext } from '../card-context';
import { CardContent, CardContentProps } from './card-content';

import '@testing-library/jest-dom';

jest.mock('../../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('CardContent', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  const renderComponent = (props?: CardContentProps, contextValue?: UnknownType) => {
    const context = contextValue || {};
    return render(
      <CardContext.Provider value={context}>
        <CardContent {...props}>Test Content</CardContent>
      </CardContext.Provider>
    );
  };

  it('renders without crashing with default props', () => {
    renderComponent();
    const content = screen.getByText('Test Content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('tedi-card__content');
  });

  it('applies additional className', () => {
    renderComponent({ className: 'custom-class' });
    const content = screen.getByText('Test Content');
    expect(content).toHaveClass('custom-class');
  });

  it('applies numeric padding', () => {
    renderComponent({ padding: 2 });
    const content = screen.getByText('Test Content');
    expect(content).toHaveAttribute('data-padding', '2rem');
  });

  it('applies object-based padding', () => {
    renderComponent({ padding: { vertical: 1, horizontal: 2 } });
    const content = screen.getByText('Test Content');

    expect(content).not.toHaveAttribute('data-padding');

    expect(content).toHaveStyle({
      '--card-content-padding-top': '1rem',
      '--card-content-padding-bottom': '1rem',
      '--card-content-padding-left': '2rem',
      '--card-content-padding-right': '2rem',
    });
  });

  it('applies background properties', () => {
    renderComponent({
      backgroundImage: 'test-image.jpg',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    });
    const content = screen.getByText('Test Content');
    expect(content).toHaveStyle({
      backgroundImage: 'url(test-image.jpg)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    });
  });

  it('renders as a button when role="button"', () => {
    renderComponent({ role: 'button' });
    const content = screen.getByRole('button');
    expect(content.tagName).toBe('BUTTON');
  });

  it('renders as a div by default', () => {
    renderComponent();
    const content = screen.getByText('Test Content');
    expect(content.tagName).toBe('DIV');
  });
});
