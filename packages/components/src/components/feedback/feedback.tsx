import cn from 'classnames';
import React from 'react';

import Button, { ButtonProps } from '../button/button';
import { Modal, ModalProps, ModalProviderProps } from '../modal';
import ModalProvider from '../modal/modal-provider';
import ModalTrigger from '../modal/modal-trigger';
import styles from './feedback.module.scss';

export interface FeedbackProps extends Pick<ModalProps, 'children'> {
  /**
   * Props that get passed to the trigger button
   */
  triggerProps?: ButtonProps;
  /**
   * ModalProvider props
   */
  providerProps?: Omit<ModalProviderProps, 'children'>;
  /**
   * Modal props
   */
  modalProps?: Omit<ModalProps, 'children'>;
  /**
   * Fix trigger on the right side of the screen. Defaults to desktop
   */
  fixedTrigger?: 'both' | 'desktop' | 'mobile';
  /**
   * Additional class
   */
  className?: string;
}

export const Feedback = ({
  children,
  triggerProps,
  providerProps,
  modalProps,
  fixedTrigger = 'desktop',
  className,
  ...rest
}: FeedbackProps): JSX.Element => {
  const {
    iconLeft = { name: 'star', filled: true },
    size,
    id: feedbackId = 'feedback-trigger',
    className: triggerClassName,
    children: triggerChildren,
    ...restTrigger
  } = triggerProps ?? {};
  const { ...restProvider } = providerProps ?? {};
  const { position = 'right', 'aria-labelledby': labelledBy = feedbackId, ...restModal } = modalProps ?? {};

  return (
    <div className={cn(className, styles[`feedback--${fixedTrigger}`])} {...rest}>
      <ModalProvider {...restProvider}>
        <ModalTrigger>
          <Button
            data-name="feedback-trigger"
            {...restTrigger}
            id={feedbackId}
            className={cn(styles['feedback__trigger'], triggerClassName)}
            size={size}
            iconLeft={iconLeft}
          >
            {triggerChildren}
          </Button>
        </ModalTrigger>
        <Modal data-name="feedback-modal" {...restModal} aria-labelledby={labelledBy} position={position}>
          {children}
        </Modal>
      </ModalProvider>
    </div>
  );
};

export default Feedback;
