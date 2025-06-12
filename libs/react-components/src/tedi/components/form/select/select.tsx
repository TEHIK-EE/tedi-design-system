import cn from 'classnames';
import React, { forwardRef } from 'react';
import ReactSelect, {
  GroupBase,
  InputActionMeta,
  MenuListProps,
  OnChangeValue,
  OptionProps,
  OptionsOrGroups,
  SelectComponentsConfig,
  SelectInstance,
} from 'react-select';
import AsyncSelect from 'react-select/async';

import { FeedbackText, FeedbackTextProps } from '../../../../tedi/components/form/feedback-text/feedback-text';
import { FormLabel, FormLabelProps } from '../../../../tedi/components/form/form-label/form-label';
import { useLabels } from '../../../../tedi/providers/label-provider';
import { TextProps } from '../../base/typography/text/text';
import { SelectClearIndicator } from './components/select-clear-indicator';
import { SelectControl } from './components/select-control';
import { SelectDropDownIndicator } from './components/select-dropdown-indicator';
import { SelectGroup } from './components/select-group';
import { SelectGroupHeading } from './components/select-group-heading';
import { SelectIndicatorsContainer } from './components/select-indicators-container';
import { SelectInput } from './components/select-input';
import { SelectLoadingIndicator } from './components/select-loading-indicator';
import { SelectMenu } from './components/select-menu';
import { SelectMenuList } from './components/select-menu-list';
import { SelectMenuPortal } from './components/select-menu-portal';
import { SelectMultiValue } from './components/select-multi-value';
import { SelectMultiValueRemove } from './components/select-multi-value-remove';
import { SelectOption } from './components/select-option';
import { SelectValueContainer } from './components/select-value-container';
import styles from './select.module.scss';

declare module 'react-select/dist/declarations/src/Select' {
  export interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    inputIsHidden?: boolean;
  }
}

export interface SelectProps extends FormLabelProps {
  id: string;
  options?: OptionsOrGroups<ISelectOption, IGroupedOptions<ISelectOption>>;
  defaultOptions?: OptionsOrGroups<ISelectOption, IGroupedOptions<ISelectOption>> | boolean;
  placeholder?: string;
  className?: string;
  iconName?: 'arrow_drop_down' | 'search';
  onChange?: (value: TSelectValue) => void;
  onInputChange?: (value: string, actionMeta: InputActionMeta) => void;
  inputValue?: string;
  loadOptions?: (
    inputValue: string,
    callback: (options: OptionsOrGroups<ISelectOption, IGroupedOptions<ISelectOption>>) => void
  ) => void;
  isLoading?: boolean;
  defaultValue?: TSelectValue;
  value?: TSelectValue;
  disabled?: boolean;
  name?: string;
  invalid?: boolean;
  valid?: boolean;
  helper?: FeedbackTextProps;
  size?: 'small';
  async?: boolean;
  renderOption?: (props: OptionProps<ISelectOption, boolean>) => JSX.Element;
  noOptionsMessage?: (obj: { inputValue: string }) => React.ReactNode;
  loadingMessage?: (obj: { inputValue: string }) => React.ReactNode;
  renderMessageListFooter?: (props: MenuListProps<ISelectOption, boolean>) => JSX.Element;
  multiple?: boolean;
  tagsDirection?: 'stack' | 'row';
  openMenuOnFocus?: boolean;
  openMenuOnClick?: boolean;
  tabSelectsValue?: boolean;
  closeMenuOnSelect?: boolean;
  blurInputOnSelect?: boolean;
  autoFocus?: boolean;
  isClearable?: boolean;
  isClearIndicatorVisible?: boolean;
  isSearchable?: boolean;
  isTagRemovable?: boolean;
  menuIsOpen?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  onBlur?: () => void;
  inputIsHidden?: boolean;
  optionGroupHeadingText?: Pick<TextProps, 'modifiers' | 'color'>;
  cacheOptions?: boolean;
  showRadioButtons?: boolean;
  classNames?: {
    clearIndicator?: string;
    container?: string;
    control?: string;
    dropdownIndicator?: string;
    group?: string;
    groupHeading?: string;
    indicatorsContainer?: string;
    indicatorSeparator?: string;
    input?: string;
    loadingIndicator?: string;
    loadingMessage?: string;
    menu?: string;
    menuList?: string;
    menuPortal?: string;
    multiValue?: string;
    multiValueLabel?: string;
    multiValueRemove?: string;
    noOptionsMessage?: string;
    option?: string;
    placeholder?: string;
    singleValue?: string;
    valueContainer?: string;
  };
}

