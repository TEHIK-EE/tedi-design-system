import cn from 'classnames';

import { Anchor, AnchorProps } from '../../../anchor/anchor';
import Icon from '../../../icon/icon';
import Print from '../../../print/print';
import styles from '../breadcrumbs.module.scss';

export type CrumbProps<C extends React.ElementType = 'a'> = {
  /**
   * If crumb is last/current page;
   * @default false
   */
  isLast?: boolean;
} & AnchorProps<C>;

const Crumb = <C extends React.ElementType = 'a'>(props: CrumbProps<C> & { singleCrumb?: boolean }): JSX.Element => {
  const { isLast = false, children, singleCrumb, ...rest } = props;

  const BEM = cn(styles['breadcrumbs__item'], { [styles['breadcrumbs__item--current']]: isLast });

  if (isLast)
    return (
      <li data-name="crumb" className={BEM}>
        <Anchor aria-current="page" className={styles['breadcrumbs__link--current']} noStyle>
          {children}
        </Anchor>
      </li>
    );

  return (
    <li data-name="crumb" className={BEM}>
      <Print visibility="show">
        <Anchor iconLeft={singleCrumb ? 'keyboard_arrow_left' : undefined} {...rest}>
          {children}
        </Anchor>
      </Print>
      {!singleCrumb && <Icon className={styles['breadcrumbs__separator']} size={16} name="keyboard_arrow_right" />}
    </li>
  );
};

export default Crumb;
