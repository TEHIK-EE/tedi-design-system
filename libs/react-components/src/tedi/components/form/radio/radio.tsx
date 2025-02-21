import cn from 'classnames';
import React from 'react';

import { Col, Row } from '../../../../tedi/components/grid';
import { Icon } from '../../icon/icon';
import Tooltip from '../../tooltip/tooltip';
import { ChoiceInputProps } from '../choice-input.types';
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
    extraContent,
    checked,
    defaultChecked,
    hover,
    name,
    tooltip,
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

  const LabelBEM = cn(styles['tedi-radio'], { [styles['tedi-radio--disabled']]: disabled });

  return (
    <div data-name="radio" className={className} {...rest}>
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
              className={cn(styles['tedi-radio__indicator'], { [styles['tedi-radio__indicator--hover']]: hover })}
              data-testid="radio-indicator"
            />
          </div>
        </Col>
        <Col>
          <label ref={labelRef} className={LabelBEM} htmlFor={id} data-testid="radio-label">
            <span className={cn({ 'visually-hidden': hideLabel })}>{label}</span>
            {tooltip && (
              <>
                <Tooltip>
                  <Tooltip.Trigger>
                    <Icon
                      name="info"
                      color="brand"
                      size={18}
                      display="inline"
                      className={styles['tedi-radio__tooltip-icon']}
                    />
                  </Tooltip.Trigger>
                  <Tooltip.Content>{tooltip}</Tooltip.Content>
                </Tooltip>
              </>
            )}
          </label>
        </Col>
      </Row>

      {extraContent && <div className={styles['tedi-radio__extra-content']}>{extraContent}</div>}
    </div>
  );
};

export default Radio;
