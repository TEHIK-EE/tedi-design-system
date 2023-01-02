import styles from './tabs-nav.module.scss';
import TabsNavItem, { TabsNavItemProps } from './tabs-nav-item';

export interface TabsNavProps {
  /**
   * See @tabs-nav-item.
   */
  items: TabsNavItemProps[];
  /**
   * ID of heading labelling the tabs.
   */
  'aria-labelledby': string;
}

export const TabsNav = (props: TabsNavProps): JSX.Element => {
  const { items } = props;

  return (
    <ul data-name="tabs-nav" className={styles['tabs__nav']} role="tablist" aria-labelledby={props['aria-labelledby']}>
      {items.map((item, index) => (
        <TabsNavItem {...item} key={index} />
      ))}
    </ul>
  );
};

export default TabsNav;
