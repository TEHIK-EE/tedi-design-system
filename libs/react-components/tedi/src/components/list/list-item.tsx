import cn from 'classnames';

import { VerticalSpacingItem, VerticalSpacingItemProps } from '../vertical-spacing';
import styles from './list.module.scss';

export interface ListItemProps {
  /**
   * List children should be ListItem components
   */
  children: React.ReactNode;
  /**
   * Props for controlling vertical spacing between list items. If provided,
   * the List will be wrapped inside a VerticalSpacing component.
   */
  verticalSpacingItem?: Omit<VerticalSpacingItemProps, 'element' | 'children'>;
}

export const ListItem = (props: ListItemProps) => {
  const { children, verticalSpacingItem } = props;
  const listItemBEM = cn(styles['list__item'], verticalSpacingItem?.className);

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
