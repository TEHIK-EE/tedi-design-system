import cn from 'classnames';
import { AriaRole } from 'react';

import styles from './form-helper.module.scss';

export type FormHelperType = 'help' | 'valid' | 'error';

export interface FormHelperProps {
  /**
   * Helper text
   */
  text: string;
  /**
   * ID to reference the helper from aria-describedby attributes.
   * If omitted, then the id might be set through a parent component.
   */
  id?: string;
  /**
   * Additional custom class.
   */
  className?: string;
  /**
   * Type of form-helper.
   * @default help
   */
  type?: FormHelperType;
}

export const FormHelper = (props: FormHelperProps): JSX.Element => {
  const { text, id, className, type = 'help', ...rest } = props;

  const role: AriaRole | undefined = type === 'valid' || type === 'error' ? 'alert' : undefined;
  const ariaLive = status === 'error' || status === 'valid' ? 'assertive' : 'polite';

  return (
    <div
      data-name="form-helper"
      {...rest}
      id={id}
      className={cn(styles['form-helper'], styles[`form-helper--${type}`], className)}
      role={role}
      aria-live={ariaLive}
    >
      {text}
    </div>
  );
};

export default FormHelper;
