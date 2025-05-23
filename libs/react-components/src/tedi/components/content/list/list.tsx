import cn from 'classnames';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { IconColor } from '../../base/icon/icon';
import { VerticalSpacing, VerticalSpacingProps } from '../../layout/vertical-spacing';
import styles from './list.module.scss';
import ListItem, { ListItemProps } from './list-item';

type ListElement = 'ul' | 'ol';

export type BulletColor = IconColor;

type ListBreakpointProps = {
  /**
   * Props for controlling vertical spacing between list items. If provided,
   * the List will be wrapped inside a VerticalSpacing component.
   */
  verticalSpacing?: Omit<VerticalSpacingProps, 'element' | 'children'>;
  /**
   * Determines whether the list should have default styling (with bullets or numbers).
   * @default 'none'
   */
  style?: 'styled' | 'none';
};

export interface ListProps extends BreakpointSupport<ListBreakpointProps> {
  /**
   * List children should be ListItem components
   */
  children: React.ReactElement<ListItemProps> | React.ReactElement<ListItemProps>[] | React.ReactNode;
  /**
   * The HTML element to use for rendering the list.
   * Can either be 'ul' for an unordered list or 'ol' for an ordered list.
   * @default 'ul'
   */
  element?: ListElement;
  /**
   * Adds a custom CSS class to the List element for additional styling or theming purposes
   */
  className?: string;
  /**
   * This prop is used to set the color of the bullet points in the list.
   * Uses same color values as TEDI Icon
   * @default brand
   */
  color?: BulletColor;
}

export const List = (props: ListProps) => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    children,
    element = 'ul',
    style = 'none',
    verticalSpacing,
    className,
    color = 'brand',
  } = getCurrentBreakpointProps<ListProps>(props);
  const listBEM = cn(
    styles['tedi-list'],
    styles[`tedi-list--${element === 'ul' ? 'unordered' : 'ordered'}`],
    styles[`tedi-list--style-${style}`],
    styles[`tedi-list--bullet-color-${color}`],
    verticalSpacing?.className,
    className
  );
  const Element = element;

  if (verticalSpacing) {
    return (
      <VerticalSpacing {...verticalSpacing} element={element} className={listBEM}>
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

List.Item = ListItem;
export default List;
