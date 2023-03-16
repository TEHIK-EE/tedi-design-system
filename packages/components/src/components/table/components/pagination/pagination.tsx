import { Table as TableType } from '@tanstack/table-core';
import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../../../providers/label-provider';
import Select, { ISelectOption, TSelectValue } from '../../../form/select/select';
import { Icon } from '../../../icon/icon';
import { DefaultTData } from '../../table.types';
import { TableContext } from '../../table-context';
import styles from './pagination.module.scss';
import usePagination, { UsePaginationItem } from './use-pagination';

export interface PaginationProps {
  totalRows: number;
}

function Pagination<TData extends DefaultTData<TData>>(props: PaginationProps): JSX.Element | null {
  const { getLabel } = useLabels();
  const { table, id } = React.useContext(TableContext);
  const resultsLabel = getLabel('pagination.results');
  const pageLabel = getLabel('pagination.page');

  const {
    getCanPreviousPage,
    getCanNextPage,
    nextPage,
    previousPage,
    setPageSize,
    setPageIndex,
    getState,
    getPageCount,
    toggleAllRowsExpanded,
  } = table as TableType<TData>;
  const { pageIndex, pageSize } = getState().pagination;
  const paginationOptions = [
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '20', label: '20' },
  ];
  const totalPages = Math.ceil(props.totalRows / pageSize);

  const { paginationItems } = usePagination({
    setPageIndex,
    toggleAllRowsExpanded,
    page: pageIndex + 1,
    count: totalPages,
  });

  // selected value must have a JS reference to one of the options. Otherwise, we don't have a correct focus on the selected item when menu is opened with a tab
  const selectedValue = paginationOptions.find((o) => o.value === String(pageSize)) ?? {
    value: String(pageSize),
    label: String(pageSize),
  };

  const changePageSize = (option: TSelectValue) => {
    const value = parseInt((option as ISelectOption)?.value || '10');
    setPageSize(value);
  };

  const renderPageButton = (item: UsePaginationItem, index: number) => {
    const currentPage = item.page || 0; // 0 only for ellipses

    if (item.type === 'previous') {
      return (
        <li className={styles['pagination__arrow-item']} key={index}>
          <button
            type="button"
            className={styles['pagination__arrow']}
            disabled={!getCanPreviousPage()}
            onClick={() => {
              previousPage();
              toggleAllRowsExpanded(false);
            }}
          >
            <span className="visually-hidden">{getLabel('pagination.prev-page')}</span>
            <Icon name="arrow_back" size={16} />
          </button>
        </li>
      );
    }

    if (item.type === 'next') {
      return (
        <li className={styles['pagination__arrow-item']} key={index}>
          <button
            type="button"
            className={styles['pagination__arrow']}
            disabled={!getCanNextPage()}
            onClick={() => {
              nextPage();
              toggleAllRowsExpanded(false);
            }}
          >
            <span className="visually-hidden">{getLabel('pagination.next-page')}</span>
            <Icon name="arrow_forward" size={16} />
          </button>
        </li>
      );
    }

    if (item.type === 'ellipsis') {
      return (
        <li key={index} className={cn(styles['pagination__page'])}>
          ...
        </li>
      );
    }

    return (
      <li key={index}>
        <button
          {...item}
          type="button"
          className={cn(styles['pagination__page'], {
            [styles['pagination__page--current']]: item.selected,
          })}
          aria-label={typeof pageLabel === 'string' ? pageLabel : pageLabel(currentPage, currentPage - 1 === pageIndex)}
          onClick={() => {
            setPageIndex(currentPage - 1);
            toggleAllRowsExpanded(false);
          }}
        >
          {currentPage}
        </button>
      </li>
    );
  };

  return (
    <div className={styles['pagination__wrapper']}>
      <div className="text-small text-secondary">
        {props.totalRows} {typeof resultsLabel === 'string' ? resultsLabel : resultsLabel(props.totalRows)}
      </div>
      {getPageCount() > 1 && (
        <nav role="navigation" aria-label={getLabel('pagination.title')} className={styles['pagination']}>
          <ul className={styles['pagination__pages']}>
            {paginationItems.map((item, key) => renderPageButton(item, key))}
          </ul>
        </nav>
      )}
      <Select
        id={`page-size-${id}`}
        label={getLabel('pagination.page-size')}
        hideLabel={true}
        isSearchable={false}
        isClearable={false}
        onChange={(value) => changePageSize(value)}
        value={selectedValue}
        size="small"
        options={paginationOptions}
      />
    </div>
  );
}

export default Pagination;
