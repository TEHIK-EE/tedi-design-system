import cn from 'classnames';
import { components as ReactSelectComponents, MenuListProps } from 'react-select';

import { ISelectOption } from '../select';
import styles from '../select.module.scss';

type MenuListType = MenuListProps<ISelectOption, boolean> & {
  renderMessageListFooter?: (props: MenuListProps<ISelectOption, boolean>) => JSX.Element;
};

export const SelectMenuList = ({ renderMessageListFooter, ...props }: MenuListType) => (
  <div className={styles['tedi-select__menu-list-wrapper']}>
    <ReactSelectComponents.MenuList {...props} className={cn(props.className, styles['tedi-select__menu-list'])}>
      {props.children}
    </ReactSelectComponents.MenuList>
    {renderMessageListFooter && (
      <div className={styles['tedi-select__menu-list-footer']}>{renderMessageListFooter(props)}</div>
    )}
  </div>
);
