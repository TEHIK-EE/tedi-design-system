import cn from 'classnames';
import { components as ReactSelectComponents } from 'react-select';
import { MenuPortalProps } from 'react-select/dist/declarations/src/components/Menu';

import { IGroupedOptions, ISelectOption } from '../select';
import styles from '../select.module.scss';

export const SelectMenuPortal = (
  props: MenuPortalProps<ISelectOption, boolean, IGroupedOptions<ISelectOption>>
): JSX.Element => (
  <ReactSelectComponents.MenuPortal {...props} className={cn(props.className, styles['tedi-select__menu-portal'])} />
);
