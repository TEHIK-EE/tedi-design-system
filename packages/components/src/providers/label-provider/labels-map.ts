import type { CalendarPickerView, ClockPickerView } from '@mui/x-date-pickers';
import { MuiPickersAdapter } from '@mui/x-date-pickers/internals/models';

import type { TimePickerValue } from '../../components/form/pickers';
import { DatepickerValue } from '../../components/form/pickers';

interface SharedLabel {
  description: string;
  components: string[];
}

interface StringLabel extends SharedLabel {
  et: string;
  en: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface FunctionLabel<T extends any[]> extends SharedLabel {
  et: (...args: T) => string;
  en: (...args: T) => string;
}

type OverloadLabel = {
  (params: StringLabel): typeof params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T extends any[]>(params: FunctionLabel<T>): typeof params;
};

const validateLabel: OverloadLabel = <T>(map: T) => map;

/**
 * Language keys that we support
 */
type SupportedLanguages = 'et' | 'en';

const muiTranslationsUrl =
  'https://github.com/mui/mui-x/blob/HEAD/packages/x-date-pickers/src/locales/utils/pickersLocaleTextApi.ts';

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
  'table.filter.select-all': validateLabel({
    description: 'Label for selecting all',
    components: ['Table', 'TableFilter'],
    et: 'Vali kõik',
    en: 'Select all',
  }),
  'table.filter.remove-all': validateLabel({
    description: 'Label for removing all',
    components: ['Table', 'TableFilter'],
    et: 'Eemalda valikud',
    en: 'Remove selection',
  }),
  'table.filter.validation.no-spaces': validateLabel({
    description: 'Filter validation error - Text can not start with spaces',
    components: ['Table', 'TableFilter'],
    et: 'Tekst ei tohi alata tühikutega',
    en: 'Filter text cant start with spaces',
  }),
  'table.filter.validation.min-length': validateLabel({
    description: 'Filter validation error - Text is too short',
    components: ['Table', 'TableFilter'],
    et: (count: number) => (count === 1 ? `Sisesta vähemalt ${count} tähemärk` : `Sisesta vähemalt ${count} tähemärki`),
    en: (count: number) => (count === 1 ? `Min length is ${count} char` : `Min length is ${count} chars`),
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
  'pickers.previousMonth': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Eelmine kuu',
    en: 'Previous month',
  }),
  'pickers.nextMonth': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Järgmine kuu',
    en: 'Next month',
  }),
  'pickers.openPreviousView': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Ava eelmine vaade',
    en: 'Open previous view',
  }),
  'pickers.openNextView': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Ava järgmine vaade',
    en: 'Open next view',
  }),
  'pickers.cancelButtonLabel': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Tühista',
    en: 'Cancel',
  }),
  'pickers.clearButtonLabel': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Tühjenda',
    en: 'Clear',
  }),
  'pickers.okButtonLabel': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Kinnita',
    en: 'Confirm',
  }),
  'pickers.todayButtonLabel': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Täna',
    en: 'Today',
  }),
  'pickers.start': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Algus',
    en: 'Start',
  }),
  'pickers.end': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Lõpp',
    en: 'End',
  }),
  'pickers.calendarViewSwitchingButtonAriaLabel': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (currentView: CalendarPickerView) =>
      currentView === 'day'
        ? 'Kalendri vaade on lahti, lülitu aasta vaatesse'
        : currentView === 'month'
        ? 'Kuu vaade on lahti, lülitu aasta vaatesse'
        : 'Aasta vaade on lahti, lülitu kalendri vaatesse',
    en: (currentView: CalendarPickerView) =>
      currentView === 'day'
        ? 'Calendar view is open, switch to year view'
        : currentView === 'month'
        ? 'Month view is open, switch to year view'
        : 'Year view is open, switch to calendar view',
  }),
  'pickers.inputModeToggleButtonAriaLabel': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (isKeyboardInputOpen: boolean, viewType: 'calendar' | 'clock') =>
      isKeyboardInputOpen
        ? `Teksti välja vaade on lahti, mine ${viewType === 'calendar' ? 'kalendri' : 'kella'} vaatesse`
        : `${viewType === 'calendar' ? 'Kalendri' : 'Kella'} vaade on lahti, mine teksti välja vaatesse`,
    en: (isKeyboardInputOpen: boolean, viewType: 'calendar' | 'clock') =>
      isKeyboardInputOpen
        ? `Text input view is open, go to ${viewType === 'calendar' ? 'calendar' : 'clock'} view`
        : `${viewType === 'calendar' ? 'Calendar' : 'Clock'} view is open, got to text input view`,
  }),
  'pickers.clockLabelText': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (view: ClockPickerView, time: TimePickerValue, adapter: MuiPickersAdapter<TimePickerValue>) =>
      `Vali ${view === 'hours' ? 'tunnid' : view === 'minutes' ? 'minutid' : 'sekundid'}. ${
        time === null ? 'Aega pole valitud' : `Valitud aeg on ${adapter.format(time, 'fullTime')}`
      }`,
    en: (view: ClockPickerView, time: TimePickerValue, adapter: MuiPickersAdapter<TimePickerValue>) =>
      `Select ${view === 'hours' ? 'hours' : view === 'minutes' ? 'minutes' : 'seconds'}. ${
        time === null ? 'No time selected' : `Selected time is ${adapter.format(time, 'fullTime')}`
      }`,
  }),
  'pickers.hoursClockNumberText': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (hours: string) => `${hours} tundi`,
    en: (hours: string) => `${hours} hours`,
  }),
  'pickers.minutesClockNumberText': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (hours: string) => `${hours} minutit`,
    en: (hours: string) => `${hours} minutes`,
  }),
  'pickers.secondsClockNumberText': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (hours: string) => `${hours} sekundit`,
    en: (hours: string) => `${hours} seconds`,
  }),
  'pickers.openDatePickerDialogue': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (date: DatepickerValue, utils: MuiPickersAdapter<DatepickerValue>) =>
      date !== null && utils.isValid(date)
        ? `Vali kuupäev, valitud kuupäev on ${utils.format(date, 'fullDate')}`
        : 'Vali kuupäev',
    en: (date: DatepickerValue, utils: MuiPickersAdapter<DatepickerValue>) =>
      date !== null && utils.isValid(date)
        ? `Choose date, selected date is ${utils.format(date, 'fullDate')}`
        : 'Choose date',
  }),
  'pickers.openTimePickerDialogue': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (date: TimePickerValue, utils: MuiPickersAdapter<TimePickerValue>) =>
      date !== null && utils.isValid(date)
        ? `Vali kellaaeg, valitud kellaaeg on ${utils.format(date, 'fullTime')}`
        : 'Vali kellaaeg',
    en: (date: TimePickerValue, utils: MuiPickersAdapter<TimePickerValue>) =>
      date !== null && utils.isValid(date)
        ? `Choose time, selected time is ${utils.format(date, 'fullTime')}`
        : 'Choose time',
  }),
  'pickers.timeTableLabel': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Vali kellaaeg',
    en: 'Pick time',
  }),
  'pickers.dateTableLabel': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Vali kuupäev',
    en: 'Pick date',
  }),
  'pickers.datePickerDefaultToolbarTitle': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Vali kuupäev',
    en: 'Pick date',
  }),
  'pickers.dateTimePickerDefaultToolbarTitle': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Vali kuupäev ja kellaaeg',
    en: 'Pick date and time',
  }),
  'pickers.timePickerDefaultToolbarTitle': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Vali kellaaeg',
    en: 'Pick time',
  }),
  'pickers.dateRangePickerDefaultToolbarTitle': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Vali kuupäeva vahemik',
    en: 'Pick date range',
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
