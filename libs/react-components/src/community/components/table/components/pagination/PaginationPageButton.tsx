import { Table as TableType } from '@tanstack/table-core';
import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../../../../tedi/providers/label-provider';
import { TableContext } from '../../table-context';
import styles from './pagination.module.scss';
import { UsePaginationItem } from './use-pagination';

export interface PaginationPageButtonProps {
  item: UsePaginationItem;
}

const PaginationPageButton = ({ item }: PaginationPageButtonProps) => {
  const { table } = React.useContext(TableContext);
  const { getLabel } = useLabels();
  const pageNumber = item.page || 0;
  const pageLabel = getLabel('pagination.page', pageNumber, item.selected);

  const { setPageIndex, toggleAllRowsExpanded } = table as TableType<unknown>;

  return (
    <li>
      <button
        {...item}
        type="button"
        className={cn(styles['pagination__page'], {
          [styles['pagination__page--current']]: item.selected,
        })}
        aria-label={pageLabel}
        onClick={() => {
          setPageIndex(pageNumber - 1);
          toggleAllRowsExpanded(false);
        }}
      >
        {pageNumber}
      </button>
    </li>
  );
};

export default PaginationPageButton;
