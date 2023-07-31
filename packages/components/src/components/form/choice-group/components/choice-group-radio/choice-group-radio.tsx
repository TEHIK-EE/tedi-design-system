import React from 'react';

import { Col } from '../../../../grid';
import Radio from '../../../radio/radio';
import { ChoiceGroupItemProps } from '../../choice-group.types';
import { ChoiceGroupContext } from '../../choice-group-context';

export const ChoiceGroupRadio = (props: ChoiceGroupItemProps): React.ReactElement => {
  const {
    id,
    label,
    value,
    direction = 'column',
    disabled,
    colProps = direction === 'column' ? { width: 12 } : { width: 'auto', grow: 1 },
    onChange: onChangeItem,
    hideLabel,
    extraContent,
  } = props;
  const { currentValue, inputType, name, onChange } = React.useContext(ChoiceGroupContext);

  const isChecked = !currentValue
    ? false
    : inputType === 'checkbox'
    ? value === currentValue || currentValue.indexOf(value) !== -1
    : value === currentValue;

  const onChangeHandler = (value: string, checked: boolean): void => {
    onChange?.(value, checked);
    onChangeItem?.(checked);
  };

  return (
    <Col {...colProps}>
      <Radio
        id={id}
        label={label}
        value={value}
        name={name}
        disabled={disabled}
        checked={isChecked}
        onChange={onChangeHandler}
        hideLabel={hideLabel}
        extraContent={extraContent}
      />
    </Col>
  );
};

export default ChoiceGroupRadio;
