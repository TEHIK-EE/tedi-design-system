import React from 'react';

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
   */
  lineClamp?: number;
}

export const Ellipsis = (props: EllipsisProps): JSX.Element => {
  const { children, lineClamp } = props;
  const elementRef = React.useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = React.useState(false);

  React.useEffect(() => {
    if (elementRef.current) {
      setShowTooltip(elementRef.current.scrollHeight > elementRef.current.clientHeight);
    }
  }, [elementRef]);

  const ellipsis = (
    <div ref={elementRef} className={styles['ellipsis']} style={{ lineClamp, WebkitLineClamp: lineClamp }}>
      {children}
    </div>
  );

  return showTooltip ? (
    <TooltipProvider>
      <TooltipTrigger>{ellipsis}</TooltipTrigger>
      <Tooltip>
        <Card type="borderless" className={styles['ellipsis__tooltip']}>
          <CardContent padding="small">{children}</CardContent>
        </Card>
      </Tooltip>
    </TooltipProvider>
  ) : (
    ellipsis
  );
};

export default Ellipsis;
