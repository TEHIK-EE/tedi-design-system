import cn from 'classnames';
import React from 'react';

import { TabsContext } from '../tabs-context';
import TabsItem, { TabsItemProps } from '../tabs-item/tabs-item';
import TabsNav from '../tabs-nav/tabs-nav';
import { TabsNavItemProps } from '../tabs-nav/tabs-nav-item';
import styles from './tabs.module.scss';

export interface TabsProps {
  /**
   * Tabs content. Children should be TabsItems
   */
  children: React.ReactNode;
  /**
   * Current tab id. Use to control the value. Only works with onTabChange prop.
   */
  currentTab?: string;
  /**
   * Default current tab. Use for uncontrolled value.
   * Changing the value won't update the component.
   */
  defaultCurrentTab?: string;
  /**
   * Additional classes.
   */
  className?: string;
  /**
   * On tab change handler.
   */
  onTabChange?: (nextTab: string) => void;
  /**
   * ID of heading labelling the tabs.
   */
  'aria-labelledby': string;
}

export const Tabs = (props: TabsProps): JSX.Element => {
  const { defaultCurrentTab, onTabChange, className, children } = props;
  const [innerCurrentTab, setInnerCurrentTab] = React.useState(defaultCurrentTab || '');

  const isCurrentTabControlled = (tab = props.currentTab): tab is string => {
    return !!props.onTabChange && typeof tab !== 'undefined';
  };
  const currentTab: string = isCurrentTabControlled(props.currentTab) ? props.currentTab : innerCurrentTab;

  const setCurrentTab = (id: string): void => {
    if (currentTab !== id) {
      if (!isCurrentTabControlled()) {
        setInnerCurrentTab(id);
      }

      onTabChange?.(id);
    }
  };

  const getNavItems = (): TabsNavItemProps[] => {
    return React.Children.toArray(props.children)
      .filter((child: React.ReactNode): child is React.ReactElement<TabsItemProps> => {
        return React.isValidElement(child) && child.type === TabsItem;
      })
      .map((item: React.ReactElement<TabsItemProps>) => {
        const { children, label, id, ...rest } = item.props;

        return {
          ...rest,
          id,
          isActive: currentTab === id,
          onClick: (event) => {
            event.preventDefault();
            setCurrentTab(id);
          },
          children: label,
          href: `#${id}`,
          role: 'tab',
          'aria-controls': id,
          'aria-label': label,
          'aria-selected': currentTab === id,
        };
      });
  };

  return (
    <TabsContext.Provider
      value={{
        currentTab,
        setCurrentTab,
      }}
    >
      <div className={cn(styles['tabs'], className)}>
        <TabsNav items={getNavItems()} aria-labelledby={props['aria-labelledby']} />
        <div className={styles['tabs__content']}>{children}</div>
      </div>
    </TabsContext.Provider>
  );
};

export default Tabs;
