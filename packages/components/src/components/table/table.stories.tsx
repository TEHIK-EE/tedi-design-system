import { faker } from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import React from 'react';

import Anchor from '../anchor/anchor';
import { getBackgroundColorClass } from '../background-colors/background-colors';
import { Card, CardContent } from '../card';
import Heading from '../heading/heading';
import Status from '../status/status';
import Tag from '../tag/tag';
import { VerticalSpacing } from '../vertical-spacing';
import {
  CustomizeTableCell,
  getExpandColumn,
  getRowSelectionColumn,
  useDefaultPagination,
  useDefaultSorting,
} from './index';
import Table from './table';
import { TableProps } from './table.types';

export default {
  title: 'components/Table',
  component: Table,
  argTypes: {
    data: {
      control: false,
    },
  },
} as Meta;

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: 'Single' | 'In Relationship' | 'Complicated';
  progress: number;
  subRows?: Person[];
  rowClassName?: string;
  rowGroupKey?: string;
};

function calculateAge(birthday: Date) {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const createRandomPerson = (isSubRow: boolean): Person => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: calculateAge(faker.date.birthdate()),
  visits: Number(faker.random.numeric(2)),
  status: faker.helpers.arrayElement(['Single', 'Complicated', 'In Relationship']),
  progress: Math.floor(Math.random() * 101),
  subRows: isSubRow
    ? undefined
    : faker.helpers.maybe(
        () => faker.helpers.arrayElements(Array.from(Array(5).keys()).map(() => createRandomPerson(true))),
        {
          probability: 0.2,
        }
      ),
});

const data = (length = 507): Person[] => Array.from(Array(length).keys()).map(() => createRandomPerson(false));

const columnHelper = createColumnHelper<Person>();

// eslint-disable-next-line
const columns: ColumnDef<Person, any>[] = [
  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: 'personName',
    cell: (info) => {
      return <Anchor href="#">{`${info.row.original.firstName} ${info.row.original.lastName}`}</Anchor>;
    },
    header: () => 'Child',
    sortingFn: (a, b) => {
      return `${a.original.firstName} ${a.original.lastName}`.localeCompare(
        `${b.original.firstName} ${b.original.lastName}`
      );
    },
  }),
  columnHelper.accessor((row) => `${row.age}`, {
    id: 'age',
    header: () => 'Age',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor((row) => `${row.visits}`, {
    header: () => <span>Visits</span>,
    id: 'visits',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <Status type={info.row.original.status === 'In Relationship' ? 'success' : 'inactive'}>
        {info.renderValue()}
      </Status>
    ),
    enableColumnFilter: false,
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
    enableColumnFilter: false,
  }),
];

const Template: Story<TableProps<Person>> = (args) => <Table<Person> {...args} />;
const CardTemplate: Story<TableProps<Person>> = (args) => (
  <Card>
    <CardContent>
      <VerticalSpacing>
        <h1>Table header</h1>
        <Table<Person> {...args} />
      </VerticalSpacing>
    </CardContent>
  </Card>
);

export const Default = Template.bind({});
Default.args = {
  data: data(),
  columns,
  id: 'table-1',
};

export const Borderless = CardTemplate.bind({});
Borderless.args = {
  data: data(),
  columns,
  id: 'table-borderless',
  hideCardBorder: true,
};

export const RowsBorderless = Template.bind({});
RowsBorderless.args = {
  data: data(10),
  columns: columns.map((column) => ({ ...column, enableSorting: false })),
  id: 'borderless-table',
  hidePagination: true,
  hideRowBorder: true,
  hideCardBorder: true,
};

export const Loading = Template.bind({});

Loading.args = {
  data: [],
  columns: columns,
  id: 'table-loading',
  isLoading: true,
};

export const LoadingBorderless = CardTemplate.bind({});

LoadingBorderless.args = {
  data: [],
  columns: columns,
  id: 'table-loading-borderless',
  cardProps: {
    type: 'borderless',
  },
  isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
  data: [],
  columns,
  id: 'error-table',
  isError: true,
};

export const FullWidthSubComponent = Template.bind({});

