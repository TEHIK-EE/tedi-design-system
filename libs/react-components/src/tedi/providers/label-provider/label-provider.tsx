import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { PickersLocaleText } from '@mui/x-date-pickers/locales/utils/pickersLocaleTextApi';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import updateLocale from 'dayjs/plugin/updateLocale';
import React, { useCallback, useMemo } from 'react';

import {
  LabelFunctionValue,
  labelsMap,
  TediLabelEntryRecord,
  TediLabels,
  TediLabelValuesRecord,
  TediLanguage,
} from './labels-map';

import 'dayjs/locale/et';
import 'dayjs/locale/ru';
dayjs.extend(updateLocale);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
// Start en locale week with monday
dayjs.updateLocale('en', {
  weekStart: 1,
});

const isTestEnvironment = process.env.JEST_WORKER_ID !== undefined || process.env.NODE_ENV === 'test';

export interface ILabelContext {
  getLabel<
    TKey extends keyof TediLabels,
    TArgs extends TediLabels[TKey] extends Record<TediLanguage, infer FuncType>
      ? FuncType extends (...args: infer P) => string
        ? P
        : []
      : TediLabels[TKey] extends (...args: infer P) => string
      ? P
      : []
  >(
    key: TKey,
    ...args: TArgs
  ): string;
}

export const LabelContext = React.createContext<ILabelContext>({
  getLabel: (key, ..._args) => {
    if (!isTestEnvironment) {
      console.error('LabelProvider missing! Application must be wrapped with <LabelProvider>');
    }
    return key;
  },
});

export interface LabelProviderProps<TRecord extends TediLabelEntryRecord<TRecord>> {
  /**
   * Global labels that are use in components. If omitted then default labels are used based on `locale` prop.
   * If both props are omitted then English translations are used by default
   */
  labels?: TRecord | TediLabelValuesRecord;
  /**
   * Currently used locale. Supported languages are:<br />
   * et - Estonian<br />
   * en - English<br />
   * ru - Russian
   * @default en
   */
  locale?: TediLanguage;
  /**
   * Rest of the App code
   */
  children: React.ReactNode;
}

export const LabelProvider = <TRecord extends TediLabelEntryRecord<TRecord>>(
  props: LabelProviderProps<TRecord>
): JSX.Element => {
  const { labels = {}, children, locale = 'en' } = props;

  const mergedLabels = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = {} as Record<string, string | LabelFunctionValue<any>>;
    const allKeys = new Set<string>([...Object.keys(labelsMap), ...Object.keys(labels)]);

    for (const k of allKeys) {
      const key = k as keyof TediLabels;
      const defaultEntry = labelsMap[key] ? labelsMap[key][locale] : undefined;
      const customEntry = labels[key] ?? undefined;

      let newEntry;

      if (customEntry) {
        if (typeof customEntry === 'object') {
          newEntry = customEntry[locale];
        } else {
          newEntry = customEntry;
        }
      } else {
        newEntry = undefined;
      }

      result[key] = newEntry ?? defaultEntry ?? key;
    }

    return result;
  }, [labels, locale]);

  dayjs.locale(locale);

  const getLabel = useCallback(
    <
      TKey extends keyof TediLabels,
      TArgs extends TediLabels[TKey] extends Record<TediLanguage, infer FuncType>
        ? FuncType extends (...args: infer P) => string
          ? P
          : []
        : TediLabels[TKey] extends (...args: infer P) => string
        ? P
        : []
    >(
      key: TKey,
      ...args: TArgs
    ): string => {
      const label = mergedLabels[key];

      if (!label) {
        console.error(`Label missing for key "${key}".`);
        return key;
      }

      if (typeof label === 'function') {
        return label(...args);
      }

      return label;
    },
    [mergedLabels]
  );

  // find all labels that we need to pass into LocalizationProvider
  const muiLabels = Object.keys(mergedLabels).reduce((a, c) => {
    return {
      ...a,
      ...(c.startsWith('pickers.')
        ? {
            [c.replace('pickers.', '')]: mergedLabels[c],
          }
        : {}),
    };
  }, {} as Partial<PickersLocaleText<unknown>>);

  return (
    <LabelContext.Provider value={{ getLabel }}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        dateLibInstance={dayjs}
        localeText={muiLabels}
        adapterLocale={locale}
      >
        {children}
      </LocalizationProvider>
    </LabelContext.Provider>
  );
};

export default LabelProvider;
