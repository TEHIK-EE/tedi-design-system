import cn from 'classnames';

import CloseButton from '../close-button/close-button';
import { Col, Row } from '../grid';
import Icon from '../icon/icon';
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
  title?: string;
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Type of notification
   */
  type?: NotificationType;
  /**
   * icon name.
   */
  icon?: string;
  /**
   * onClose callback handler
   */
  onClose?: () => void;
}

export const Notification = (props: NotificationProps): JSX.Element => {
  const { children, title, className, type = 'info', icon, onClose } = props;
  const NotificationBEM = cn(styles['notification'], styles[`notification--${type}`], className);

  return (
    <div className={NotificationBEM}>
      <VerticalSpacing size={0.25}>
        <Row justifyContent="between">
          {(title || icon) && (
            <Col>
              <Row alignItems="center" gutterX={2} gutterY={0}>
                {icon && (
                  <Col width="auto">
                    <Icon name={icon} size={18} />
                  </Col>
                )}
                {title && (
                  <Col width="auto" className="h5">
                    {title}
                  </Col>
                )}
              </Row>
            </Col>
          )}
          {onClose && (
            <Col width="auto">
              <CloseButton onClick={onClose} />
            </Col>
          )}
        </Row>
        <div>{children}</div>
      </VerticalSpacing>
    </div>
  );
};

export default Notification;
