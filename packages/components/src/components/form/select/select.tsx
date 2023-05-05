import cn from 'classnames';
import React, { forwardRef } from 'react';
import ReactSelect, {
  ClearIndicatorProps,
  components as ReactSelectComponents,
  ControlProps,
  GroupBase,
  InputProps,
  MenuListProps,
  MenuProps,
  MultiValueProps,
  OnChangeValue,
  OptionProps,
  PlaceholderProps,
  SelectComponentsConfig,
} from 'react-select';
import AsyncSelect from 'react-select/async';
import { MenuPortalProps } from 'react-select/dist/declarations/src/components/Menu';

import { useLayout } from '../../../helpers';
import { Icon } from '../../icon/icon';
import Tag from '../../tag/tag';
import Check from '../check/check';
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
  /**
   * What icon to use for dropdown
   * @default arrow_drop_down
   */
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
   * @default false
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
   * @default false
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
   * If multiple option can be selected. When true, then closeMenuOnSelect and blurInputOnSelect are set to false by default.
   */
  multiple?: boolean;
  /**
   * If menu should open when select is focused.
   * @default false
   */
  openMenuOnFocus?: boolean;
  /**
   * If pressing tab inside menu should select currently focused option.
   * @default false
   */
  tabSelectsValue?: boolean;
  /**
   * Close menu on select
   * @default true. If multiple select then defaults to false.
   */
  closeMenuOnSelect?: boolean;
  /**
   * Blur input on select. Useful for closing the keyboard on touch devices.
   * @default true for single select on mobile device
   */
  blurInputOnSelect?: boolean;
  /**
   * Auto focus
   */
  autoFocus?: boolean;
  /**
   * If select can be clearable
   * @default true
   */
  isClearable?: boolean;
  /**
   * If select displays an indicator to clear selected values
   * @default false
   */
  isClearIndicatorVisible?: boolean;
  /**
   * If select can be searched
   * @defaults true
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
  const isSmallLayout = useLayout(['mobile', 'tablet']);
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
    disabled = false,
    className,
    hideLabel = false,
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
    closeMenuOnSelect = !multiple,
    blurInputOnSelect = isSmallLayout && !multiple,
    autoFocus = false,
    isClearable = true,
    isClearIndicatorVisible = false,
    isSearchable = true,
    menuIsOpen,
    onMenuClose,
    onMenuOpen,
    onBlur,
    ...rest
  } = props;
  const helperId = helper ? helper?.id ?? `${id}-helper` : undefined;

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

  const getPlaceholder = (props: PlaceholderProps<ISelectOption>): JSX.Element => (
    <ReactSelectComponents.Placeholder {...props} className={cn(props.className, 'inline-block')} />
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

  const getMultiOption = (props: OptionProps<ISelectOption, boolean>): JSX.Element => {
    const OptionBEM = cn(
      styles['select__option'],
      { [styles['select__option--disabled']]: props.isDisabled },
      { [styles['select__option--focused']]: props.isFocused }
    );

    return (
      <ReactSelectComponents.Option {...props} className={OptionBEM}>
        {renderOption ? (
          renderOption(props)
        ) : (
          <Check
            id={props.data.value}
            label={props.label}
            value={props.data.value}
            name={props.data.value}
            checked={props.isSelected}
            onChange={(value, checked) => null}
            disabled={props.isDisabled}
            hover={props.isFocused}
          />
        )}
      </ReactSelectComponents.Option>
    );
  };

  const getSingleOption = (props: OptionProps<ISelectOption, boolean>): JSX.Element => {
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

  const getOption = (props: OptionProps<ISelectOption, boolean>): JSX.Element => {
    return multiple ? getMultiOption(props) : getSingleOption(props);
  };

  const getMultiValue = ({ children, ...rest }: MultiValueProps<ISelectOption>): JSX.Element => {
    return (
      <Tag
        color="default"
        type="secondary"
        className={cn(styles['select__multi-value-item'], {
          [styles['select__multi-value-item--big']]: size !== 'small',
        })}
      >
        {children}
      </Tag>
    );
  };

  const getClearIndicator = (props: ClearIndicatorProps<ISelectOption>) =>
    isClearIndicatorVisible ? <ReactSelectComponents.ClearIndicator {...props} /> : null;

  const renderReactSelect = (): JSX.Element => {
    const customComponents: SelectComponentsConfig<ISelectOption, boolean, GroupBase<ISelectOption>> = {
      ClearIndicator: getClearIndicator,
      DropdownIndicator: getDropDownIndicator,
      IndicatorSeparator: () => null,
      MenuPortal: getMenuPortal,
      Menu: getMenu,
      MenuList: getMenuList,
      Option: getOption,
      Control: CustomControl,
      Input: CustomInput,
      MultiValue: getMultiValue,
      MultiValueRemove: () => null,
      Placeholder: getPlaceholder,
    };

    const ReactSelectElement = async ? AsyncSelect : ReactSelect;

    return (
      <ReactSelectElement<ISelectOption, boolean>
        id={id}
        aria-describedby={helperId}
        autoFocus={autoFocus}
        ref={ref}
        instanceId={id}
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
        inputId={`${id}-input`}
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
        hideSelectedOptions={false}
        closeMenuOnSelect={closeMenuOnSelect}
        blurInputOnSelect={blurInputOnSelect}
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
    <div data-name="select" {...rest} className={SelectBEM}>
      <div className={styles['select__inner']}>
        <FormLabel
          id={`${id}-input`}
          label={label}
          requiredLabel={requiredLabel}
          required={required}
          hideLabel={hideLabel}
        />
        {renderReactSelect()}
      </div>
      {helper && <FormHelper {...helper} id={helperId} />}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
