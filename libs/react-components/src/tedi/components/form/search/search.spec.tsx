import { fireEvent, render, screen } from '@testing-library/react';

import { Search, SearchProps } from './search';

import '@testing-library/jest-dom';

describe('Search component', () => {
  const defaultProps: SearchProps = {
    placeholder: 'Search...',
    onSearch: jest.fn(),
    value: '',
    id: 'search-1',
    label: 'Search',
  };

  it('renders the Search component with default properties', () => {
    render(<Search {...defaultProps} />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });

  it('renders the Search component with a custom placeholder', () => {
    render(<Search {...defaultProps} placeholder="Custom placeholder" />);
    const input = screen.getByPlaceholderText('Custom placeholder');
    expect(input).toBeInTheDocument();
  });

  it('calls onSearch when the search button is clicked', () => {
    render(<Search {...defaultProps} button={{ children: 'Search' }} />);
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);
    expect(defaultProps.onSearch).toHaveBeenCalledTimes(1);
    expect(defaultProps.onSearch).toHaveBeenCalledWith('');
  });

  it('renders with a search icon by default', () => {
    render(<Search {...defaultProps} />);
    const input = screen.getByPlaceholderText('Search...');
    const icon = screen.getByText('search');
    expect(icon).toBeInTheDocument();
  });

  it('renders a custom icon when searchIcon prop is provided', () => {
    render(<Search {...defaultProps} searchIcon="custom-icon" />);
    const icon = screen.getByText('custom-icon');
    expect(icon).toBeInTheDocument();
  });

  it('renders with a button when the button prop is provided', () => {
    render(<Search {...defaultProps} button={{ children: 'Custom Button' }} />);
    const button = screen.getByText('Custom Button');
    expect(button).toBeInTheDocument();
  });

  it('does not render the button when button prop is not provided', () => {
    render(<Search {...defaultProps} />);
    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

  it('disables the input when the disabled prop is true', () => {
    render(<Search {...defaultProps} disabled />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeDisabled();
  });
});
