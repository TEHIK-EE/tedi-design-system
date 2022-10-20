import React from 'react';

import { assertIsString } from '../../../helper/assertions/assert-is-string';
import Select, { ISelectOption } from '../select';

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

const filterColors = (inputValue: string) => {
  return colourOptions.filter((i) => {
    assertIsString(i.label);
    return i.label.toLowerCase().includes(inputValue.toLowerCase());
  });
};

const loadOptions = (inputValue: string, callback: (options: ISelectOption[]) => void) => {
  setTimeout(() => {
    console.log(inputValue);
    callback(filterColors(inputValue));
  }, 1000);
};

export const AsyncSelect = () => {
  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (newValue: string) => {
    const newInputValue = newValue.replace(/\W/g, '');
    setInputValue(newInputValue);
    return newInputValue;
  };

  return (
    <div>
      <p>value: {inputValue}</p>
      <Select
        id="async-example"
        label="Async label"
        async={true}
        onInputChange={handleInputChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};
