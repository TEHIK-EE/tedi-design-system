import { FloatingFocusManager, FloatingOverlay, FloatingPortal } from '@floating-ui/react';
import cn from 'classnames';
import React from 'react';

import { ClosingButton } from '../../../tedi/components/buttons/closing-button/closing-button';
import { useLabels } from '../../../tedi/providers/label-provider';
import { IntentionalAny } from '../../types';
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
   * If your focus management is modal and there is no explicit close button available,
   * you can use this prop to render a visually-hidden dismiss button at the start and end of the floating element.
   * This allows touch-based screen readers to escape the floating element due to lack of an esc key.
   * @default false
   */
  visuallyHiddenDismiss?: boolean;
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
   * Should focus return to the trigger when closing the modal
   * @default true
   */
  returnFocus?: boolean;
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
    returnFocus = true,
    overlay = undefined,
    visuallyHiddenDismiss = false,
  } = props;
  const { getLabel } = useLabels();
  const labelId = props['aria-labelledby'];
  const descriptionId = props['aria-describedby'];
  const { isOpen, floating, getFloatingProps, context, isDismissable } = React.useContext(ModalContext);

  // add close button to the first CardHeader or CardContent
  const parsedChildren = React.useMemo(() => {
    let buttonRendered = false;

    const getComponentDisplayName = (element: React.ReactElement<unknown, IntentionalAny>) => {
      return element.type.displayName;
    };

    return !hideCloseButton
      ? React.Children.map(children, (child, index) => {
          if (
            !buttonRendered &&
            React.isValidElement(child) &&
            (getComponentDisplayName(child) === 'CardHeader' || getComponentDisplayName(child) === 'CardContent')
          ) {
            buttonRendered = true;

            return React.cloneElement(child, {
              ...child.props,
              children: (
                <>
                  <ModalCloser>
                    <ClosingButton size="large" className={styles['close-button']} />
                  </ModalCloser>
                  {child.props.children}
                </>
              ),
            });
          }

          return child;
        })
      : children;
  }, [children, getLabel, hideCloseButton]);

  return (
    <FloatingPortal data-name="modal">
      {isOpen && (
        <FloatingOverlay
          lockScroll={lockScroll}
          className={cn(styles['modal'], styles[`modal--${size}`], styles[`modal--${position}`], {
            [styles['modal--no-overlay']]: overlay === 'none',
          })}
        >
          <FloatingFocusManager
            context={context}
            closeOnFocusOut={!trapFocus && isDismissable}
            visuallyHiddenDismiss={visuallyHiddenDismiss ? getLabel('modal.close') : undefined}
            returnFocus={returnFocus}
            modal={trapFocus}
          >
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
                {parsedChildren}
              </Card>
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  );
};

export default Modal;
