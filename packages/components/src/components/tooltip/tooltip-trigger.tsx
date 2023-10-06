import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../providers/label-provider';
import Icon from '../icon/icon';
import styles from './tooltip.module.scss';
import { TooltipContext } from './tooltip-provider';

export interface TooltipTriggerProps {
  /**
   * The element that opens tooltip.
   */
  children: JSX.Element;
}

export const TooltipTrigger = (props: TooltipTriggerProps): JSX.Element => {
  const { children } = props;
  const { getLabel } = useLabels();
  const { getReferenceProps, reference, openWith } = React.useContext(TooltipContext);

  return React.cloneElement(
    children,
    getReferenceProps({
      ref: reference,
      tabIndex: 0,
      label: children.type === Icon ? getLabel('tooltip.icon-trigger') : undefined,
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
