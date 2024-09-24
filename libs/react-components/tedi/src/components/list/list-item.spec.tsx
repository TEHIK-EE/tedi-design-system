import { render } from '@testing-library/react';

import ListItem, { ListItemProps } from './list-item';

import '@testing-library/jest-dom';

describe('ListItem Component', () => {
  const renderListItem = (props: Partial<ListItemProps> = {}) => {
    return render(<ListItem {...props}>Test Item</ListItem>);
  };

  test('renders list item without VerticalSpacingItem by default', () => {
    const { container } = renderListItem();
    expect(container.querySelector('li')).toBeInTheDocument();
    expect(container.querySelector('li')).toHaveTextContent('Test Item');
  });

  test('applies custom className to list item', () => {
    const { container } = renderListItem({ verticalSpacingItem: { className: 'custom-class' } });
    expect(container.querySelector('li')).toHaveClass('custom-class');
  });

  test('wraps the list item in VerticalSpacingItem when verticalSpacingItem is provided', () => {
    const { container } = renderListItem({ verticalSpacingItem: { className: 'spaced-item' } });
    expect(container.querySelector('li')).toBeInTheDocument();
    expect(container.querySelector('.spaced-item')).toBeInTheDocument();
  });

  test('renders children correctly', () => {
    const { getByText } = renderListItem();
    expect(getByText('Test Item')).toBeInTheDocument();
  });
});
