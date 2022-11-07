import cn from 'classnames';
import paginate from 'jw-paginate';
import React from 'react';

import { useLabels } from '../../../../providers/label-provider';
import Select, { ISelectOption, TSelectValue } from '../../../form/select/select';
import { Icon } from '../../../icon/icon';
import { TableContext } from '../../table-context';
import styles from './pagination.module.scss';

export interface PaginationProps {
  totalRows?: number;
}

const Pagination = (props: PaginationProps): JSX.Element | null => {
  const { getLabel } = useLabels();
  const { table, id } = React.useContext(TableContext);

  if (table === null) {
    return null;
  }

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
  } = table;
  const { pageIndex, pageSize } = getState().pagination;

  const pagesToShow = paginate(props.totalRows || 1, pageIndex, pageSize, 6).pages;

  const changePageSize = (option: TSelectValue) => {
    const value = parseInt((option as ISelectOption)?.value || '10');
    setPageSize(value);
  };

  return (
    <div className={styles['pagination__wrapper']}>
      <div className="text-small text-secondary">
        {props.totalRows} {getLabel('pagination.results')}
      </div>
      {getPageCount() > 1 && (
        <div className={styles['pagination']}>
          <ul className={styles['pagination__pages']}>
            <li className={styles['pagination__arrow-item']}>
              <button
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
            {pagesToShow.map((p, index) => (
              <li key={index}>
                <button
                  className={cn(styles['pagination__page'], {
                    [styles['pagination__page--current']]: p - 1 === pageIndex,
                  })}
                  onClick={() => {
                    setPageIndex(p - 1);
                    toggleAllRowsExpanded(false);
                  }}
                >
                  {p}
                </button>
              </li>
            ))}
            <li className={styles['pagination__arrow-item']}>
              <button
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
          </ul>
        </div>
      )}
      <Select
        id={`page-size-${id}`}
        label={getLabel('pagination.page-size')}
        hideLabel={true}
        isSearchable={false}
        isClearable={false}
        onChange={(value) => changePageSize(value)}
        value={{ value: pageSize.toString(), label: pageSize.toString() }}
        size="small"
        options={[
          { value: '5', label: '5' },
          { value: '10', label: '10' },
          { value: '20', label: '20' },
        ]}
      />
    </div>
  );
};

export default Pagination;
