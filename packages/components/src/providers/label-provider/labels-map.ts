interface SharedLabel {
  description: string;
  components: string[];
}

interface StringLabel extends SharedLabel {
  et: string;
  en: string;
}

interface FunctionLabel<T> extends SharedLabel {
  et: (...args: T[]) => string;
  en: (...args: T[]) => string;
}

type OverloadLabel = {
  (params: StringLabel): typeof params;
  <T>(params: FunctionLabel<T>): typeof params;
};

const validateLabel: OverloadLabel = <T>(map: T) => map;

/**
 * Language keys that we support
 */
type SupportedLanguages = 'et' | 'en';

/**
 * Creates a map of default translations.
 * et and en values must be of same type
 */
export const labelsMap = {
  close: validateLabel({
    description: 'Used for closing',
    components: ['CloseButton', 'Collapse', 'Notification', 'FileUpload', 'Dropdown', 'Tooltip'],
    et: 'Sulge',
    en: 'Close',
  }),
  open: validateLabel({
    description: 'Used for opening',
    components: ['Collapse'],
    et: 'Ava',
    en: 'Open',
  }),
  remove: validateLabel({
    description: 'Used for removing',
    components: ['FileUpload'],
    et: 'Eemalda',
    en: 'Remove',
  }),
  cancel: validateLabel({
    description: 'For canceling an action',
    components: ['TableFilter'],
    et: 'Tühista',
    en: 'Cancel',
  }),
  search: validateLabel({
    description: 'For searching',
    components: ['TableFilter'],
    et: 'Otsi',
    en: 'Search',
  }),
  required: validateLabel({
    description: 'Required field',
    components: ['TableFilter'],
    et: 'Kohustuslik väli',
    en: 'Required field',
  }),
  'header.toggle': validateLabel({
    description: 'Label for header toggle on mobile',
    components: ['Header'],
    et: (isOpen: boolean) => (isOpen ? 'Sulge menüü' : 'Ava menüü'),
    en: (isOpen: boolean) => (isOpen ? 'Close menu' : 'Open menu'),
  }),
  'header.logout': validateLabel({
    description: 'Label for logout button',
    components: ['Header'],
    et: 'Logi välja',
    en: 'Log out',
  }),
  'file-upload.add': validateLabel({
    description: 'Label for add file button',
    components: ['FileUpload'],
    et: 'Lisa manus',
    en: 'Add attachment',
  }),
  'modal.close': validateLabel({
    description: 'Label for modals close button',
    components: ['Modal'],
    et: 'Sulge modaal',
    en: 'Close modal',
  }),
  'stepper.completed': validateLabel({
    description: 'Label for screenreader that this step is completed (visually hidden)',
    components: ['StepperNav'],
    et: 'Lõpetatud',
    en: 'Completed',
  }),
  'stepper.not-completed': validateLabel({
    description: 'Label for screenreader that this step is not completed (visually hidden)',
    components: ['StepperNav'],
    et: 'Lõpetamata',
    en: 'Not completed',
  }),
  'table.loading': validateLabel({
    description: 'Shown when table is loading',
    components: ['Table'],
    et: 'Table is loading',
    en: 'Tabel laeb',
  }),
  'table.filter': validateLabel({
    description: 'Label for filter toggle',
    components: ['Table', 'TableFilter'],
    et: 'Filtreeri',
    en: 'Filter',
  }),
  'table.no-spaces': validateLabel({
    description: 'Filter validation error - Text can not start with spaces',
    components: ['Table', 'TableFilter'],
    et: 'Tekst ei tohi alata tühikutega',
    en: 'Filter text cant start with spaces',
  }),
  'table.min-length': validateLabel({
    description: 'Filter validation error - Text is too short',
    components: ['Table', 'TableFilter'],
    et: 'Sisesta vähemalt 3 tähemärki',
    en: 'Min length is 3 chars',
  }),
  'table.toggle-sub-row': validateLabel({
    description: 'Toggle sub row button (Visually hidden)',
    components: ['Table'],
    et: (isExpaned: boolean) => (isExpaned ? 'Sulge alamrida' : 'Ava alamrida'),
    en: (isExpaned: boolean) => (isExpaned ? 'Close subrow' : 'Open subrow'),
  }),
  'table.select-all': validateLabel({
    description: 'Row selection - Label for check in table header',
    components: ['Table'],
    et: 'Vali kõik',
    en: 'Select all',
  }),
  'table.select-row': validateLabel({
    description: 'Row selection - Label for check in table row',
    components: ['Table'],
    et: 'Vali rida',
    en: 'Select row',
  }),
  'table.sort': validateLabel({
    description: 'Label for sort button',
    components: ['Table'],
    et: (direction: 'asc' | 'desc' | false) =>
      direction === 'asc'
        ? 'Sorteeri kahanevalt'
        : direction === 'desc'
        ? 'Eemalda sorteerimine'
        : 'Sorteeri kasvavalt',
    en: (direction: 'asc' | 'desc' | false) =>
      direction === 'asc' ? 'Sort decending' : direction === 'desc' ? 'Remove sorting' : 'Sort ascending',
  }),
  'pagination.prev-page': validateLabel({
    description: 'Previous page button label',
    components: ['Table', 'Pagination'],
    et: 'Eelmine leht',
    en: 'Previous page',
  }),
  'pagination.next-page': validateLabel({
    description: 'Next page button label',
    components: ['Table', 'Pagination'],
    et: 'Järgmine leht',
    en: 'Next page',
  }),
  'pagination.results': validateLabel({
    description: 'Total results text',
    components: ['Table', 'Pagination'],
    et: (count?: number) => (count === 1 ? 'tulemus' : 'tulemust'),
    en: (count?: number) => (count === 1 ? 'result' : 'results'),
  }),
  'pagination.page-size': validateLabel({
    description: 'Label of page size select',
    components: ['Table', 'Pagination'],
    et: 'Lehe suurus',
    en: 'Page size',
  }),
  'truncate.see-more': validateLabel({
    description: 'See more button label',
    components: ['Truncate'],
    et: 'Näita rohkem',
    en: 'Show more',
  }),
  'truncate.see-less': validateLabel({
    description: 'See less button label',
    components: ['Truncate'],
    et: 'Näita vähem',
    en: 'Show less',
  }),
  'datepicker.toolbarTitle': validateLabel({
    description: 'Mobile picker title, displaying in the toolbar. ',
    components: ['Datepicker'],
    et: 'Vali kuupäev',
    en: 'Select date',
  }),
  'timepicker.toolbarTitle': validateLabel({
    description: 'Mobile picker title, displaying in the toolbar. ',
    components: ['TimePicker'],
    et: 'Vali kellaeg',
    en: 'Select time',
  }),
  'datetimepicker.toolbarTitle': validateLabel({
    description: 'Mobile picker title, displaying in the toolbar. ',
    components: ['DateTimePicker'],
    et: 'Vali kuupäev ja kellaeg',
    en: 'Select date and time',
  }),
};

export type LabelsMapType = typeof labelsMap;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FlatLabelsMap<T extends { [K in keyof T]: { [L: string]: any } }, L extends SupportedLanguages> = {
  [K in keyof T]: string | T[K][L];
};

const mapToLang = <L extends SupportedLanguages>(map: LabelsMapType, lang: L) => {
  return Object.keys(map).reduce<FlatLabelsMap<LabelsMapType, typeof lang>>(
    (a, c) => ({ ...a, [c]: labelsMap[c as keyof LabelsMapType][lang] }),
    {} as never
  );
};

export const defaultEELabels = mapToLang(labelsMap, 'et');
export const defaultENLabels = mapToLang(labelsMap, 'en');
