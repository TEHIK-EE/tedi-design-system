import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { PickersLocaleText } from '@mui/x-date-pickers/locales/utils/pickersLocaleTextApi';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import React from 'react';

import { defaultEELabels, defaultENLabels, FlatLabelsMap, LabelsMapType } from './labels-map';

import 'dayjs/locale/et';
import 'dayjs/locale/ru';
dayjs.extend(updateLocale);
// Start en locale week with monday
dayjs.updateLocale('en', {
  weekStart: 1,
});

const isTestEnvironment = process.env.JEST_WORKER_ID !== undefined;

type DefaultLabelsMap = FlatLabelsMap<LabelsMapType, 'en'>;

export interface ILabelContext {
  getLabel: <T extends DefaultLabelsMap, K extends keyof T>(key: K) => K | T[K];
}

const defaultContext: ILabelContext = {
  getLabel: (key) => {
    if (!isTestEnvironment) {
      console.error('LabelProvider missing! Application must be wrapped with <LabelProvider>');
    }
    return key;
  },
};

export const LabelContext = React.createContext<ILabelContext>(defaultContext);

export interface LabelProviderProps {
  /**
   * Global labels that are use in components. If omitted then default labels are used based on `locale` prop.
   * If both props are omitted then English translations are used by default
   */
  labels?: Partial<DefaultLabelsMap>;
  /**
   * Currently used locale. Supported languages are:
   * et - Estonian
   * en - English
   * ru - Russian
   */
  locale?: 'en' | 'et' | 'ru';
  /**
   * Rest of the App code
   */
  children: React.ReactNode;
}

export const LabelProvider = (props: LabelProviderProps): JSX.Element => {
  const { labels = {}, children, locale = 'en' } = props;
  const mergedLabels = { ...(locale === 'et' ? defaultEELabels : defaultENLabels), ...labels };

  React.useEffect(() => {
    dayjs.locale(locale);
  }, [locale]);

  const getLabel = (key: keyof DefaultLabelsMap) => {
    const label = mergedLabels[key];

    if (!label) {
      console.error(`Label missing for key "${key}".`);
      return key;
    }

    return label;
  };

  // find all labels that we need to pass into LocalizationProvider
  const muiLabels = Object.keys(mergedLabels).reduce((a, c) => {
    return {
      ...a,
      ...(c.startsWith('pickers.')
        ? {
            [c.replace('pickers.', '')]: mergedLabels[c as keyof LabelsMapType],
          }
        : {}),
    };
  }, {} as Partial<PickersLocaleText<unknown>>);

  return (
    <LabelContext.Provider value={{ getLabel: getLabel as ILabelContext['getLabel'] }}>
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
