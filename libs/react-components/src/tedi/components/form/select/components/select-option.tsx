import { OptionProps } from 'react-select';

import { ISelectOption } from '../select';
import { SelectMultiOption } from './select-multi-option';
import { SelectSingleOption } from './select-single-option';

type OptionType = OptionProps<ISelectOption, boolean> & {
  renderOption?: (props: OptionProps<ISelectOption, boolean>) => JSX.Element;
  showRadioButtons?: boolean;
  multiple?: boolean;
};

export const SelectOption = ({ multiple, showRadioButtons, renderOption, ...props }: OptionType): JSX.Element => {
  return multiple
    ? SelectMultiOption({ renderOption, ...props })
    : SelectSingleOption({
        showRadioButtons,
        renderOption,
        ...props,
        innerProps: { ...props.innerProps, tabIndex: 0 },
      });
};
