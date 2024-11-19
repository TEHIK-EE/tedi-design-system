import cn from 'classnames';
import React, { forwardRef, ReactElement } from 'react';
import ReactSelect, {
  ClearIndicatorProps,
  components as ReactSelectComponents,
  ControlProps,
  GroupBase,
  GroupHeadingProps,
  GroupProps,
  InputActionMeta,
  InputProps,
  MenuListProps,
  MenuProps,
  MultiValueProps,
  MultiValueRemoveProps,
  OnChangeValue,
  OptionProps,
  OptionsOrGroups,
  PlaceholderProps,
  SelectComponentsConfig,
  SelectInstance,
} from 'react-select';
import AsyncSelect from 'react-select/async';
import { MenuPortalProps } from 'react-select/dist/declarations/src/components/Menu';

import FormHelper, { FormHelperProps } from '../../../../tedi/components/form/form-helper/form-helper';
import { FormLabel, FormLabelProps } from '../../../../tedi/components/form/form-label/form-label';
import { useLabels } from '../../../../tedi/providers/label-provider';
import { getBackgroundColorClass } from '../../../helpers';
import { IntentionalAny } from '../../../types';
import Button from '../../button/button';
import { TColorsBackground } from '../../commonTypes';
import { Icon } from '../../icon/icon';
import Tag from '../../tag/tag';
import Text, { TextProps } from '../../typography/text/text';
import Check from '../check/check';
import styles from './select.module.scss';

/**
 * Because of the next problem, inputIsHidden has to be used from select custom props.
 * For typescript they need to be declared in module
 * https://github.com/JedWatson/react-select/issues/4804#issuecomment-927223471
 */
declare module 'react-select/dist/declarations/src/Select' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    inputIsHidden?: boolean;
  }
}

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
  <ReactSelectComponents.Input
    {...props}
    className={cn(props.className, styles['select__input'])}
    isHidden={props.selectProps.inputIsHidden !== undefined ? props.selectProps.inputIsHidden : props.isHidden}
  />
);

const Menu = (props: MenuProps<ISelectOption, boolean>): JSX.Element => (
  <ReactSelectComponents.Menu {...props} className={cn(props.className, styles['select__menu'])} />
);

const MenuPortal = (props: MenuPortalProps<ISelectOption, boolean, IGroupedOptions<ISelectOption>>): JSX.Element => (
  <ReactSelectComponents.MenuPortal {...props} className={cn(props.className, styles['select__menu-portal'])} />
);

export interface SelectProps extends FormLabelProps {
  /**
   * ID attribute.
   */
  id: string;
  /**
   * Options or grouped options for select.
   */
  options?: OptionsOrGroups<ISelectOption, IGroupedOptions<ISelectOption>>;
  /**
   * Default options for async select. Do not use without async select.
   */
  defaultOptions?: OptionsOrGroups<ISelectOption, IGroupedOptions<ISelectOption>> | boolean;
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
  onInputChange?: (value: string, actionMeta: InputActionMeta) => void;
  /**
   * Search input value.
   */
  inputValue?: string;
  /**
   * onChange callback handler when input changes on async/live select.
   */
  loadOptions?: (
    inputValue: string,
    callback: (options: OptionsOrGroups<ISelectOption, IGroupedOptions<ISelectOption>>) => void
  ) => void;
  /**
   * Is the select in a state of loading (async)
   */
  isLoading?: boolean;
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
   * If multiple option can be selected. When true, then closeMenuOnSelect is set to false by default.
   */
  multiple?: boolean;
  /**
   * How tags should position themselves
   * @default row
   */
  tagsDirection?: 'stack' | 'row';
  /**
   * If menu should open when select is focused.
   * @default false
   */
  openMenuOnFocus?: boolean;
  /**
   * If menu should open when control is clicked.
   * @default true
   */
  openMenuOnClick?: boolean;
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
   * (**NB!** Will move the focus back to the beginning of the page)
   * @default false
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
   * Should tags be individually removable
   * @default false
   */
  isTagRemovable?: boolean;
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
  /**
   * Whether the input text should be always hidden or always shown. Used for editable select results
   */
  inputIsHidden?: boolean;
  /**
   * Option group heading text modifiers. Can also be set for each option group separately inside `options` prop.
   * @default { modifiers: 'small', color: 'subtle' }
   */
  optionGroupHeadingText?: Pick<TextProps, 'modifiers' | 'color'>;
  /**
   * Option group heading background color. Can also be set for each option group separately inside `options` prop.
   */
  optionGroupBackgroundColor?: TColorsBackground;
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

export interface IGroupedOptions<CustomOption = unknown> extends GroupBase<CustomOption> {
  text?: Pick<TextProps, 'modifiers' | 'color'>;
  backgroundColor?: TColorsBackground;
}

export type TSelectValue<CustomData = unknown> =
  | ISelectOption<CustomData>
  | ReadonlyArray<ISelectOption<CustomData>>
  | null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      isTagRemovable = false,
      openMenuOnFocus = false,
      openMenuOnClick = true,
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
      optionGroupHeadingText = { modifiers: 'small', color: 'subtle' },
      optionGroupBackgroundColor,
      ...rest
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

