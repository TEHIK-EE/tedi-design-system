import cn from 'classnames';

import { Anchor } from '../../../anchor/anchor';
import Icon from '../../../icon/icon';
import styles from '../breadcrumbs.module.scss';

export interface CrumbProps {
  /**
   * Crumb rendered label.
   */
  label: string;
  /**
   * Crumb href path.
   */
  path: string;
  /**
   * If crumb is last/current page;
   * Defaults to false
   */
  isLast?: boolean;
}

const Crumb = (props: CrumbProps): JSX.Element => {
  const { label, path, isLast = false } = props;

  const BEM = cn(styles['breadcrumbs__item'], { [styles['breadcrumbs__item--current']]: isLast });

  if (isLast) return <li className={BEM}>{label}</li>;

  return (
    <li className={BEM}>
      <Anchor url={path}>{label}</Anchor>
      <Icon className={styles['breadcrumbs__separator']} size={16} name="keyboard_arrow_right" />
    </li>
  );
};

export default Crumb;
