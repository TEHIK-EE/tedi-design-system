import { Column, Row as TableRow } from '@tanstack/react-table';
import { FilterFns } from '@tanstack/table-core';
import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../../../providers/label-provider';
import Button from '../../../button/button';
import { Col } from '../../../grid';
import { Tooltip, TooltipProvider, TooltipTrigger } from '../../../tooltip';
import styles from '../../table.module.scss';
import { DefaultTData } from '../../table.types';
import { TableDateFilter } from './components/table-date-filter';
import { TableSelectFilter } from './components/table-select-filter';
import { TableTextFilter } from './components/table-text-filter';
import { DateRangeFilterValues, TableFilterContext, TableFilterFields } from './table-filter-context';

export interface TableFilterProps<TData extends DefaultTData<TData>> {
  column: Column<TData, unknown>;
  rows: TableRow<TData>[];
}

const TableFilter = <TData extends DefaultTData<TData>>(props: TableFilterProps<TData>): JSX.Element | null => {
  const { column, rows } = props;
  const [open, setOpen] = React.useState(false);
  const { getLabel } = useLabels();
  const inputType = column.columnDef.filterFn;
  const filterValue = column.getFilterValue();

  const isText = (value: unknown): value is string => {
    return typeof value === 'string';
  };

  const isMultiSelect = (value: unknown): value is string[] => {
    return Array.isArray(value);
  };

  const isDateRange = (value: unknown): value is DateRangeFilterValues => {
    return typeof value === 'object' && value !== null && ('from' in value || 'to' in value);
  };

  const values: TableFilterFields = React.useMemo(
    () => ({
      filter: (inputType === 'auto' || inputType === 'text') && isText(filterValue) ? filterValue : '',
      selectField: inputType === 'select' && isText(filterValue) ? filterValue : '',
      multiSelectField: inputType === 'multi-select' && isMultiSelect(filterValue) ? filterValue : [],
      dateRange:
        ['date-range', 'date-range-period'].includes(inputType as keyof FilterFns) && isDateRange(filterValue)
          ? filterValue
          : { from: null, to: null },
    }),
    [inputType, filterValue]
  );

  const renderFilter = () => {
    switch (inputType) {
      case 'date-range':
      case 'date-range-period':
        return <TableDateFilter />;
      case 'multi-select':
      case 'select':
        return <TableSelectFilter />;
      default:
        return <TableTextFilter />;
    }
  };

  return (
    <TableFilterContext.Provider value={{ column, rows, values, open, setOpen }}>
      <Col width="auto">
        <TooltipProvider
          openWith="click"
          open={open}
          onToggle={setOpen}
          focusManager={{ order: ['content'], initialFocus: 0, modal: true }}
        >
          <TooltipTrigger>
            <Button
              visualType="link"
              icon={{
                name: 'filter_alt',
                className: cn(styles['filter__icon'], {
                  [styles['filter__icon--active']]: !!column.getFilterValue() || open,
                }),
              }}
              className={cn(styles['filter__button'], 'show-print')}
            >
              <span className="sr-only">{getLabel('table.filter')}</span>
            </Button>
          </TooltipTrigger>
          <Tooltip maxWidth="large" cardProps={{ padding: { horizontal: 1, vertical: 0.5 } }}>
            {renderFilter()}
          </Tooltip>
        </TooltipProvider>
      </Col>
    </TableFilterContext.Provider>
  );
};

export default TableFilter;
