import { render } from '@testing-library/react';

import List, { ListProps } from './list';
import ListItem from './list-item';

import '@testing-library/jest-dom';

describe('List Component', () => {
  const renderList = (props: Partial<ListProps> = {}) => {
    return render(
      <List {...props}>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </List>
    );
  };

  test('renders unordered list by default', () => {
    const { container } = renderList();
    expect(container.querySelector('ul')).toBeInTheDocument();
  });

  test('renders ordered list when element is "ol"', () => {
    const { container } = renderList({ as: 'ol' });
    expect(container.querySelector('ol')).toBeInTheDocument();
  });

  test('applies "list--style-none" class when style is "none"', () => {
    const { container } = renderList({ style: 'none' });
    expect(container.firstChild).toHaveClass('list--style-none');
  });
});