export interface ISelectOption<CustomData = unknown> {
  value: string;
  label: string | React.ReactNode | React.ReactNode[];
  isDisabled?: boolean;
  customData?: CustomData;
}

export interface IGroupedOptions<CustomOption = unknown> extends GroupBase<CustomOption> {
  text?: Pick<TextProps, 'modifiers' | 'color'>;
}

export type TSelectValue<CustomData = unknown> =
  | ISelectOption<CustomData>
  | ReadonlyArray<ISelectOption<CustomData>>
  | null;

export const Select = forwardRef<SelectInstance<ISelectOption, boolean, IGroupedOptions<ISelectOption>>, SelectProps>(
  (props, ref): JSX.Element => {
    const {
      options,
      defaultOptions,
      id,
      name,
      iconName = 'arrow_drop_down',
      label,
      required,
      value,
      defaultValue,
      tagsDirection = 'row',
      onChange,
      onInputChange,
      inputValue,
      loadOptions,
      isLoading,
      openMenuOnFocus = false,
      openMenuOnClick = true,
      tabSelectsValue = false,
      disabled = false,
      className,
      hideLabel = false,
      helper,
      placeholder,
      invalid,
      valid,
      size,
      async = false,
      renderOption,
      renderMessageListFooter,
      noOptionsMessage,
      loadingMessage,
      multiple = false,
      closeMenuOnSelect = !multiple,
      blurInputOnSelect = false,
      autoFocus = false,
      isClearable = true,
      isClearIndicatorVisible = false,
      isSearchable = true,
      menuIsOpen,
      onMenuClose,
      onMenuOpen,
      onBlur,
      inputIsHidden,
      isTagRemovable = true,
      optionGroupHeadingText = { modifiers: 'small', color: 'tertiary' },
      cacheOptions = true,
      showRadioButtons = false,
      renderWithoutLabel,
      tooltip,
      classNames,
    } = props;
    const helperId = helper ? helper?.id ?? `${id}-helper` : undefined;
    const element = React.useRef<SelectInstance<ISelectOption, boolean, IGroupedOptions<ISelectOption>> | null>(null);
    const { getLabel } = useLabels();

    React.useImperativeHandle(
      ref,
      () => element.current as SelectInstance<ISelectOption, boolean, IGroupedOptions<ISelectOption>>
    );

    const onChangeHandler = (option: OnChangeValue<ISelectOption, boolean>) => {
      onChange?.(option);

      if (!blurInputOnSelect && element.current) {
        setTimeout(() => element.current?.inputRef?.focus(), 0);
      }
    };

    const renderReactSelect = (): JSX.Element => {
      const customComponents: SelectComponentsConfig<ISelectOption, boolean, IGroupedOptions<ISelectOption>> = {
        ClearIndicator: (props) => SelectClearIndicator({ isClearIndicatorVisible, ...props }),
        DropdownIndicator: () => SelectDropDownIndicator({ iconName }),
        IndicatorSeparator: () => null,
        MenuPortal: SelectMenuPortal,
        Menu: SelectMenu,
        MenuList: (props) => SelectMenuList({ renderMessageListFooter, ...props }),
        Option: (props) => SelectOption({ renderOption, multiple, showRadioButtons, ...props }),
        Control: SelectControl,
        Input: SelectInput,
        MultiValue: (props) => SelectMultiValue({ isTagRemovable, ...props }),
        MultiValueRemove: SelectMultiValueRemove,
        Group: SelectGroup,
        GroupHeading: (props) => SelectGroupHeading({ optionGroupHeadingText, ...props }),
        IndicatorsContainer: SelectIndicatorsContainer,
        ValueContainer: SelectValueContainer,
        LoadingIndicator: SelectLoadingIndicator,
      };

      const ReactSelectElement = async ? AsyncSelect : ReactSelect;

      const getNoOptionsMessage = () => getLabel('select.no-options');
      const getLoadingMessage = () => getLabel('select.loading');

      return (
        <ReactSelectElement<ISelectOption, boolean, IGroupedOptions<ISelectOption>>
          id={id}
          aria-describedby={helperId}
          autoFocus={autoFocus}
          ref={element}
          instanceId={id}
          className="tedi-select__wrapper"
          name={name}
          options={options}
          defaultOptions={defaultOptions}
          value={value}
          defaultValue={defaultValue}
          cacheOptions={cacheOptions}
          onChange={onChangeHandler}
          onInputChange={onInputChange}
          onBlur={onBlur}
          inputValue={inputValue}
          inputId={`${id}-input`}
          loadOptions={loadOptions}
          isLoading={isLoading}
          noOptionsMessage={noOptionsMessage || getNoOptionsMessage}
          loadingMessage={loadingMessage || getLoadingMessage}
          classNamePrefix="select"
          components={customComponents}
          isDisabled={disabled}
          isSearchable={isSearchable}
          menuIsOpen={menuIsOpen}
          openMenuOnFocus={openMenuOnFocus}
          openMenuOnClick={openMenuOnClick}
          tabSelectsValue={tabSelectsValue}
          onMenuClose={onMenuClose}
          onMenuOpen={onMenuOpen}
          placeholder={placeholder || ''}
          isClearable={isClearable}
          backspaceRemovesValue={true}
          menuShouldScrollIntoView={true}
          isMulti={multiple}
          hideSelectedOptions={false}
          closeMenuOnSelect={closeMenuOnSelect}
          blurInputOnSelect={blurInputOnSelect}
          menuPlacement="auto"
          inputIsHidden={inputIsHidden}
          required={required}
          menuPortalTarget={document.body}
          menuPosition="absolute"
          classNames={
            classNames
              ? Object.fromEntries(
                  Object.entries(classNames).map(([key, value]) => [
                    key,
                    typeof value === 'string' ? () => value : value,
                  ])
                )
              : undefined
          }
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: 'var(--blue-600)',
              danger: 'var(--red-600)',
              dangerLight: 'var(--red-200)',
            },
          })}
          styles={{
            input: (base) => ({
              ...base,
              gridTemplateColumns: '0fr',
            }),
          }}
        />
      );
    };

    const SelectBEM = cn(
      styles['tedi-select'],
      className,
      { [styles['tedi-select--invalid']]: invalid || helper?.type === 'error' },
      { [styles['tedi-select--valid']]: valid || helper?.type === 'valid' },
      { [styles[`tedi-select--${size}`]]: size },
      { [styles[`tedi-select--tags-${tagsDirection}`]]: tagsDirection },
      { [styles['tedi-select--searchable']]: isSearchable },
      { [styles['tedi-select--disabled']]: disabled }
    );

    return (
      <div data-name="select" className={SelectBEM}>
        <div className={styles['tedi-select__inner']}>
          <FormLabel
            id={`${id}-input`}
            label={label}
            required={required}
            hideLabel={hideLabel}
            size={size}
            renderWithoutLabel={renderWithoutLabel}
            tooltip={tooltip}
          />
          {renderReactSelect()}
        </div>
        {helper && <FeedbackText {...helper} id={helperId} />}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
