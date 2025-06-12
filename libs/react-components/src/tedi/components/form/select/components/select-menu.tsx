import cn from 'classnames';
import { components as ReactSelectComponents, MenuProps } from 'react-select';

import { ISelectOption } from '../select';
import styles from '../select.module.scss';

export const SelectMenu = (props: MenuProps<ISelectOption, boolean>): JSX.Element => (
  <ReactSelectComponents.Menu {...props} className={cn(props.className, styles['tedi-select__menu'])} />
);
