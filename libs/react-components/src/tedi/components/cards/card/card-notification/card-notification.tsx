import cn from 'classnames';

import { Alert, AlertProps } from '../../../alert/alert';
import CardContent, { CardContentProps } from '../card-content/card-content';
import style from './card-notification.module.scss';

export type CardNotificationProps = AlertProps & Pick<CardContentProps, 'padding'>;

export const CardNotification = (props: CardNotificationProps): JSX.Element => {
  const { children, padding, className, ...rest } = props;

  const BEM = cn(style['tedi-card__notification'], className);

  return (
    <CardContent data-name="card-notification" padding={padding} className={style['tedi-card__notification-content']}>
      <Alert className={BEM} noSideBorders {...rest}>
        {children}
      </Alert>
    </CardContent>
  );
};

export default CardNotification;
