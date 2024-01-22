import cn from 'classnames';
import React from 'react';

import { Col } from '../../../../grid';
import { ChoiceGroupItemProps } from '../../choice-group.types';
import { ChoiceGroupContext } from '../../choice-group-context';
import styles from './light-item.module.scss';

export const LightItem = (props: ChoiceGroupItemProps): React.ReactElement => {
  const { id, label, value, disabled, colProps } = props;
  const { currentValue, inputType, name, onChange } = React.useContext(ChoiceGroupContext);

  const isChecked = !currentValue
    ? false
    : inputType === 'checkbox'
    ? value === currentValue || currentValue.indexOf(value) !== -1
    : value === currentValue;

  const ColumnBEM = cn(
    colProps?.className,
    { [styles['light-item--disabled']]: disabled },
    { [styles['light-item--checked']]: isChecked }
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
        className={styles['light-item__input']}
      />
      <label htmlFor={id} className={styles['light-item__label']}>
        {label}
      </label>
    </Col>
  );
};

export default LightItem;
