import React from 'react';

interface CustomizeTableCellProps {
  children?: React.ReactNode;
  className?: string;
}

export const CustomizeTableCell = ({ children, className }: CustomizeTableCellProps): JSX.Element => {
  const nodeRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const parentElement = nodeRef?.current?.parentElement;
    className && parentElement?.classList.add(className);
  });

  return <div ref={nodeRef}>{children}</div>;
};
