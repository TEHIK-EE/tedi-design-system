import cn from 'classnames';
import React from 'react';

import { Col } from '../../../../../../tedi/components/grid';
import { ChoiceGroupItemProps } from '../../choice-group.types';
import { ChoiceGroupContext } from '../../choice-group-context';
import styles from './selector-item.module.scss';

export const SelectorItem = (props: ChoiceGroupItemProps): React.ReactElement => {
  const { id, label, value, disabled, colProps, direction } = props;
  const { currentValue, inputType, name, onChange } = React.useContext(ChoiceGroupContext);

  const isChecked = !currentValue
    ? false
    : inputType === 'checkbox'
    ? value === currentValue || currentValue.indexOf(value) !== -1
    : value === currentValue;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange?.(value, event?.target.checked);
  };

  const ColumnBEM = cn(
    styles['selector-item'],
    colProps?.className,
    styles[`selector-item--${direction}`],
    { [styles['selector-item--disabled']]: disabled },
    { [styles['selector-item--checked']]: isChecked }
  );

  return (
    <Col {...colProps} className={ColumnBEM}>
      <input
        id={id}
        value={value}
        name={name}
        type={inputType}
        disabled={disabled}
        checked={isChecked}
        onChange={onChangeHandler}
        className={styles['selector-item__input']}
      />
      <label htmlFor={id} className={styles['selector-item__label']}>
        {label}
      </label>
    </Col>
  );
};
