import React from 'react';

import { ModalContext } from './modal-provider';

export interface ModalTriggerProps {
  children: JSX.Element;
}

export const ModalTrigger = (props: ModalTriggerProps): JSX.Element => {
  const { children } = props;
  const { getReferenceProps, reference } = React.useContext(ModalContext);

  return React.cloneElement(children, getReferenceProps({ ref: reference, ...children.props }));
};

export default ModalTrigger;
