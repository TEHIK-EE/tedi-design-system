import cn from 'classnames';
import React from 'react';

import Notification, { NotificationProps } from '../../notification/notification';
import CardContent, { CardContentProps } from '../card-content/card-content';
import style from './card-notification.module.scss';

export type CardNotificationProps = NotificationProps & Pick<CardContentProps, 'padding'>;

export const CardNotification = (props: CardNotificationProps): JSX.Element => {
  const { children, padding, className, ...rest } = props;

  const BEM = cn(style['card__notification'], className);

  return (
    <CardContent padding={padding} className={style['card__notification-content']}>
      <Notification className={BEM} {...rest}>
        {children}
      </Notification>
    </CardContent>
  );
};

export default CardNotification;
