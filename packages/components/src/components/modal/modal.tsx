import { FloatingFocusManager, FloatingOverlay, FloatingPortal } from '@floating-ui/react';
import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../providers/label-provider';
import Button from '../button/button';
import Card, { CardProps } from '../card/card';
import styles from './modal.module.scss';
import ModalCloser from './modal-closer';
import { ModalContext } from './modal-provider';

export interface ModalProps {
  /**
   * Content of the modal
   */
  children: React.ReactNode;
  /**
   * Size of the modal.
   * @default 6
   */
  size?: 12 | 10 | 8 | 6;
  /**
   * Aria-labelledby value.
   */
  'aria-labelledby': string;
  /**
   * Aria-describedby value.
   */
  'aria-describedby'?: string;
  /**
   * card props to pass down to card components
   */
  cardProps?: CardProps;
  /**
   * Hide close button. Make sure there is another button that closes the modal.
   */
  hideCloseButton?: boolean;
  /**
   * Modal position on the screen
   * @default center
   */
  position?: 'center' | 'right' | 'bottom';
  /**
   * Should page be scrollable while modal is open.
   * @default false
   */
  lockScroll?: boolean;
  /**
   * Should trap focus inside modal.
   * @default true
   */
  trapFocus?: boolean;
  /**
   * Set style of overlay.
   */
  overlay?: 'none';
}

export const Modal = (props: ModalProps): JSX.Element | null => {
  const {
    children,
    size = 6,
    cardProps = {},
    hideCloseButton,
    position,
    lockScroll = true,
    trapFocus = true,
    overlay = undefined,
  } = props;
  const { getLabel } = useLabels();
  const labelId = props['aria-labelledby'];
  const descriptionId = props['aria-describedby'];
  const { isOpen, floating, getFloatingProps, context, isDismissable } = React.useContext(ModalContext);

  return (
    <FloatingPortal data-name="modal">
      {isOpen && (
        <FloatingOverlay
          lockScroll={lockScroll}
          className={cn(styles['modal'], styles[`modal--${size}`], styles[`modal--${position}`], {
            [styles['modal--no-overlay']]: overlay === 'none',
          })}
        >
          <FloatingFocusManager context={context} closeOnFocusOut={isDismissable} modal={trapFocus}>
            <div
              {...getFloatingProps({
                ref: floating,
                className: styles['modal__inner'],
                'aria-labelledby': labelId,
                'aria-describedby': descriptionId,
                'aria-modal': trapFocus,
              })}
            >
              <Card {...cardProps} className={cn(styles['modal__card'], cardProps?.className)}>
                {!hideCloseButton && (
                  <ModalCloser>
                    <Button
                      icon={{ name: 'close', className: styles['close-button-icon'] }}
                      visualType="link"
                      className={styles['close-button']}
                    >
                      {getLabel('modal.close')}
                    </Button>
                  </ModalCloser>
                )}
                {children}
              </Card>
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  );
};

export default Modal;
