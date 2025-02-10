import cn from 'classnames';

import { OverlayContent, OverlayContentProps } from '../overlay/overlay-content';
import styles from './popover.module.scss';

export interface PopoverContentProps extends Omit<OverlayContentProps, 'classNames'> {
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * Tooltip max width.
   * @default medium
   */
  maxWidth?: 'none' | 'small' | 'medium' | 'large';
}

export function PopoverContent({ className, maxWidth, ...props }: PopoverContentProps) {
  return (
    <OverlayContent
      classNames={{
        content: cn(styles['tedi-popover'], { [styles[`tedi-popover--${maxWidth}`]]: maxWidth }, className),
        arrow: styles['tedi-popover__arrow'],
      }}
      {...props}
    />
  );
}
