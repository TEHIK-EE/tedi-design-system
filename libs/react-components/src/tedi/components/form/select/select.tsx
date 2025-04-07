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
  LoadingIndicatorProps,
  MenuListProps,
  MenuProps,
  MultiValueProps,
  MultiValueRemoveProps,
  OnChangeValue,
  OptionProps,
  OptionsOrGroups,
  SelectComponentsConfig,
  SelectInstance,
} from 'react-select';
import AsyncSelect from 'react-select/async';
import { MenuPortalProps } from 'react-select/dist/declarations/src/components/Menu';

import { FeedbackText, FeedbackTextProps } from '../../../../tedi/components/form/feedback-text/feedback-text';
import { FormLabel, FormLabelProps } from '../../../../tedi/components/form/form-label/form-label';
import { useLabels } from '../../../../tedi/providers/label-provider';
import { UnknownType } from '../../../types/commonTypes';
import ClosingButton from '../../buttons/closing-button/closing-button';
import { Icon } from '../../icon/icon';
import Separator from '../../separator/separator';
import { Spinner } from '../../spinner/spinner';
import { Tag } from '../../tag/tag';
import { Text, TextProps } from '../../typography/text/text';
import Checkbox from '../checkbox/checkbox';
import Radio from '../radio/radio';
import styles from './select.module.scss';

declare module 'react-select/dist/declarations/src/Select' {
  export interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    inputIsHidden?: boolean;
  }
}

const CustomControl = (props: ControlProps<ISelectOption, boolean>): JSX.Element => {
  const CustomControlBEM = cn(styles['tedi-select__control'], props.className, {
    [styles['tedi-select__control--focused']]: props.isFocused,
  });

  return <ReactSelectComponents.Control {...props} className={CustomControlBEM} />;
};

const CustomInput = (props: InputProps<ISelectOption, boolean>): JSX.Element => (
  <ReactSelectComponents.Input
    {...props}
    className={cn(props.className, styles['tedi-select__input'])}
    isHidden={props.selectProps.inputIsHidden !== undefined ? props.selectProps.inputIsHidden : props.isHidden}
    aria-required={props.selectProps.required}
    required={props.selectProps.required}
  />
);

const Menu = (props: MenuProps<ISelectOption, boolean>): JSX.Element => (
  <ReactSelectComponents.Menu {...props} className={cn(props.className, styles['tedi-select__menu'])} />
);

