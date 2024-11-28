import cn from 'classnames';
import React from 'react';

import Alert, { AlertProps } from '../../../../tedi/components/alert/alert';
import CardContent, { CardContentProps } from '../card-content/card-content';
import style from './card-notification.module.scss';

export type CardNotificationProps = AlertProps & Pick<CardContentProps, 'padding'>;

export const CardNotification = (props: CardNotificationProps): JSX.Element => {
  const { children, padding, className, ...rest } = props;

  const BEM = cn(style['card__notification'], className);

  return (
    <CardContent data-name="card-notification" padding={padding} className={style['card__notification-content']}>
      <Alert className={BEM} {...rest}>
        {children}
      </Alert>
    </CardContent>
  );
};

export default CardNotification;
