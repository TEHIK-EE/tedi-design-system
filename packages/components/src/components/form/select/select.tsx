import cn from 'classnames';
import React, { forwardRef } from 'react';
import ReactSelect, {
  components as ReactSelectComponents,
  ControlProps,
  GroupBase,
  InputProps,
  MenuListProps,
  MenuProps,
  MultiValueRemoveProps,
  OnChangeValue,
  OptionProps,
  SelectComponentsConfig,
} from 'react-select';
import AsyncSelect from 'react-select/async';
import { MenuPortalProps } from 'react-select/dist/declarations/src/components/Menu';

import { Icon } from '../../icon/icon';
import FormHelper, { FormHelperProps } from '../form-helper/form-helper';
import FormLabel, { FormLabelProps } from '../form-label/form-label';
import styles from './select.module.scss';

/**
 * Outside of component because: https://github.com/JedWatson/react-select/issues/2810#issuecomment-569117980
 * If declared inside component, async Select loses focus after fetch
 */
const CustomControl = (props: ControlProps<ISelectOption, boolean>): JSX.Element => {
  const CustomControlBEM = cn(styles['select__control'], props.className, {
    [styles['select__control--focused']]: props.isFocused,
  });

  return <ReactSelectComponents.Control {...props} className={CustomControlBEM} />;
};
const CustomInput = (props: InputProps<ISelectOption, boolean>): JSX.Element => (
  <ReactSelectComponents.Input {...props} className={cn(props.className, styles['select__input'])} />
);

export interface SelectProps extends FormLabelProps {
  /**
   * ID attribute.
   */
  id: string;
  /**
   * Options for select.
   */
  options?: ISelectOption[];
  /**
   * Default options for async select. Do not use without async select.
   */
  defaultOptions?: ISelectOption[];
  /**
   * select field placeholder.
   */
  placeholder?: string;
  /**
   * Additional classes.
   */
  className?: string;
  /*
   * What icon to use for dropdown
   * */
  iconName?: 'arrow_drop_down' | 'search';
  /**
   * onChange callback handler.
   */
  onChange?: (value: TSelectValue) => void;
  /**
   * onChange callback handler when input changes on async/live select.
   */
  onInputChange?: (value: string) => void;
  /**
   * Search input value.
   */
  inputValue?: string;
  /**
   * onChange callback handler when input changes on async/live select.
   */
  loadOptions?: (inputValue: string, callback: (options: ISelectOption[]) => void) => void;
  /**
   * Default value of select.
   */
  defaultValue?: TSelectValue;
  /**
   * Value of select to control select value from outside of component.
   * Should be an actual JS reference to one of the options.
   * Do not use with defaultValue
   */
  value?: TSelectValue;
  /**
   * If select is disabled.
   */
  disabled?: boolean;
  /**
   * Name attribute.
   */
  name?: string;
  /**
   * If select is invalid.
   */
  invalid?: boolean;
  /**
   * Textfield helper.
   */
  helper?: FormHelperProps;
  /**
   * Size of select.
   */
  size?: 'small';
  /**
   * If select should load options async
   */
  async?: boolean;
  /**
   * Render custom option for select
   */
  renderOption?: (props: OptionProps<ISelectOption, boolean>) => JSX.Element;
  /**
   * Text to display when there are no options.
   */
  noOptionsMessage?: (obj: { inputValue: string }) => React.ReactNode;
  /**
   * Text to display when there are no options.
   */
  loadingMessage?: (obj: { inputValue: string }) => React.ReactNode;
  /**
   * Custom component to display under MessageList.
   */
  renderMessageListFooter?: (props: MenuListProps<ISelectOption, boolean>) => JSX.Element;
  /**
   * If multiple option can be selected
   */
  multiple?: boolean;
  /**
   * If menu should open when select is focused. defaults to false
   */
  openMenuOnFocus?: boolean;
  /**
   * If pressing tab inside menu should select currently focused option. defaults to false
   */
  tabSelectsValue?: boolean;
  /**
   * Close menu on select
   */
  closeMenuOnSelect?: boolean;
  /**
   * Auto focus
   */
  autoFocus?: boolean;
  /**
   * If select can be clearable, defaults to true
   */
  isClearable?: boolean;
  /**
   * If select can be searched, defaults to true
   */
  isSearchable?: boolean;
  /**
   * Whether the menu is open
   */
  menuIsOpen?: boolean;
  /**
   * Handle the menu opening
   */
  onMenuOpen?: () => void;
  /**
   * Handle the menu closing
   */
  onMenuClose?: () => void;
  /**
   * Handle the on blur
   */
  onBlur?: () => void;
}

export interface ISelectOption<CustomData = unknown> {
  /**
   * Option value.
   */
  value: string;
  /**
   * Option label.
   */
  label: string | React.ReactNode | React.ReactNode[];
  /**
   * If option is disabled
   */
  isDisabled?: boolean;
  /**
   * Custom
   */
  customData?: CustomData;
}

