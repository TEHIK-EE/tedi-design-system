import cn from 'classnames';

import { VerticalSpacing, VerticalSpacingProps } from '../vertical-spacing';
import styles from './list.module.scss';
import { ListItemProps } from './list-item';

type ListElement = 'ul' | 'ol';

export interface ListProps {
  /**
   * List children should be ListItem components
   */
  children: React.ReactElement<ListItemProps> | React.ReactElement<ListItemProps>[] | React.ReactNode;
  /**
   * Props for controlling vertical spacing between list items. If provided,
   * the List will be wrapped inside a VerticalSpacing component.
   */
  verticalSpacing?: Omit<VerticalSpacingProps, 'element' | 'children'>;
  /**
   * The HTML element to use for rendering the list.
   * Can either be 'ul' for an unordered list or 'ol' for an ordered list.
   * @default 'ul'
   */
  as?: ListElement;
  /**
   * Determines the visual style of the list. Currently supports 'none' for no bullet styles.
   * @default 'none'
   */
  style?: 'none';
}

export const List = (props: ListProps) => {
  const { children, as = 'ul', style, verticalSpacing } = props;
  const listBEM = cn(
    styles['list'],
    styles[`list--${as === 'ul' ? 'unordered' : 'ordered'}`],
    styles[`list--style-${style}`],
    verticalSpacing?.className
  );
  const Element = as;

  if (verticalSpacing) {
    return (
      <VerticalSpacing {...verticalSpacing} element={as} className={listBEM}>
        {children}
      </VerticalSpacing>
    );
  }

  return (
    <Element className={listBEM} role="list">
      {children}
    </Element>
  );
};

export default List;
