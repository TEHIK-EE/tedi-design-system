import { Icon } from '../../../base/icon/icon';
import styles from '../select.module.scss';

export const SelectDropDownIndicator = (props: { iconName: string }): JSX.Element => (
  <Icon name={props.iconName} size={24} color="secondary" className={styles['tedi-select__arrow']} />
);
