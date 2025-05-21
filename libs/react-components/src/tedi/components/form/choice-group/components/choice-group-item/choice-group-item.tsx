import cn from 'classnames';
import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../../../helpers';
import { Col, ColProps, Direction } from '../../../../layout/grid';
import Checkbox from '../../../checkbox/checkbox';
import { ChoiceInputProps } from '../../../choice-input.types';
import FeedbackText from '../../../feedback-text/feedback-text';
import Radio from '../../../radio/radio';
import {
  ChoiceGroupItemColor,
  ChoiceGroupItemLayout,
  ChoiceGroupItemType,
  ChoiceGroupItemVariant,
} from '../../choice-group.types';
import { ChoiceGroupContext } from '../../choice-group-context';
import styles from './choice-group-item.module.scss';

interface ChoiceGroupItemBreakpointProps extends Omit<ChoiceInputProps, 'name'> {
  direction?: Direction;
  showIndicator?: boolean;
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  className?: string;
  type?: ChoiceGroupItemType;
  variant?: ChoiceGroupItemVariant;
  color?: ChoiceGroupItemColor;
  colProps?: ColProps;
  layout?: ChoiceGroupItemLayout;
}

export interface ExtendedChoiceGroupItemProps extends BreakpointSupport<ChoiceGroupItemBreakpointProps> {
  id: string;
  label: string | React.ReactNode;
  value: string;
}

export const ChoiceGroupItem = (props: ExtendedChoiceGroupItemProps): React.ReactElement => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
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
    layout,
    showIndicator,
    justifyContent = 'start',
  } = getCurrentBreakpointProps(props);

  const { currentValue, name, onChange, inputType } = React.useContext(ChoiceGroupContext);
  const isChecked = Array.isArray(currentValue) ? currentValue.includes(value) : value === currentValue;
  const defaultChecked = currentValue === undefined ? props.defaultChecked : isChecked;

  const onChangeHandler = (value: string, checked: boolean): void => {
    onChange?.(value, checked);
    onChangeItem?.(value, checked);
  };

  const ColumnBEM = cn(
    styles[`tedi-choice-group-item--${layout === 'separated' ? 'separated' : 'segmented'}`],
    direction && styles[`tedi-choice-group-item--${direction}`]
  );

  const ChoiceGroupItemBEM = cn(
    styles['tedi-choice-group-item'],
    styles[`tedi-choice-group-item--${variant}`],
    styles[`tedi-choice-group-item--${variant}-${color}`],
    showIndicator && styles['tedi-choice-group-item--indicator'],
    type && styles[`tedi-choice-group-item--${type}`],
    { [styles['tedi-choice-group-item--disabled']]: disabled },
    { [styles['tedi-choice-group-item--checked']]: isChecked },
    { [`justify-content-${justifyContent}`]: justifyContent }
  );

  const InputComponent = type === 'radio' ? Radio : Checkbox;

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'LABEL') return;
    if (!disabled && variant === 'card') {
      document.getElementById(id)?.click();
    }
  };

  return (
    <Col {...colProps} className={ColumnBEM}>
      <div className={ChoiceGroupItemBEM} onClick={handleClick}>
        {variant === 'default' || showIndicator ? (
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
        ) : (
          <>
            <input
              id={id}
              value={value}
              name={name}
              type={inputType}
              disabled={disabled}
              checked={isChecked}
              defaultChecked={currentValue === undefined ? props.defaultChecked : undefined}
              onChange={(e) => onChangeHandler(value, e.target.checked)}
              className={styles['tedi-choice-group-item__input']}
            />
            <label htmlFor={id} className={styles['tedi-choice-group-item__label']}>
              {label}
              {helper && (
                <FeedbackText {...helper} id={id} className={styles['tedi-choice-group-item__feedback-text']} />
              )}
            </label>
          </>
        )}
      </div>
    </Col>
  );
};

export default ChoiceGroupItem;
