import { render, screen } from '@testing-library/react';

import { useElementSize } from '../../helpers/hooks/use-element-size';
import Affix, { AffixProps } from './affix';

jest.mock('../../../community/helpers/hooks/use-element-size');
jest.mock('react-sticky-box', () => {
  return function MockStickyBox({ children, className }: { children: React.ReactNode; className: string }) {
    return (
      <div data-testid="sticky-box" className={className}>
        {children}
      </div>
    );
  };
});

const mockedUseElementSize = useElementSize as jest.Mock;

describe('Affix Component', () => {
  const defaultProps: AffixProps = {
    children: <div>Test Content</div>,
  };

  beforeEach(() => {
    mockedUseElementSize.mockReturnValue({ height: 60 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(<Affix {...defaultProps} />);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies correct class names for sticky position', () => {
    const { container } = render(<Affix {...defaultProps} className="custom-class" />);
    const affixElement = container.firstChild;

    expect(affixElement).toHaveClass('tedi-affix');
    expect(affixElement).toHaveClass('custom-class');
    expect(affixElement).toHaveClass('tedi-affix--sticky');
  });

  it('applies correct class names for fixed position', () => {
    const { container } = render(<Affix {...defaultProps} position="fixed" top={1} />);
    const affixElement = container.firstChild;

    expect(affixElement).toHaveClass('tedi-affix--fixed');
    expect(affixElement).toHaveClass('tedi-affix--top-1');
  });

  it('handles decimal position values correctly', () => {
    const { container } = render(<Affix {...defaultProps} position="fixed" top={1.5} />);
    const affixElement = container.firstChild;

    expect(affixElement).toHaveClass('tedi-affix--top-1-5');
  });

  it('handles left and right positioning', () => {
    const { container } = render(<Affix {...defaultProps} position="fixed" left={1} right={2} />);
    const affixElement = container.firstChild;

    expect(affixElement).toHaveClass('tedi-affix--left-1');
    expect(affixElement).toHaveClass('tedi-affix--right-2');
  });

  it('renders fixed position without StickyBox', () => {
    const { queryByTestId } = render(<Affix {...defaultProps} position="fixed" />);
    expect(queryByTestId('sticky-box')).not.toBeInTheDocument();
  });
});
