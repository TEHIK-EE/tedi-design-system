import cn from 'classnames';
import React from 'react';

import { validateChildren } from '../../helpers/validators/validateChildren';
import { Col, ColProps } from './col';
import styles from './grid.module.scss';
import { RowContext } from './row-context';

export type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
export type Spacer = 0 | 1 | 2 | 3 | 4 | 5;
export type Gutter = 0 | 1 | 2 | 3 | 4 | 5;

export type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type AlignItems = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
export type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type Wrap = 'wrap' | 'nowrap' | 'wrap-reverse';
export type RowElement = 'div' | 'ul' | 'ol' | 'span';

interface RowSpec {
  /**
   * The number of columns that will fit next to each other.
   * Use `auto` to give columns their natural widths.
   */
  cols?: Cols;
  /**
   * Use justify-content utilities to change the alignment of items on the main axis.
   * https://getbootstrap.com/docs/5.1/utilities/flex/#justify-content
   */
  justifyContent?: JustifyContent;
  /**
   * Use align-items utilities to change the alignment of items on the cross axis.
   * https://getbootstrap.com/docs/5.1/utilities/flex/#align-items
   */
  alignItems?: AlignItems;
  /**
   * Add gap between items.
   * https://getbootstrap.com/docs/5.1/utilities/spacing/#gap
   */
  gap?: Spacer;
  /**
   * Change gutter between items.
   * https://getbootstrap.com/docs/5.0/layout/gutters/
   */
  gutter?: Gutter;
  gutterX?: Gutter;
  gutterY?: Gutter;
  /**
   * Set the direction of flex items in a flex container with direction utilities.
   * https://getbootstrap.com/docs/5.1/utilities/flex/#direction
   */
  direction?: Direction;
  /**
   * Change how flex items wrap in a flex container.
   * https://getbootstrap.com/docs/5.1/utilities/flex/#wrap
   */
  wrap?: Wrap;
}

export interface RowProps extends RowSpec {
  /**
   * Row children. Row direct children should always be Col components
   */
  children?: React.ReactElement<ColProps> | React.ReactElement<ColProps>[] | React.ReactNode;
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Base element.
   * @default div
   */
  element?: RowElement;
  /**
   * RowSpec object to change Row behavior on xs devices (<576px).
   * Or number of columns that will fit next to each other.
   */
  xs?: RowSpec | Cols;
  /**
   * RowSpec object to change Row behavior on sm devices (≥576px).
   * Or number of columns that will fit next to each other.
   */
  sm?: RowSpec | Cols;
  /**
   * RowSpec object to change Row behavior on md devices (≥768px).
   * Or number of columns that will fit next to each other.
   */
  md?: RowSpec | Cols;
  /**
   * RowSpec object to change Row behavior on lg devices (≥992px).
   * Or number of columns that will fit next to each other.
   */
  lg?: RowSpec | Cols;
  /**
   * RowSpec object to change Row behavior on xl devices (≥1200px).
   * Or number of columns that will fit next to each other.
   */
  xl?: RowSpec | Cols;
  /**
   * RowSpec object to change Row behavior on xxl devices (≥1400px).
   * Or number of columns that will fit next to each other.
   */
  xxl?: RowSpec | Cols;
}

const DEVICE_SIZES = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'] as const;

export const Row = (props: RowProps): JSX.Element => {
  const {
    children,
    className,
    element: Element = 'div',
    cols,
    alignItems,
    justifyContent,
    gap,
    gutter,
    gutterY,
    gutterX,
    wrap,
    direction,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    ...rest
  } = props;

  const rowSpecBEM = (rowSpec: RowSpec, infix = ''): string => {
    const { cols, justifyContent, alignItems, gap, direction, wrap, gutter, gutterX, gutterY } = rowSpec;

    return cn(
      styles['row'],
      { [styles[`row-cols${infix}-${cols}`]]: cols },
      { [styles[`justify-content${infix}-${justifyContent}`]]: justifyContent },
      { [styles[`align-items${infix}-${alignItems}`]]: alignItems },
      { [styles[`gap${infix}-${gap}`]]: gap || gap === 0 },
      { [styles[`g${infix}-${gutter}`]]: gutter || gutter === 0 },
      { [styles[`gx${infix}-${gutterX}`]]: gutterX || gutterX === 0 },
      { [styles[`gy${infix}-${gutterY}`]]: gutterY || gutterY === 0 },
      { [`flex${infix}-${direction}`]: direction },
      { [styles[`flex${infix}-${wrap}`]]: wrap }
    );
  };

  const BEM = (): string => {
    const breakPoints = {
      xs,
      sm,
      md,
      lg,
      xl,
      xxl,
    };

    const deviceSpecificClassnames = DEVICE_SIZES.map((breakPoint) => {
      const deviceSpecificValue = breakPoints[breakPoint];
      const deviceSpecificInfix = breakPoint !== 'xs' ? `-${breakPoint}` : '';

      return !deviceSpecificValue
        ? undefined
        : typeof deviceSpecificValue === 'object'
        ? rowSpecBEM({ ...deviceSpecificValue }, deviceSpecificInfix)
        : rowSpecBEM({ cols: deviceSpecificValue }, deviceSpecificInfix);
    });

    const defaultValues = { cols, justifyContent, alignItems, gap, direction, wrap, gutter, gutterX, gutterY };
    return cn(...deviceSpecificClassnames, className, rowSpecBEM(defaultValues));
  };

  return (
    <RowContext.Provider value={{ element: Element }}>
      <Element data-name="row" {...rest} className={BEM()}>
        {children}
      </Element>
    </RowContext.Provider>
  );
};

Row.propTypes = {
  children: (props: { [key: string]: any }) => validateChildren('Row', props, { custom: [Col.name] }),
};

export default Row;
