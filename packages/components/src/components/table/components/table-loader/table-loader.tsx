import React from 'react';

import SkeletonBlock from '../../../skeleton/skeleton-block/skeleton-block';
import { TableContext } from '../../table-context';

export const TableLoader = (): JSX.Element => {
  const { table, loadingLabel } = React.useContext(TableContext);

  return (
    <>
      <tr className="sr-only">
        <td>{loadingLabel}</td>
      </tr>
      {Array.from(Array(table?.getState().pagination.pageSize).keys()).map((i) => (
        <tr key={i} aria-hidden={true}>
          {Array.from(Array(table?.getAllColumns().length).keys()).map((j) => (
            <td key={j}>
              <SkeletonBlock width={100} height={21} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableLoader;
