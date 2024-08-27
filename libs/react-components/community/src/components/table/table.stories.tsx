import { faker } from '@faker-js/faker';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import {
  ColumnDef,
  ColumnFiltersState,
  createColumnHelper,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import React from 'react';

import { VerticalSpacing } from '../../../../tedi/src/components/vertical-spacing';
import { getBackgroundColorClass } from '../../helpers/background-colors/background-colors';
import { IntentionalAny } from '../../types';
import Anchor from '../anchor/anchor';
import { Card, CardContent } from '../card';
import Check from '../form/check/check';
import Status from '../status/status';
import Tag from '../tag/tag';
import Heading from '../typography/heading/heading';
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
  title: 'Community/Table',
  argTypes: {
    data: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<TableProps<Person>>;

type Person = {
  id: string;
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
  employment: {
    startDate: string;
    endDate: string;
  };
};

function calculateAge(birthday: Date) {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const createRandomPerson = (isSubRow: boolean): Person => {
  const employmentStart = faker.date.past();

  return {
    id: faker.database.mongodbObjectId(),
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
    employment: {
      startDate: employmentStart.toISOString(),
      endDate: dayjs(employmentStart).add(5, 'days').toISOString(),
    },
  };
};

const data = (length = 507): Person[] => Array.from(Array(length).keys()).map(() => createRandomPerson(false));

const columnHelper = createColumnHelper<Person>();

const columns: ColumnDef<Person, IntentionalAny>[] = [
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

const columnsWithFooter = [
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
            <div className="text-bold">Trainings</div>
            <div>Firs trainging with long title</div>
            <div>Second training</div>
            <div>Third training</div>
          </td>
          <td colSpan={2}>
            <div className="text-bold">Lorem ipsum</div>
            <div>Lorem ipsum dolor sit amet</div>
            <div>Lorem ipsum dolor sit amet</div>
            <div>Lorem ipsum dolor sit amet</div>
          </td>
          <td>
            <Tag type="secondary">Active</Tag>
          </td>
        </tr>
      );
    },
    getRowCanExpand: (row) => row.index % 4 !== 0,
    id: 'table-3',
  },
};

/**
 * It's recommended to use getRowId when using row selection to ensure correct row selection state with server side pagination/filtering. <br />
 * When using select all toggle and serverSide pagination bear in mind that all rows are not loaded at once and select all will only select the rows that are in current page.
 */
export const RowSelection: Story = {
  args: {
    data: data(),
    columns: [getRowSelectionColumn('test', true), ...columns],
    id: 'row-selection-table',
    getRowId: (row) => row.id,
  },
};

/**
 * Row selection can be controlled from outside by passing 'rowSelection' and 'onRowSelectionChange' props. 'rowSelection' is an object with row id as key and boolean as value. <br />
 * enableRowSelection is a function that is called for each row to determine if row can be selected. @defaults to true <br />
 */
export const RowSelectionControlledFromOutside: Story = {
  args: {
    data: data(),
    columns: [getRowSelectionColumn('test-2', true), ...columns],
    id: 'row-selection-table-outside',
    getRowId: (row) => row.id,
    enableRowSelection: (row) => row.original.age > 40,
  },
  render: (args) => {
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

    return (
      <Table
        {...args}
        rowSelection={rowSelection}
        onRowSelectionChange={(rowSelection) => setRowSelection(rowSelection)}
      />
    );
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

/**
 * `<CustomizeTableCell>` component allows us to modify the td element in the table.
 * It allows us to add custom classNames or change vertical alignment.
 */
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
    header: () => <span className="visually-hidden">Open profile</span>,
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

/**
 * Grouped rows render a group header row and make grouped rows more compact. Rows, that match `groupRowsBy` condition, are grouped in place of first occurrence without modifying the order of rest of the data.
 */
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
};

/**
 * Row grouping can also be achieved by having rowGroupKey in data objects. It is possible to group only some of the rows.
 */
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
        meta: {
          startDatePicker: {
            disableFuture: true,
          },
        },
      }),
      // Accessor value must be in the format { from: Dayjs | Date | string | null | undefined, to: Dayjs | Date | string | null | undefined }
      columnHelper.accessor((row) => ({ from: row.employment.startDate, to: row.employment.endDate }), {
        id: 'employment',
        header: () => 'Period of Employment',
        cell: (info) =>
          `${dayjs(info.row.original.employment.startDate).format('DD.MM')} - ${dayjs(
            info.row.original.employment.endDate
          ).format('DD.MM.YYYY')}`,
        filterFn: 'date-range-period',
        meta: {
          startDatePicker: {
            disableFuture: true,
          },
        },
        sortingFn: ({ original: a }, { original: b }) =>
          dayjs(a.employment.endDate).isAfter(dayjs(b.employment.endDate)) ? 1 : -1,
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

/**
 * Filters can be controlled from outside by passing 'columnFilters' and 'onColumnFiltersChange' props. 'columnFilters' is an array of objects with 'id' and 'value' properties. 'id' is the column id and 'value' is an array of selected values.<br />
 * 'onColumnFiltersChange' is a function that is called when filters are changed. It receives an array of objects with 'id' and 'value' properties. <br />
 * To customize column filter choiceGroup items pass meta.filterOptions to ColumnDef. It is an array of ChoiceGroupItems or string.
 */
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
    })) as ColumnDef<Person, IntentionalAny>[],
    enableFilters: true,
  },
};

