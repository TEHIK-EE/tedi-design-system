import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import React from 'react';

import { AccessibilityProvider } from '../src/community/providers/accessibility-provider/accessibility-provider';
import { LabelProvider, LabelProviderProps } from '../src/tedi/providers/label-provider';

import 'dayjs/locale/et';
import Tooltip from '../src/tedi/components/tooltip/tooltip';

dayjs.extend(weekday);

interface StorybookDecoratorProps {
  children: React.ReactNode;
  locale?: LabelProviderProps['locale'];
}

const StorybookDecorator = ({ children, locale = 'en', ...rest }: StorybookDecoratorProps) => (
  <LabelProvider locale={locale} {...rest}>
    <AccessibilityProvider>
      <Tooltip.Provider>{children}</Tooltip.Provider>
    </AccessibilityProvider>
  </LabelProvider>
);

export default StorybookDecorator;
