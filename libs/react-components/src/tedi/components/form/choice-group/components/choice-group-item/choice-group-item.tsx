import React from 'react';

import { Col } from '../../../../../../tedi/components/grid';
import Checkbox from '../../../checkbox/checkbox';
import Radio from '../../../radio/radio';
import { ChoiceGroupItemType } from '../../choice-group';
import { ChoiceGroupItemProps } from '../../choice-group.types';
import { ChoiceGroupContext } from '../../choice-group-context';

export interface ExtendedChoiceGroupItemProps extends ChoiceGroupItemProps {
  type: ChoiceGroupItemType;
  variant?: 'default';
}

export const ChoiceGroupItem = (props: ExtendedChoiceGroupItemProps): React.ReactElement => {
  const {
    id,
    label,
    value,
    className,
    direction = 'column',
    disabled,
    colProps = direction === 'column' ? { width: 12 } : { width: 'auto', grow: 1 },
    onChange: onChangeItem,
    hideLabel,
    helper,
    tooltip,
    type,
  } = props;

  const { currentValue, name, onChange } = React.useContext(ChoiceGroupContext);
  const isChecked = Array.isArray(currentValue) ? currentValue.includes(value) : value === currentValue;

  const onChangeHandler = (value: string, checked: boolean): void => {
    onChange?.(value, checked);
    onChangeItem?.(value, checked);
  };

  const InputComponent = type === 'radio' ? Radio : Checkbox;
  return (
    <Col {...colProps} className={colProps?.className}>
      <InputComponent
        id={id}
        label={label}
        value={value}
        name={name}
        className={className}
        disabled={disabled}
        checked={isChecked}
        onChange={onChangeHandler}
        hideLabel={hideLabel}
        helper={helper}
        tooltip={tooltip}
      />
    </Col>
  );
};

export default ChoiceGroupItem;
