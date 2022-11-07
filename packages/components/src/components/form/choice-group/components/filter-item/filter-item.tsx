import cn from 'classnames';
import React from 'react';

import { Col } from '../../../../grid';
import { ChoiceGroupItemProps } from '../../choice-group.types';
import { ChoiceGroupContext } from '../../choice-group-context';
import styles from './filter-item.module.scss';

export const FilterItem = (props: ChoiceGroupItemProps): JSX.Element => {
  const { id, label, value, disabled, colProps } = props;
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
    { [styles['filter-item--checked']]: isChecked }
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
        tabIndex={-1}
      />
      <label htmlFor={id} className={styles['filter-item__label']} tabIndex={0}>
        {label}
      </label>
    </Col>
  );
};

export default FilterItem;
