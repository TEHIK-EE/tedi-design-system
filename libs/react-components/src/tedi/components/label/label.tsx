import cn from 'classnames';
import { ElementType, LabelHTMLAttributes } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../helpers';
import { ButtonProps } from '../buttons/button/button';
import InfoButton from '../buttons/info-button/info-button';
import styles from './label.module.scss';

type LabelBreakpointProps = {
  /**
   * If true, applies a bold font weight to the label text.
   * @default false
   */
  isBold?: boolean;
  /**
   * If true, applies a small font size to the label text.
   * @default false
   */
  isSmall?: boolean;
};

export interface LabelProps
  extends BreakpointSupport<LabelBreakpointProps>,
    LabelHTMLAttributes<HTMLLabelElement | HTMLSpanElement> {
  /**
   * The element type to render.
   * This can be any valid HTML element, allowing flexibility
   * in how the label is used. Defaults to 'label'.
   * @default 'label'
   */
  as?: ElementType;
  /**
   * If true, displays a required symbol (*) after the label text,
   * indicating that the associated input is mandatory.
   * @default false
   */
  required?: boolean;
  /**
   * Configuration for the InfoButton displayed alongside the label.
   * Pass an object with properties accepted by the InfoButton component.
   * If not provided, the InfoButton will not be rendered.
   */
  infoButton?: ButtonProps;
}

export const Label = (props: LabelProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const {
    as: Element = 'label',
    children,
    className,
    isBold,
    isSmall,
    required,
    infoButton,
    ...rest
  } = getCurrentBreakpointProps<LabelProps>(props);
  const labelBEM = cn(
    styles['tedi-label'],
    isBold && styles['tedi-label--bold'],
    isSmall && styles['tedi-label--small'],
    className
  );

  return (
    <Element className={labelBEM} {...rest}>
      {children}
      {required && (
        <span className={styles['tedi-label__required']} aria-hidden="true">
          *
        </span>
      )}
      {infoButton && <InfoButton {...infoButton} />}
    </Element>
  );
};
