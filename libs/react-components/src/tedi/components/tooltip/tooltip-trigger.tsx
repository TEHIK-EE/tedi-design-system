import { useMergeRefs } from '@floating-ui/react';
import cn from 'classnames';
import { cloneElement, ReactElement, useContext } from 'react';

import { useLabels } from '../../../tedi/providers/label-provider';
import { Icon } from '../icon/icon';
import { TooltipContext } from './tooltip';
import styles from './tooltip.module.scss';

export interface TooltipTriggerProps {
  /**
   * The element that opens tooltip.
   */
  children: ReactElement;
}

export const TooltipTrigger = (props: TooltipTriggerProps) => {
  const { children } = props;
  const { getLabel } = useLabels();
  const { getReferenceProps, reference, openWith } = useContext(TooltipContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refs = useMergeRefs([reference, (children as React.ComponentPropsWithRef<any>).ref]);

  return cloneElement(
    children,
    getReferenceProps({
      ref: refs,
      tabIndex: 0,
      label: children.type === Icon ? getLabel('tooltip.icon-trigger') : undefined,
      ...children.props,
      className: cn(
        styles['tedi-tooltip__trigger'],
        { [styles['tedi-tooltip__trigger--click']]: openWith === 'click' },
        children.props.className
      ),
    })
  );
};
