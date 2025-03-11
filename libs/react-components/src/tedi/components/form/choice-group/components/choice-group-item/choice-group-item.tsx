import cn from 'classnames';
import React from 'react';

import { Col, Direction } from '../../../../../../tedi/components/grid';
import Checkbox from '../../../checkbox/checkbox';
import FeedbackText from '../../../feedback-text/feedback-text';
import Radio from '../../../radio/radio';
import {
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
    colProps = direction === 'column' ? { width: 12 } : { width: 'auto' },
    onChange: onChangeItem,
    hideLabel,
    helper,
    tooltip,
    type = 'radio',
    variant = 'default',
    color = 'primary',
    showIndicator,
    isSegmented = true,
  } = props;

  const { currentValue, name, onChange, inputType } = React.useContext(ChoiceGroupContext);
  const isChecked = Array.isArray(currentValue) ? currentValue.includes(value) : value === currentValue;
  const defaultChecked = isChecked || (currentValue === undefined && props.defaultChecked);

  const onChangeHandler = (value: string, checked: boolean): void => {
    onChange?.(value, checked);
    onChangeItem?.(value, checked);
  };

  const ColumnBEM = cn(
    styles[`tedi-choice-group-item--${variant}`],
    styles[`tedi-choice-group-item--${variant}-${color}`],
    showIndicator && styles['tedi-choice-group-item--indicator'],
    isSegmented && styles['tedi-choice-group-item--segmented'],
    direction && styles[`tedi-choice-group-item--${direction}`],
    type && styles[`tedi-choice-group-item--${type}`],
    { [styles['tedi-choice-group-item--disabled']]: disabled },
    { [styles['tedi-choice-group-item--checked']]: isChecked },
    colProps?.className
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
          className={cn(styles['tedi-choice-group-item__indicator'], className)}
          disabled={disabled}
          checked={isChecked}
          defaultChecked={defaultChecked}
          onChange={onChangeHandler}
          hideLabel={hideLabel}
          helper={
            helper
              ? { ...helper, className: cn(styles['tedi-choice-group-item__feedback-text'], helper.className) }
              : undefined
          }
          tooltip={tooltip}
          data-testid="choice-group-item-indicator"
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
          defaultChecked={currentValue === undefined ? props.defaultChecked : undefined}
          onChange={(e) => onChangeHandler(value, e.target.checked)}
        />
        <label htmlFor={id} className={styles['tedi-choice-group-item__label']}>
          {label}
          {helper && <FeedbackText {...helper} id={id} className={styles['tedi-choice-group-item__feedback-text']} />}
        </label>
      </Col>
    );
  }

  return <></>;
};

export default ChoiceGroupItem;
