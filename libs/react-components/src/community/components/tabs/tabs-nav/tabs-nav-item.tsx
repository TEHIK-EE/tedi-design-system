import cn from 'classnames';
import React from 'react';

import HashTrigger from '../../../../tedi/components/hash-trigger/hash-trigger';
import Print from '../../../../tedi/components/print/print';
import Anchor, { AnchorProps } from '../../anchor/anchor';
import { TabsContext } from '../tabs-context';
import { TabsItemProps } from '../tabs-item/tabs-item';
import styles from './tabs-nav.module.scss';

export type TabsNavItemProps<C extends React.ElementType = 'a'> = AnchorProps<C> & Pick<TabsItemProps, 'id'>;

export const TabsNavItem = <C extends React.ElementType = 'a'>(props: TabsNavItemProps<C>): JSX.Element => {
  const { isActive, children, id, ...rest } = props;
  const TabsNavItemBEM = cn(styles['tabs__nav-item'], { [styles['tabs__nav-item--current']]: isActive });

  const { setCurrentTab } = React.useContext(TabsContext);

  return (
    <li data-name="tabs-nav-item" className={TabsNavItemBEM} role="presentation">
      <Print visibility="show">
        <HashTrigger id={id} onMatch={(id) => setCurrentTab(id)}>
          {/*
          // // TODO: Remove ts-ignore
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore */}
          <Anchor {...rest} className={cn(styles['tabs__nav-link'])}>
            {children}
          </Anchor>
        </HashTrigger>
      </Print>
    </li>
  );
};

export default TabsNavItem;
