import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import linkifyStr from 'linkify-string';

import { LabelProvider, labelsMap } from '../../../tedi/providers/label-provider';
import { Table, Tooltip, TooltipProvider, TooltipTrigger } from '../../index';
import { IntentionalAny } from '../../types';

interface LabelRow {
  key: string;
  components: string[];
  description: string;
  et: string;
  en: string;
  ru: string;
}

const labels: LabelRow[] = Object.keys(labelsMap).map((k) => ({ key: k, ...(labelsMap as IntentionalAny)[k] }));

const renderLabelColumn = (label: string | ((...args: unknown[]) => string)) => {
  return (
    <p className="text-small">
      {typeof label === 'string' ? (
        label
      ) : (
        <>
          <span>String or </span>
          <TooltipProvider>
            <TooltipTrigger>
              <span className="text-primary">function</span>
            </TooltipTrigger>
            <Tooltip>
              <span className="function">{String(label)}</span>
            </Tooltip>
          </TooltipProvider>
        </>
      )}
    </p>
  );
};

const Labels = () => {
  const columnHelper = createColumnHelper<LabelRow>();

  // eslint-disable-next-line
  const columns: ColumnDef<LabelRow, any>[] = [
    columnHelper.accessor('key', {
      header: () => 'Label',
      cell: (info) => <p className="text-small">{info.renderValue()}</p>,
    }),
    columnHelper.accessor('components', {
      header: () => 'Components',
      cell: ({ row: { original } }) => <p className="text-small">{original.components.join(', ')}</p>,
    }),
    columnHelper.accessor('description', {
      header: () => 'Description',
      cell: ({ row: { original } }) => (
        <p
          className="text-small"
          dangerouslySetInnerHTML={{
            __html: linkifyStr(original.description, { format: () => 'MUI Pickers', target: '_blank' }),
          }}
        />
      ),
    }),
    columnHelper.accessor('et', {
      header: () => 'Est',
      cell: ({ row: { original } }) => renderLabelColumn(original.et),
    }),
    columnHelper.accessor('en', {
      header: () => 'Eng',
      cell: ({ row: { original } }) => renderLabelColumn(original.en),
    }),
    columnHelper.accessor('ru', {
      header: () => 'Rus',
      cell: ({ row: { original } }) => renderLabelColumn(original.ru),
    }),
  ];

  return (
    <LabelProvider>
      <Table
        id="labels-table"
        className="sb-unstyled"
        data={labels}
        columns={columns}
        defaultPagination={{ pageIndex: 0, pageSize: 20 }}
        defaultSorting={[{ id: 'key', desc: false }]}
        enableFilters
      />
    </LabelProvider>
  );
};

export default Labels;
