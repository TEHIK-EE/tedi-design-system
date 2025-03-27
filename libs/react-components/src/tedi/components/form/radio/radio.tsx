import cn from 'classnames';
import React from 'react';

import { Col, Row } from '../../../../tedi/components/grid';
import { ChoiceInputProps } from '../choice-input.types';
import FeedbackText from '../feedback-text/feedback-text';
import FormLabel from '../form-label/form-label';
import styles from './radio.module.scss';

export type RadioProps = ChoiceInputProps;

export const Radio = (props: RadioProps): JSX.Element => {
  const {
    id,
    label,
    value,
    className,
    disabled,
    onChange,
    hideLabel,
    helper,
    checked,
    defaultChecked,
    hover,
    name,
    tooltip,
    size = 'default',
    invalid,
    ...rest
  } = props;
  const [innerChecked, setInnerChecked] = React.useState<boolean>(defaultChecked || false);
  const labelRef = React.useRef<HTMLLabelElement>(null);

  const getChecked = React.useMemo((): boolean => {
    return onChange && typeof checked !== 'undefined' ? checked : innerChecked;
  }, [onChange, innerChecked, checked]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (typeof checked === 'undefined') {
      setInnerChecked(event?.target.checked);
    }
    onChange?.(value, event?.target.checked);
  };

  const helperId = helper ? helper?.id ?? `${id}-helper` : undefined;
  const LabelBEM = cn(styles['tedi-radio'], { [styles['tedi-radio--disabled']]: disabled });

  return (
    <div data-name="radio" {...rest}>
      <Row gutter={0}>
        <Col width="auto">
          <div className={styles['tedi-radio__outer-indicator-wrapper']}>
            <input
              id={id}
              value={value}
              name={name}
              type="radio"
              disabled={disabled}
              checked={getChecked}
              onChange={onChangeHandler}
              className={styles['tedi-radio__input']}
            />
            <div
              aria-hidden="true"
              onClick={() => labelRef.current?.click()}
              className={cn(
                styles['tedi-radio__indicator'],
                { [styles['tedi-radio__indicator--hover']]: hover },
                { [styles[`tedi-radio__indicator--size-${size}`]]: size },
                { [styles['tedi-radio__indicator--invalid']]: invalid },
                className
              )}
              data-testid="radio-indicator"
            />
          </div>
        </Col>
        <Col>
          <FormLabel
            ref={labelRef}
            className={LabelBEM}
            id={id}
            data-testid="radio-label"
            hideLabel={hideLabel}
            label={label}
            tooltip={tooltip}
          />
        </Col>
      </Row>

      {helper && (
        <FeedbackText id={helperId} {...helper} className={cn(styles['tedi-radio__helper'], helper.className)} />
      )}
    </div>
  );
};

export default Radio;