export type TSelectValue<CustomData = unknown> =
  | ISelectOption<CustomData>
  | ReadonlyArray<ISelectOption<CustomData>>
  | null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Select = forwardRef<any, SelectProps>((props, ref): JSX.Element => {
  const {
    options,
    defaultOptions,
    id,
    name,
    iconName = 'arrow_drop_down',
    label,
    required,
    requiredLabel,
    value,
    defaultValue,
    onChange,
    onInputChange,
    inputValue,
    loadOptions,
    openMenuOnFocus = false,
    tabSelectsValue = false,
    disabled,
    className,
    hideLabel,
    helper,
    placeholder,
    invalid,
    size,
    async = false,
    renderOption,
    renderMessageListFooter,
    noOptionsMessage,
    loadingMessage,
    multiple = false,
    closeMenuOnSelect = true,
    autoFocus = false,
    isClearable = true,
    isSearchable = true,
    menuIsOpen,
    onMenuClose,
    onMenuOpen,
    onBlur,
  } = props;

  const onChangeHandler = (option: OnChangeValue<ISelectOption, boolean>) => {
    onChange?.(option);
  };

  const getDropDownIndicator = (): JSX.Element => (
    <Icon name={iconName} size={24} className={styles['select__arrow']} />
  );

  const getMenuPortal = (props: MenuPortalProps<ISelectOption, boolean, GroupBase<ISelectOption>>): JSX.Element => (
    <ReactSelectComponents.MenuPortal {...props} className={cn(props.className, styles['select__menu-portal'])} />
  );

  const getMenu = (props: MenuProps<ISelectOption, boolean>): JSX.Element => (
    <ReactSelectComponents.Menu {...props} className={cn(props.className, styles['select__menu'])} />
  );

  const getMenuList = (props: MenuListProps<ISelectOption, boolean>): JSX.Element => (
    <div className={styles['select__menu-list-wrapper']}>
      <ReactSelectComponents.MenuList {...props} className={cn(props.className, styles['select__menu-list'])}>
        {props.children}
      </ReactSelectComponents.MenuList>
      {renderMessageListFooter && (
        <div className={styles['select__menu-list-footer']}>{renderMessageListFooter(props)}</div>
      )}
    </div>
  );

  const getOption = (props: OptionProps<ISelectOption, boolean>): JSX.Element => {
    const OptionBEM = cn(
      styles['select__option'],
      { [styles['select__option--disabled']]: props.isDisabled },
      { [styles['select__option--selected']]: props.isSelected },
      { [styles['select__option--focused']]: props.isFocused }
    );

    return (
      <ReactSelectComponents.Option {...props} className={OptionBEM}>
        {renderOption ? renderOption(props) : props.children}
      </ReactSelectComponents.Option>
    );
  };
  const getMultiValueRemove = ({ innerProps, ...rest }: MultiValueRemoveProps<ISelectOption, boolean>): JSX.Element => {
    const MultiValueBEM = cn(innerProps.className, styles['select__multi-value-remove']);

    return (
      <ReactSelectComponents.MultiValueRemove {...rest} innerProps={{ ...innerProps, className: MultiValueBEM }} />
    );
  };

  const renderReactSelect = (): JSX.Element => {
    const customComponents: SelectComponentsConfig<ISelectOption, boolean, GroupBase<ISelectOption>> = {
      ClearIndicator: () => null,
      DropdownIndicator: getDropDownIndicator,
      IndicatorSeparator: () => null,
      MenuPortal: getMenuPortal,
      Menu: getMenu,
      MenuList: getMenuList,
      Option: getOption,
      Control: CustomControl,
      Input: CustomInput,
      MultiValueRemove: getMultiValueRemove,
    };

    const ReactSelectElement = async ? AsyncSelect : ReactSelect;

    return (
      <ReactSelectElement<ISelectOption, boolean>
        id={id}
        autoFocus={autoFocus}
        ref={ref}
        instanceId={id}
        aria-labelledby={`${id}-label`}
        className="select__wrapper"
        name={name}
        options={options}
        defaultOptions={defaultOptions}
        value={value}
        defaultValue={defaultValue}
        cacheOptions={true}
        onChange={onChangeHandler}
        onInputChange={onInputChange}
        onBlur={onBlur}
        inputValue={inputValue}
        loadOptions={loadOptions}
        noOptionsMessage={noOptionsMessage}
        loadingMessage={loadingMessage}
        classNamePrefix="select"
        components={customComponents}
        isDisabled={disabled}
        isSearchable={isSearchable}
        menuIsOpen={menuIsOpen}
        openMenuOnFocus={openMenuOnFocus}
        tabSelectsValue={tabSelectsValue}
        onMenuClose={onMenuClose}
        onMenuOpen={onMenuOpen}
        placeholder={placeholder || ''}
        menuPortalTarget={typeof window !== 'undefined' ? document.body : undefined}
        isClearable={isClearable}
        backspaceRemovesValue={true}
        menuShouldScrollIntoView={true}
        isMulti={multiple}
        closeMenuOnSelect={closeMenuOnSelect}
        menuPlacement="auto"
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#005aa3',
            danger: '#b50000',
            dangerLight: '#fceeee',
          },
        })}
      />
    );
  };

  const SelectBEM = cn(
    styles['select'],
    className,
    { [styles['select--invalid']]: invalid || helper?.type === 'error' },
    { [styles[`select--${size}`]]: size }
  );

  return (
    <div className={SelectBEM}>
      <div className={styles['select__inner']}>
        <FormLabel id={id} label={label} requiredLabel={requiredLabel} required={required} hideLabel={hideLabel} />
        {renderReactSelect()}
      </div>
      {helper && <FormHelper {...helper} />}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
