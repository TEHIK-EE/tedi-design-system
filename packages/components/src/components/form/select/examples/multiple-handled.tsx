import React from 'react';

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

const defaultOptions: TSelectValue = [colourOptions[0]];

export const MultipleHandled = () => {
  const [inputValue, setInputValue] = React.useState<TSelectValue>(defaultOptions);

  const handleInputChange = (newValue: TSelectValue) => {
    console.log(newValue);
    setInputValue(newValue);
    return inputValue;
  };

  return (
    <div>
      <Select
        options={colourOptions}
        id="multiple-handled-example"
        label="Multiple Select"
        multiple={true}
        onChange={(value) => handleInputChange(value)}
        value={inputValue}
      />
    </div>
  );
};
