import cn from 'classnames';

import { VerticalSpacing, VerticalSpacingProps } from '../vertical-spacing';
import styles from './list.module.scss';
import { ListItemProps } from './list-item';

export interface ListProps {
  /**
   * List children should be ListItem components
   */
  children: React.ReactElement<ListItemProps> | React.ReactElement<ListItemProps>[];
  /**
   * VerticalSpacing props, if needed different spacing between items
   */
  verticalSpacing?: Omit<VerticalSpacingProps, 'element' | 'children'>;
  /**
   * Element of the list
   * @default ul
   */
  element?: 'ul' | 'ol';
  /**
   * List style
   * @default none
   */
  style?: 'none';
}

export const List = (props: ListProps) => {
  const { children, element = 'ul', style = 'none', verticalSpacing } = props;
  const BEM = cn(styles['list'], styles[`list--style-${style}`], verticalSpacing?.className);
  const Element = element;

  if (verticalSpacing) {
    return (
      <VerticalSpacing {...verticalSpacing} element={element} className={BEM}>
        {children}
      </VerticalSpacing>
    );
  }

  return <Element className={BEM}>{children}</Element>;
};

export default List;
