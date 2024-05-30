import React from 'react';

import SkeletonBlock from '../../../skeleton/skeleton-block/skeleton-block';
import { PAGE_SIZE_WITHOUT_PAGINATION } from '../../table';
import { TableContext } from '../../table-context';

export const TableLoader = (): JSX.Element => {
  const { table, loadingLabel } = React.useContext(TableContext);
  // If table is without pagination, we want to show 10 rows as a placeholder when loading
  const pageSize = table?.getState().pagination.pageSize || 10;
  const loadingRowCount = pageSize === PAGE_SIZE_WITHOUT_PAGINATION ? 10 : pageSize;

  return (
    <>
      <tr className="sr-only">
        <td>{loadingLabel}</td>
      </tr>
      {Array.from(Array(loadingRowCount).keys()).map((i) => (
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
