import { Title } from '@storybook/blocks';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { Col, Row } from '../../../tedi/components/grid';
import { Separator } from '../../../tedi/components/separator/separator';
import { VerticalSpacing } from '../../../tedi/components/vertical-spacing';
import { Heading, Table } from '../../index';

const Spacing = () => {
  return (
    <VerticalSpacing size={2.5}>
      <VerticalSpacing>
        <Title>Spacing</Title>
        <Row>
          <Col md={6}>
            <VerticalSpacing>
              <img alt="Soft 8px grid" src="layout/spacing.svg" />
              <Heading element="h2">Soft 8px grid</Heading>
              <p>To create harmonious and visually pleasing designs, a soft 8px grid system is used.</p>
            </VerticalSpacing>
          </Col>
          <Col md={6}>
            <VerticalSpacing>
              <img alt="Example how spacing is used between elements" src="layout/spacing-in-elements.svg" />
              <Heading element="h2">Use in the elements</Heading>
              <p>
                Spacing is measured from the edges of the element boxes. All user interface elements are designed with
                this system in mind. For example, the line-height of typography and the height of the buttons are also
                set in increments of 8px. This means elements also fall into a grid, but they don&apos;t always have to
                conform to predefined spacing values.
              </p>
            </VerticalSpacing>
          </Col>
        </Row>
      </VerticalSpacing>
      <Separator />
      <VerticalSpacing>
        <Heading element="h2">Spacing values</Heading>
        <SpacingsTable />
      </VerticalSpacing>
    </VerticalSpacing>
  );
};

export default Spacing;

const exampleSpacings = [2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 160];

interface SpacingRow {
  px: number;
  rem: number;
}

const spacings: SpacingRow[] = exampleSpacings.map((px) => ({ px, rem: px / 16 }));

const SpacingsTable = () => {
  const columnHelper = createColumnHelper<SpacingRow>();

  // eslint-disable-next-line
  const columns: ColumnDef<SpacingRow, any>[] = [
    columnHelper.accessor('px', {
      header: () => 'Spacing',
      cell: (info) => info.renderValue() + 'px',
    }),
    columnHelper.accessor('rem', {
      header: () => 'rem',
      cell: (info) => info.renderValue() + 'rem',
    }),
    columnHelper.accessor((row) => `${row.px}-example`, {
      id: 'example',
      header: () => 'Example',
      cell: ({ row: { original } }) => (
        <div
          style={{
            width: original.px,
            height: original.px,
            background: 'var(--color-primary-main)',
          }}
        />
      ),
    }),
  ];

  return (
    <Table<SpacingRow>
      id="spacing-table"
      className="sb-unstyled"
      hidePagination={true}
      hideCardBorder={true}
      data={spacings}
      columns={columns}
      enableSorting={false}
      caption="Spacing Values"
    />
  );
};
