import { JSX } from 'react';

import { Select as TediSelect, SelectProps } from '../../../../tedi';
import styles from './select.module.scss';

export const Select = (props: SelectProps): JSX.Element => {
  return (
    <TediSelect
      {...props}
      classNames={{ control: styles['tedi-select__control-wrapper'], singleValue: styles['tedi-select__single-value'] }}
    />
  );
};

export default Select;
