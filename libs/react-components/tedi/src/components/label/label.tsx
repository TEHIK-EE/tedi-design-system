import cn from 'classnames';
import { ElementType, LabelHTMLAttributes } from 'react';

import styles from './label.module.scss';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement | HTMLSpanElement> {
  /**
   * The element type to render.
   * This can be any valid HTML element, allowing flexibility
   * in how the label is used. Defaults to 'label'.
   * @default 'label'
   */
  as?: ElementType;
  /**
   * If true, applies a bold font weight to the label text.
   * @default false
   */
  bold?: boolean;
  /**
   * If true, displays a required symbol (*) after the label text,
   * indicating that the associated input is mandatory.
   * @default false
   */
  required?: boolean;
}

export const Label = (props: LabelProps): JSX.Element => {
  const { as: Element = 'label', children, className, bold, required, ...rest } = props;
  const labelBEM = cn(styles['tedi-label'], bold && styles['tedi-label--bold'], className);

  return (
    <Element className={labelBEM} {...rest}>
      {children}
      {required && <span className={styles['tedi-label__required']}>*</span>}
    </Element>
  );
};
