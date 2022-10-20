import cn from 'classnames';

import Dropdown, { DropdownProps } from '../../../../dropdown/dropdown';
import styles from '../../header.module.scss';

export interface HeaderDropdownProps {
  /*
   * Dropdown custom classname
   * */
  className: string;
  /**
   * Dropdown props
   */
  dropdown: DropdownProps;
  /**
   * Label before dropdown
   */
  label?: string;
}

export const HeaderDropdown = (props: HeaderDropdownProps) => {
  const { dropdown, label, className } = props;
  return (
    <div className={cn(styles['header-dropdown'], className)}>
      {label && <p className={`text-small text-secondary ${styles['header-dropdown__label']}`}>{label}</p>}
      {dropdown && (
        <Dropdown button={{ type: 'link', iconRight: 'expand_more', ...dropdown.button }} items={dropdown.items} />
      )}
    </div>
  );
};

export default HeaderDropdown;
