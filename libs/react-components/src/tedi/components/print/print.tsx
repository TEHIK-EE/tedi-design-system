import cn from 'classnames';
import React, { forwardRef } from 'react';

export type BreakTypes = 'auto' | 'avoid' | 'avoid-column' | 'avoid-page' | 'avoid-region';

export interface PrintProps {
  /**
   * The content to be rendered within the `Print` component.
   * This can be a single element or an array of elements.
   */
  children: JSX.Element | Array<JSX.Element | null | undefined | false | ''>;
  /**
   * Controls the visibility of the content when printing.
   * - 'show': The content will be visible during printing.
   * - 'hide': The content will be hidden during printing.
   */
  visibility?: 'show' | 'hide';
  /**
   * Determines how page, column, or region breaks behave before the element.
   * Uses CSS `break-before` property values.
   */
  breakBefore?: BreakTypes;
  /**
   * Determines how page, column, or region breaks behave after the element.
   * Uses CSS `break-after` property values.
   */
  breakAfter?: BreakTypes;
  /**
   * Determines how page, column, or region breaks behave inside the element.
   * Uses CSS `break-inside` property values.
   */
  breakInside?: BreakTypes;
}

export const Print = forwardRef<HTMLElement, PrintProps>((props, ref): JSX.Element | null => {
  const { children, visibility, breakBefore, breakInside, breakAfter } = props;

  const renderChild = (child?: JSX.Element, key?: number) => {
    const BEM = cn(child?.props?.className, {
      'no-print': visibility === 'hide',
      'show-print': visibility === 'show',
      [`break-before-${breakBefore}`]: breakBefore,
      [`break-after-${breakAfter}`]: breakAfter,
      [`break-inside-${breakInside}`]: breakInside,
    });

    return child ? React.cloneElement(child, { ...child.props, className: BEM, key }) : null;
  };

  if (Array.isArray(children)) {
    return <>{children?.map((child, index) => (child ? renderChild(child, index) : null))}</>;
  } else {
    return renderChild(children);
  }
});

Print.displayName = 'Print';

export default Print;