FullWidthSubComponent.args = {
  data: data(),
  columns: [getExpandColumn(), ...columns],
  renderSubComponent: (row) => {
    return (
      <tr>
        <td colSpan={row.getVisibleCells().length}>
          <VerticalSpacing>
            <Heading>{`${row.original.firstName} ${row.original.lastName}`}</Heading>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </VerticalSpacing>
        </td>
      </tr>
    );
  },
  getRowCanExpand: (row) => row.index % 4 !== 0,
  id: 'table-2',
};

export const WithSubComponent = Template.bind({});

WithSubComponent.args = {
  data: data(),
  columns: [getExpandColumn(), ...columns],
  renderSubComponent: (row) => {
    return (
      <tr>
        <td></td>
        <td colSpan={2}>
          <div className="text-bold">Koolitused</div>
          <div>Esimene kooltus pika pealkirjaga</div>
          <div>Teine koolitus</div>
          <div>Kolmas koolitus</div>
        </td>
        <td colSpan={2}>
          <div className="text-bold">Lorem ipsum</div>
          <div>Lorem ipsum dolor sit amet</div>
          <div>Lorem ipsum dolor sit amet</div>
          <div>Lorem ipsum dolor sit amet</div>
        </td>
        <td>
          <Tag type="secondary">Aktiivne</Tag>
        </td>
      </tr>
    );
  },
  getRowCanExpand: (row) => row.index % 4 !== 0,
  id: 'table-3',
};

export const RowSelection = Template.bind({});

RowSelection.args = {
  data: data(),
  columns: [getRowSelectionColumn('test', true), ...columns],
  id: 'row-selection-table',
};

export const WithSubRow = Template.bind({});

WithSubRow.args = {
  data: data(),
  columns: [getExpandColumn(), ...columns],
  id: 'table-4',
  getRowCanExpand: (row) => !!row.original.subRows?.length,
};
export const WithCustomizedCells = Template.bind({});

WithCustomizedCells.args = {
  data: data(),
  columns: [
    columnHelper.accessor('firstName', {
      id: 'personName',
      cell: (info) => (
        <CustomizeTableCell className={getBackgroundColorClass('primary-main')}>
          <Anchor href="#">{`${info.row.original.firstName} ${info.row.original.lastName}`}</Anchor>
        </CustomizeTableCell>
      ),
      header: () => 'Child',
    }),
    ...columns.slice(1),
  ],
  id: 'table-5',
};

export const WithCustomizedRows = Template.bind({});

WithCustomizedRows.args = {
  data: data().map((entity) => ({
    ...entity,
    rowClassName: entity.status === 'In Relationship' ? getBackgroundColorClass('primary-main') : '',
  })),
  columns: [getExpandColumn(), ...columns],
  id: 'table-6',
};

export const WithClickableRows = Template.bind({});

const clickableRowColumns = [...columns];
clickableRowColumns[0] = columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
  id: 'personName',
  header: () => 'Child',
});
clickableRowColumns.push(
  columnHelper.accessor((row) => `${row.firstName}-${row.age}`, {
    id: 'view',
    cell: () => (
      <Anchor
        iconLeft="visibility"
        visualType="link"
        href="#"
        onClick={(e: any) => {
          e.stopPropagation();
          console.log('Clicking link in cell. Row click is not called');
        }}
      >
        Vaata
      </Anchor>
    ),
    header: () => <span className="visually-hidden">Ava profiil</span>,
    enableSorting: false,
  })
);

WithClickableRows.args = {
  data: data(),
  onRowClick: (row: Person) => console.log(row),
  columns: clickableRowColumns,
  id: 'clickable-rows-table',
};

export const ServerSidePaginationAndSorting = (): JSX.Element => {
  const { page, pagination, setPagination, size } = useDefaultPagination();
  const { sorting, setSorting } = useDefaultSorting();

  const currentData = data(500);
  const getData = React.useMemo(() => currentData.slice((page - 1) * size, page * size), [page, size]);

  return (
    <Table<Person>
      columns={columns}
      data={getData}
      id="table-pagination"
      pagination={pagination}
      sorting={sorting}
      totalRows={currentData.length}
      onPaginationChange={setPagination}
      onSortingChange={setSorting}
    />
  );
};

