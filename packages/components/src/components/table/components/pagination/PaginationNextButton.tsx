import { Table as TableType } from '@tanstack/table-core';
import React from 'react';

import { useLabels } from '../../../../providers/label-provider';
import Icon from '../../../icon/icon';
import { TableContext } from '../../table-context';
import styles from './pagination.module.scss';

export interface PaginationNextButtonProps {
  type: 'next' | 'previous';
}

const PaginationNextButton = ({ type }: PaginationNextButtonProps) => {
  const { table } = React.useContext(TableContext);
  const { getLabel } = useLabels();

  const { getCanPreviousPage, getCanNextPage, nextPage, previousPage, toggleAllRowsExpanded } =
    table as TableType<unknown>;

  const isNext = type === 'next';

  return (
    <li className={styles['pagination__arrow-item']}>
      <button
        type="button"
        className={styles['pagination__arrow']}
        disabled={isNext ? !getCanNextPage() : !getCanPreviousPage()}
        onClick={() => {
          isNext ? nextPage() : previousPage();
          toggleAllRowsExpanded(false);
        }}
      >
        <span className="visually-hidden">{getLabel(`pagination.${isNext ? 'next' : 'prev'}-page`)}</span>
        <Icon name={isNext ? 'arrow_forward' : 'arrow_back'} size={16} />
      </button>
    </li>
  );
};

export default PaginationNextButton;
