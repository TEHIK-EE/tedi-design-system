import React from 'react';

import { ILabelContext, LabelContext } from './label-provider';

const useLabels = (): ILabelContext => {
  return React.useContext(LabelContext);
};

export { useLabels };
