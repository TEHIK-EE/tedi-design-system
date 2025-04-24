import classNames from 'classnames';
import React from 'react';

import { useElementSize } from '../../../helpers';
import Popover from '../../overlays/popover/popover';
import styles from './ellipsis.module.scss';

export interface EllipsisProps {
  /**
   * The content to be displayed inside the ellipsis container.
   */
  children: React.ReactNode;
  /**
   * The maximum number of lines before truncating the text with an ellipsis.
   * If the content exceeds this limit, it will be truncated.
   * @default 2
   */
  lineClamp?: number;
  /**
   * Determines whether a popover should be displayed when the text is truncated.
   * If `true`, hovering over the truncated text will show the full content in a popover.
   * @default true
   */
  popover?: boolean;
  /**
   * Adds a custom CSS class to the Ellipsis element for additional styling or theming purposes
   */
  className?: string;
}

export const Ellipsis = (props: EllipsisProps): JSX.Element => {
  const { children, lineClamp = 2, popover = true, className, ...rest } = props;
  const elementRef = React.useRef<HTMLDivElement>(null);
  const [isEllipsed, setIsEllipsed] = React.useState(false);
  const elementSize = useElementSize(elementRef);

  React.useEffect(() => {
    if (elementRef.current) {
      setIsEllipsed(elementRef.current.scrollHeight > elementRef.current.clientHeight);
    }
  }, [elementRef, elementSize]);

  const ellipsis = (
    <div
      data-name="ellipsis"
      {...rest}
      ref={elementRef}
      className={classNames(styles['tedi-ellipsis'], className)}
      style={{ lineClamp, WebkitLineClamp: lineClamp }}
    >
      {children}
    </div>
  );

  return isEllipsed && popover ? (
    <Popover openWith="hover" focusManager={{ modal: false }}>
      <Popover.Trigger>{ellipsis}</Popover.Trigger>
      <Popover.Content>{children}</Popover.Content>
    </Popover>
  ) : (
    ellipsis
  );
};

export default Ellipsis;
