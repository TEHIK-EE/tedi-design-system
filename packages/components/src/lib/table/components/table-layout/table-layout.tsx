import { flexRender, HeaderGroup, SortDirection } from '@tanstack/react-table';
import cn from 'classnames';
import React from 'react';

import { Col, Row } from '../../../grid';
import Icon from '../../../icon/icon';
import styles from '../../table.module.scss';
import { DefaultTData } from '../../table.types';
import { TableContext } from '../../table-context';
import TableFilter from '../table-filter/table-filter';
import TableLoader from '../table-loader/table-loader';

export function TableLayout<TData extends DefaultTData<TData>>(): JSX.Element | null {
  const { table, id, renderSubComponent, isLoading } = React.useContext(TableContext);

  if (table === null) {
    return null;
  }

  const { getHeaderGroups, getRowModel } = table;

  const getSortIcon = (sortingDirection: false | SortDirection): JSX.Element => {
    const SortIconBEM = cn('text-disabled', {
      [styles['sort__icon']]: true,
      [styles['sorted__icon--desc']]: sortingDirection === 'desc',
      [styles['sorted__icon--asc']]: sortingDirection === 'asc',
    });
    return <Icon name={sortingDirection ? 'expand_more' : 'unfold_more'} className={SortIconBEM} />;
  };

  return (
    <table id={id}>
      <thead>
        {(getHeaderGroups() as HeaderGroup<TData>[]).map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{ width: header.getSize() }}
                className={cn({ [styles['th--sortable']]: header.column.getCanSort() })}
              >
                {header.isPlaceholder ? null : (
                  <Row gutterX={0} alignItems="center" wrap="nowrap">
                    <Col onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </Col>
                    {header.column.getCanSort() && (
                      <Col align="center" width="auto" onClick={header.column.getToggleSortingHandler()}>
                        {getSortIcon(header.column.getIsSorted())}
                      </Col>
                    )}
                    {header.column.getCanFilter() ? <TableFilter<TData> column={header.column} /> : null}
                  </Row>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {isLoading ? (
          <TableLoader />
        ) : (
          getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              <tr
                key={row.id}
                className={cn(row.original.rowClassName, {
                  [styles['table__row--clickable']]: !!row.original.onClick,
                })}
                onClick={() => row.original.onClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && renderSubComponent && renderSubComponent(row)}
            </React.Fragment>
          ))
        )}
        {}
      </tbody>
    </table>
  );
}

export default TableLayout;
