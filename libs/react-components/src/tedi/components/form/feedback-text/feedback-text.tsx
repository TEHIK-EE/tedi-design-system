import cn from 'classnames';
import { AriaRole } from 'react';

import styles from './feedback-text.module.scss';

export type FeedbackTextType = 'hint' | 'valid' | 'error';
export type FeedbackTextPosition = 'left' | 'right';

export interface FeedbackTextProps {
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
  type?: FeedbackTextType;
  /**
   * Position of the helper.
   * @default left
   */
  position?: FeedbackTextPosition;
}

export const FeedbackText = (props: FeedbackTextProps): JSX.Element => {
  const { text, id, className, type = 'hint', position = 'left', ...rest } = props;

  const role: AriaRole | undefined = type === 'valid' || type === 'error' ? 'alert' : undefined;
  const ariaLive = type === 'error' || type === 'valid' ? 'assertive' : 'polite';

  return (
    <div
      data-name="feedback-text"
      {...rest}
      id={id}
      className={cn(
        styles['tedi-feedback-text'],
        styles[`tedi-feedback-text--${type}`],
        styles[`tedi-feedback-text--${position}`],
        className
      )}
      role={role}
      aria-live={ariaLive}
    >
      {text}
    </div>
  );
};

export default FeedbackText;
