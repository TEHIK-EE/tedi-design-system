import cn from 'classnames';

import styles from '../card.module.scss';

export type CardHeaderVariant = 'default' | 'white';

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
   * Style of CardHeader. !!Deprecated - use variant prop instead
   * @default default
   * @deprecated - Use variant prop instead - TEHVEER-66
   */
  style?: CardHeaderVariant;
  /**
   * Variant of CardHeader
   * @default default
   */
  variant?: CardHeaderVariant;
}

export const CardHeader = (props: CardHeaderProps): JSX.Element => {
  const { children, className, style, variant = 'default', ...rest } = props;
  const BEM = cn(styles['card__header'], styles[`card__header--${style || variant}`], className);

  return (
    <div data-name="card-header" {...rest} className={BEM}>
      {children}
    </div>
  );
};

export default CardHeader;
