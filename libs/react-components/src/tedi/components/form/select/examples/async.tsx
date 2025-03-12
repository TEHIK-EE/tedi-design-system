import { StoryFn } from '@storybook/react';
import React from 'react';

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
    if (typeof i.label === 'string') {
      return i.label.toLowerCase().includes(inputValue.toLowerCase());
    }
    return;
  });
};

const loadOptions = (inputValue: string, callback: (options: ISelectOption[]) => void) => {
  setTimeout(() => {
    console.log(inputValue);
    callback(filterColors(inputValue));
  }, 1000);
};

export const AsyncSelectTemplate: StoryFn<typeof Select> = (args) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (newValue: string) => {
    const newInputValue = newValue.replace(/\W/g, '');
    setInputValue(newInputValue);
    return newInputValue;
  };

  return (
    <div>
      <p>value: {inputValue}</p>
      <Select {...args} onInputChange={handleInputChange} loadOptions={loadOptions} />
    </div>
  );
};
