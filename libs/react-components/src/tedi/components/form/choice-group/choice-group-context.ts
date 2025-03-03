import React from 'react';

import { TChoiceGroupType, TChoiceGroupValue } from './choice-group';

export interface IChoiceGroupContext {
  name: string;
  inputType: TChoiceGroupType;
  currentValue: TChoiceGroupValue;
  onChange: (value: string, checked: boolean) => void;
}

export const ChoiceGroupContext = React.createContext<IChoiceGroupContext>({
  name: '',
  inputType: 'radio',
  onChange: () => null,
  currentValue: [],
});
