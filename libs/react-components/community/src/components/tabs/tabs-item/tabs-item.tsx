import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../../../shared/helpers';
import { Card, CardContent, CardContentProps } from '../../card';
import HashTrigger from '../../hash-trigger/hash-trigger';
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

export const TabsItem = (props: TabsItemProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const { className, padding, background, id, children } = getCurrentBreakpointProps<TabsItemProps>(props, {
    padding: { top: 1.5, right: 2, bottom: 2, left: 2 },
    background: 'white',
  });
  const { currentTab, setCurrentTab } = React.useContext(TabsContext);
  const isCurrent = id === currentTab;

  return (
    <HashTrigger
      data-name="tabs-item"
      id={id}
      onMatch={(id, _, cb) => {
        setCurrentTab(id);
        // Scroll to element in page, when hash is matched
        cb?.();
      }}
    >
      {isCurrent && (
        <div className={className} id={`${id}-panel`} tabIndex={0} role="tabpanel" aria-labelledby={id}>
          <Card padding={padding} background={background} borderRadius={{ top: false, right: false }} borderless>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      )}
    </HashTrigger>
  );
};

export default TabsItem;
