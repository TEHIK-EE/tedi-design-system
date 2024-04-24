import { StoryFn } from '@storybook/react';
import React from 'react';
import { InputActionMeta } from 'react-select';

import Select, { ISelectOption, TSelectValue } from '../select';

const colourOptions: ISelectOption[] = [
  { value: 'ocean', label: 'Ocean' },
  { value: 'blue', label: 'Blue', isDisabled: true },
  { value: 'purple', label: 'Purple' },
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'forest', label: 'Forest' },
  { value: 'slate', label: 'Slate' },
  { value: 'silver', label: 'Silver' },
];

export const EditableSelectTemplate: StoryFn<typeof Select> = (args) => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [value, setValue] = React.useState<TSelectValue>(null);

  const handleInputChange = (newValue: string, { action }: InputActionMeta) => {
    if (action === 'input-change') setInputValue(newValue);
    return newValue;
  };

  const handleOnChange = (value: TSelectValue) => {
    setValue(value);
    setInputValue(value ? ((value as ISelectOption).label as string) : '');
  };

  return (
    <div>
      <p>value: {inputValue}</p>
      <Select
        {...args}
        value={value}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleOnChange}
        inputIsHidden={false}
        options={colourOptions}
      />
    </div>
  );
};
