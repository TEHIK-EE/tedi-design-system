import cn from 'classnames';
import { components as ReactSelectComponents, OptionProps } from 'react-select';

import Radio from '../../radio/radio';
import { ISelectOption } from '../select';
import styles from '../select.module.scss';

type SingleOptionType = OptionProps<ISelectOption, boolean> & {
  showRadioButtons?: boolean;
  renderOption?: (props: OptionProps<ISelectOption, boolean>) => JSX.Element;
};

export const SelectSingleOption = ({ showRadioButtons, renderOption, ...props }: SingleOptionType): JSX.Element => {
  const OptionBEM = cn(
    styles['tedi-select__option'],
    { [styles['tedi-select__option--disabled']]: props.isDisabled },
    { [styles['tedi-select__option--selected']]: props.isSelected },
    { [styles['tedi-select__option--focused']]: props.isFocused }
  );

  return (
    <ReactSelectComponents.Option
      {...props}
      innerProps={{
        role: 'option',
        'aria-selected': props.isSelected,
        'aria-disabled': props.isDisabled,
        ...props.innerProps,
      }}
      className={OptionBEM}
    >
      {showRadioButtons ? (
        <>
          <span className="sr-only">{props.label}</span>
          <Radio
            label={props.label}
            id={props.data.value}
            name={props.data.value}
            className={styles['tedi-select__radio']}
            value={props.data.value}
            checked={props.isSelected}
            disabled={props.isDisabled}
          />
        </>
      ) : renderOption ? (
        renderOption(props)
      ) : (
        props.children
      )}
    </ReactSelectComponents.Option>
  );
};
