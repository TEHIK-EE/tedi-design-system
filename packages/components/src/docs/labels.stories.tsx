import { Subtitle, Title } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { Table } from '..';

export default {
  title: 'Documentation/Labels',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>Here you can find all labels used inside components.</Subtitle>
          <Labels />
        </>
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
}

const labels: LabelRow[] = [
  {
    key: 'close',
    components: ['CloseButton', 'Notification', 'FileUpload', 'Collapse'],
    description: 'Kasutusel sulgemisel',
    en: 'Close',
    et: 'Sulge',
  },
  {
    key: 'open',
    components: ['Collapse'],
    description: 'Kasutusel avamisel',
    en: 'Open',
    et: 'Ava',
  },
  {
    key: 'remove',
    components: ['FileUpload'],
    description: 'Kasutusel eemaldamisel',
    en: 'Remove',
    et: 'Eemalda',
  },
  {
    key: 'cancel',
    components: ['TableFilter'],
    description: 'Tühistamisel',
    en: 'Cancel',
    et: 'Tühista',
  },
  {
    key: 'search',
    components: ['TableFilter'],
    description: 'Otsimisel',
    en: 'Search',
    et: 'Otsi',
  },
  {
    key: 'date',
    components: ['DateTimePicker'],
    description: 'Kuupäeva label',
    en: 'Date',
    et: 'Kuupäev',
  },
  {
    key: 'time',
    components: ['DateTimePicker'],
    description: 'Kellaaja label',
    en: 'Time',
    et: 'Kellaeg',
  },
  {
    key: 'required',
    components: ['TableFilter'],
    description: 'Kohustuslik väli',
    en: 'Required field',
    et: 'Kohustuslik väli',
  },
  {
    key: 'file-upload.add',
    components: ['FileUpload'],
    description: 'Failide lisamiseks nupp',
    en: 'Add file',
    et: 'Lisa Manus',
  },
  {
    key: 'time-picker.add-one',
    components: ['TimePicker'],
    description: 'Suurendamis nupu tekst (Visually hidden)',
    en: 'Add one',
    et: 'Lisa üks',
  },
  {
    key: 'time-picker.substract-one',
    components: ['TimePicker'],
    description: 'Vähendamis nupu tekst (Visually hidden)',
    en: 'Subtract one',
    et: 'Eemalda üks',
  },
  {
    key: 'modal.close',
    components: ['Modal'],
    description: 'Modali sulgemine',
    en: 'Close modal',
    et: 'Sulge modaal',
  },
  {
    key: 'stepper.completed',
    components: ['StepperNav'],
    description: 'Label for screenreader that this step is completed (visually hidden)',
    en: 'Completed',
    et: 'Lõpetatud',
  },
  {
    key: 'stepper.not-completed',
    components: ['StepperNav'],
    description: 'Label for screenreader that this step is not completed (visually hidden)',
    en: 'Not completed',
    et: 'Lõpetamata',
  },
  {
    key: 'table.loading',
    components: ['Table'],
    description: 'Shown when table is loading',
    en: 'Table Loading',
    et: 'Tabel laeb',
  },
  {
    key: 'table.filter',
    components: ['Table', 'TableFilter'],
    description: 'Filtreerimis väljade hidden label',
    en: 'Filter',
    et: 'Filtreeri',
  },
  {
    key: 'table.no-spaces',
    components: ['Table', 'TableFilter'],
    description: 'Viga - tekst ei tohi alata tühikutega',
    en: 'Filter text cant start with spaces',
    et: 'Tekst ei tohi alata tühikutega',
  },
  {
    key: 'table.min-length',
    components: ['Table', 'TableFilter'],
    description: 'Viga - Otsing on liiga lühike',
    en: 'Min length is 3 chars',
    et: 'Sisesta vähemalt 3 tähemärki',
  },
  {
    key: 'table.open-sub-row',
    components: ['Table'],
    description: 'Alamrea nupu avamise tekst (Visually hidden)',
    en: 'Open subrow',
    et: 'Ava alamrida',
  },
  {
    key: 'table.close-sub-row',
    components: ['Table'],
    description: 'Alamrea nupu sulgemise tekst (Visually hidden)',
    en: 'Close subrow',
    et: 'Sulge alamrida',
  },
  {
    key: 'table.select-all',
    components: ['Table'],
    description: 'Row selection - Headeri Checki label',
    en: 'Select all',
    et: 'Vali kõik',
  },
  {
    key: 'table.select-row',
    components: ['Table'],
    description: 'Row selection - Vali rida',
    en: 'Select row',
    et: 'Vali rida',
  },
  {
    key: 'pagination.prev-page',
    components: ['Table', 'Pagination'],
    description: 'Eelmise lehe nupu tekst',
    en: 'Previous page',
    et: 'Eelmine leht',
  },
  {
    key: 'pagination.next-page',
    components: ['Table', 'Pagination'],
    description: 'Järgmise lehe nupu tekst',
    en: 'next page',
    et: 'Järgmine leht',
  },
  {
    key: 'pagination.results',
    components: ['Table', 'Pagination'],
    description: 'Tulemusi kokku tekst',
    en: 'results',
    et: 'tulemust',
  },
  {
    key: 'pagination.page-size',
    components: ['Table', 'Pagination'],
    description: 'Lehe suuruse valiku selecti label',
    en: 'Page size',
    et: 'Lehe suurus',
  },
  {
    key: 'truncate.see-more',
    components: ['Truncate'],
    description: 'Näita rohkem',
    en: 'Show more',
    et: 'Näita rohkem',
  },
  {
    key: 'truncate.see-less',
    components: ['Truncate'],
    description: 'Näita vähem',
    en: 'Show less',
    et: 'Näita vähem',
  },
  {
    key: 'datepicker.toolbarTitle',
    components: ['Datepicker'],
    description: 'Mobile picker title, displaying in the toolbar. ',
    en: 'Select date',
    et: 'Vali kuupäev',
  },
  {
    key: 'timepicker.toolbarTitle',
    components: ['TimePicker'],
    description: 'Mobile picker title, displaying in the toolbar. ',
    en: 'Select time',
    et: 'Vali kellaeg',
  },
];

export const Labels = () => {
  const columnHelper = createColumnHelper<LabelRow>();

  // eslint-disable-next-line
  const columns: ColumnDef<LabelRow, any>[] = [
    columnHelper.accessor('key', {
      header: () => 'Label',
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('components', {
      header: () => 'Components',
      cell: ({ row: { original } }) => <p className="text-small">{original.components.join(', ')}</p>,
    }),
    columnHelper.accessor('description', {
      header: () => 'Description',
      cell: ({ row: { original } }) => <p className="text-small">{original.description}</p>,
    }),
    columnHelper.accessor('et', {
      header: () => 'Est',
    }),
    columnHelper.accessor('en', {
      header: () => 'Eng',
    }),
  ];

  return <Table id="labels-table" data={labels} columns={columns} />;
};