const MenuPortal = (props: MenuPortalProps<ISelectOption, boolean, IGroupedOptions<ISelectOption>>): JSX.Element => (
  <ReactSelectComponents.MenuPortal {...props} className={cn(props.className, styles['tedi-select__menu-portal'])} />
);

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

      if (!blurInputOnSelect && element.current) {
        setTimeout(() => element.current?.inputRef?.focus(), 0);
      }
    };

    const getDropDownIndicator = (): JSX.Element => (
      <Icon name={iconName} size={24} color="secondary" className={styles['tedi-select__arrow']} />
    );

    const MenuList = React.useCallback(
      (props: MenuListProps<ISelectOption, boolean>) => (
        <div className={styles['tedi-select__menu-list-wrapper']}>
          <ReactSelectComponents.MenuList {...props} className={cn(props.className, styles['tedi-select__menu-list'])}>
            {props.children}
          </ReactSelectComponents.MenuList>
          {renderMessageListFooter && (
            <div className={styles['tedi-select__menu-list-footer']}>{renderMessageListFooter(props)}</div>
          )}
        </div>
      ),
      [renderMessageListFooter]
    );

    const getMultiOption = (props: OptionProps<ISelectOption, boolean>): JSX.Element => {
      const OptionBEM = cn(
        styles['tedi-select__option'],
        { [styles['tedi-select__option--disabled']]: props.isDisabled },
        { [styles['tedi-select__option--focused']]: props.isFocused }
      );

      const { tabIndex, ...innerProps } = props.innerProps;

      return (
        <ReactSelectComponents.Option
          {...props}
          innerProps={{ ...innerProps, role: 'option', 'aria-selected': props.isSelected }}
          className={OptionBEM}
          tab-index={tabIndex}
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

    const getSingleOption = (props: OptionProps<ISelectOption, boolean>): JSX.Element => {
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
                onChange={(value, checked) => null}
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

    const getOption = (props: OptionProps<ISelectOption, boolean>): JSX.Element => {
      return multiple
        ? getMultiOption(props)
        : getSingleOption({ ...props, innerProps: { ...props.innerProps, tabIndex: 0 } });
    };

    const getMultiValue = ({ children, removeProps }: MultiValueProps<ISelectOption>): JSX.Element => {
      const handleClose: React.MouseEventHandler<HTMLButtonElement> & React.KeyboardEventHandler<HTMLButtonElement> = (
        event
      ) => {
        if (event.type === 'click' && removeProps.onClick) {
          removeProps.onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
        }

        if (event.type === 'keydown') {
          const keyboardEvent = event as React.KeyboardEvent<HTMLButtonElement>;
          if ((keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') && removeProps.onClick) {
            keyboardEvent.preventDefault();
            keyboardEvent.stopPropagation();
            removeProps.onClick(keyboardEvent as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }
      };

      return (
        <div onMouseDown={(event) => event.stopPropagation()}>
          <Tag color="primary" onClose={isTagRemovable ? handleClose : undefined}>
            {children}
          </Tag>
        </div>
      );
    };

    const getMultiValueRemove = ({ data, innerProps }: MultiValueRemoveProps<ISelectOption>): JSX.Element => {
      const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        if (innerProps.onClick) {
          innerProps.onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
        }
      };

      const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleClick(event as unknown as React.MouseEvent<HTMLButtonElement>);
        }
      };

      return (
        <>
          <ClosingButton
            onMouseDown={(event) => event.stopPropagation()}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={styles['tedi-select__multi-value-clear']}
            title={getLabel('clear')}
          />
          <Separator color="primary" axis="vertical" className={styles['tedi-select__separator']} />
        </>
      );
    };

    const getClearIndicator = ({ innerProps: { ref, ...restInnerProps } }: ClearIndicatorProps<ISelectOption>) => {
      return isClearIndicatorVisible ? (
        <>
          <ClosingButton tabIndex={0} ref={ref as UnknownType} {...(restInnerProps as UnknownType)}>
            {getLabel('clear')}
          </ClosingButton>
          <Separator color="primary" axis="vertical" className={styles['tedi-select__separator']} />
        </>
      ) : null;
    };

    const getGroup = (props: GroupProps<ISelectOption, boolean, IGroupedOptions<ISelectOption>>): JSX.Element => {
      return (
        <ReactSelectComponents.Group {...props} className={cn(styles['tedi-select__group'])}>
          {props.children}
        </ReactSelectComponents.Group>
      );
    };

    const getGroupHeading = (
      props: GroupHeadingProps<ISelectOption, boolean, IGroupedOptions<ISelectOption>>
    ): ReactElement => {
      const textSettings = props.data.text || optionGroupHeadingText;

      return (
        <ReactSelectComponents.GroupHeading {...props} className={cn(styles['tedi-select__group-heading'])}>
          <Text {...textSettings}>{props.data.label}</Text>
        </ReactSelectComponents.GroupHeading>
      );
    };

    const CustomValueContainer = ({ children, ...props }: UnknownType): JSX.Element => {
      return (
        <ReactSelectComponents.ValueContainer
          {...props}
          className={cn(styles['tedi-select__value-container'], props.className)}
        >
          {children}
        </ReactSelectComponents.ValueContainer>
      );
    };

    const CustomIndicatorsContainer = ({ children, ...props }: UnknownType): JSX.Element => {
      return (
        <ReactSelectComponents.IndicatorsContainer
          {...props}
          className={cn(styles['tedi-select__indicators-container'], props.className)}
        >
          {children}
        </ReactSelectComponents.IndicatorsContainer>
      );
    };

    const CustomLoadingIndicator = (props: LoadingIndicatorProps<UnknownType, boolean>) => {
      return (
        <div className={styles['tedi-select__loading-indicator']} {...props.innerProps}>
          <Spinner />
          <Separator color="primary" axis="vertical" className={styles['tedi-select__separator']} />
        </div>
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
        Group: getGroup,
        GroupHeading: getGroupHeading,
        IndicatorsContainer: CustomIndicatorsContainer,
        ValueContainer: CustomValueContainer,
        LoadingIndicator: CustomLoadingIndicator,
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
            props.classNames
              ? Object.fromEntries(
                  Object.entries(props.classNames).map(([key, value]) => [
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
      <div data-name="select" {...rest} className={SelectBEM}>
        <div className={styles['tedi-select__inner']}>
          <FormLabel id={`${id}-input`} label={label} required={required} hideLabel={hideLabel} size={size} />
          {renderReactSelect()}
        </div>
        {helper && <FeedbackText {...helper} id={helperId} />}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
