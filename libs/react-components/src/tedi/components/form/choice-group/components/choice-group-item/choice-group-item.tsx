import cn from 'classnames';
import React from 'react';

import { Col, Direction } from '../../../../../../tedi/components/grid';
import Checkbox from '../../../checkbox/checkbox';
import FeedbackText from '../../../feedback-text/feedback-text';
import Radio from '../../../radio/radio';
import {
  ChoiceGroupItemBackground,
  ChoiceGroupItemColor,
  ChoiceGroupItemProps,
  ChoiceGroupItemType,
  ChoiceGroupItemVariant,
} from '../../choice-group.types';
import { ChoiceGroupContext } from '../../choice-group-context';
import styles from './choice-group-item.module.scss';

export interface ExtendedChoiceGroupItemProps extends ChoiceGroupItemProps {
  id: string;
  label: string;
  value: string;
  className?: string;
  direction?: Direction;
  type?: ChoiceGroupItemType;
  variant?: ChoiceGroupItemVariant;
  color?: ChoiceGroupItemColor;
  background?: ChoiceGroupItemBackground;
  showIndicator?: boolean;
  isSegmented?: boolean;
}

export const ChoiceGroupItem = (props: ExtendedChoiceGroupItemProps): React.ReactElement => {
  const {
    id,
    label,
    value,
    className,
    direction,
    disabled,
    colProps = direction === 'column' ? { width: 12 } : { width: 'auto', grow: 1 },
    onChange: onChangeItem,
    hideLabel,
    helper,
    tooltip,
    type = 'radio',
    variant = 'default',
    color = 'primary',
    background,
    showIndicator,
    isSegmented = true,
  } = props;

  const { currentValue, name, onChange, inputType } = React.useContext(ChoiceGroupContext);
  const isChecked = Array.isArray(currentValue) ? currentValue.includes(value) : value === currentValue;

  const onChangeHandler = (value: string, checked: boolean): void => {
    onChange?.(value, checked);
    onChangeItem?.(value, checked);
  };

  const ColumnBEM = cn(
    styles[`tedi-choice-group-item--${variant}`],
    styles[`tedi-choice-group-item--${variant}-${color}`],
    showIndicator && styles['tedi-choice-group-item--indicator'],
    isSegmented && styles['tedi-choice-group-item--segmented'],
    colProps?.className,
    { [styles['tedi-choice-group-item--disabled']]: disabled },
    { [styles['tedi-choice-group-item--checked']]: isChecked },
    background && variant === 'card' ? styles[`tedi-choice-group-item--${background}`] : ''
  );

  if (variant === 'default' || showIndicator) {
    const InputComponent = type === 'radio' ? Radio : Checkbox;

    return (
      <Col {...colProps} className={ColumnBEM}>
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
  }

  if (variant === 'card') {
    return (
      <Col {...colProps} className={ColumnBEM}>
        <input
          id={id}
          value={value}
          name={name}
          type={inputType}
          disabled={disabled}
          checked={isChecked}
          onChange={(e) => onChangeHandler(value, e.target.checked)}
          className={styles['tedi-choice-group-item__input']}
        />
        <label htmlFor={id} className={styles['tedi-choice-group-item__label']}>
          {label}
        </label>
        {helper && <FeedbackText {...helper} id={id} />}
      </Col>
    );
  }

  return <></>;
};

export default ChoiceGroupItem;
