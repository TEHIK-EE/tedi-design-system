import cn from 'classnames';
import React from 'react';

import styles from './grid.module.scss';
import { RowContext } from './row';

export type NumberAttr = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type ColOrderNumber = number | '1' | '2' | '3' | '4' | '5';
export type ColOrder = ColOrderNumber | 'first' | 'last';
export type ColSize = 'auto' | NumberAttr;
export type ColAlign = 'start' | 'center' | 'end';

export interface ColSpec {
  /**
   * Number of column width.
   * Use `auto` to give columns their natural widths.
   */
  width?: ColSize;
  /**
   * Move columns to the right 1-11 columns.
   * https://getbootstrap.com/docs/5.1/layout/columns/#offsetting-columns
   */
  offset?: NumberAttr;
  /**
   * Use for controlling the visual order of your Cols.
   * https://getbootstrap.com/docs/5.1/layout/columns/#order-classes
   */
  order?: ColOrder;
  /**
   * Use to vertically align columns individually.
   * https://getbootstrap.com/docs/5.1/layout/columns/#alignment
   */
  align?: ColAlign;
  /**
   * Use to toggle a flex item’s ability to grow to fill available space.
   * https://getbootstrap.com/docs/5.1/utilities/flex/#grow-and-shrink
   */
  grow?: 0 | 1;
  /**
   * Use to toggle a flex item’s ability to shrink if necessary.
   * https://getbootstrap.com/docs/5.1/utilities/flex/#grow-and-shrink
   */
  shrink?: 0 | 1;
}

export interface ColProps extends ColSpec {
  /**
   * Col children.
   */
  children?: React.ReactNode;
  /**
   * Additional class.
   */
  className?: string;
  /**
   * ColSpec object to change Row behavior on xs devices (<576px).
   * Or number of column width.
   */
  xs?: ColSpec | ColSize;
  /**
   * ColSpec object to change Row behavior on sm devices (≥576px).
   * Or number of column width.
   */
  sm?: ColSpec | ColSize;
  /**
   * ColSpec object to change Row behavior on md devices (≥768px).
   * Or number of column width.
   */
  md?: ColSpec | ColSize;
  /**
   * ColSpec object to change Row behavior on lg devices (≥992px).
   * Or number of column width.
   */
  lg?: ColSpec | ColSize;
  /**
   * ColSpec object to change Row behavior on xl devices (≥1200px).
   * Or number of column width.
   */
  xl?: ColSpec | ColSize;
  /**
   * ColSpec object to change Row behavior on xxl devices (≥1400px).
   * Or number of column width.
   */
  xxl?: ColSpec | ColSize;
  /**
   * Onclick function handler
   */
  onClick?: (e: React.MouseEvent<HTMLDivElement | HTMLSpanElement | HTMLLinkElement>) => void;
}

const DEVICE_SIZES = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'] as const;

export const Col = (props: ColProps): JSX.Element => {
  const { className, children, width, offset, order, align, grow, shrink, onClick, ...rest } = props;
  const { element: rootElement } = React.useContext(RowContext);
  let Element: 'li' | 'span' | 'div';

  switch (rootElement) {
    case 'ol':
    case 'ul':
      Element = 'li';
      break;
    case 'span':
      Element = 'span';
      break;
    default:
      Element = 'div';
  }

  const colSpecBEM = (colSpec: ColSpec, infix = ''): string => {
    const { align, offset, order, width, grow, shrink } = colSpec;
    return cn(
      styles['col'],
      { [styles[`align-self${infix}-${align}`]]: align },
      { [styles[`offset${infix}-${offset}`]]: offset },
      { [styles[`order${infix}-${order}`]]: order },
      { [styles[`col${infix}-${width}`]]: width },
      { [styles[`flex${infix}-grow-${grow}`]]: grow },
      { [styles[`flex${infix}-shrink-${shrink}`]]: shrink }
    );
  };

  const BEM = (): string => {
    const deviceSpecificClassnames = DEVICE_SIZES.map((breakPoint) => {
      const deviceSpecificValue = rest[breakPoint];
      const deviceSpecificInfix = breakPoint !== 'xs' ? `-${breakPoint}` : '';

      return !deviceSpecificValue
        ? undefined
        : typeof deviceSpecificValue === 'object'
        ? colSpecBEM({ ...deviceSpecificValue }, deviceSpecificInfix)
        : colSpecBEM({ width: deviceSpecificValue }, deviceSpecificInfix);
    });

    const defaultValues = { width, offset, order, align, grow, shrink };
    return cn(...deviceSpecificClassnames, className, colSpecBEM(defaultValues));
  };

  return (
    <Element className={BEM()} onClick={onClick}>
      {children}
    </Element>
  );
};

export default Col;
