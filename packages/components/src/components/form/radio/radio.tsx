import cn from 'classnames';
import React from 'react';

import { Col, Row } from '../../grid';
import Icon from '../../icon/icon';
import { Tooltip, TooltipProvider, TooltipTrigger } from '../../tooltip';
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

  const getChecked = React.useMemo((): boolean => {
    return onChange && typeof checked !== 'undefined' ? checked : innerChecked;
  }, [onChange, innerChecked, checked]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (typeof checked === 'undefined') {
      setInnerChecked(event?.target.checked);
    }
    onChange?.(value, event?.target.checked);
  };

  const LabelBEM = cn(styles['radio'], { [styles['radio--disabled']]: disabled });

  return (
    <div data-name="radio" className={className} {...rest}>
      <Row gutter={0}>
        <Col width="auto">
          <input
            id={id}
            value={value}
            name={name}
            type="radio"
            disabled={disabled}
            checked={getChecked}
            onChange={onChangeHandler}
            className={styles['radio__input']}
          />
          {/* We are using two labels on the same input field to avoid manually managing the state of a custom checkbox. This will show up as a warning in the Storybook Accessibility addon. It is still valid HTML and is hidden from screen-readers so it should not cause any actual issues to end-users. */}
          <label
            aria-hidden="true"
            htmlFor={id}
            className={cn(styles['radio__indicator'], { [styles['radio__indicator--hover']]: hover })}
          />
        </Col>
        <Col>
          <label className={LabelBEM} htmlFor={id}>
            <span className={cn({ 'visually-hidden': hideLabel })}>{label}</span>
          </label>
          {tooltip && (
            <TooltipProvider>
              <TooltipTrigger>
                <Icon
                  name="info"
                  color="primary"
                  size={16}
                  display="inline"
                  className={styles['radio__tooltip-icon']}
                />
              </TooltipTrigger>
              <Tooltip>{tooltip}</Tooltip>
            </TooltipProvider>
          )}
        </Col>
      </Row>

      {extraContent && <div className={styles['radio__extra-content']}>{extraContent}</div>}
    </div>
  );
};

export default Radio;