      // because on touch device screen-readers(Talkback and VoiceOver) we lose focus on the input when selecting an option
      // we have to manually set it back to the input
      if (!blurInputOnSelect && element.current) {
        element.current.inputRef?.focus();
      }
    };

    const getDropDownIndicator = (): JSX.Element => (
      <Icon name={iconName} size={24} className={styles['select__arrow']} />
    );

    const getPlaceholder = (props: PlaceholderProps<ISelectOption>): JSX.Element => (
      <ReactSelectComponents.Placeholder {...props} className={cn(props.className, 'inline-block')} />
    );

    const MenuList = React.useCallback(
      (props: MenuListProps<ISelectOption, boolean>) => (
        <div className={styles['select__menu-list-wrapper']}>
          <ReactSelectComponents.MenuList {...props} className={cn(props.className, styles['select__menu-list'])}>
            {props.children}
          </ReactSelectComponents.MenuList>
          {renderMessageListFooter && (
            <div className={styles['select__menu-list-footer']}>{renderMessageListFooter(props)}</div>
          )}
        </div>
      ),
      [renderMessageListFooter]
    );

    const getMultiOption = (props: OptionProps<ISelectOption, boolean>): JSX.Element => {
      const OptionBEM = cn(
        styles['select__option'],
        { [styles['select__option--disabled']]: props.isDisabled },
        { [styles['select__option--focused']]: props.isFocused }
      );

      const { tabIndex, ...innerProps } = props.innerProps; // https://github.com/JedWatson/react-select/issues/5190#issuecomment-1634111332

      return (
        <ReactSelectComponents.Option
          {...props}
          innerProps={{ ...innerProps, role: 'option', 'aria-selected': props.isSelected }}
          className={OptionBEM}
        >
          {renderOption ? (
            renderOption(props)
          ) : (
            <>
              <span className="sr-only">{props.label}</span>
              <Check
                id={props.data.value}
                label={props.label}
                aria-hidden={true}
                className={styles['select__checkbox']}
                value={props.data.value}
                name={props.data.value}
                checked={props.isSelected}
                onChange={(value, checked) => null}
                disabled={props.isDisabled}
                hover={props.isFocused}
              />
            </>
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

      const { tabIndex, ...innerProps } = props.innerProps; // https://github.com/JedWatson/react-select/issues/5190#issuecomment-1634111332

      return (
        <ReactSelectComponents.Option
          {...props}
          innerProps={{ ...innerProps, role: 'option', 'aria-selected': props.isSelected }}
          className={OptionBEM}
        >
          {renderOption ? renderOption(props) : props.children}
        </ReactSelectComponents.Option>
      );
    };

    const getOption = (props: OptionProps<ISelectOption, boolean>): JSX.Element => {
      return multiple ? getMultiOption(props) : getSingleOption(props);
    };

    const getMultiValue = ({
      children,
      components: { Remove },
      data,
      selectProps,
      removeProps,
      ...rest
    }: MultiValueProps<ISelectOption>): JSX.Element => {
      return (
        <Tag
          color="default"
          type="secondary"
          className={cn(styles['select__multi-value-item'], {
            [styles['select__multi-value-item--big']]: size !== 'small',
          })}
        >
          {children}
          {isTagRemovable && <Remove data={data} selectProps={selectProps} innerProps={removeProps} />}
        </Tag>
      );
    };

    const getMultiValueRemove = ({ data, innerProps }: MultiValueRemoveProps<ISelectOption>): JSX.Element => {
      return (
        <Button
          icon={{ name: 'clear', color: 'muted' }}
          className={styles['select__multi-value-clear']}
          visualType="link"
          tabIndex={-1}
          {...(innerProps as IntentionalAny)}
        >
          {`${getLabel('remove')} ${data.label}`}
        </Button>
      );
    };

    // Clear currently is not focusable and that is by react-select design
    // https://github.com/JedWatson/react-select/issues/4988
    const getClearIndicator = ({ innerProps: { ref, ...restInnerProps } }: ClearIndicatorProps<ISelectOption>) => {
      return isClearIndicatorVisible ? (
        <Button
          icon={{ name: 'clear', color: 'muted' }}
          visualType="link"
          tabIndex={-1}
          ref={ref as IntentionalAny}
          {...(restInnerProps as IntentionalAny)}
        >
          {getLabel('clear')}
        </Button>
      ) : null;
    };

    const getGroup = (props: GroupProps<ISelectOption, boolean, IGroupedOptions<ISelectOption>>): JSX.Element => {
      const GroupBEM = cn(styles['select__group']);

      return (
        <ReactSelectComponents.Group {...props} className={GroupBEM}>
          {props.children}
        </ReactSelectComponents.Group>
      );
    };

    const getGroupHeading = (
      props: GroupHeadingProps<ISelectOption, boolean, IGroupedOptions<ISelectOption>>
    ): ReactElement => {
      const groupHeadingBEM = cn(
        styles['select__group-heading'],
        getBackgroundColorClass(props.data.backgroundColor || optionGroupBackgroundColor || 'transparent')
      );
      const textSettings = props.data.text || optionGroupHeadingText;

      return (
        <ReactSelectComponents.GroupHeading {...props} className={groupHeadingBEM}>
          <Text {...textSettings}>{props.data.label}</Text>
        </ReactSelectComponents.GroupHeading>
      );
    };

    const renderReactSelect = (): JSX.Element => {
      const customComponents: SelectComponentsConfig<ISelectOption, boolean, IGroupedOptions<ISelectOption>> = {
        ClearIndicator: getClearIndicator,
        DropdownIndicator: getDropDownIndicator,
        IndicatorSeparator: () => null,
        MenuPortal: MenuPortal,
        Menu: Menu,
        MenuList: MenuList,
        Option: getOption,
        Control: CustomControl,
        Input: CustomInput,
        MultiValue: getMultiValue,
        MultiValueRemove: getMultiValueRemove,
        Placeholder: getPlaceholder,
        Group: getGroup,
        GroupHeading: getGroupHeading,
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
          menuPosition="fixed"
          menuPlacement="auto"
          inputIsHidden={inputIsHidden}
          required={required}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: '#005aa3',
              danger: '#b50000',
              dangerLight: '#fceeee',
            },
          })}
          // see https://github.com/JedWatson/react-select/issues/4461
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
      styles['select'],
      className,
      { [styles['select--invalid']]: invalid || helper?.type === 'error' },
      { [styles[`select--${size}`]]: size },
      { [styles[`select--tags-${tagsDirection}`]]: tagsDirection },
      { [styles['select--searchable']]: isSearchable }
    );

    return (
      <div data-name="select" {...rest} className={SelectBEM}>
        <div className={styles['select__inner']}>
          <FormLabel id={`${id}-input`} label={label} required={required} hideLabel={hideLabel} />
          {renderReactSelect()}
        </div>
        {helper && <FormHelper {...helper} id={helperId} />}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
