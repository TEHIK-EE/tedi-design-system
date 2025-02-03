import cn from 'classnames';

import Print from '../../../../tedi/components/print/print';
import Anchor, { AnchorProps } from '../../anchor/anchor';
import styles from './tabs-nav.module.scss';

export type TabsNavItemProps<C extends React.ElementType = 'a'> = AnchorProps<C>;

export const TabsNavItem = <C extends React.ElementType = 'a'>(props: TabsNavItemProps<C>): JSX.Element => {
  const { isActive, children, ...rest } = props;
  const TabsNavItemBEM = cn(styles['tabs__nav-item'], { [styles['tabs__nav-item--current']]: isActive });

  return (
    <li data-name="tabs-nav-item" className={TabsNavItemBEM} role="presentation">
      <Print visibility="show">
        {/*
          // // TODO: Remove ts-ignore
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error: 'rest' props do not fully match Anchor's expected props, but they are validated elsewhere */}
        <Anchor {...rest} className={cn(styles['tabs__nav-link'])}>
          {children}
        </Anchor>
      </Print>
    </li>
  );
};

export default TabsNavItem;
