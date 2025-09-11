import { Language } from "./translation.service";

export const translationsMap = {
  close: {
    description: "Used for closing",
    components: [
      "CloseButton",
      "Collapse",
      "Notification",
      "FileUpload",
      "Dropdown",
      "Tooltip",
      "HeaderRole",
    ],
    et: "Sulge",
    en: "Close",
    ru: "Закрыть",
  },
  open: {
    description: "Used for opening",
    components: ["Collapse"],
    et: "Ava",
    en: "Open",
    ru: "Открыть",
  },
  remove: {
    description: "Used for removing",
    components: ["FileUpload", "Tag"],
    et: "Eemalda",
    en: "Remove",
    ru: "Удалить",
  },
  cancel: {
    description: "For canceling an action",
    components: ["TableFilter"],
    et: "Tühista",
    en: "Cancel",
    ru: "Отмена",
  },
  clear: {
    description: "For clearing a value",
    components: ["TableFilter", "TextField"],
    et: "Tühjenda",
    en: "Clear",
    ru: "Очистить",
  },
  search: {
    description: "For searching",
    components: ["TableFilter"],
    et: "Otsi",
    en: "Search",
    ru: "Поиск",
  },
  required: {
    description: "Required field",
    components: ["TableFilter"],
    et: "Kohustuslik väli",
    en: "Required field",
    ru: "Обязательное поле",
  },
  breadcrumbs: {
    description: "Breadcrumbs navigation label",
    components: ["Breadcrumbs"],
    et: "Jäljerida",
    en: "Breadcrumbs",
    ru: "Навигационная цепочка",
  },
  more: {
    components: ["Tabs"],
    et: "Veel",
    en: "More",
    ru: "Более",
  },
  "anchor.new-tab": {
    description: "Label for when anchor opens in new tab",
    components: ["Anchor"],
    et: "Avaneb uuel vahelehel",
    en: "Opens in new tab",
    ru: "Открывается в новой вкладке",
  },
  "header.toggle": {
    description: "Label for header toggle on mobile",
    components: ["Header"],
    et: (isOpen: boolean) => (isOpen ? "Sulge menüü" : "Ava menüü"),
    en: (isOpen: boolean) => (isOpen ? "Close menu" : "Open menu"),
    ru: (isOpen: boolean) => (isOpen ? "Закрыть меню" : "Открыть меню"),
  },
  "header.settings": {
    description: "Label for HeaderSettings Button",
    components: ["HeaderSettings"],
    et: "Seaded",
    en: "Settings",
    ru: "Настройки",
  },
  "header.select-lang": {
    description: "Label for HeaderLanguage label and Modal Heading",
    components: ["HeaderLanguage"],
    et: "Keel:",
    en: "Language:",
    ru: "Язык:",
  },
  "header.role-label": {
    description: "Label for Role selection",
    components: ["HeaderRole"],
    et: "Mina esindan:",
    en: "I represent:",
    ru: "я представляю:",
  },
  "header.role-switch": {
    description: "Label for role switch button",
    components: ["HeaderRole"],
    et: "Vaheta rolli",
    en: "Switch role",
    ru: "Сменить роль",
  },
  "header.role-search": {
    description: "Label for role search input",
    components: ["HeaderRole"],
    et: "Otsi esindatavat",
    en: "Search representative",
    ru: "Найти представителя",
  },
  "header.role-no-representatives": {
    description: "Label for empty representatives search result",
    components: ["HeaderRole"],
    et: "Esindatavaid ei leitud!",
    en: "No representatives found!",
    ru: "Представители не найдены!",
  },
  "header.login": {
    description: "Label for login button",
    components: ["HeaderLogin"],
    et: "Sisene portaali",
    en: "Log in",
    ru: "авторизоваться",
  },
  "header.login-mobile": {
    description: "Label for login button in mobile view",
    components: ["HeaderLogin"],
    et: "Sisene",
    en: "Log in",
    ru: "авторизоваться",
  },
  "header.logout": {
    description: "Label for logout button",
    components: ["HeaderLogout"],
    et: "Logi välja",
    en: "Log out",
    ru: "Выйти",
  },
  "header.logo": {
    description: "Alt Label for logo",
    components: ["Header"],
    et: "Logo",
    en: "Logo",
    ru: "Логотип",
  },
  "header.profile": {
    description: "Label for profile button",
    components: ["HeaderProfile"],
    et: "Profiil",
    en: "Profile",
    ru: "Профиль",
  },
  "file-upload.add": {
    description: "Label for add file button",
    components: ["FileUpload"],
    et: "Lisa manus",
    en: "Add attachment",
    ru: "Загрузить файл",
  },
  "file-upload.accept": {
    description: "Default label for file extensions",
    components: ["FileUpload"],
    et: "Lubatud faililaiendid:",
    en: "Allowed file extensions:",
    ru: "Разрешенные расширения файлов:",
  },
  "file-upload.max-size": {
    description: "Default label for file size restriction",
    components: ["FileUpload"],
    et: "Maksimaalne suurus:",
    en: "Maximum size:",
    ru: "Максимальный размер:",
  },
  "file-upload.size-rejected": {
    description: "Error label for rejected size",
    components: ["FileUpload"],
    et: (files: string) => `Fail(id) ${files} on liiga suured`,
    en: (files: string) => `File(s) ${files} are too large`,
    ru: (files: string) => `Файл(ы) ${files} слишком велики`,
  },
  "file-upload.size-rejected-extended": {
    description: "Error label for rejected size",
    components: ["FileUpload"],
    et: (files: string, maxSize: string) =>
      `Fail ${files} on liiga suur. Maksimaalne suurus: ${maxSize}`,
    en: (files: string, maxSize: string) =>
      `File ${files} is too large. Maximum size: ${maxSize}`,
    ru: (files: string, maxSize: string) =>
      `Файл ${files} слишком велик. Максимальный размер: ${maxSize}`,
  },
  "file-upload.drag-and-drop": {
    description: "Text shown when dragging files over the dropzone",
    components: ["FileUpload"],
    et: "Fail(id) tuvastatud, lohista üleslaadimiseks",
    en: "File detected, drop to upload",
    ru: "Файл обнаружен, отпустите для загрузки",
  },
  "file-upload.extension-rejected": {
    description: "Error label for rejected extension",
    components: ["FileUpload"],
    et: (files: string) => `Fail(id) ${files} on vale laiendiga`,
    en: (files: string) => `File(s) ${files} have the wrong extension`,
    ru: (files: string) => `Файл(ы) ${files} имеют неправильное расширение`,
  },
  "file-upload.extension-rejected-extended": {
    description: "Error label for rejected extension",
    components: ["FileUpload"],
    et: (files: string, validTypes: string) =>
      `Fail(id) ${files} on vale laiendiga. Lubatud laiendid: ${validTypes}`,
    en: (files: string, validTypes: string) =>
      `File(s) ${files} have the wrong extension. Allowed extensions: ${validTypes}`,
    ru: (files: string, validTypes: string) =>
      `Файл(ы) ${files} имеют неправильное расширение. Разрешенные расширения: ${validTypes}`,
  },
  "file-dropzone.label": {
    description: "Default label for dropzone",
    components: ["FileDropzone"],
    et: "Lohista failid siia või klõpsa, et sirvida",
    en: "Drop files here, or click to browse",
    ru: "Перетащите файлы сюда или нажмите, чтобы выбрать",
  },
  "file-dropzone.error": {
    description: "Error label for dropzone",
    components: ["FileDropzone"],
    et: "Faili üleslaadimisel tekkis viga",
    en: "An error occurred while uploading the file",
    ru: "Произошла ошибка при загрузке файла",
  },
  "modal.close": {
    description: "Label for modals close button",
    components: ["Modal"],
    et: "Sulge modaal",
    en: "Close modal",
    ru: "Закрыть модальное окно",
  },
  "select.loading": {
    description: "Text when select options are loading",
    components: ["select"],
    et: "Laadimine...",
    en: "Loading...",
    ru: "Загрузка...",
  },
  "select.no-options": {
    description: "Text when select has no options",
    components: ["select"],
    et: "Valikud puuduvad",
    en: "No options",
    ru: "Нет вариантов",
  },
  "select.select-all": {
    description: "Text when select has 'select all' option",
    components: ["select"],
    et: "Vali kõik",
    en: "Select all",
    ru: "Выбрать все",
  },
  "stepper.completed": {
    description:
      "Label for screen-reader that this step is completed (visually hidden)",
    components: ["StepperNav"],
    et: "Lõpetatud",
    en: "Completed",
    ru: "Завершено",
  },
  "stepper.not-completed": {
    description:
      "Label for screen-reader that this step is not completed (visually hidden)",
    components: ["StepperNav"],
    et: "Lõpetamata",
    en: "Not completed",
    ru: "Не завершено",
  },
  "skeleton.loading": {
    description: "Announced by screen-readers when skeleton is loading",
    components: ["Skeleton"],
    et: "Laadimine",
    en: "Loading",
    ru: "Загрузка",
  },
  "skeleton.loading-completed": {
    description:
      "Announced by screen-readers when skeleton has completed loading",
    components: ["Skeleton"],
    et: "Laadimine lõpetatud",
    en: "Loading completed",
    ru: "Загрузка завершена",
  },
  "spinner.loading": {
    description: "Announced by screen-readers when spinner is loading",
    components: ["Spinner"],
    et: "Laadimine",
    en: "Loading",
    ru: "Загрузка",
  },
  "table.loading": {
    description: "Shown when table is loading",
    components: ["Table"],
    et: "Tabel laeb",
    en: "Table is loading",
    ru: "Таблица загружается",
  },
  "table.empty": {
    description: "Shown when table is empty",
    components: ["Table"],
    et: "Tulemused puuduvad",
    en: "No results",
    ru: "Нет результатов",
  },
  "table.error": {
    description: "Shown when table is in error state",
    components: ["Table"],
    et: "Tabeli andmete pärimisel tekkis viga",
    en: "An error occurred while retrieving table data",
    ru: "Произошла ошибка при получении данных таблицы",
  },
  "table.filter": {
    description: "Label for filter toggle",
    components: ["Table", "TableFilter"],
    et: "Filtreeri",
    en: "Filter",
    ru: "Фильтровать",
  },
  "table.filter.select-all": {
    description: "Label for selecting all",
    components: ["Table", "TableFilter"],
    et: "Vali kõik",
    en: "Select all",
    ru: "Выбрать все",
  },
  "table.filter.remove-all": {
    description: "Label for removing all",
    components: ["Table", "TableFilter"],
    et: "Eemalda kõik",
    en: "Remove all",
    ru: "Удалить все",
  },
  "table.filter.no-options": {
    description: "When select filter has no options",
    components: ["Table", "TableFilter"],
    et: "Valikud puuduvad",
    en: "No options",
    ru: "Нет вариантов",
  },
  "table.filter.validation.no-spaces": {
    description: "Filter validation error - Text can not start with spaces",
    components: ["Table", "TableFilter"],
    et: "Tekst ei tohi alata tühikutega",
    en: "Filter text cant start with spaces",
    ru: "Текст фильтра не может начинаться с пробелов",
  },
  "table.filter.validation.min-length": {
    description: "Filter validation error - Text is too short",
    components: ["Table", "TableFilter"],
    et: (count: number) =>
      count === 1
        ? `Sisesta vähemalt ${count} tähemärk`
        : `Sisesta vähemalt ${count} tähemärki`,
    en: (count: number) =>
      count === 1
        ? `Min length is ${count} char`
        : `Min length is ${count} chars`,
    ru: (count: number) =>
      count === 1
        ? `Минимальная длина ${count} знак`
        : `Минимальная длина ${count} знаков`,
  },
  "table.filter.validation.to-before-from": {
    description: "Filter validation error - End date is before start date",
    components: ["Table", "TableFilter"],
    et: "Lõppkuupäev on enne alguskuupäeva",
    en: "End date must be after start date",
    ru: "Дата окончания предшествует дате начала",
  },
  "table.filter.from": {
    description: "Label for date filter from",
    components: ["Table", "TableFilter"],
    et: "Kuupäev alates",
    en: "Date from",
    ru: "Дата с",
  },
  "table.filter.to": {
    description: "Label for date filter until",
    components: ["Table", "TableFilter"],
    et: "Kuupäev kuni",
    en: "Date until",
    ru: "Дата до",
  },
  "table.toggle-sub-row": {
    description: "Toggle sub row button (Visually hidden)",
    components: ["Table"],
    et: (isExpaned: boolean) => (isExpaned ? "Sulge alamrida" : "Ava alamrida"),
    en: (isExpaned: boolean) => (isExpaned ? "Close subrow" : "Open subrow"),
    ru: (isExpaned: boolean) =>
      isExpaned ? "Закрыть подстроку" : "Открыть подстроку",
  },
  "table.select-all": {
    description: "Row selection - Label for check in table header",
    components: ["Table"],
    et: (isSelected: boolean) => (isSelected ? "Eemalda kõik" : "Vali kõik"),
    en: (isSelected: boolean) => (isSelected ? "Deselect all" : "Select all"),
    ru: (isSelected: boolean) =>
      isSelected ? "Убрать выделение со всего" : "Выбрать все",
  },
  "table.select-row": {
    description: "Row selection - Label for check in table row",
    components: ["Table"],
    et: (isSelected: boolean) => (isSelected ? "Eemalda rida" : "Vali rida"),
    en: (isSelected: boolean) => (isSelected ? "Deselect row" : "Select row"),
    ru: (isSelected: boolean) =>
      isSelected ? "Отменить выбор строки" : "Выбрать ряд",
  },
  "table.sort": {
    description: "Label for sort button",
    components: ["Table"],
    et: (direction: "asc" | "desc" | false) =>
      direction === "asc"
        ? "Sorteeri kahanevalt"
        : direction === "desc"
          ? "Eemalda sorteerimine"
          : "Sorteeri kasvavalt",
    en: (direction: "asc" | "desc" | false) =>
      direction === "asc"
        ? "Sort decending"
        : direction === "desc"
          ? "Remove sorting"
          : "Sort ascending",
    ru: (direction: "asc" | "desc" | false) =>
      direction === "asc"
        ? "Сортировать по убыванию"
        : direction === "desc"
          ? "Отменить сортировку"
          : "Сортировать по возрастанию",
  },
  "tooltip.icon-trigger": {
    description: "Label we use for icons that are tooltip triggers",
    components: ["TooltipTrigger"],
    et: "Kuva tööriistavihje",
    en: "Show tooltip",
    ru: "Показать подсказку",
  },
  "pagination.title": {
    description: "Label of the pagination",
    components: ["Table", "Pagination"],
    et: "Pagineerimine",
    en: "Pagination",
    ru: "Страницы",
  },
  "pagination.page": {
    description: "Label of individual page numbers",
    components: ["Table", "Pagination"],
    et: (page: number, isCurrent?: boolean) =>
      isCurrent ? `Aktiivne leht, leht ${page}` : `Mine lehele ${page}`,
    en: (page: number, isCurrent?: boolean) =>
      isCurrent ? `Current page, page ${page}` : `Go to page ${page}`,
    ru: (page: number, isCurrent?: boolean) =>
      isCurrent
        ? `Текущая страница, страница ${page}`
        : `Перейти на страницу ${page}`,
  },
  "pagination.prev-page": {
    description: "Previous page button label",
    components: ["Table", "Pagination"],
    et: "Eelmine leht",
    en: "Previous page",
    ru: "Предыдущая страница",
  },
  "pagination.next-page": {
    description: "Next page button label",
    components: ["Table", "Pagination"],
    et: "Järgmine leht",
    en: "Next page",
    ru: "Следущая страница",
  },
  "pagination.results": {
    description: "Total results text",
    components: ["Table", "Pagination"],
    et: (count?: number) => (count === 1 ? "tulemus" : "tulemust"),
    en: (count?: number) => (count === 1 ? "result" : "results"),
    ru: (count?: number) => (count === 1 ? "результат" : "результа"),
  },
  "pagination.page-size": {
    description: "Label of page size select",
    components: ["Table", "Pagination"],
    et: "Lehe suurus",
    en: "Page size",
    ru: "Размер страницы",
  },
  "table-of-contents.title": {
    description: "Title of the table of contents",
    components: ["TableOfContents"],
    et: "Sisukord",
    en: "Table of contents",
    ru: "Содержание",
  },
  "table-of-contents.valid": {
    description: "Number of valid steps",
    components: ["TableOfContents"],
    et: (count: string | number) => `${count} valiidsed`,
    en: (count: string | number) => `${count} valid`,
    ru: (count: string | number) => `${count} действительны`,
  },
  "table-of-contents.invalid": {
    description: "Number of invalid steps",
    components: ["TableOfContents"],
    et: (count: string | number) => `${count} mitte valiidne`,
    en: (count: string | number) => `${count} invalid`,
    ru: (count: string | number) => `${count} неверный`,
  },
  "truncate.see-more": {
    description: "See more button label",
    components: ["Truncate"],
    et: "Näita rohkem",
    en: "Show more",
    ru: "Показать больше",
  },
  "truncate.see-less": {
    description: "See less button label",
    components: ["Truncate"],
    et: "Näita vähem",
    en: "Show less",
    ru: "Скрыть",
  },
  "vertical-progress.edit": {
    description: "Edit button label",
    components: ["VerticalProgressItem"],
    et: "Muuda",
    en: "Edit",
    ru: "редактировать",
  },
  "numberField.decrement": {
    description: "Label for screen-reader for number field decrease button",
    components: ["NumberField"],
    et: (count: string | number) => `Vähenda ${count} võrra`,
    en: (count: string | number) => `Decrease by ${count}`,
    ru: (count: string | number) => `Уменьшить на ${count}`,
  },
  "numberField.increment": {
    description: "Label for screen-reader for number field increase button",
    components: ["NumberField"],
    et: (count: string | number) => `Suurenda ${count} võrra`,
    en: (count: string | number) => `Increase by ${count}`,
    ru: (count: string | number) => `Увеличить на ${count}`,
  },
  "numberField.quantityUpdated": {
    description:
      "Label for screen-reader when quantity get updated by button click",
    components: ["NumberField"],
    et: (count: string | number) => `Uuendatud. Uus väärtus ${count}`,
    en: (count: string | number) => `Updated. New value ${count}`,
    ru: (count: string | number) => `Ууэндатуд. Уус вяэртус ${count}`,
  },
  "sidenav.backToMainMenu": {
    description: "Side navigation label",
    components: ["Sidenav"],
    et: "Tagasi peamenüüsse",
    en: "Back to main menu",
    ru: "Назад в главное меню",
  },
  "sidenav.toggle": {
    description: "Label for sidenav toggle on mobile",
    components: ["Sidenav"],
    et: (isOpen: boolean) => (isOpen ? "Sulge menüü" : "Ava menüü"),
    en: (isOpen: boolean) => (isOpen ? "Close menu" : "Open menu"),
    ru: (isOpen: boolean) => (isOpen ? "Закрыть меню" : "Открыть меню"),
  },
};

export type TediTranslationsMap<L extends Language> = {
  [K in keyof typeof translationsMap]: (typeof translationsMap)[K][L];
};

export type TranslationEntry = {
  description?: string;
  components?: string[];
} & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [L in Language]: string | ((...args: any[]) => string);
};

export type TranslationMap = Record<string, TranslationEntry>;
