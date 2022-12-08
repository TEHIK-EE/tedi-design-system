import cn from 'classnames';
import React from 'react';

import styles from './tooltip.module.scss';
import { TooltipContext } from './tooltip-provider';

export interface TooltipTriggerProps {
  children: JSX.Element;
}

export const TooltipTrigger = (props: TooltipTriggerProps): JSX.Element => {
  const { children } = props;
  const { getReferenceProps, reference, openWith } = React.useContext(TooltipContext);

  return React.cloneElement(
    children,
    getReferenceProps({
      ref: reference,
      tabIndex: 0,
      ...children.props,
      className: cn(
        styles['tooltip__trigger'],
        { [styles['tooltip__trigger--click']]: openWith === 'click' },
        children.props.className
      ),
    })
  );
};

export default TooltipTrigger;
