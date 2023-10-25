import React from 'react';

import { ModalContext } from './modal-provider';

export interface ModalCloserProps {
  /**
   * The element that closes the modal.
   */
  children: React.ReactElement;
  /**
   * Prevent focus return to reference element when modal closes
   * @default false
   */
  preventFocusReturn?: boolean;
}

export const ModalCloser = (props: ModalCloserProps): JSX.Element => {
  const { children, preventFocusReturn } = props;
  const { closeModal } = React.useContext(ModalContext);

  return React.cloneElement(children, {
    onClick: () => {
      children.props.onClick?.();
      closeModal(preventFocusReturn);
    },
  });
};

export default ModalCloser;
