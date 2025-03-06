import cn from 'classnames';
import React from 'react';

import { Col, Row } from '../../grid';
import { Icon } from '../../icon/icon';
import { ChoiceInputProps } from '../choice-input.types';
import FeedbackText from '../feedback-text/feedback-text';
import FormLabel from '../form-label/form-label';
import styles from './checkbox.module.scss';

export interface CheckboxProps extends ChoiceInputProps {
  /**
   * If the check is in indeterminate state. (Not checked or unchecked)
   * When this is true then the checked prop is ignored
   */
  indeterminate?: boolean;
}

export const Checkbox = (props: CheckboxProps): JSX.Element => {
  const {
    id,
    label,
    value,
    className,
    disabled = false,
    onChange,
    hideLabel = false,
    helper,
    checked,
    defaultChecked,
    indeterminate,
    hover,
    name,
    tooltip,
    invalid,
    size = 'default',
    ...rest
  } = props;
  const [innerChecked, setInnerChecked] = React.useState<boolean>(defaultChecked || false);
  const labelRef = React.useRef<HTMLLabelElement>(null);

  const getChecked = React.useMemo((): boolean | 'mixed' => {
    return indeterminate ? 'mixed' : onChange && typeof checked !== 'undefined' ? checked : innerChecked;
  }, [indeterminate, onChange, checked, innerChecked]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (typeof checked === 'undefined') {
      setInnerChecked(event?.target.checked);
    }
    onChange?.(value, event?.target.checked);
  };

  const helperId = helper ? helper?.id ?? `${id}-helper` : undefined;
  const LabelBEM = cn(styles['tedi-checkbox'], { [styles['tedi-checkbox--disabled']]: disabled });

  return (
    <div data-name="check" className={className} {...rest}>
      <Row gutter={0}>
        <Col width="auto">
          <div className={styles['tedi-checkbox__outer-indicator-wrapper']}>
            <input
              id={id}
              value={value}
              name={name}
              type="checkbox"
              disabled={disabled}
              checked={getChecked !== 'mixed' ? getChecked : false}
              aria-checked={getChecked}
              onChange={onChangeHandler}
              className={styles['tedi-checkbox__input']}
              aria-describedby={helperId}
            />
            <div
              aria-hidden="true"
              onClick={() => labelRef.current?.click()}
              className={cn(styles['tedi-checkbox__indicator'], {
                [styles['tedi-checkbox__indicator--hover']]: hover,
                [styles['tedi-checkbox__indicator--indeterminate']]: indeterminate,
                [styles[`tedi-checkbox__indicator--size-${size}`]]: size,
                [styles['tedi-checkbox__indicator--invalid']]: invalid,
              })}
              data-testid="checkbox-indicator"
            >
              <Icon
                size={size === 'default' ? 16 : 18}
                name="remove"
                className={cn(styles['tedi-checkbox__icon'], styles['tedi-checkbox__icon--indeterminate'])}
              />
              <Icon
                size={size === 'default' ? 16 : 18}
                name="check"
                className={cn(styles['tedi-checkbox__icon'], styles['tedi-checkbox__icon--check'])}
              />
            </div>
          </div>
        </Col>
        <Col>
          <FormLabel
            ref={labelRef}
            className={LabelBEM}
            id={id}
            data-testid="checkbox-label"
            hideLabel={hideLabel}
            label={label}
            tooltip={tooltip}
          />
        </Col>
      </Row>
      {helper && (
        <FeedbackText id={helperId} {...helper} className={cn(styles['tedi-checkbox__helper'], helper.className)} />
      )}
    </div>
  );
};

export default Checkbox;
