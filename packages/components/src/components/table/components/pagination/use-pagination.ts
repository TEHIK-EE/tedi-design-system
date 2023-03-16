import { Updater } from '@tanstack/react-table';

export interface UsePaginationProps {
  /**
   * The current page.
   */
  page: number;
  /**
   * The total number of pages.
   */
  count: number;
  /**
   * Function to set page index
   */
  setPageIndex: (updater: Updater<number>) => void;
  /**
   * Function to toggle allRowsExpanded state
   */
  toggleAllRowsExpanded: (expanded?: boolean) => void;
  /**
   * Number of always visible pages at the beginning and end.
   * @default 1
   */
  boundaryCount?: number;
  /**
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount?: number;
}

export type PageType = 'page' | 'next' | 'previous' | 'ellipsis';

export interface UsePaginationItem {
  type: PageType;
  page: number | null;
  selected: boolean;
}

export interface UsePaginationResult {
  paginationItems: UsePaginationItem[];
}

export const usePagination = (props: UsePaginationProps): UsePaginationResult => {
  const { boundaryCount = 1, count = 5, page, siblingCount = 1 } = props;

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : count - 1
  );

  // Basic list of items to render
  // e.g. itemList = ['previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next']
  const itemList: Array<PageType | number> = [
    ...(['previous'] as PageType[]),
    ...startPages,

    // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > boundaryCount + 2
      ? (['ellipsis'] as PageType[])
      : boundaryCount + 1 < count - boundaryCount
      ? [boundaryCount + 1]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < count - boundaryCount - 1
      ? (['ellipsis'] as PageType[])
      : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : []),

    ...endPages,
    ...(['next'] as PageType[]),
  ];

  // Map the button type to its page number
  const buttonPage = (type: PageType | number): number | null => {
    switch (type) {
      case 'first':
        return 1;
      case 'previous':
        return page - 1;
      case 'next':
        return page + 1;
      case 'last':
        return count;
      default:
        return null;
    }
  };

  // Convert the basic item list to PaginationItem props objects
  const items: UsePaginationItem[] = itemList.map((item) => {
    return typeof item === 'number'
      ? {
          type: 'page',
          page: item,
          selected: item === page,
          'aria-current': item === page ? 'true' : undefined,
        }
      : {
          type: item,
          page: buttonPage(item),
          selected: false,
        };
  });

  return { paginationItems: items };
};

export default usePagination;