/**
 * Entire table sorting/pagination/filtering/columnVisibility state can be stored outside the component.<br />
 * If you don't want to sort/paginate/filter the data yourself, you can set `manualFiltering={false}`, `manualSorting={false}` and `manualPagination={false}`.<br />
 * This way you have control of the table sorting/pagination/filtering state, but don't have to write your own logic for parsing the data.
 */
export const TableStateControlledFromOutside: Story = {
  args: {
    id: 'table-controlled-from-outside',
    data: data(),
    columns: columns.map((column) => ({
      ...column,
      filterFn: 'multi-select',
      meta: {
        filterOptions: data()
          .map((row) => row[column.id as keyof Person])
          .slice(0, 5)
          .map((value) => ({ value, label: `${value}-label`, id: `${value}-filter` })),
      },
    })) as ColumnDef<Person, IntentionalAny>[],
    enableFilters: true,
  },
  render: (args) => {
    const [filters, setFilters] = React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 5 });
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
      personName: true,
    });

    return (
      <VerticalSpacing>
        <Check
          id="hide-child"
          label="Show child column"
          value="hide-child"
          name="hide-child"
          checked={columnVisibility.personName}
          onChange={(_, checked) => setColumnVisibility((prevState) => ({ ...prevState, ...{ personName: checked } }))}
        />
        <Table
          {...args}
          manualFiltering={false}
          manualSorting={false}
          manualPagination={false}
          columnFilters={filters}
          sorting={sorting}
          pagination={pagination}
          onColumnFiltersChange={setFilters}
          onSortingChange={setSorting}
          onPaginationChange={setPagination}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
        />
      </VerticalSpacing>
    );
  },
};

/**
 * Sorting can be disabled for all columns using `<Table enableSorting={false} />` or by defining `enableSorting: false` in individual column.
 */
export const DisableSorting: Story = {
  args: {
    data: data(),
    columns,
    id: 'disabled-sort-table',
    enableSorting: false,
  },
};

/**
 * Default column visibility can be controlled by passing `defaultColumnVisibility` prop. It is an objects with key-value pairs where key is the column id and value is a boolean.
 * By default all columns are visible.
 * Can be used when you want to hide some columns on some use cases, when rendering table.
 */
export const ColumnVisibility: Story = {
  args: {
    data: data(),
    columns,
    id: 'disabled-sort-table',
    defaultColumnVisibility: {
      personName: false,
    },
  },
};

export const WithFooter: Story = {
  args: {
    id: 'footer-table',
    hidePagination: true,
    data: data(10),
    columns: columnsWithFooter,
  },
};

export const WithFooterAndPagination: Story = {
  args: {
    id: 'footer-table',
    data: data(),
    columns: columnsWithFooter,
  },
};

export { CustomExpandRowExample };

/**
 * Column pinning can be controlled from outside by passing 'columnPinning' prop.
 * 'columnPinning' is an object with 'left' and 'right' properties, each containing an array of column ids to be pinned.
 * 'onColumnPinningChange' is a function that is called when pinning is changed.
 * Can be used to control column pinning and make them sticky to the left or right side of the table.
 */

export const WithColumnPinning: Story = {
  args: {
    data: data(),
    columns,
    id: 'table-with-column-pinning',
    columnPinning: {
      left: ['personName'],
      right: ['age'],
    },
  },
};
