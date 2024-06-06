import { Table as TableType } from '@tanstack/table-core';
import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../../../providers/label-provider';
import Select, { ISelectOption, TSelectValue } from '../../../form/select/select';
import Text from '../../../typography/text/text';
import { DefaultTData } from '../../table.types';
import { TableContext } from '../../table-context';
import styles from './pagination.module.scss';
import PaginationNextButton from './PaginationNextButton';
import PaginationPageButton from './PaginationPageButton';
import usePagination, { UsePaginationItem } from './use-pagination';

export interface PaginationProps {
  totalRows: number;
}

const Pagination = <TData extends DefaultTData<TData>>(props: PaginationProps): JSX.Element | null => {
  const { getLabel } = useLabels();
  const { table, id } = React.useContext(TableContext);
  const resultsLabel = getLabel('pagination.results');

  const { setPageSize, getState, getPageCount } = table as TableType<TData>;
  const { pageIndex, pageSize } = getState().pagination;
  const paginationOptions = [
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
  ];
  const totalPages = Math.ceil(props.totalRows / pageSize);

  const { paginationItems } = usePagination({
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

  const renderPaginationButton = (item: UsePaginationItem, index: number) => {
    if (item.type === 'previous' || item.type === 'next') {
      return <PaginationNextButton type={item.type} key={index} />;
    }

    if (item.type === 'ellipsis') {
      return (
        <li key={index} className={cn(styles['pagination__page'])}>
          ...
        </li>
      );
    }

    return <PaginationPageButton item={item} key={index} />;
  };

  return (
    <div className={styles['pagination__wrapper']}>
      <Text color="muted" modifiers="small">
        {props.totalRows} {typeof resultsLabel === 'string' ? resultsLabel : resultsLabel(props.totalRows)}
      </Text>
      {getPageCount() > 1 && (
        <nav role="navigation" aria-label={getLabel('pagination.title')} className={styles['pagination']}>
          <ul className={styles['pagination__pages']}>
            {paginationItems.map((item, key) => renderPaginationButton(item, key))}
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
};

export default Pagination;
