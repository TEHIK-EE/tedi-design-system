import React from 'react';

import { RowElement } from './row';

interface IRowContext {
  element: RowElement;
}

export const RowContext = React.createContext<IRowContext>({
  element: 'div',
});
