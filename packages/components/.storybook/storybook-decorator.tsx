import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import React from 'react';

import { LabelProvider } from '../src/providers/label-provider';

import 'dayjs/locale/et';

dayjs.extend(weekday);

interface StorybookDecoratorProps {
  children: React.ReactNode;
  locale?: string;
}

const StorybookDecorator = ({ children, locale = 'en', ...rest }: StorybookDecoratorProps) => (
  <LabelProvider locale={locale} {...rest}>
    {children}
  </LabelProvider>
);

export default StorybookDecorator;
