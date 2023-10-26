import React from 'react';

import { ModalContext } from './modal-provider';

export interface ModalCloserProps {
  /**
   * The element that closes the modal.
   */
  children: React.ReactElement;
}

export const ModalCloser = (props: ModalCloserProps): JSX.Element => {
  const { children } = props;
  const { closeModal } = React.useContext(ModalContext);

  return React.cloneElement(children, {
    onClick: () => {
      children.props.onClick?.();
      closeModal();
    },
  });
};

export default ModalCloser;
