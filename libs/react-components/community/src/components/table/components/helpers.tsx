import { ColumnDef, ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import React from 'react';

import { LabelContext } from '../../../../../tedi/src/providers/label-provider';
import Check from '../../form/check/check';
import Icon from '../../icon/icon';
import Tag from '../../tag/tag';
import styles from '../table.module.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getExpandColumn<TData>(id = 'expander', showExpandAll?: boolean): ColumnDef<TData, any> {
  return {
    id,
    header: () => (showExpandAll ? <span>all</span> : null),
    cell: ({ row }) =>
      row.getCanExpand() && (
        <button type="button" className={styles['table__expand']} onClick={row.getToggleExpandedHandler()}>
          <span className="visually-hidden">
            <LabelContext.Consumer>
              {({ getLabel }) => {
                const toggleLabel = getLabel('table.toggle-sub-row');
                return typeof toggleLabel === 'string' ? toggleLabel : toggleLabel(row.getIsExpanded());
              }}
            </LabelContext.Consumer>
          </span>
          <Tag color="default" type="ghost">
            <Icon name={row.getIsExpanded() ? 'remove' : 'add'} size={16} />
          </Tag>
        </button>
      ),
    size: 18,
    maxSize: 18,
    minSize: 18,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getRowSelectionColumn<TData>(id = 'row-selection', showSelectAll?: boolean): ColumnDef<TData, any> {
  return {
    id,
    header: ({ table }) =>
      showSelectAll ? (
        <LabelContext.Consumer>
          {({ getLabel }) => {
            const toggleLabel = getLabel('table.select-all');
            const finalLabel =
              typeof toggleLabel === 'string' ? toggleLabel : toggleLabel(table.getIsAllRowsSelected());

            return (
              <Check
                id={`${id}-header`}
                label={finalLabel}
                hideLabel
                value="row-expander-header"
                name={`${id}-header`}
                checked={table.getIsAllRowsSelected()}
                indeterminate={table.getIsSomeRowsSelected()}
                onChange={() => table.toggleAllRowsSelected()}
              />
            );
          }}
        </LabelContext.Consumer>
      ) : null,
    cell: ({ row }) => {
      return (
        <LabelContext.Consumer>
          {({ getLabel }) => {
            const toggleLabel = getLabel('table.select-row');
            const finalLabel = typeof toggleLabel === 'string' ? toggleLabel : toggleLabel(row.getIsSelected());

            if (!row.getCanSelect()) {
              return null;
            }

            return (
              <Check
                id={`${id}-${row.id}`}
                name={`${id}-${row.id}`}
                label={finalLabel}
                hideLabel
                value={`${id}-${row.id}`}
                checked={row.getIsSelected()}
                onChange={() => row.toggleSelected()}
              />
            );
          }}
        </LabelContext.Consumer>
      );
    },
    size: 18,
    maxSize: 18,
    minSize: 18,
  };
}

export function useDefaultPagination(
  initial: PaginationState = { pageIndex: 0, pageSize: 10 },
  /**
   * Optionally pass filter state to reset pageIndex to 0
   * If filter property changes, reset pageIndex to 0
   */
  filter?: ColumnFiltersState
) {
  const [pagination, setPagination] = React.useState<PaginationState>(initial);

  /**
   * If filter property changes, reset pageIndex to 0
   */
  React.useEffect(() => {
    setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
  }, [filter, setPagination]);

  return {
    pagination,
    setPagination,
    size: pagination.pageSize,
    page: pagination.pageIndex + 1,
  };
}

export function useDefaultSorting(initial: SortingState = []) {
  const [sorting, setSorting] = React.useState<SortingState>(initial);

  const sort = sorting.length ? sorting.map((sort) => `${sort.id}:${sort.desc ? 'desc' : 'asc'}`) : undefined;

  return { sorting, setSorting, sort };
}

export function useDefaultFiltering(initial: ColumnFiltersState = []) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(initial);
  const [filter, setFilter] = React.useState({});

  React.useEffect(() => {
    let newFilter = {};
    columnFilters.forEach((f) => (newFilter = { ...newFilter, [f.id]: f.value }));

    setFilter(newFilter);
  }, [columnFilters]);

  return { columnFilters, setColumnFilters, filter };
}
