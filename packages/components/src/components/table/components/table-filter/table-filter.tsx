import { Column, Row as TableRow } from '@tanstack/react-table';
import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../../../providers/label-provider';
import Button from '../../../button/button';
import { Card, CardContent } from '../../../card';
import { Col } from '../../../grid';
import { Tooltip, TooltipProvider, TooltipTrigger } from '../../../tooltip';
import styles from '../../table.module.scss';
import { DefaultTData } from '../../table.types';
import { TableSelectFilter } from './components/table-select-filter';
import { TableTextFilter } from './components/table-text-filter';
import { TableFilterContext, TableFilterFields } from './table-filter-context';

export interface TableFilterProps<TData extends DefaultTData<TData>> {
  column: Column<TData, unknown>;
  rows: TableRow<TData>[];
}

export function TableFilter<TData extends DefaultTData<TData>>(props: TableFilterProps<TData>): JSX.Element | null {
  const { column, rows } = props;
  const [open, setOpen] = React.useState(false);
  const { getLabel } = useLabels();
  const inputType = column.columnDef.filterFn;
  const filterValue = column.getFilterValue() as string | string[];

  const values: TableFilterFields = {
    filter: inputType !== 'select' && inputType !== 'multi-select' && !!filterValue ? (filterValue as string) : '',
    selectField: inputType === 'select' && !!filterValue ? (filterValue as string) : '',
    multiSelectField: inputType === 'multi-select' && filterValue?.length ? (filterValue as string[]) : [],
  };

  return (
    <TableFilterContext.Provider value={{ column, rows, values, open, setOpen }}>
      <Col width="auto">
        <TooltipProvider
          openWith="click"
          open={open}
          onToggle={setOpen}
          focusManager={{ order: ['content'], modal: true }}
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
          <Tooltip>
            <Card type="borderless">
              <CardContent padding="xsmall">
                {inputType === 'multi-select' || inputType === 'select' ? <TableSelectFilter /> : <TableTextFilter />}
              </CardContent>
            </Card>
          </Tooltip>
        </TooltipProvider>
      </Col>
    </TableFilterContext.Provider>
  );
}

export default TableFilter;
