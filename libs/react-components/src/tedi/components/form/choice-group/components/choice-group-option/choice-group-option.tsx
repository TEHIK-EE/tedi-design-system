import cn from 'classnames';
import React from 'react';

import { Col } from '../../../../../../tedi/components/grid';
import { ChoiceGroupItemProps } from '../../choice-group.types';
import { ChoiceGroupContext } from '../../choice-group-context';
import styles from './choice-group-option.module.scss';

export const ChoiceGroupOption = (
  props: ChoiceGroupItemProps & { variant: 'filter' | 'light' | 'selector' }
): React.ReactElement => {
  const { id, label, value, disabled, colProps, background, direction, variant } = props;
  const { currentValue, inputType, name, onChange } = React.useContext(ChoiceGroupContext);

  const isChecked = !currentValue
    ? false
    : inputType === 'checkbox'
    ? value === currentValue || currentValue.indexOf(value) !== -1
    : value === currentValue;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange?.(value, event?.target.checked);
  };

  const baseClass = styles[`${variant}-item`];

  const ColumnBEM = cn(
    baseClass,
    colProps?.className,
    { [styles[`tedi-${variant}-item--disabled`]]: disabled },
    { [styles[`tedi-${variant}-item--checked`]]: isChecked },
    background && variant === 'filter' ? styles[`tedi-filter-item--${background}`] : '',
    direction && variant === 'selector' ? styles[`tedi-selector-item--${direction}`] : ''
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
        className={styles[`tedi-${variant}-item__input`]}
      />
      <label htmlFor={id} className={styles[`tedi-${variant}-item__label`]}>
        {label}
      </label>
    </Col>
  );
};

export default ChoiceGroupOption;
