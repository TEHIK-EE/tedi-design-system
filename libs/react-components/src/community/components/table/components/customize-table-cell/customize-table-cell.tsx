import React from 'react';

import styles from './customize-table-cell.module.scss';

export type AlignCell = 'top' | 'middle' | 'bottom' | 'baseline';

interface CustomizeTableCellProps {
  /**
   * Cell contents
   */
  children?: React.ReactNode;
  /**
   * Custom classes added to the cell
   */
  className?: string;
  /**
   * Vertical alignment of the cell
   * @default baseline
   */
  verticalAlign?: AlignCell;
}

export const CustomizeTableCell = (props: CustomizeTableCellProps): JSX.Element => {
  const { children, className, verticalAlign = 'baseline' } = props;
  const nodeRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const parentElem = nodeRef?.current?.parentElement;
    if (parentElem) {
      parentElem.className = styles['cell'];

      if (className) {
        parentElem.classList.add(...className.split(' '));
      }

      if (verticalAlign) {
        parentElem.style.setProperty('--table-cell-internal-vertical-align', verticalAlign);
      }
    }
  }, [className, verticalAlign]);

  return <div ref={nodeRef}>{children}</div>;
};
