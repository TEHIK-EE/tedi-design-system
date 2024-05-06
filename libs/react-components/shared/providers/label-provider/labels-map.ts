import type { CalendarPickerView, ClockPickerView } from '@mui/x-date-pickers';
import type { MuiPickersAdapter } from '@mui/x-date-pickers/internals/models';

import type { TimePickerValue } from '../../../community/src/components/form/pickers';
import type { DatepickerValue } from '../../../community/src/components/form/pickers';

interface SharedLabel {
  description: string;
  components: string[];
}

interface StringLabel extends SharedLabel {
  et: string;
  en: string;
  ru: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface FunctionLabel<T extends any[]> extends SharedLabel {
  et: (...args: T) => string;
  en: (...args: T) => string;
  ru: (...args: T) => string;
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
type SupportedLanguages = 'et' | 'en' | 'ru';

const muiTranslationsUrl =
  'https://github.com/mui/mui-x/blob/HEAD/packages/x-date-pickers/src/locales/utils/pickersLocaleTextApi.ts';

/**
 * Creates a map of default translations.
 * et, en and ru values must be of same type
 */
export const labelsMap = {
  close: validateLabel({
    description: 'Used for closing',
    components: ['CloseButton', 'Collapse', 'Notification', 'FileUpload', 'Dropdown', 'Tooltip'],
    et: 'Sulge',
    en: 'Close',
    ru: 'Закрыть',
  }),
  open: validateLabel({
    description: 'Used for opening',
    components: ['Collapse'],
    et: 'Ava',
    en: 'Open',
    ru: 'Открыть',
  }),
  remove: validateLabel({
    description: 'Used for removing',
    components: ['FileUpload'],
    et: 'Eemalda',
    en: 'Remove',
    ru: 'Удалить',
  }),
  cancel: validateLabel({
    description: 'For canceling an action',
    components: ['TableFilter'],
    et: 'Tühista',
    en: 'Cancel',
    ru: 'Отмена',
  }),
  clear: validateLabel({
    description: 'For clearing a value',
    components: ['TableFilter'],
    et: 'Tühjenda',
    en: 'Clear',
    ru: 'Очистить',
  }),
  search: validateLabel({
    description: 'For searching',
    components: ['TableFilter'],
    et: 'Otsi',
    en: 'Search',
    ru: 'Поиск',
  }),
  required: validateLabel({
    description: 'Required field',
    components: ['TableFilter'],
    et: 'Kohustuslik väli',
    en: 'Required field',
    ru: 'Обязательное поле',
  }),
  breadcrumbs: validateLabel({
    description: 'Breadcrumbs navigation label',
    components: ['Breadcrumbs'],
    et: 'Jäljerida',
    en: 'Breadcrumbs',
    ru: 'Навигационная цепочка',
  }),
  'anchor.new-tab': validateLabel({
    description: 'Label for when anchor opens in new tab',
    components: ['Anchor'],
    et: 'Avaneb uuel vahelehel',
    en: 'Opens in new tab',
    ru: 'Открывается в новой вкладке',
  }),
  'header.toggle': validateLabel({
    description: 'Label for header toggle on mobile',
    components: ['Header'],
    et: (isOpen: boolean) => (isOpen ? 'Sulge menüü' : 'Ava menüü'),
    en: (isOpen: boolean) => (isOpen ? 'Close menu' : 'Open menu'),
    ru: (isOpen: boolean) => (isOpen ? 'Закрыть меню' : 'Открыть меню'),
  }),
  'header.settings': validateLabel({
    description: 'Label for HeaderSettings Button',
    components: ['HeaderSettings'],
    et: 'Seaded',
    en: 'Settings',
    ru: 'Настройки',
  }),
  'header.select-lang': validateLabel({
    description: 'Label for HeaderLanguage label and Modal Heading',
    components: ['HeaderLanguage'],
    et: 'Keel:',
    en: 'Language:',
    ru: 'Язык:',
  }),
  'header.role-label': validateLabel({
    description: 'Label for Role selection',
    components: ['HeaderRole'],
    et: 'Mina esindan:',
    en: 'I represent:',
    ru: 'я представляю:',
  }),
  'header.login': validateLabel({
    description: 'Label for login button',
    components: ['Header'],
    et: 'Sisene portaali',
    en: 'Log in',
    ru: 'авторизоваться',
  }),
  'header.logout': validateLabel({
    description: 'Label for logout button',
    components: ['Header'],
    et: 'Logi välja',
    en: 'Log out',
    ru: 'Выйти',
  }),
  'header.logo': validateLabel({
    description: 'Alt Label for logo',
    components: ['Header'],
    et: 'Logo',
    en: 'Logo',
    ru: 'Логотип',
  }),
  'file-upload.add': validateLabel({
    description: 'Label for add file button',
    components: ['FileUpload'],
    et: 'Lisa manus',
    en: 'Add attachment',
    ru: 'Загрузить файл',
  }),
  'modal.close': validateLabel({
    description: 'Label for modals close button',
    components: ['Modal'],
    et: 'Sulge modaal',
    en: 'Close modal',
    ru: 'Закрыть модальное окно',
  }),
  'select.loading': validateLabel({
    description: 'Text when select options are loading',
    components: ['select'],
    et: 'Laadimine...',
    en: 'Loading...',
    ru: 'Загрузка...',
  }),
  'select.no-options': validateLabel({
    description: 'Text when select has no options',
    components: ['select'],
    et: 'Valikud puuduvad',
    en: 'No options',
    ru: 'Нет вариантов',
  }),
  'stepper.completed': validateLabel({
    description: 'Label for screen-reader that this step is completed (visually hidden)',
    components: ['StepperNav'],
    et: 'Lõpetatud',
    en: 'Completed',
    ru: 'Завершено',
  }),
  'stepper.not-completed': validateLabel({
    description: 'Label for screen-reader that this step is not completed (visually hidden)',
    components: ['StepperNav'],
    et: 'Lõpetamata',
    en: 'Not completed',
    ru: 'Не завершено',
  }),
  'skeleton.loading': validateLabel({
    description: 'Announced by screen-readers when skeleton is loading',
    components: ['Skeleton'],
    et: 'Laadimine',
    en: 'Loading',
    ru: 'Загрузка',
  }),
  'skeleton.loading-completed': validateLabel({
    description: 'Announced by screen-readers when skeleton has completed loading',
    components: ['Skeleton'],
    et: 'Laadimine lõpetatud',
    en: 'Loading completed',
    ru: 'Загрузка завершена',
  }),
  'spinner.loading': validateLabel({
    description: 'Announced by screen-readers when spinner is loading',
    components: ['Spinner'],
    et: 'Laadimine',
    en: 'Loading',
    ru: 'Загрузка',
  }),
  'table.loading': validateLabel({
    description: 'Shown when table is loading',
    components: ['Table'],
    et: 'Tabel laeb',
    en: 'Table is loading',
    ru: 'Таблица загружается',
  }),
  'table.empty': validateLabel({
    description: 'Shown when table is empty',
    components: ['Table'],
    et: 'Tulemused puuduvad',
    en: 'No results',
    ru: 'Нет результатов',
  }),
  'table.error': validateLabel({
    description: 'Shown when table is in error state',
    components: ['Table'],
    et: 'Tabeli andmete pärimisel tekkis viga',
    en: 'An error occurred while retrieving table data',
    ru: 'Произошла ошибка при получении данных таблицы',
  }),
  'table.filter': validateLabel({
    description: 'Label for filter toggle',
    components: ['Table', 'TableFilter'],
    et: 'Filtreeri',
    en: 'Filter',
    ru: 'Фильтровать',
  }),
  'table.filter.select-all': validateLabel({
    description: 'Label for selecting all',
    components: ['Table', 'TableFilter'],
    et: 'Vali kõik',
    en: 'Select all',
    ru: 'Выбрать все',
  }),
  'table.filter.remove-all': validateLabel({
    description: 'Label for removing all',
    components: ['Table', 'TableFilter'],
    et: 'Eemalda kõik',
    en: 'Remove all',
    ru: 'Удалить все',
  }),
  'table.filter.no-options': validateLabel({
    description: 'When select filter has no options',
    components: ['Table', 'TableFilter'],
    et: 'Valikud puuduvad',
    en: 'No options',
    ru: 'Нет вариантов',
  }),
  'table.filter.validation.no-spaces': validateLabel({
    description: 'Filter validation error - Text can not start with spaces',
    components: ['Table', 'TableFilter'],
    et: 'Tekst ei tohi alata tühikutega',
    en: 'Filter text cant start with spaces',
    ru: 'Текст фильтра не может начинаться с пробелов',
  }),
  'table.filter.validation.min-length': validateLabel({
    description: 'Filter validation error - Text is too short',
    components: ['Table', 'TableFilter'],
    et: (count: number) => (count === 1 ? `Sisesta vähemalt ${count} tähemärk` : `Sisesta vähemalt ${count} tähemärki`),
    en: (count: number) => (count === 1 ? `Min length is ${count} char` : `Min length is ${count} chars`),
    ru: (count: number) => (count === 1 ? `Минимальная длина ${count} знак` : `Минимальная длина ${count} знаков`),
  }),
  'table.filter.validation.to-before-from': validateLabel({
    description: 'Filter validation error - End date is before start date',
    components: ['Table', 'TableFilter'],
    et: 'Lõppkuupäev on enne alguskuupäeva',
    en: 'End date must be after start date',
    ru: 'Дата окончания предшествует дате начала',
  }),
  'table.filter.from': validateLabel({
    description: 'Label for date filter from',
    components: ['Table', 'TableFilter'],
    et: 'Kuupäev alates',
    en: 'Date from',
    ru: 'Дата с',
  }),
  'table.filter.to': validateLabel({
    description: 'Label for date filter until',
    components: ['Table', 'TableFilter'],
    et: 'Kuupäev kuni',
    en: 'Date until',
    ru: 'Дата до',
  }),
  'table.toggle-sub-row': validateLabel({
    description: 'Toggle sub row button (Visually hidden)',
    components: ['Table'],
    et: (isExpaned: boolean) => (isExpaned ? 'Sulge alamrida' : 'Ava alamrida'),
    en: (isExpaned: boolean) => (isExpaned ? 'Close subrow' : 'Open subrow'),
    ru: (isExpaned: boolean) => (isExpaned ? 'Закрыть подстроку' : 'Открыть подстроку'),
  }),
  'table.select-all': validateLabel({
    description: 'Row selection - Label for check in table header',
    components: ['Table'],
    et: (isSelected: boolean) => (isSelected ? 'Eemalda kõik' : 'Vali kõik'),
    en: (isSelected: boolean) => (isSelected ? 'Deselect all' : 'Select all'),
    ru: (isSelected: boolean) => (isSelected ? 'Убрать выделение со всего' : 'Выбрать все'),
  }),
  'table.select-row': validateLabel({
    description: 'Row selection - Label for check in table row',
    components: ['Table'],
    et: (isSelected: boolean) => (isSelected ? 'Eemalda rida' : 'Vali rida'),
    en: (isSelected: boolean) => (isSelected ? 'Deselect row' : 'Select row'),
    ru: (isSelected: boolean) => (isSelected ? 'Отменить выбор строки' : 'Выбрать ряд'),
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
    ru: (direction: 'asc' | 'desc' | false) =>
      direction === 'asc'
        ? 'Сортировать по убыванию'
        : direction === 'desc'
        ? 'Отменить сортировку'
        : 'Сортировать по возрастанию',
  }),
  'tooltip.icon-trigger': validateLabel({
    description: 'Label we use for icons that are tooltip triggers',
    components: ['TooltipTrigger'],
    et: 'Kuva tööriistavihje',
    en: 'Show tooltip',
    ru: 'Показать подсказку',
  }),
  'pagination.title': validateLabel({
    description: 'Label of the pagination',
    components: ['Table', 'Pagination'],
    et: 'Pagineerimine',
    en: 'Pagination',
    ru: 'Страницы',
  }),
  'pagination.page': validateLabel({
    description: 'Label of individual page numbers',
    components: ['Table', 'Pagination'],
    et: (page: number, isCurrent?: boolean) => (isCurrent ? `Aktiivne leht, leht ${page}` : `Mine lehele ${page}`),
    en: (page: number, isCurrent?: boolean) => (isCurrent ? `Current page, page ${page}` : `Go to page ${page}`),
    ru: (page: number, isCurrent?: boolean) =>
      isCurrent ? `Текущая страница, страница ${page}` : `Перейти на страницу ${page}`,
  }),
  'pagination.prev-page': validateLabel({
    description: 'Previous page button label',
    components: ['Table', 'Pagination'],
    et: 'Eelmine leht',
    en: 'Previous page',
    ru: 'Предыдущая страница',
  }),
  'pagination.next-page': validateLabel({
    description: 'Next page button label',
    components: ['Table', 'Pagination'],
    et: 'Järgmine leht',
    en: 'Next page',
    ru: 'Следущая страница',
  }),
  'pagination.results': validateLabel({
    description: 'Total results text',
    components: ['Table', 'Pagination'],
    et: (count?: number) => (count === 1 ? 'tulemus' : 'tulemust'),
    en: (count?: number) => (count === 1 ? 'result' : 'results'),
    ru: (count?: number) => (count === 1 ? 'результат' : 'результа'),
  }),
  'pagination.page-size': validateLabel({
    description: 'Label of page size select',
    components: ['Table', 'Pagination'],
    et: 'Lehe suurus',
    en: 'Page size',
    ru: 'Размер страницы',
  }),
  'table-of-contents.title': validateLabel({
    description: 'Title of the table of contents',
    components: ['TableOfContents'],
    et: 'Sisukord',
    en: 'Table of contents',
    ru: 'Содержание',
  }),
  'table-of-contents.valid': validateLabel({
    description: 'Number of valid steps',
    components: ['TableOfContents'],
    et: (count: string | number) => `${count} valiidsed`,
    en: (count: string | number) => `${count} valid`,
    ru: (count: string | number) => `${count} действительны`,
  }),
  'table-of-contents.invalid': validateLabel({
    description: 'Number of invalid steps',
    components: ['TableOfContents'],
    et: (count: string | number) => `${count} mitte valiidne`,
    en: (count: string | number) => `${count} invalid`,
    ru: (count: string | number) => `${count} неверный`,
  }),
  'truncate.see-more': validateLabel({
    description: 'See more button label',
    components: ['Truncate'],
    et: 'Näita rohkem',
    en: 'Show more',
    ru: 'Показать больше',
  }),
  'truncate.see-less': validateLabel({
    description: 'See less button label',
    components: ['Truncate'],
    et: 'Näita vähem',
    en: 'Show less',
    ru: 'Скрыть',
  }),
  'vertical-progress.edit': validateLabel({
    description: 'Edit button label',
    components: ['VerticalProgressItem'],
    et: 'Muuda',
    en: 'Edit',
    ru: 'редактировать',
  }),
  'pickers.previousMonth': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Eelmine kuu',
    en: 'Previous month',
    ru: 'Прошлый месяц',
  }),
  'pickers.nextMonth': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Järgmine kuu',
    en: 'Next month',
    ru: 'Следующий месяц',
  }),
  'pickers.openPreviousView': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Ava eelmine vaade',
    en: 'Open previous view',
    ru: 'Открыть предыдущий вид',
  }),
  'pickers.openNextView': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Ava järgmine vaade',
    en: 'Open next view',
    ru: 'Открыть следующий вид',
  }),
  'pickers.cancelButtonLabel': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Tühista',
    en: 'Cancel',
    ru: 'Отмена',
  }),
  'pickers.clearButtonLabel': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Tühjenda',
    en: 'Clear',
    ru: 'Очистить',
  }),
  'pickers.okButtonLabel': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Kinnita',
    en: 'Confirm',
    ru: 'Подтвердить',
  }),
  'pickers.todayButtonLabel': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Täna',
    en: 'Today',
    ru: ' Сегодня',
  }),
  'pickers.start': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Algus',
    en: 'Start',
    ru: 'Начало',
  }),
  'pickers.end': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Lõpp',
    en: 'End',
    ru: 'Конец',
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
    ru: (currentView: CalendarPickerView) =>
      currentView === 'day'
        ? 'Открыт календарный вид, переключиться на годовой вид'
        : currentView === 'month'
        ? 'Открыт месячный вид, переключиться на месячный вид'
        : 'Открыт годовой вид, переключиться на календарный вид',
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
        : `${viewType === 'calendar' ? 'Calendar' : 'Clock'} view is open, go to text input view`,
    ru: (isKeyboardInputOpen: boolean, viewType: 'calendar' | 'clock') =>
      isKeyboardInputOpen
        ? `Вид ввода текста открыт, перейти к виду ${viewType === 'calendar' ? 'календаря' : 'времени'}`
        : `Вид ${viewType === 'calendar' ? 'календаря' : 'времени'} открыт, перейти к виду ввода текста`,
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
    ru: (view: ClockPickerView, time: TimePickerValue, adapter: MuiPickersAdapter<TimePickerValue>) =>
      `Выбрать ${view === 'hours' ? 'часы' : view === 'minutes' ? 'минуты' : 'секунды'}. ${
        time === null ? 'Время не выбрано' : `Выбранное время ${adapter.format(time, 'fullTime')}`
      }`,
  }),
  'pickers.hoursClockNumberText': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (hours: string) => `${hours} tundi`,
    en: (hours: string) => `${hours} hours`,
    ru: (hours: string) => `${hours} часов`,
  }),
  'pickers.minutesClockNumberText': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (hours: string) => `${hours} minutit`,
    en: (hours: string) => `${hours} minutes`,
    ru: (hours: string) => `${hours} минут`,
  }),
  'pickers.secondsClockNumberText': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (hours: string) => `${hours} sekundit`,
    en: (hours: string) => `${hours} seconds`,
    ru: (hours: string) => `${hours} секунд`,
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
    ru: (date: DatepickerValue, utils: MuiPickersAdapter<DatepickerValue>) =>
      date !== null && utils.isValid(date)
        ? `Выберите дату, выбранная дата ${utils.format(date, 'fullDate')}`
        : 'Выберите дату',
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
    ru: (date: TimePickerValue, utils: MuiPickersAdapter<TimePickerValue>) =>
      date !== null && utils.isValid(date)
        ? `Выберите время, выбранное время ${utils.format(date, 'fullTime')}`
        : 'Выберите время',
  }),
  'pickers.timeTableLabel': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Vali kellaaeg',
    en: 'Pick time',
    ru: 'Выберите время',
  }),
  'pickers.dateTableLabel': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Vali kuupäev',
    en: 'Pick date',
    ru: 'Выберите дату',
  }),
  'pickers.datePickerDefaultToolbarTitle': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Vali kuupäev',
    en: 'Pick date',
    ru: 'Выберите дату',
  }),
  'pickers.dateTimePickerDefaultToolbarTitle': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Vali kuupäev ja kellaaeg',
    en: 'Pick date and time',
    ru: 'Выберите время и дату',
  }),
  'pickers.timePickerDefaultToolbarTitle': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Vali kellaaeg',
    en: 'Pick time',
    ru: 'Выберите время',
  }),
  'pickers.dateRangePickerDefaultToolbarTitle': validateLabel({
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Vali kuupäeva vahemik',
    en: 'Pick date range',
    ru: 'Выберите даты',
  }),
  'footer.title': validateLabel({
    description: 'Label for screen-reader for footer navigation title',
    components: ['Footer'],
    et: 'Jalus',
    en: 'Footer',
    ru: 'Нижний колонтитул',
  }),
  'numberField.decrement': validateLabel({
    description: 'Label for screen-reader for number field decrease button',
    components: ['NumberField'],
    et: (count: string | number) => `Vähenda ${count} võrra`,
    en: (count: string | number) => `Decrease by ${count}`,
    ru: (count: string | number) => `Уменьшить на ${count}`,
  }),
  'numberField.increment': validateLabel({
    description: 'Label for screen-reader for number field increase button',
    components: ['NumberField'],
    et: (count: string | number) => `Suurenda ${count} võrra`,
    en: (count: string | number) => `Increase by ${count}`,
    ru: (count: string | number) => `Увеличить на ${count}`,
  }),
  'numberField.quantityUpdated': validateLabel({
    description: 'Label for screen-reader when quantity get updated by button click',
    components: ['NumberField'],
    et: (count: string | number) => `Uuendatud. Uus väärtus ${count}`,
    en: (count: string | number) => `Updated. New value ${count}`,
    ru: (count: string | number) => `Ууэндатуд. Уус вяэртус ${count}`,
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
export const defaultRULabels = mapToLang(labelsMap, 'ru');
