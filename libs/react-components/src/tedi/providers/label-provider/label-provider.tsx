import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { PickersLocaleText } from '@mui/x-date-pickers/locales/utils/pickersLocaleTextApi';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import updateLocale from 'dayjs/plugin/updateLocale';
import React, { useCallback, useMemo } from 'react';

import { TediLabelRecord, TediLanguage } from './label-types';
import { labelsMap, TediLabels } from './labels-map';

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
      : []
  >(
    key: TKey,
    ...args: TArgs
  ): string;
}

export const LabelContext = React.createContext<ILabelContext>({
  getLabel: (key) => {
    if (!isTestEnvironment) {
      console.error('LabelProvider missing! Application must be wrapped with <LabelProvider>');
    }
    return key;
  },
});

export interface LabelProviderProps {
  /**
   * Global labels that are use in components. If omitted then default labels are used based on `locale` prop.
   * If both props are omitted then English translations are used by default
   */
  labels?: TediLabelRecord;
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

export const LabelProvider = (props: LabelProviderProps): JSX.Element => {
  const { labels = {}, children, locale = 'en' } = props;
  const mergedLabels: TediLabelRecord = useMemo(() => ({ ...labelsMap, ...labels }), [labels]);

  dayjs.locale(locale);

  const getLabel = useCallback(
    <
      TKey extends keyof TediLabels,
      TArgs extends TediLabels[TKey] extends Record<TediLanguage, infer FuncType>
        ? FuncType extends (...args: infer P) => string
          ? P
          : []
        : []
    >(
      key: TKey,
      ...args: TArgs
    ): string => {
      const label = mergedLabels[key];

      if (!label || !(locale in label)) {
        return key;
      }

      const value = label[locale];

      if (typeof value === 'function') {
        return value(...args);
      }

      return value;
    },
    [locale, mergedLabels]
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
