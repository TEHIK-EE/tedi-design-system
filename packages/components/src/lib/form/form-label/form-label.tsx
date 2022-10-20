import cn from 'classnames';

import styles from './form-label.module.scss';

export interface FormLabelProps {
  /**
   * ID of element label is for
   */
  id: string;
  /**
   * The label value.
   */
  label: string;
  /**
   * Whether to hide the label visually.
   * Use keep-space to save label space.
   */
  hideLabel?: boolean | 'keep-space';
  /**
   * Label shown when input is required.
   */
  requiredLabel?: string;
  /**
   * If textfield is required.
   */
  required?: boolean;
  /**
   * Additional className.
   */
  className?: string;
  /**
   * Render without label html element - used when Form component uses label inside already.
   */
  renderWithoutLabel?: boolean;
  /**
   * Size of label
   */
  size?: 'small' | 'default' | 'large';
}

export const FormLabel = (props: FormLabelProps): JSX.Element => {
  const {
    label,
    hideLabel,
    required,
    requiredLabel = '*',
    id,
    className,
    renderWithoutLabel,
    size = 'default',
  } = props;
  const FormLabelBEM = cn(styles['form-label'], className, styles[`form-label--${size}`], {
    [styles[`form-label--hidden${hideLabel === 'keep-space' ? '-keep-space' : ''}`]]: hideLabel,
  });

  const Element = renderWithoutLabel ? 'span' : 'label';

  return (
    <Element className={FormLabelBEM} htmlFor={id}>
      <span className={styles['form-label__inner']}>{label}</span>
      {required && <span className={styles['form-label__required']}>{requiredLabel}</span>}
    </Element>
  );
};

export default FormLabel;
