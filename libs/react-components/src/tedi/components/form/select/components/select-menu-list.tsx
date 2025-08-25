import cn from 'classnames';
import { components as ReactSelectComponents, MenuListProps } from 'react-select';

import { ISelectOption } from '../select';
import styles from '../select.module.scss';

export const SelectMenuList = ({ ...props }: MenuListProps<ISelectOption, boolean>) => (
  <ReactSelectComponents.MenuList {...props} className={cn(props.className, styles['tedi-select__menu-list'])}>
    {props.children}
  </ReactSelectComponents.MenuList>
);
