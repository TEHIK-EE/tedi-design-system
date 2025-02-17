import cn from 'classnames';

import { OverlayContent, OverlayContentProps } from '../overlay/overlay-content';
import styles from './tooltip.module.scss';

export interface TooltipContentProps extends Omit<OverlayContentProps, 'classNames'> {
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * Popover width.
   * @default medium
   */
  maxWidth?: 'none' | 'small' | 'medium' | 'large';
}

export function TooltipContent(props: TooltipContentProps) {
  const { children, maxWidth = 'medium', className } = props;

  return (
    <OverlayContent
      classNames={{
        content: cn(styles['tedi-tooltip'], { [styles[`tedi-tooltip--${maxWidth}`]]: maxWidth }, className),
        arrow: styles['tedi-tooltip__arrow'],
      }}
    >
      {children}
    </OverlayContent>
  );
}
