import React from 'react';

import { Col } from '../../../../grid';
import Check from '../../../check/check';
import { ChoiceGroupItemProps } from '../../choice-group.types';
import { ChoiceGroupContext } from '../../choice-group-context';

export const ChoiceGroupCheck = (props: ChoiceGroupItemProps): JSX.Element => {
  const {
    id,
    label,
    value,
    disabled,
    colProps = { width: 12 },
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
      <Check
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

export default ChoiceGroupCheck;
