import cn from 'classnames';
import { useContext } from 'react';

import { Text, TextProps } from '../../base/typography/text/text';
import ClosingButton, { ClosingButtonProps } from '../../buttons/closing-button/closing-button';
import { OverlayContext } from '../overlay/overlay';
import { OverlayContent, OverlayContentProps } from '../overlay/overlay-content';
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
  close?: boolean;
  /**
   * Popover close button props.
   */
  closeProps?: ClosingButtonProps;
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

export const PopoverContent = (props: PopoverContentProps) => {
  const {
    children,
    width = 'small',
    className,
    title,
    titleProps = { element: 'h4' },
    close,
    closeProps = { size: 'large' },
  } = props;
  const { onOpenChange } = useContext(OverlayContext);

  return (
    <OverlayContent
      classNames={{
        content: cn(styles['tedi-popover'], { [styles[`tedi-popover--${width}`]]: width }, className),
        arrow: styles['tedi-popover__arrow'],
      }}
    >
      {(title || close) && (
        <div className={cn(styles['tedi-popover__header'], { [styles['tedi-popover__header--no-title']]: !title })}>
          {title && (
            <Text {...titleProps} className={cn('align-self-center', titleProps.className)}>
              {title}
            </Text>
          )}
          {close && (
            <ClosingButton
              {...closeProps}
              onClick={(e) => {
                onOpenChange(false);
                closeProps.onClick?.(e);
              }}
            />
          )}
        </div>
      )}
      {children}
    </OverlayContent>
  );
};
