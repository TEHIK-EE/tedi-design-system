import cn from 'classnames';
import React from 'react';

import { Col } from '../../../../grid';
import { ChoiceGroupContext, ChoiceGroupItemProps } from '../../choice-group';
import styles from './selector-item.module.scss';

export const SelectorItem = (props: ChoiceGroupItemProps): JSX.Element => {
  const { id, label, value, disabled, colProps } = props;
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
    styles['selector__item'],
    colProps?.className,
    { [styles['selector__item--disabled']]: disabled },
    { [styles['selector__item--checked']]: isChecked }
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
        className={styles['selector__input']}
        tabIndex={-1}
      />
      <label htmlFor={id} className={styles['selector__item-label']} tabIndex={0}>
        {label}
      </label>
    </Col>
  );
};
