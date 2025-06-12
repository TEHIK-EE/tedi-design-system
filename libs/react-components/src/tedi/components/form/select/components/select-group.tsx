import cn from 'classnames';
import { components as ReactSelectComponents, GroupProps } from 'react-select';

import { IGroupedOptions, ISelectOption } from '../select';
import styles from '../select.module.scss';

export const SelectGroup = (props: GroupProps<ISelectOption, boolean, IGroupedOptions<ISelectOption>>): JSX.Element => {
  return (
    <ReactSelectComponents.Group {...props} className={cn(styles['tedi-select__group'])}>
      {props.children}
    </ReactSelectComponents.Group>
  );
};
