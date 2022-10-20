import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import React from 'react';

import { defaultEELabels, LabelProvider } from '../src';
dayjs.extend(weekday);

import 'dayjs/locale/et';

dayjs.locale('et'); // use locale globally

const StorybookDecorator = ({ children }: { children: React.ReactNode }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ee">
    <LabelProvider labels={defaultEELabels}>{children}</LabelProvider>
  </LocalizationProvider>
);

export default StorybookDecorator;
