import cn from 'classnames';
import { components as ReactSelectComponents, PlaceholderProps } from 'react-select';

import { IGroupedOptions, ISelectOption } from '../select';
import styles from '../select.module.scss';

export const SelectPlaceholder = (
  props: PlaceholderProps<ISelectOption, boolean, IGroupedOptions<ISelectOption>>
): JSX.Element => (
  <ReactSelectComponents.Placeholder
    {...props}
    innerProps={{
      ...props.innerProps,
      className: cn(props.innerProps.className, styles['tedi-select__placeholder']),
    }}
  />
);
