import cn from 'classnames';
import React from 'react';

import { Col } from '../../../../grid';
import { ChoiceGroupItemProps } from '../../choice-group.types';
import { ChoiceGroupContext } from '../../choice-group-context';
import styles from './radio.module.scss';

export const Radio = (props: ChoiceGroupItemProps): JSX.Element => {
  const { id, label, value, disabled, colProps = { width: 12 }, onChange: onChangeItem } = props;
  const { currentValue, inputType, name, onChange } = React.useContext(ChoiceGroupContext);

  const isChecked = !currentValue
    ? false
    : inputType === 'checkbox'
    ? value === currentValue || currentValue.indexOf(value) !== -1
    : value === currentValue;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange?.(value, event?.target.checked);
    onChangeItem?.(event?.target.checked);
  };

  const LabelBEM = cn(styles['radio'], { [styles['radio--disabled']]: disabled });

  return (
    <Col {...colProps}>
      <label className={LabelBEM} htmlFor={id}>
        <input
          id={id}
          value={value}
          name={name}
          type={inputType}
          disabled={disabled}
          checked={isChecked}
          onChange={onChangeHandler}
          className={styles['radio__input']}
        />
        <span className={styles['radio__indicator']} />

        <span className={styles['radio__content']}>{label}</span>
      </label>
    </Col>
  );
};

export default Radio;
