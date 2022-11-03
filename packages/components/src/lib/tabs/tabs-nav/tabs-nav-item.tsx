import cn from 'classnames';

import Anchor, { AnchorProps } from '../../anchor/anchor';
import styles from './tabs-nav.module.scss';

export interface TabsNavItemProps extends Omit<AnchorProps, 'text' | 'children' | 'notVisual'> {
  /**
   * Content
   */
  label: string;
  /**
   * If item is current/active.
   */
  current?: boolean;
}

export const TabsNavItem = (props: TabsNavItemProps): JSX.Element => {
  const { current, label, ...rest } = props;
  const TabsNavItemBEM = cn(styles['tabs__nav-item'], { [styles['tabs__nav-item--current']]: current });

  return (
    <li className={TabsNavItemBEM} role="presentation">
      <Anchor {...rest} className={styles['tabs__nav-link']} text={label} />
    </li>
  );
};

export default TabsNavItem;