export const Small = Template.bind({});
Small.args = {
  data: data(),
  columns,
  id: 'small-table',
  size: 'small',
};

export const GroupedRows = Template.bind({});
GroupedRows.args = {
  data: data(50),
  columns,
  id: 'grouped-rows-table',
  cardProps: {
    padding: 'medium',
  },
  enableSorting: false,
  groupRowsBy: 'status',
  renderGroupHeading: (row) => (
    <td>
      <span className="sr-only">Status group: </span>
      <span>{row.original.rowGroupKey}</span>
    </td>
  ),
};
GroupedRows.parameters = {
  docs: {
    description: {
      story:
        'Grouped rows render a group header row and make grouped rows more compact. Rows, that match `groupRowsBy` condition, are grouped in place of first occurrance without modifying the order of rest of the data.',
    },
  },
};

export const GroupedRowsFromData = Template.bind({});
GroupedRowsFromData.args = {
  data: data(50).map((entity, index) => ({
    ...entity,
    rowGroupKey:
      entity.age < 10
        ? '0 - 9'
        : entity.age >= 10 && entity.age < 30
        ? '10 - 29'
        : entity.age >= 30 && entity.age < 100
        ? '30 - 99'
        : undefined,
  })),
  columns,
  id: 'grouped-rows-from-data-table',
  cardProps: {
    padding: 'medium',
  },
  enableSorting: false,
  renderGroupHeading: (row) => <td>Age group: {row.original.rowGroupKey}</td>,
};
GroupedRowsFromData.parameters = {
  docs: {
    description: {
      story:
        'Row grouping can also be achieved by having rowGroupKey in data objects. It is possible to group only some of the rows.',
    },
  },
};

export const Empty = Template.bind({});
Empty.args = {
  data: [],
  columns,
  id: 'empty-table',
  placeholder: {
    children: 'Table is empty',
  },
};

export const WithFilters = Template.bind({});
WithFilters.args = {
  data: data(),
  columns,
  id: 'with-filters-table',
  enableFilters: true,
};

export const WithSelectFilters = Template.bind({});
WithSelectFilters.args = {
  data: data(),
  columns: columns.map((column) => ({ ...column, filterFn: 'select' })),
  id: 'with-selected-filters-table',
  enableFilters: true,
};

export const WithMultiSelectFilters = Template.bind({});
WithMultiSelectFilters.args = {
  data: data(),
  columns: columns.map((column) => ({ ...column, filterFn: 'multi-select' })),
  id: 'with-multi-selected-filters-table',
  enableFilters: true,
};

export const WithFiltersControlledFromOutside = Template.bind({});
WithFiltersControlledFromOutside.args = {
  id: 'with-multi-selected-filters-table-controlled-from-outside',
  data: data(),
  columnFilters: [{ id: 'age', value: ['1', '10'] }],
  onColumnFiltersChange: (data) => console.log(data),
  columns: columns.map((column) => ({
    ...column,
    filterFn: 'multi-select',
    meta: {
      filterOptions: data()
        .map((row) => row[column.id as keyof Person])
        .slice(0, 5),
    },
  })),
  enableFilters: true,
};

export const DisableSorting = Template.bind({});
DisableSorting.args = {
  data: data(),
  columns,
  id: 'disabled-sort-table',
  enableSorting: false,
};
DisableSorting.parameters = {
  docs: {
    description: {
      story:
        'Sorting can be disabled for all columns using `<Table enableSorting={false} />` or by defining `enableSorting: false` in individual column',
    },
  },
};

export const WithFooter = Template.bind({});
WithFooter.args = {
  id: 'footer-table',
  hidePagination: true,
  data: data(10),
  columns: [
    ...columns.slice(0, 1).map((c) => ({ ...c, footer: () => <strong>Average profile progress</strong> } as typeof c)),
    ...columns.slice(1, 4),
    ...columns.slice(4).map(
      (c) =>
        ({
          ...c,
          footer: (info) => {
            const rows = info.table.getRowModel()?.rows;
            const sum = rows?.reduce((a, c) => a + c.original.progress, 0);
            return Math.round((sum / rows?.length) * 10) / 10;
          },
        } as typeof c)
    ),
  ],
};
