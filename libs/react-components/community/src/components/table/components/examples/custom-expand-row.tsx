import { faker } from '@faker-js/faker';
import { StoryFn, StoryObj } from '@storybook/react';
import { ColumnDef, createColumnHelper, Row as TSRow } from '@tanstack/react-table';

import { getBackgroundColorClass } from '../../../../../../shared/helpers/background-colors/background-colors';
import { IntentionalAny } from '../../../../../../shared/types';
import { Col, Row } from '../../../grid';
import Print from '../../../print/print';
import Tag from '../../../tag/tag';
import ToggleOpen from '../../../toggle-open/toggle-open';
import Text from '../../../typography/text/text';
import Table from '../../table';
import { DefaultTData, TableProps } from '../../table.types';

interface Proceeding {
  type: 'Lihtmenetlus' | 'Juhtummenetlus';
  status: 'aktiivne' | 'alustatud' | 'lõpetatud';
  keywords: string;
  employee: string;
  authority: string;
  date: string;
  refrenceNumber: string;
}

interface ProceedingRow extends Partial<Proceeding> {
  subRows?: Proceeding[];
  CustomRowComponent?: React.ComponentType<TSRow<IntentionalAny>>;
  countLabel?: (count: number) => string;
  customRowLabel?: string;
}

const CustomExpandRow = <TData extends DefaultTData<TData>>(row: TSRow<TData>): JSX.Element => {
  const totalCells = row.getVisibleCells().length / 2;
  return (
    <Print breakAfter="avoid">
      <tr className={getBackgroundColorClass('bg-muted')}>
        <td colSpan={Math.ceil(totalCells)}>
          <Text modifiers="bold">{row.original.customRowLabel}</Text>
        </td>
        <td colSpan={Math.floor(totalCells)}>
          <Row alignItems="center" justifyContent="end" gutterX={2}>
            <Col width="auto">
              <Text modifiers="small" color="subtle">
                {row.subRows.length} {row.original.countLabel(row.subRows.length)}
              </Text>
            </Col>
            <Col width="auto">
              <ToggleOpen
                openText="Näita rohkem"
                closeText="Näita vähem"
                onClick={row.getToggleExpandedHandler()}
                isOpen={row.getIsExpanded()}
                size="small"
                visualType="link"
              ></ToggleOpen>
            </Col>
          </Row>
        </td>
      </tr>
    </Print>
  );
};

const createProceeding = (): Proceeding => ({
  type: faker.helpers.arrayElement(['Lihtmenetlus', 'Juhtummenetlus']),
  status: faker.helpers.arrayElement(['aktiivne', 'alustatud', 'lõpetatud']),
  keywords: faker.lorem.words(3),
  employee: faker.person.fullName(),
  authority: faker.helpers.arrayElement(['Tallinna KOV', 'Tartu KOV']),
  date: faker.date.past().toLocaleDateString('et-EE'),
  refrenceNumber: faker.string.alphanumeric(10),
});

const apiData = [...Array(10).keys()].map(() => createProceeding());

const data: ProceedingRow[] = [
  {
    CustomRowComponent: CustomExpandRow,
    customRowLabel: 'Aktiivsed',
    countLabel: (count) => (count === 0 ? 'menetlust' : 'menetlust'),
    subRows: apiData.filter((d) => ['aktiivne', 'alustatud'].includes(d.status)),
  },
  {
    CustomRowComponent: CustomExpandRow,
    customRowLabel: 'Lõpetatud',
    countLabel: (count) => (count === 0 ? 'menetlust' : 'menetlust'),
    subRows: apiData.filter((d) => d.status === 'lõpetatud'),
  },
];

type Story = StoryObj<TableProps<ProceedingRow>>;

const Template: StoryFn<TableProps<ProceedingRow>> = (args) => (
  <Table<ProceedingRow> {...args} className="sb-unstyled" />
);

const columnHelper = createColumnHelper<ProceedingRow>();

// eslint-disable-next-line
const columns: ColumnDef<ProceedingRow, any>[] = [
  columnHelper.accessor('type', {
    header: () => 'Tüüp',
    cell: ({ row: { original } }) => <Tag>{original.type}</Tag>,
  }),
  columnHelper.accessor('status', {
    header: () => 'Staatus',
    cell: ({ row: { original } }) => <Tag>{original.status}</Tag>,
  }),
  columnHelper.accessor('keywords', {
    header: () => 'Märksõnad',
  }),
  columnHelper.accessor('date', {
    header: () => 'Viimati muudetud',
    cell: ({ row: { original } }) => (
      <div>
        <Text>{original.employee}</Text>
        <Text color="subtle" modifiers="small">
          {original.authority}
        </Text>
      </div>
    ),
  }),
  columnHelper.accessor('refrenceNumber', {
    header: () => 'Tegevus',
  }),
];

export const CustomExpandRowExample: Story = {
  render: Template,
  args: {
    data: data,
    columns: columns,
    id: 'customExpandRow',
    defaultExpanded: { '0': true },
    hidePagination: true,
  },
};
