import cn from 'classnames';
import React from 'react';

import { ClosingButton } from '../../../../tedi/src/components/closing-button/closing-button';
import { Col, Row } from '../../../../tedi/src/components/grid';
import { VerticalSpacing } from '../../../../tedi/src/components/vertical-spacing';
import { useIsMounted } from '../../helpers';
import Icon, { IconProps } from '../icon/icon';
import styles from './notification.module.scss';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationProps {
  /**
   * Content of notification
   */
  children?: React.ReactNode;
  /**
   * Title of notification
   */
  title?: React.ReactNode;
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Type of notification
   * @default info
   */
  type?: NotificationType;
  /**
   * icon name.
   */
  icon?: string | IconProps;
  /**
   * onClose callback handler
   */
  onClose?: () => void;
  /**
   * Role of the notification
   * @default alert
   */
  role?: 'alert' | 'status' | 'none';
}

export const Notification = (props: NotificationProps) => {
  const { children, role = 'alert', title, className, type = 'info', icon, onClose, ...rest } = props;
  const NotificationBEM = cn(styles['notification'], styles[`notification--${type}`], className);
  // render notification after mounting so the screen-readers will also read notifications on page load
  // https://github.com/nvaccess/nvda/issues/11068
  // https://github.com/w3c/aria/issues/1360
  const isMounted = useIsMounted();

  const getIcon = (icon: string | IconProps) => {
    const defaultIconProps: Partial<IconProps> = { size: 18 };
    const iconProps: IconProps =
      typeof icon === 'string' ? { ...defaultIconProps, name: icon } : { ...defaultIconProps, ...icon };

    return <Icon display="inline" {...iconProps} />;
  };

  const ariaLive = role === 'alert' ? 'assertive' : role === 'status' ? 'polite' : 'off';

  return isMounted ? (
    <div role={role} data-name="notification" aria-live={ariaLive} {...rest} className={NotificationBEM}>
      <VerticalSpacing size={0.25}>
        <Row gutterX={2} alignItems={title ? 'center' : 'start'}>
          {icon && <Col width="auto">{getIcon(icon)}</Col>}
          <Col grow={1} className={title ? 'h5' : ''}>
            {title ? title : children}
          </Col>
          {onClose && (
            <Col width="auto">
              <ClosingButton onClick={onClose} />
            </Col>
          )}
        </Row>
        {title && <div>{children}</div>}
      </VerticalSpacing>
    </div>
  ) : null;
};

export default Notification;
