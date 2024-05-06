import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { CustomizeTableCell, Table, Text } from '@tehik-ee/tedi-design-system/community';

import { Breakpoint, getBackgroundColorClass } from '../../helpers';

interface BreakpointRow {
  type: 'mobile' | 'tablet' | 'desktop';
  breakpoint: Breakpoint;
  width: string;
  layout: string;
  behavior: string;
  padding: string;
  aligment?: 'center';
  maxWidth?: string;
  figmaStyle?: 'layout/mobile' | 'layout/tablet' | 'layout/desktop';
}

const breakpoints: BreakpointRow[] = [
  {
    type: 'mobile',
    breakpoint: 'xs',
    width: '0-575px',
    layout: '12col / design 2col',
    behavior: 'stretch',
    padding: '8px/0.5rem',
    figmaStyle: 'layout/mobile',
  },
  {
    type: 'mobile',
    breakpoint: 'sm',
    width: '576-767px',
    layout: '12col / design 2col',
    behavior: 'stretch',
    padding: '8px/0.5rem',
  },
  {
    type: 'tablet',
    breakpoint: 'md',
    width: '768-991px',
    layout: '12col / design 6col',
    behavior: 'stretch',
    padding: '24px/1.5rem',
    figmaStyle: 'layout/tablet',
  },
  {
    type: 'desktop',
    breakpoint: 'lg',
    width: '992-1199px',
    layout: 'side navigation + 12col',
    behavior: 'stretch',
    padding: '40px/2.5rem',
  },
  {
    type: 'desktop',
    breakpoint: 'xl',
    width: '1200-1399px',
    layout: 'side navigation + 12col',
    behavior: 'stretch',
    padding: '40px/2.5rem',
  },
  {
    type: 'desktop',
    breakpoint: 'xxl',
    width: '>= 1400px',
    layout: 'side navigation + 12col',
    behavior: 'stretch',
    aligment: 'center',
    maxWidth: '1440px/90rem',
    padding: 'min: 40px/2.5rem',
    figmaStyle: 'layout/desktop',
  },
];

const BreakingpointsTable = () => {
  const columnHelper = createColumnHelper<BreakpointRow>();

  // eslint-disable-next-line
  const columns: ColumnDef<BreakpointRow, any>[] = [
    columnHelper.accessor('breakpoint', {
      header: () => 'Breakpoints',
      cell: ({ row: { original } }) => (
        <CustomizeTableCell className={getBackgroundColorClass('bg-muted')}>
          <Text modifiers="bold">{original.type}</Text>
          <Text>{`break-${original.breakpoint}`}</Text>
        </CustomizeTableCell>
      ),
    }),
    columnHelper.accessor('width', {
      header: () => 'Width',
    }),
    columnHelper.accessor('layout', {
      header: () => 'Layout & columns',
    }),
    columnHelper.accessor('behavior', {
      header: () => 'Grid behavior',
      cell: ({ row: { original } }) => (
        <>
          <Text>{`${original.behavior}`}</Text>
          {original.maxWidth && <Text>{`max-content width:${original.maxWidth}`}</Text>}
          {original.aligment && <Text>{`content alignment: ${original.aligment}`}</Text>}
        </>
      ),
    }),
    columnHelper.accessor('padding', {
      header: () => 'Page padding',
    }),
    columnHelper.accessor('figmaStyle', {
      header: () => 'Figma grid style',
    }),
  ];

  return (
    <Table<BreakpointRow>
      id="spacing-table"
      className="sb-unstyled"
      hidePagination={true}
      hideCardBorder={true}
      data={breakpoints}
      columns={columns}
      enableSorting={false}
      caption="Spacing Values"
    />
  );
};

export default BreakingpointsTable;
