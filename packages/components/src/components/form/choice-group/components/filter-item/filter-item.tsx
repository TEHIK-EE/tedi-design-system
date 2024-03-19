import cn from 'classnames';
import React from 'react';

import { Col } from '../../../../grid';
import { ChoiceGroupItemProps } from '../../choice-group.types';
import { ChoiceGroupContext } from '../../choice-group-context';
import styles from './filter-item.module.scss';

export const FilterItem = (props: ChoiceGroupItemProps): React.ReactElement => {
  const { id, label, value, disabled, colProps, background } = props;
  const { currentValue, inputType, name, onChange } = React.useContext(ChoiceGroupContext);

  const isChecked = !currentValue
    ? false
    : inputType === 'checkbox'
    ? value === currentValue || currentValue.indexOf(value) !== -1
    : value === currentValue;

  const ColumnBEM = cn(
    styles['filter-item'],
    colProps?.className,
    { [styles['filter-item--disabled']]: disabled },
    { [styles['filter-item--checked']]: isChecked },
    { [styles[`filter-item--${background}`]]: !!background }
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
        onChange={(event) => onChange(value, event?.target.checked)}
        className={styles['filter-item__input']}
      />
      <label htmlFor={id} className={styles['filter-item__label']}>
        {label}
      </label>
    </Col>
  );
};

export default FilterItem;
