import cn from 'classnames';

import styles from '../card.module.scss';

export interface CardHeaderProps {
  /**
   * Card header content
   */
  children?: React.ReactNode;
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Style of CardHeader
   */
  style?: 'default' | 'white';
}

export const CardHeader = (props: CardHeaderProps): JSX.Element => {
  const { children, className, style = 'default' } = props;
  return <div className={cn(styles['card__header'], styles[`card__header--${style}`], className)}>{children}</div>;
};

export default CardHeader;
