import cn from 'classnames';
import React from 'react';

import Print from '../../../../tedi/components/misc/print/print';
import { HashTrigger } from '../../../../tedi/components/navigation/hash-trigger/hash-trigger';
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
      <HashTrigger id={id} onMatch={(id) => setCurrentTab(id)}>
        <Print visibility="show">
          {/*
          // // TODO: Remove ts-ignore
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error: 'rest' props do not fully match Anchor's expected props, but they are validated elsewhere */}
          <Anchor {...rest} id={id} className={cn(styles['tabs__nav-link'])}>
            {children}
          </Anchor>
        </Print>
      </HashTrigger>
    </li>
  );
};

export default TabsNavItem;
