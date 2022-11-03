import { Meta, Story } from '@storybook/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import React from 'react';

import Anchor from '../anchor/anchor';
import Button from '../button/button';
import { Card, CardContent } from '../card';
import { getBackgroundColorClass } from '../colors/colors';
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
};

const data: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 1,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
    subRows: [
      {
        firstName: 'Sub',
        lastName: 'Row',
        age: 2,
        visits: 40,
        status: 'Single',
        progress: 80,
      },
    ],
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 2,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 3,
    visits: 20,
    status: 'Complicated',
    progress: 10,
    subRows: [
      {
        firstName: 'Sub',
        lastName: 'Row',
        age: 2,
        visits: 40,
        status: 'Single',
        progress: 80,
      },
      {
        firstName: 'Sub',
        lastName: 'Row',
        age: 2,
        visits: 40,
        status: 'Single',
        progress: 80,
      },
      {
        firstName: 'Sub',
        lastName: 'Row',
        age: 2,
        visits: 40,
        status: 'Single',
        progress: 80,
      },
    ],
  },
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 10,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 11,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 12,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 100,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 22,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 20,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

const columnHelper = createColumnHelper<Person>();

// eslint-disable-next-line
const columns: ColumnDef<Person, any>[] = [
  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: 'personName',
    cell: (info) => {
      return <Anchor url="#">{`${info.row.original.firstName} ${info.row.original.lastName}`}</Anchor>;
    },
    header: () => 'Laps',
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
  data,
  columns,
  id: 'table-1',
};

export const Borderless = CardTemplate.bind({});
Borderless.args = {
  data,
  columns,
  id: 'table-borderless',
  cardProps: {
    type: 'borderless',
  },
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

export const FullWidthSubComponent = Template.bind({});

FullWidthSubComponent.args = {
  data,
  columns: [getExpandColumn(), ...columns],
  renderSubComponent: (row: any) => {
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
  getRowCanExpand: (row: any) => row.index % 4 !== 0,
  id: 'table-2',
};

export const WithSubComponent = Template.bind({});

WithSubComponent.args = {
  data,
  columns: [getExpandColumn(), ...columns],
  renderSubComponent: () => {
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
          <Tag>Aktiivne</Tag>
        </td>
      </tr>
    );
  },
  getRowCanExpand: (row: any) => row.index % 4 !== 0,
  id: 'table-3',
};

export const RowSelection = Template.bind({});

RowSelection.args = {
  data,
  columns: [getRowSelectionColumn('test', true), ...columns],
  id: 'row-selection-table',
};

export const WithSubRow = Template.bind({});

WithSubRow.args = {
  data,
  columns: [getExpandColumn(), ...columns],
  id: 'table-4',
  getRowCanExpand: (row: any) => !!row.original.subRows?.length,
};
export const WithCustomizedCells = Template.bind({});

WithCustomizedCells.args = {
  data,
  columns: [
    columnHelper.accessor('firstName', {
      id: 'personName',
      cell: (info) => (
        <CustomizeTableCell className={getBackgroundColorClass('primary-1')}>
          <Anchor url="#">{`${info.row.original.firstName} ${info.row.original.lastName}`}</Anchor>
        </CustomizeTableCell>
      ),
      header: () => 'Laps',
    }),
    ...columns.slice(1),
  ],
  id: 'table-5',
};

export const WithCustomizedRows = Template.bind({});

WithCustomizedRows.args = {
  data: data.map((entity) => ({
    ...entity,
    rowClassName: entity.status === 'In Relationship' ? getBackgroundColorClass('primary-1') : '',
  })),
  columns: [getExpandColumn(), ...columns],
  id: 'table-6',
};

export const WithClickableRows = Template.bind({});

const clickableRowColumns = [...columns];
clickableRowColumns[0] = columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
  id: 'personName',
  header: () => 'Laps',
});
clickableRowColumns.push(
  columnHelper.accessor((row) => `${row.firstName}-${row.age}`, {
    id: 'view',
    cell: () => <Button text="Vaata" iconLeft="visibility" type="link" url="#" />,
    header: () => <span className="visually-hidden">Ava profiil</span>,
    enableSorting: false,
  })
);

WithClickableRows.args = {
  data: data.map((entity) => ({
    ...entity,
    onClick: (row: Person) => console.log(row),
  })),
  columns: clickableRowColumns,
  id: 'clickable-rows-table',
};

export const ServerSidePaginationAndSorting = (): JSX.Element => {
  const { page, pagination, setPagination, size } = useDefaultPagination();
  const { sorting, setSorting } = useDefaultSorting();

  const getData = React.useMemo(() => data.slice(page * size, page * size), [page, size]);

  return (
    <Table<Person>
      columns={columns}
      data={getData}
      id="table-pagination"
      pagination={pagination}
      sorting={sorting}
      totalRows={data.length}
      onPaginationChange={setPagination}
      onSortingChange={setSorting}
    />
  );
};

export const WithFilters = Template.bind({});

WithFilters.args = {
  data,
  columns: [...columns],
  id: 'row-selection-table',
  enableFilters: true,
};
