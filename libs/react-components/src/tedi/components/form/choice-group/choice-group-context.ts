import React from 'react';

import { ChoiceGroupItemType, ChoiceGroupValue } from './choice-group.types';

export interface IChoiceGroupContext {
  name: string;
  inputType: ChoiceGroupItemType;
  currentValue: ChoiceGroupValue;
  onChange: (value: string, checked: boolean) => void;
}

export const ChoiceGroupContext = React.createContext<IChoiceGroupContext>({
  name: '',
  inputType: 'radio',
  onChange: () => null,
  currentValue: [],
});
