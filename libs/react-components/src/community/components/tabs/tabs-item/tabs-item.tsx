import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { Card, CardContent, CardContentProps } from '../../card';
import { TabsContext } from '../tabs-context';

type TabsItemBreakpointProps = Pick<CardContentProps, 'padding' | 'background'>;

export interface TabsItemProps extends BreakpointSupport<TabsItemBreakpointProps> {
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

export const TabsItem = (props: TabsItemProps) => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const { className, padding, background, id, children } = getCurrentBreakpointProps<TabsItemProps>(props, {
    padding: { top: 1.5, right: 2, bottom: 2, left: 2 },
    background: 'white',
  });
  const { currentTab } = React.useContext(TabsContext);
  const isCurrent = id === currentTab;

  if (!isCurrent) {
    return null;
  }

  return (
    <div className={className} id={`${id}-panel`} tabIndex={0} role="tabpanel" aria-labelledby={id}>
      <Card padding={padding} background={background} borderRadius={{ top: false, right: false }} borderless>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default TabsItem;
