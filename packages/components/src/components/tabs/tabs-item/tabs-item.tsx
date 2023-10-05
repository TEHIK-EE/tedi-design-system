import cn from 'classnames';
import React from 'react';

import HashTrigger from '../../hash-trigger/hash-trigger';
import { TabsContext } from '../tabs-context';
import styles from './tabs-item.module.scss';

export interface TabsItemProps {
  /**
   * ID property.
   */
  id: string;
  /**
   * Button label.
   */
  label: string;
  /**
   * Content of tabs item.
   */
  children: React.ReactNode;
  /**
   * Additional classes.
   */
  className?: string;
}

export const TabsItem = (props: TabsItemProps): JSX.Element => {
  const { className, id, children } = props;
  const { currentTab, setCurrentTab } = React.useContext(TabsContext);
  const isCurrent = id === currentTab;
  const TabsItemBEM = cn(styles['tabs__item'], className);

  return (
    <HashTrigger data-name="tabs-item" id={id} onMatch={() => setCurrentTab(id)}>
      {isCurrent && (
        <div className={TabsItemBEM} id={`${id}-panel`} tabIndex={0} role="tabpanel" aria-labelledby={id}>
          {children}
        </div>
      )}
    </HashTrigger>
  );
};

export default TabsItem;
