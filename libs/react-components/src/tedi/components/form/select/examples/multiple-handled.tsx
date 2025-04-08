/* istanbul ignore file */
import { StoryFn } from '@storybook/react';
import React from 'react';

import { Col, Row } from '../../../../../tedi/components/grid';
import Select, { ISelectOption, TSelectValue } from '../select';

export const colourOptions: ISelectOption[] = [
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

const defaultOptions: TSelectValue = [colourOptions[0], colourOptions[2]];

export const MultipleHandledTemplate: StoryFn<typeof Select> = (args) => {
  const [inputValue, setInputValue] = React.useState<TSelectValue>(args.defaultValue ?? defaultOptions);

  const handleInputChange = (newValue: TSelectValue) => {
    setInputValue(newValue);
    return inputValue;
  };

  return (
    <Row>
      <Col lg={4} sm={12}>
        <Select options={colourOptions} onChange={(value) => handleInputChange(value)} value={inputValue} {...args} />
      </Col>
    </Row>
  );
};
