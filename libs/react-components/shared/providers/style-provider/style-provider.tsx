import React from 'react';

import '../../../community/src/styles/index.scss';

export interface StyleProviderProps {
  children: React.ReactNode;
}

export const StyleProvider = (props: StyleProviderProps): JSX.Element => {
  const { children } = props;
  return <>{children}</>;
};
