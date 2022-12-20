import { ColumnDef, ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import React from 'react';

import { LabelContext } from '../../../providers/label-provider';
import ChoiceGroup from '../../form/choice-group/choice-group';
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
          <Tag color="default" type="ghost" size="small">
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
          {({ getLabel }) => (
            <ChoiceGroup
              items={[
                {
                  id: `${id}-header`,
                  label: getLabel('table.select-all'),
                  hideLabel: true,
                  value: 'row-expander-header',
                  onChange: () => table.toggleAllRowsSelected(),
                },
              ]}
              id={`${id}-choice-header`}
              name="row-expander-choice-header"
              label={getLabel('table.select-all')}
              inputType="checkbox"
              hideLabel={true}
              value={table.getIsAllRowsSelected() ? 'row-expander-header' : null}
              onChange={() => null} // To allow outside controlled state
            />
          )}
        </LabelContext.Consumer>
      ) : null,
    cell: ({ row }) => {
      return (
        <LabelContext.Consumer>
          {({ getLabel }) => (
            <ChoiceGroup
              items={[
                {
                  id: `${id}-${row.id}`,
                  label: getLabel('table.select-row'),
                  hideLabel: true,
                  value: `${id}-${row.id}`,
                  onChange: row.getToggleSelectedHandler(),
                },
              ]}
              id={`${id}-choice-${row.id}`}
              name={`${id}-${row.id}`}
              label={getLabel('table.select-row')}
              inputType="checkbox"
              hideLabel={true}
              value={row.getIsSelected() ? `${id}-${row.id}` : null}
              onChange={() => null} // To allow outside controlled state
            />
          )}
        </LabelContext.Consumer>
      );
    },
    size: 18,
    maxSize: 18,
    minSize: 18,
  };
}

export function useDefaultPagination(initial: PaginationState = { pageIndex: 0, pageSize: 10 }) {
  const [pagination, setPagination] = React.useState<PaginationState>(initial);

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
