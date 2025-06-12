import cn from 'classnames';
import { components as ReactSelectComponents, OptionProps } from 'react-select';

import Checkbox from '../../checkbox/checkbox';
import { ISelectOption } from '../select';
import styles from '../select.module.scss';

type MultiOptionType = OptionProps<ISelectOption, boolean> & {
  renderOption?: (props: OptionProps<ISelectOption, boolean>) => JSX.Element;
};

export const SelectMultiOption = ({ renderOption, ...props }: MultiOptionType): JSX.Element => {
  const OptionBEM = cn(
    styles['tedi-select__option'],
    { [styles['tedi-select__option--disabled']]: props.isDisabled },
    { [styles['tedi-select__option--focused']]: props.isFocused }
  );

  const { tabIndex, ...innerProps } = props.innerProps;

  return (
    <ReactSelectComponents.Option
      {...props}
      innerProps={{ ...innerProps, tabIndex, role: 'option', 'aria-selected': props.isSelected }}
      className={OptionBEM}
    >
      {renderOption ? (
        renderOption(props)
      ) : (
        <>
          <span className="sr-only">{props.label}</span>
          <Checkbox
            id={props.data.value}
            label={props.label}
            aria-hidden={true}
            className={styles['tedi-select__checkbox']}
            value={props.data.value}
            name={props.data.value}
            checked={props.isSelected}
            onChange={() => null}
            disabled={props.isDisabled}
            hover={props.isFocused}
          />
        </>
      )}
    </ReactSelectComponents.Option>
  );
};
