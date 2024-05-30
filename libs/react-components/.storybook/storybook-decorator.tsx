import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import React from 'react';

import { AccessibilityProvider } from '../community/src/providers/accessibility-provider/accessibility-provider';
import { LabelProvider, LabelProviderProps } from '../community/src/providers/label-provider';

import 'dayjs/locale/et';

dayjs.extend(weekday);

interface StorybookDecoratorProps {
  children: React.ReactNode;
  locale?: LabelProviderProps['locale'];
}

const StorybookDecorator = ({ children, locale = 'en', ...rest }: StorybookDecoratorProps) => (
  <LabelProvider locale={locale} {...rest}>
    <AccessibilityProvider>{children}</AccessibilityProvider>
  </LabelProvider>
);

export default StorybookDecorator;
