import cn from 'classnames';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { VerticalSpacingItem, VerticalSpacingItemProps } from '../../layout/vertical-spacing';
import styles from './list.module.scss';

type ListItemBreakpointProps = {
  /**
   * Props for controlling vertical spacing between list items. If provided,
   * the List will be wrapped inside a VerticalSpacing component.
   */
  verticalSpacingItem?: Omit<VerticalSpacingItemProps, 'element' | 'children'>;
};

export interface ListItemProps extends BreakpointSupport<ListItemBreakpointProps> {
  /**
   * List children should be ListItem components
   */
  children: React.ReactNode;
  /**
   * Adds a custom CSS class to the ListItem element for additional styling or theming purposes
   */
  className?: string;
}

export const ListItem = (props: ListItemProps) => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const { children, verticalSpacingItem, className } = getCurrentBreakpointProps<ListItemProps>(props);
  const listItemBEM = cn(styles['tedi-list__item'], verticalSpacingItem?.className, className);

  if (props.verticalSpacingItem) {
    return (
      <VerticalSpacingItem {...verticalSpacingItem} element="li" className={listItemBEM}>
        {children}
      </VerticalSpacingItem>
    );
  }

  return <li className={listItemBEM}>{children}</li>;
};

export default ListItem;
