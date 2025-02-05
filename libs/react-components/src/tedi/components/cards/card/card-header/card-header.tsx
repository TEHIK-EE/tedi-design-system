import cn from 'classnames';

import styles from '../card.module.scss';
import { CardContent, CardContentProps } from '../card-content/card-content';

export type CardHeaderProps = CardContentProps;

export const CardHeader = (props: CardHeaderProps): JSX.Element => {
  const { className, ...rest } = props;

  return <CardContent className={cn(styles['tedi-card__header'], className)} {...rest} />;
};

export default CardHeader;
