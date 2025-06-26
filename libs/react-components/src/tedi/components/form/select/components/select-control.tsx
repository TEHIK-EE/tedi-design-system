import cn from 'classnames';
import { components as ReactSelectComponents, ControlProps } from 'react-select';

import { ISelectOption } from '../select';
import styles from '../select.module.scss';

export const SelectControl = (props: ControlProps<ISelectOption, boolean>): JSX.Element => {
  const CustomControlBEM = cn(styles['tedi-select__control'], props.className, {
    [styles['tedi-select__control--focused']]: props.isFocused,
  });

  return <ReactSelectComponents.Control {...props} className={CustomControlBEM} />;
};
