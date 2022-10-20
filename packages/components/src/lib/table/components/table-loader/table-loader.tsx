import React from 'react';

import SkeletonBlock from '../../../skeleton/skeleton-block/skeleton-block';
import { TableContext } from '../../table';

export const TableLoader = (): JSX.Element => {
  const { table } = React.useContext(TableContext);

  return (
    <>
      {Array.from(Array(table?.getState().pagination.pageSize).keys()).map((i) => (
        <tr key={i}>
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
