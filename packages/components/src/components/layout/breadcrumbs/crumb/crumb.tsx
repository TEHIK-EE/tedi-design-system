import cn from 'classnames';

import { Anchor, AnchorProps } from '../../../anchor/anchor';
import Icon from '../../../icon/icon';
import styles from '../breadcrumbs.module.scss';

export type CrumbProps<C extends React.ElementType = 'a'> = {
  /**
   * If crumb is last/current page;
   * Defaults to false
   */
  isLast?: boolean;
} & AnchorProps<C>;

const Crumb = <C extends React.ElementType = 'a'>(props: CrumbProps<C>): JSX.Element => {
  const { isLast = false, children, ...rest } = props;

  const BEM = cn(styles['breadcrumbs__item'], { [styles['breadcrumbs__item--current']]: isLast });

  if (isLast) return <li className={BEM}>{children}</li>;

  return (
    <li data-name="crumb" className={BEM}>
      <Anchor {...rest}>{children}</Anchor>
      <Icon className={styles['breadcrumbs__separator']} size={16} name="keyboard_arrow_right" />
    </li>
  );
};

export default Crumb;
