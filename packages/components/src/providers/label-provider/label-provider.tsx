import React from 'react';

import { defaultEELabels } from './default-labels';

export type LabelKeys = keyof typeof defaultEELabels;

export interface LabelProviderProps {
  labels: Partial<Record<LabelKeys, string>>;
  children: React.ReactNode;
}

export interface ILabelContext {
  getLabel: (key: LabelKeys, params?: Record<LabelKeys, string>) => string;
}

const isTestEnvironment = process.env.JEST_WORKER_ID !== undefined;

export const defaultContext: ILabelContext = {
  getLabel: (key) => {
    if (!isTestEnvironment) {
      console.error('LabelProvider missing! Application must be wrapped with <LabelProvider>');
    }
    return key;
  },
};

export const LabelContext = React.createContext<ILabelContext>(defaultContext);

export const replaceParams = (label: string, params: Record<LabelKeys, string>): string => {
  return (Object.keys(params) as Array<LabelKeys>).reduce(
    (text, key) => text.replace(`$\{${key}}`, params[key]),
    label
  );
};

export const LabelProvider = (props: LabelProviderProps): JSX.Element => {
  const { labels, children } = props;

  const getLabel = (key: LabelKeys, params?: Record<LabelKeys, string>): string => {
    const label = labels[key];

    if (!label) {
      console.error(`Label missing for key "${key}".`);
      return key;
    }

    if (params) {
      return replaceParams(label, params);
    }

    return label;
  };

  return <LabelContext.Provider value={{ getLabel }}>{children}</LabelContext.Provider>;
};

export default LabelProvider;
