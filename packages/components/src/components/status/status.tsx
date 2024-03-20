import cn from 'classnames';

import { Tooltip, TooltipProvider, TooltipTrigger } from '../tooltip';
import styles from './status.module.scss';

export interface StatusProps {
  /**
   * Type of the status.
   */
  type: 'error' | 'success' | 'inactive' | 'warning';
  /**
   * Any content.
   */
  children: React.ReactNode;
  /**
   * Custom class name.
   */
  className?: string;
  /**
   * Tooltip content
   */
  tooltipContent?: React.ReactNode;
}

export const Status = (props: StatusProps): JSX.Element => {
  const { children, type, className, tooltipContent, ...rest } = props;
  const StatusBEM = cn(styles['status'], className, styles[`status--${type}`]);

  return (
    <div data-name="status" {...rest} className={StatusBEM}>
      {tooltipContent ? (
        <TooltipProvider>
          <TooltipTrigger>
            <div className={styles['status__circle']} />
          </TooltipTrigger>
          <Tooltip>{tooltipContent}</Tooltip>
        </TooltipProvider>
      ) : (
        <div className={styles['status__circle']} />
      )}
      <div className={styles['status__content']}>{children}</div>
    </div>
  );
};

export default Status;
