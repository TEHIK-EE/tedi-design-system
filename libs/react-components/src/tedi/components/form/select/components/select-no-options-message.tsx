import cn from 'classnames';
import { components as ReactSelectComponents, NoticeProps } from 'react-select';

import { IGroupedOptions, ISelectOption } from '../select';
import styles from '../select.module.scss';

export const SelectNoOptionsMessage = (
  props: NoticeProps<ISelectOption, boolean, IGroupedOptions<ISelectOption>>
): JSX.Element => {
  const { innerProps = {} } = props;

  return (
    <ReactSelectComponents.NoOptionsMessage
      {...props}
      innerProps={{
        ...innerProps,
        role: 'alert',
        'aria-live': 'assertive',
        className: cn(innerProps.className, styles['tedi-select__no-options']),
      }}
    />
  );
};
