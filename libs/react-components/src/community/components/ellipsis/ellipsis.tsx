import React from 'react';

import { useElementSize } from '../../../tedi/helpers/hooks/use-element-size';
import { Card, CardContent } from '../card';
import { Tooltip, TooltipProvider, TooltipTrigger } from '../tooltip';
import styles from './ellipsis.module.scss';

export interface EllipsisProps {
  /**
   * Any content
   */
  children: React.ReactNode;
  /**
   * What is max lines before Ellipsis
   * @default 2
   */
  lineClamp?: number;
  /**
   * Render Ellipsis with Tooltip
   * @default true
   */
  showTooltip?: boolean;
}

export const Ellipsis = (props: EllipsisProps): JSX.Element => {
  const { children, lineClamp = 2, showTooltip = true, ...rest } = props;
  const elementRef = React.useRef<HTMLDivElement>(null);
  const [renderTooltip, setRenderTooltip] = React.useState(false);
  const elementSize = useElementSize(elementRef);

  React.useEffect(() => {
    if (elementRef.current) {
      setRenderTooltip(elementRef.current.scrollHeight > elementRef.current.clientHeight);
    }
  }, [elementRef, elementSize]);

  const ellipsis = (
    <div
      data-name="ellipsis"
      {...rest}
      ref={elementRef}
      className={styles['ellipsis']}
      style={{ lineClamp, WebkitLineClamp: lineClamp }}
    >
      {children}
    </div>
  );

  return renderTooltip && showTooltip ? (
    <TooltipProvider>
      <TooltipTrigger>{ellipsis}</TooltipTrigger>
      <Tooltip>
        <Card borderless={true} className={styles['ellipsis__tooltip']}>
          <CardContent padding={0.75}>{children}</CardContent>
        </Card>
      </Tooltip>
    </TooltipProvider>
  ) : (
    ellipsis
  );
};

export default Ellipsis;
