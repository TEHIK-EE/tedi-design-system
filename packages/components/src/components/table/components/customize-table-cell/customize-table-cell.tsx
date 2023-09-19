import React from 'react';

interface CustomizeTableCellProps {
  children?: React.ReactNode;
  className?: string;
}

export const CustomizeTableCell = ({ children, className }: CustomizeTableCellProps): JSX.Element => {
  const nodeRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const parentElem = nodeRef?.current?.parentElement;
    if (parentElem && className) {
      parentElem.className = '';
      parentElem.classList.add(...className.split(' '));
    }
  }, [className]);

  return <div ref={nodeRef}>{children}</div>;
};
