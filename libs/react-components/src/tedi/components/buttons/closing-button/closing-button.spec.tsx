import { fireEvent, render, screen } from '@testing-library/react';

import { ClosingButton } from './closing-button';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: jest.fn().mockReturnValue('Close'),
  }),
}));

describe('ClosingButton component', () => {
  it('renders the ClosingButton with default props', () => {
    render(
      <ClosingButton
        size="medium"
        onClick={() => {
          console.log('Button pressed');
        }}
      />
    );

    const button = screen.getByRole('button', { name: /close/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('tedi-closing-button');

    const icon = button.querySelector('span[data-name="icon"]');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('tedi-icon--size-18');
  });

  it('renders with the correct large size class and icon size', () => {
    render(
      <ClosingButton
        size="large"
        onClick={() => {
          console.log('Button pressed');
        }}
      />
    );

    const button = screen.getByRole('button', { name: /close/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('tedi-closing-button tedi-closing-button--large');

    const icon = button.querySelector('span[data-name="icon"]');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('tedi-icon--size-24');
  });

  it('applies custom class names', () => {
    render(<ClosingButton size="large" className="custom-class" />);

    const button = screen.getByRole('button', { name: /Close/i });
    expect(button).toHaveClass('tedi-closing-button tedi-closing-button--large custom-class');
  });

  it('triggers onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    render(<ClosingButton size="medium" onClick={onClickMock} />);

    const button = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('uses fallback label from label provider when title is not provided', () => {
    render(<ClosingButton size="medium" />);

    const button = screen.getByRole('button', { name: /Close/i });
    expect(button).toHaveAttribute('title', 'Close');
    expect(button).toHaveAttribute('aria-label', 'Close');
  });

  it('uses custom title if provided', () => {
    render(<ClosingButton size="medium" title="Custom Close" />);

    const button = screen.getByRole('button', { name: /Custom Close/i });
    expect(button).toHaveAttribute('title', 'Custom Close');
    expect(button).toHaveAttribute('aria-label', 'Custom Close');
  });
});
