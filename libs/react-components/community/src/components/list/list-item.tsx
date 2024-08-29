import cn from 'classnames';

import { VerticalSpacingItem, VerticalSpacingItemProps } from '../../../../tedi/src/components/vertical-spacing';
import styles from './list.module.scss';

export interface ListItemProps {
  /**
   * List children should be ListItem components
   */
  children: React.ReactNode;
  /**
   * VerticalSpacingItem props, if needed larger spacing between items
   */
  verticalSpacingItem?: Omit<VerticalSpacingItemProps, 'element' | 'children'>;
}

export const ListItem = (props: ListItemProps) => {
  const { children, verticalSpacingItem } = props;
  const BEM = cn(styles['list__item'], verticalSpacingItem?.className);

  if (props.verticalSpacingItem) {
    return (
      <VerticalSpacingItem {...verticalSpacingItem} element="li" className={BEM}>
        {children}
      </VerticalSpacingItem>
    );
  }

  return <li className={BEM}>{children}</li>;
};

export default ListItem;
