import { JSX } from 'react';

import { Select, SelectProps } from '../../../../tedi';
import styles from './map-select.module.scss';

export const MapSelect = (props: SelectProps): JSX.Element => {
  return (
    <Select
      {...props}
      classNames={{
        control: styles['tedi-map-select__control-wrapper'],
        singleValue: styles['tedi-map-select__single-value'],
      }}
    />
  );
};

export default MapSelect;
