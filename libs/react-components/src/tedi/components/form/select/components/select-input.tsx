import cn from 'classnames';
import { components as ReactSelectComponents, InputProps } from 'react-select';

import { ISelectOption } from '../select';
import styles from '../select.module.scss';

export const SelectInput = (props: InputProps<ISelectOption, boolean>): JSX.Element => (
  <ReactSelectComponents.Input
    {...props}
    className={cn(props.className, styles['tedi-select__input'])}
    isHidden={props.selectProps.inputIsHidden !== undefined ? props.selectProps.inputIsHidden : props.isHidden}
    aria-required={props.selectProps.required}
    required={props.selectProps.required}
  />
);
