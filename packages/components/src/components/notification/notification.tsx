import cn from 'classnames';
import React from 'react';

import CloseButton from '../close-button/close-button';
import { Col, Row } from '../grid';
import Icon, { IconProps } from '../icon/icon';
import { VerticalSpacing } from '../vertical-spacing';
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
}

export const Notification = (props: NotificationProps): JSX.Element => {
  const { children, title, className, type = 'info', icon, onClose, ...rest } = props;
  const NotificationBEM = cn(styles['notification'], styles[`notification--${type}`], className);

  const getIcon = (icon: string | IconProps) => {
    const defaultIconProps: Partial<IconProps> = { size: 18 };
    const iconProps: IconProps =
      typeof icon === 'string' ? { ...defaultIconProps, name: icon } : { ...defaultIconProps, ...icon };

    return <Icon display="inline" {...iconProps} />;
  };

  return (
    <div role="alert" data-name="notification" {...rest} className={NotificationBEM}>
      <VerticalSpacing size={0.25}>
        <Row gutterX={2} alignItems={title ? 'center' : 'start'}>
          {icon && <Col width="auto">{getIcon(icon)}</Col>}
          <Col grow={1} className={title ? 'h5' : ''}>
            {title ? title : children}
          </Col>
          {onClose && (
            <Col width="auto">
              <CloseButton onClick={onClose} />
            </Col>
          )}
        </Row>
        {title && <div>{children}</div>}
      </VerticalSpacing>
    </div>
  );
};

export default Notification;
