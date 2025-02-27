import cn from 'classnames';
import React from 'react';

import { Col, Row } from '../../../../tedi/components/grid';
import { Icon } from '../../../../tedi/components/icon/icon';
import { Tooltip, TooltipProvider, TooltipTrigger } from '../../tooltip';
import { ChoiceInputProps } from '../choice-input.types';
import styles from './check.module.scss';

export interface CheckProps extends ChoiceInputProps {
  /**
   * If the check is in indeterminate state. (Not checked or unchecked)
   * When this is true then the checked prop is ignored
   */
  indeterminate?: boolean;
}

export const Check = (props: CheckProps): JSX.Element => {
  const {
    id,
    label,
    value,
    className,
    disabled = false,
    onChange,
    hideLabel = false,
    extraContent,
    checked,
    defaultChecked,
    indeterminate,
    hover,
    name,
    tooltip,
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

  const LabelBEM = cn(styles['check'], { [styles['check--disabled']]: disabled });

  return (
    <div data-name="check" className={className} {...rest}>
      <Row gutter={0}>
        <Col width="auto">
          <input
            id={id}
            value={value}
            name={name}
            type="checkbox"
            disabled={disabled}
            checked={getChecked !== 'mixed' ? getChecked : false}
            aria-checked={getChecked}
            onChange={onChangeHandler}
            className={styles['check__input']}
          />
          <div
            aria-hidden="true"
            onClick={() => labelRef.current?.click()} // Click on the indicator itself should still toggle state
            className={cn(styles['check__indicator'], {
              [styles['check__indicator--hover']]: hover,
              [styles['check__indicator--indeterminate']]: indeterminate,
            })}
          >
            <Icon size={16} name="remove" className={cn(styles['check__icon'], styles['check__icon--indeterminate'])} />
            <Icon size={16} name="check" className={cn(styles['check__icon'], styles['check__icon--check'])} />
          </div>
        </Col>
        <Col>
          <label ref={labelRef} className={LabelBEM} htmlFor={id}>
            <span className={cn({ 'visually-hidden': hideLabel })}>{label}</span>
            {tooltip && (
              <TooltipProvider>
                <TooltipTrigger>
                  <Icon
                    name="info"
                    color="brand"
                    size={16}
                    display="inline"
                    className={styles['check__tooltip-icon']}
                  />
                </TooltipTrigger>
                <Tooltip>{tooltip}</Tooltip>
              </TooltipProvider>
            )}
          </label>
        </Col>
      </Row>
      {extraContent && <div className={styles['check__extra-content']}>{extraContent}</div>}
    </div>
  );
};

export default Check;
