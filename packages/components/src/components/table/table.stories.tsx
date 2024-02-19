import { faker } from '@faker-js/faker';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

import { getBackgroundColorClass } from '../../helpers/background-colors/background-colors';
import Anchor from '../anchor/anchor';
import { Card, CardContent } from '../card';
import Status from '../status/status';
import Tag from '../tag/tag';
import Heading from '../typography/heading/heading';
import { VerticalSpacing } from '../vertical-spacing';
import { CustomExpandRowExample } from './components/examples/custom-expand-row';
import {
  CustomizeTableCell,
  getExpandColumn,
  getRowSelectionColumn,
  useDefaultPagination,
  useDefaultSorting,
} from './index';
import Table from './table';
import { TableProps } from './table.types';

const meta: Meta<typeof Table> = {
  component: Table,
  argTypes: {
    data: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<TableProps<Person>>;

type Person = {
  firstName: string;
  lastName: string;
  personName: string;
  age: number;
  visits: number;
  status: 'Single' | 'In Relationship' | 'Complicated';
  progress: number;
  subRows?: Person[];
  rowClassName?: string;
  rowGroupKey?: string;
  dateOfBirth: string;
};

function calculateAge(birthday: Date) {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const createRandomPerson = (isSubRow: boolean): Person => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  personName: faker.person.fullName(),
  age: calculateAge(faker.date.birthdate()),
  visits: Number(faker.number.int(99)),
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
  dateOfBirth: faker.date.past().toISOString(),
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

const CardTemplate: StoryFn<TableProps<Person>> = (args) => (
  <Card>
    <CardContent>
      <VerticalSpacing>
        <Heading>Table header</Heading>
        <Table<Person> {...args} className="sb-unstyled" />
      </VerticalSpacing>
    </CardContent>
  </Card>
);

export const Default: Story = {
  args: {
    data: data(),
    columns,
    id: 'table-1',
  },
};

export const Borderless: Story = {
  render: CardTemplate,

  args: {
    data: data(),
    columns,
    id: 'table-borderless',
    hideCardBorder: true,
  },
};

export const RowsBorderless: Story = {
  args: {
    data: data(10),
    columns: columns.map((column) => ({ ...column, enableSorting: false })),
    id: 'borderless-table',
    hidePagination: true,
    hideRowBorder: true,
    hideCardBorder: true,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: columns,
    id: 'table-loading',
    isLoading: true,
  },
};

export const LoadingBorderless: Story = {
  render: CardTemplate,

  args: {
    data: [],
    columns: columns,
    id: 'table-loading-borderless',
    cardProps: {
      borderless: true,
    },
    isLoading: true,
  },
};

export const LoadingWithoutPagination: Story = {
  render: CardTemplate,

  args: {
    data: [],
    columns: columns,
    id: 'table-loading-without-pagination',
    isLoading: true,
    hidePagination: true,
  },
};

export const Error: Story = {
  args: {
    data: [],
    columns,
    id: 'error-table',
    isError: true,
  },
};

export const FullWidthSubComponent: Story = {
  args: {
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
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </VerticalSpacing>
          </td>
        </tr>
      );
    },
    getRowCanExpand: (row) => row.index % 4 !== 0,
    id: 'table-2',
  },
};

export const WithSubComponent: Story = {
  args: {
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
  },
};

export const RowSelection: Story = {
  args: {
    data: data(),
    columns: [getRowSelectionColumn('test', true), ...columns],
    id: 'row-selection-table',
  },
};

export const WithSubRow: Story = {
  args: {
    data: data(),
    columns: [getExpandColumn(), ...columns],
    id: 'table-4',
    getRowCanExpand: (row) => !!row.original.subRows?.length,
  },
};

export const WithCustomizedCells: Story = {
  args: {
    data: data(),
    columns: [
      columnHelper.accessor('firstName', {
        id: 'personName',
        cell: (info) => (
          <CustomizeTableCell className={getBackgroundColorClass('primary-highlight')}>
            <Anchor href="#">{`${info.row.original.firstName} ${info.row.original.lastName}`}</Anchor>
          </CustomizeTableCell>
        ),
        header: () => 'Child',
      }),
      ...columns.slice(1),
    ],
    id: 'table-5',
  },
};

export const WithCustomizedRows: Story = {
  args: {
    data: data().map((entity) => ({
      ...entity,
      rowClassName: entity.status === 'In Relationship' ? getBackgroundColorClass('primary-highlight') : '',
    })),
    columns: [getExpandColumn(), ...columns],
    id: 'table-6',
  },
};

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
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
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

export const WithClickableRows: Story = {
  args: {
    data: data(),
    onRowClick: (row: Person) => console.log(row),
    columns: clickableRowColumns,
    id: 'clickable-rows-table',
  },
};

export const ServerSidePaginationAndSorting = (): JSX.Element => {
  const { page, pagination, setPagination, size } = useDefaultPagination();
  const { sorting, setSorting } = useDefaultSorting();

  const currentData = data(500);
  const getData = React.useMemo(() => currentData.slice((page - 1) * size, page * size), [currentData, page, size]);

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

export const Small: Story = {
  args: {
    data: data(),
    columns,
    id: 'small-table',
    size: 'small',
  },
};

export const GroupedRows: Story = {
  args: {
    data: data(50),
    columns,
    id: 'grouped-rows-table',
    cardProps: {
      padding: 1,
    },
    enableSorting: false,
    groupRowsBy: 'status',
    renderGroupHeading: (row) => (
      <td>
        <span className="sr-only">Status group: </span>
        <span>{row.original.rowGroupKey}</span>
      </td>
    ),
  },

  parameters: {
    docs: {
      description: {
        story:
          'Grouped rows render a group header row and make grouped rows more compact. Rows, that match `groupRowsBy` condition, are grouped in place of first occurrance without modifying the order of rest of the data.',
      },
    },
  },
};

export const GroupedRowsFromData: Story = {
  args: {
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
      padding: 1,
    },
    enableSorting: false,
    renderGroupHeading: (row) => <td>Age group: {row.original.rowGroupKey}</td>,
  },

  parameters: {
    docs: {
      description: {
        story:
          'Row grouping can also be achieved by having rowGroupKey in data objects. It is possible to group only some of the rows.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
    id: 'empty-table',
    placeholder: {
      children: 'Table is empty',
    },
  },
};

export const WithFilters: Story = {
  args: {
    data: data(),
    columns,
    id: 'with-filters-table',
    enableFilters: true,
  },
};

export const WithSelectFilters: Story = {
  args: {
    data: data(),
    columns: columns.map((column) => ({ ...column, filterFn: 'select' })),
    id: 'with-selected-filters-table',
    enableFilters: true,
  },
};

export const WithMultiSelectFilters: Story = {
  args: {
    data: data(),
    columns: columns.map((column) => ({ ...column, filterFn: 'multi-select' })),
    id: 'with-multi-selected-filters-table',
    enableFilters: true,
  },
};

export const WithDateFilters: Story = {
  args: {
    data: data(),
    columns: [
      columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
        id: 'personName',
        cell: (info) => {
          return <Anchor href="#">{`${info.row.original.firstName} ${info.row.original.lastName}`}</Anchor>;
        },
        header: () => 'Child',
        enableColumnFilter: false,
      }),
      columnHelper.accessor('dateOfBirth', {
        header: () => 'Date of Birth',
        cell: (info) => `${dayjs(info.row.original.dateOfBirth).format('DD.MM.YYYY')}`,
        filterFn: 'date-range',
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
    ],
    id: 'with-date-filters-table',
    enableFilters: true,
  },
};

export const WithFiltersControlledFromOutside: Story = {
  args: {
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
          .slice(0, 5)
          .map((value) => ({ value, label: `${value}-label`, id: `${value}-filter` })),
      },
    })),
    enableFilters: true,
  },

  parameters: {
    docs: {
      description: {
        story: `Filters can be controlled from outside by passing 'columnFilters' and 'onColumnFiltersChange' props. 'columnFilters' is an array of objects with 'id' and 'value' properties. 'id' is the column id and 'value' is an array of selected values. <br />
        'onColumnFiltersChange' is a function that is called when filters are changed. It receives an array of objects with 'id' and 'value' properties. <br />
        To customy column filter choiceGroup items pass meta.filterOptions to ColumnDef. It is an array of ChoiceGroupItems or string.`,
      },
    },
  },
};

export const DisableSorting: Story = {
  args: {
    data: data(),
    columns,
    id: 'disabled-sort-table',
    enableSorting: false,
  },

  parameters: {
    docs: {
      description: {
        story:
          'Sorting can be disabled for all columns using `<Table enableSorting={false} />` or by defining `enableSorting: false` in individual column',
      },
    },
  },
};

export const WithFooter: Story = {
  args: {
    id: 'footer-table',
    hidePagination: true,
    data: data(10),
    columns: [
      ...columns
        .slice(0, 1)
        .map((c) => ({ ...c, footer: () => <strong>Average profile progress</strong> } as typeof c)),
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
  },
};

export { CustomExpandRowExample };
