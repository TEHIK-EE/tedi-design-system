import cn from 'classnames';
import { useContext } from 'react';

import ClosingButton from '../buttons/closing-button/closing-button';
import { OverlayContext } from '../overlay/overlay';
import { OverlayContent, OverlayContentProps } from '../overlay/overlay-content';
import { Text, TextProps } from '../typography/text/text';
import styles from './popover.module.scss';

export interface PopoverContentProps extends Omit<OverlayContentProps, 'classNames'> {
  /**
   * Popover title.
   */
  title?: string;
  /**
   * Popover title props.
   */
  titleProps?: Omit<TextProps, 'children'>;
  /**
   * Is close button shown?
   * @default false
   */
  showClose?: boolean;
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * Popover width.
   * @default small
   */
  width?: 'small' | 'medium' | 'large';
}

export function PopoverContent(props: PopoverContentProps) {
  const { children, width = 'small', className, title, titleProps = { element: 'h4' }, showClose } = props;
  const { onOpenChange } = useContext(OverlayContext);

  return (
    <OverlayContent
      classNames={{
        content: cn(styles['tedi-popover'], { [styles[`tedi-popover--${width}`]]: width }, className),
        arrow: styles['tedi-popover__arrow'],
      }}
    >
      {(title || showClose) && (
        <div className={cn(styles['tedi-popover__header'], { [styles['tedi-popover__header--no-title']]: !title })}>
          {title && <Text {...titleProps}>{title}</Text>}
          {showClose && <ClosingButton size="large" onClick={() => onOpenChange(false)} />}
        </div>
      )}
      {children}
    </OverlayContent>
  );
}
