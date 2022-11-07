import cn from 'classnames';

import Anchor, { AnchorProps } from '../../anchor/anchor';
import styles from './tabs-nav.module.scss';

export type TabsNavItemProps<C extends React.ElementType = 'a'> = AnchorProps<C>;

export const TabsNavItem = <C extends React.ElementType = 'a'>(props: TabsNavItemProps<C>): JSX.Element => {
  const { isActive, children, ...rest } = props;
  const TabsNavItemBEM = cn(styles['tabs__nav-item'], { [styles['tabs__nav-item--current']]: isActive });

  return (
    <li className={TabsNavItemBEM} role="presentation">
      <Anchor {...rest} className={styles['tabs__nav-link']}>
        {children}
      </Anchor>
    </li>
  );
};

export default TabsNavItem;
