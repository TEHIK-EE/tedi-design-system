import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';

import { defaultEELabels, defaultENLabels, FlatLabelsMap, LabelsMapType } from './labels-map';

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
   * Currently used locale.
   * et - Estonian
   * en - English
   */
  locale?: string;
  /**
   * Rest of the App code
   */
  children: React.ReactNode;
}

export const LabelProvider = (props: LabelProviderProps): JSX.Element => {
  const { labels = {}, children, locale } = props;
  const mergedLabels = { ...(locale === 'et' ? defaultEELabels : defaultENLabels), ...labels };

  const getLabel = (key: keyof DefaultLabelsMap) => {
    const label = mergedLabels[key];

    if (!label) {
      console.error(`Label missing for key "${key}".`);
      return key;
    }

    return label;
  };

  return (
    <LabelContext.Provider value={{ getLabel: getLabel as ILabelContext['getLabel'] }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
        {children}
      </LocalizationProvider>
    </LabelContext.Provider>
  );
};

export default LabelProvider;
