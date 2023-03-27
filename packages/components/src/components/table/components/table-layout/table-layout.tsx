import { flexRender, Header, HeaderGroup, Row as TSRow, SortDirection } from '@tanstack/react-table';
import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../../../providers/label-provider';
import Button from '../../../button/button';
import { Col, Row } from '../../../grid';
import Placeholder from '../../../placeholder/placeholder';
import Print from '../../../print/print';
import styles from '../../table.module.scss';
import { DefaultTData } from '../../table.types';
import { ITableContext, TableContext } from '../../table-context';
import TableFilter from '../table-filter/table-filter';
import TableLoader from '../table-loader/table-loader';

const TableLayout = <TData extends DefaultTData<TData>>(): JSX.Element | null => {
  const { getLabel } = useLabels();
  const {
    table,
    id,
    renderSubComponent,
    isFooterVisible,
    renderGroupHeading,
    onRowClick,
    isLoading,
    isError,
    hideRowBorder,
    placeholder,
    errorPlaceholder,
  } = React.useContext<ITableContext<TData>>(TableContext);

  if (table === null) {
    return null;
  }

  const { getHeaderGroups, getFooterGroups, getRowModel } = table;
  const sortingLabel = getLabel('table.sort');

  const getSortIcon = (sortingDirection: false | SortDirection, cb?: (event: unknown) => void): JSX.Element => {
    const SortIconBEM = cn('text-disabled', {
      [styles['sort__icon']]: true,
      [styles['sorted__icon--desc']]: sortingDirection === 'desc',
      [styles['sorted__icon--asc']]: sortingDirection === 'asc',
    });
    return (
      <Print visibility="show">
        <Button
          visualType="link"
          icon={{
            name: sortingDirection ? 'expand_more' : 'unfold_more',
            className: SortIconBEM,
          }}
          className={cn(styles['sort__button'])}
          onClick={cb}
        >
          <span className="sr-only">
            {typeof sortingLabel === 'string' ? sortingLabel : sortingLabel(sortingDirection)}
          </span>
        </Button>
      </Print>
    );
  };

  const footerColSpan = (headers: Header<TData, unknown>[]) => {
    const index = headers?.findIndex((h) => h.column.columnDef.footer);

    return (index !== -1 ? index : headers?.length) + 1;
  };

  const groupedRows = (): TSRow<TData>[] => {
    let lastKey: string | undefined;

    // find rows that should be in a group
    return getRowModel().rows.map((r, index) => {
      const { rowGroupKey, ...rest } = r.original;
      const newRow = (original: TData) => ({
        ...r,
        original: {
          ...original,
          rowClassName: cn(
            original.rowClassName,
            styles['table__row--group-item'],
            { [styles['table__row--last-group-item']]: getRowModel().rows[index + 1]?.original.rowGroupKey !== lastKey } // if row is last group item
          ),
        },
      });

      if (rowGroupKey && lastKey !== rowGroupKey) {
        lastKey = rowGroupKey;
        // group headers
        return newRow(r.original);
      } else if (rowGroupKey) {
        // group items
        return newRow(rest as typeof r.original);
      }

      lastKey = rowGroupKey;
      return r;
    });
  };

  const handleRowClick = (row: TSRow<TData>) => {
    row.original.onClick?.(row.original);
    onRowClick?.(row.original);
  };

  const renderTableFilterSortRow = (header: Header<TData, unknown>): JSX.Element => (
    <Col width="auto">
      <Row justifyContent="end" gutter={1}>
        {header.column.getCanFilter() ? (
          <TableFilter<TData> column={header.column} rows={table?.getCoreRowModel()?.rows} />
        ) : null}
        {header.column.getCanSort() && (
          <Col align="center" width="auto">
            {getSortIcon(header.column.getIsSorted(), header.column.getToggleSortingHandler())}
          </Col>
        )}
      </Row>
    </Col>
  );

  const renderPlaceholderRow = () => {
    const children = isError ? <Placeholder {...errorPlaceholder} /> : <Placeholder {...placeholder} />;

    return (
      <tr>
        <td colSpan={table?.getAllColumns().length}>{children}</td>
      </tr>
    );
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
                aria-sort={
                  header.column.getIsSorted() === 'asc'
                    ? 'ascending'
                    : header.column.getIsSorted() === 'desc'
                    ? 'descending'
                    : undefined
                }
              >
                {header.isPlaceholder ? null : (
                  <Row alignItems="center" justifyContent="between" wrap="nowrap">
                    <Col onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </Col>
                    {(header.column.getCanFilter() || header.column.getCanSort()) && renderTableFilterSortRow(header)}
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
        ) : groupedRows()?.length ? (
          groupedRows().map((row) => (
            <React.Fragment key={row.id}>
              {row.original.rowGroupKey && (
                <Print breakAfter="avoid">
                  <tr
                    className={cn(
                      row.original.rowClassName
                        ?.replace(styles['table__row--group-item'], '')
                        .replace(styles['table__row--last-group-item'], ''),
                      styles['table__row--group-header'],
                      { [styles['table__row--border-hidden']]: hideRowBorder }
                    )}
                  >
                    {renderGroupHeading ? (
                      renderGroupHeading(row)
                    ) : (
                      <td colSpan={row.getVisibleCells().length}>{row.original.rowGroupKey}</td>
                    )}
                  </tr>
                </Print>
              )}
              <Print breakInside="avoid">
                <tr
                  className={cn(row.original.rowClassName, {
                    [styles['table__row--clickable']]: !!row.original.onClick || !!onRowClick,
                    [styles['table__row--border-hidden']]: hideRowBorder,
                  })}
                  onClick={() => handleRowClick(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              </Print>
              {row.getIsExpanded() && renderSubComponent ? (
                <Print breakBefore="avoid">{renderSubComponent?.(row)}</Print>
              ) : null}
            </React.Fragment>
          ))
        ) : (
          renderPlaceholderRow()
        )}
      </tbody>
      {isFooterVisible && (
        <tfoot>
          {getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header, index) =>
                header.column.columnDef.footer ? (
                  <th key={header.id} colSpan={footerColSpan(footerGroup.headers.slice(index + 1))}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                  </th>
                ) : null
              )}
            </tr>
          ))}
        </tfoot>
      )}
    </table>
  );
};

export default TableLayout;
