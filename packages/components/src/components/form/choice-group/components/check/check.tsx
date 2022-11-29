import cn from 'classnames';
import React from 'react';

import { Col } from '../../../../grid';
import Icon from '../../../../icon/icon';
import { ChoiceGroupItemProps } from '../../choice-group.types';
import { ChoiceGroupContext } from '../../choice-group-context';
import styles from './check.module.scss';

export const Check = (props: ChoiceGroupItemProps): JSX.Element => {
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

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange?.(value, event?.target.checked);
    onChangeItem?.(event?.target.checked);
  };

  const LabelBEM = cn(styles['check'], { [styles['check--disabled']]: disabled });

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
          className={styles['check__input']}
        />
        <span className={styles['check__indicator']}>
          <Icon size={16} name="check" className={styles['check__icon']} />
        </span>
        <span className={cn(styles['check__content'], { 'visually-hidden': hideLabel })}>{label}</span>
      </label>
      {extraContent && <div className={styles['check__extra-content']}>{extraContent}</div>}
    </Col>
  );
};

export default Check;
