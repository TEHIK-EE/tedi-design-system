import { Subtitle, Title } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import linkifyStr from 'linkify-string';

import Separator from '../components/separator/separator';
import { Table } from '../components/table';
import { Tooltip, TooltipProvider, TooltipTrigger } from '../components/tooltip';
import { VerticalSpacing } from '../components/vertical-spacing';
import { LabelProvider } from '../providers/label-provider';
import { labelsMap } from '../providers/label-provider/labels-map';

export default {
  title: 'Documentation/Labels',
  parameters: {
    docs: {
      page: () => (
        <LabelProvider>
          <Title />
          <Subtitle>Here you can find all labels used inside components.</Subtitle>
          <VerticalSpacing>
            <p>
              You have to wrap your app in <code>{'<LabelProvider labels={labels} locale={locale}>'}</code> and pass in
              your own labels.
            </p>
            <p>
              However components fall back to translations defined in the library itself. Currently we have default
              translations for Estonian, English and Russian. You can control what default translations are used with{' '}
              <code>locale</code> prop. If <code>locale</code> prop is not set, then the default languages is English.
            </p>
          </VerticalSpacing>
          <Separator spacing={1.5} />
          <Labels />
        </LabelProvider>
      ),
    },
  },
} as Meta;

interface LabelRow {
  key: string;
  components: string[];
  description: string;
  et: string;
  en: string;
  ru: string;
}

const labels: LabelRow[] = Object.keys(labelsMap).map((k) => ({ key: k, ...(labelsMap as any)[k] }));

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

export const Labels = () => {
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
            __html: linkifyStr(original.description, { format: (value) => 'MUI Pickers', target: '_blank' }),
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
    <Table
      id="labels-table"
      data={labels}
      columns={columns}
      defaultPagination={{ pageIndex: 0, pageSize: 20 }}
      defaultSorting={[{ id: 'key', desc: false }]}
    />
  );
};
