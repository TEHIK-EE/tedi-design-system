import { fireEvent, render, screen } from '@testing-library/react';

import { Truncate } from './truncate';

import '@testing-library/jest-dom';

describe('Truncate Component', () => {
  const defaultProps = {
    children: 'This is a long text that needs to be truncated for testing purposes.',
    maxLength: 20,
  };

  it('renders truncated text with ellipsis by default', () => {
    render(<Truncate {...defaultProps} />);
    const truncatedText = screen.getByText(/This is a long text/);

    expect(truncatedText).toBeInTheDocument();
    expect(truncatedText).toHaveTextContent('...');
  });

  it('renders the full text when expanded', () => {
    render(<Truncate {...defaultProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const fullText = screen.getByText(defaultProps.children);
    expect(fullText).toBeInTheDocument();
    expect(fullText).not.toHaveTextContent('...');
  });

  it('does not render the button when expandable is false', () => {
    render(<Truncate {...defaultProps} expandable={false} />);

    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

  it('renders custom ellipsis if provided', () => {
    render(<Truncate {...defaultProps} ellipsis="***" />);

    const truncatedText = screen.getByText(/This is a long text/);
    expect(truncatedText).toHaveTextContent('***');
  });
});
