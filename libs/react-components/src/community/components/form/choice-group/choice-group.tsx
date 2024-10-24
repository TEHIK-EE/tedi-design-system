import cn from 'classnames';
import React from 'react';

import FormLabel, { FormLabelProps } from '../../../../tedi/components/form/form-label/form-label';
import { Direction, Gutter, Row, RowProps } from '../../../../tedi/components/grid';
import { useLabels } from '../../../../tedi/providers/label-provider';
import Check, { CheckProps } from '../check/check';
import FormHelper, { FormHelperProps } from '../form-helper/form-helper';
import styles from './choice-group.module.scss';
import { ChoiceGroupItemProps } from './choice-group.types';
import { ChoiceGroupContext, IChoiceGroupContext } from './choice-group-context';
import ChoiceGroupCheck from './components/choice-group-check/choice-group-check';
import ChoiceGroupRadio from './components/choice-group-radio/choice-group-radio';
import FilterItem from './components/filter-item/filter-item';
import LightItem from './components/light-item/light-item';
import { SelectorItem } from './components/selector-item/selector-item';

export type TChoiceGroupValue = string | string[] | null;
export type TChoiceGroupType = 'radio' | 'checkbox';
export type TChoiceGroupIndeterminateState = 'none' | 'some' | 'all';

export interface ChoiceGroupProps extends FormLabelProps {
  /**
   * ID of choice-group.
   */
  id: string;
  /**
   * Item props array
   */
  items: ChoiceGroupItemProps[];
  /**
   *  Direction for Row containing Items
   *  @default column for type default / row for anything else
   *  @deprecated use rowProps
   */
  direction?: Direction;
  /**
   * Row props
   */
  rowProps?: RowProps;
  /**
   * Name property on inputs
   */
  name: string;
  /**
   * Input type
   * @default radio
   */
  inputType?: TChoiceGroupType;
  /**
   * Form helper props
   */
  helper?: FormHelperProps;
  /**
   * Custom class
   */
  className?: string;
  /**
   * Default value of ChoiceGroup. Won't work with value and onChange.
   */
  defaultValue?: TChoiceGroupValue;
  /**
   * The value of ChoiceGroup. Use to control value outside of component. Should use with onChange prop.
   */
  value?: TChoiceGroupValue;
  /**
   * onChange handler
   */
  onChange?: (value: TChoiceGroupValue) => void;
  /**
   * Type of ChoiceGroup
   * @default default
   */
  type?: 'light' | 'selector' | 'filter' | 'default';
  /**
   * Value can be one of two options:<br />
   * `true` - Uses default internal label.<br />
   * `string` - Label for the indeterminate checkbox.<br />
   * `function` - Function that can be used for conditional label.<br />
   * If omitted then the indeterminate checkbox isn't rendered.
   * Only works with `inputType="checkbox"` and `type="default"`
   */
  indeterminateCheck?: boolean | string | ((state: TChoiceGroupIndeterminateState) => string);
  /**
   * Overridable Indeterminate Check props.
   * Applies only when `indeterminateCheckLabel` is used
   * @default { indented: true }
   */
  indeterminateCheckProps?: { indented?: boolean } & Partial<
    Omit<CheckProps, 'indeterminate' | 'checked' | 'onChange' | 'defaultChecked' | 'label'>
  >;
}

export const ChoiceGroup = (props: ChoiceGroupProps): React.ReactElement => {
  const { getLabel } = useLabels();
  const {
    id,
    className,
    label,
    required,
    helper,
    items,
    type = 'default',
    direction = type === 'default' ? 'column' : 'row',
    rowProps,
    name,
    inputType = 'radio',
    value,
    defaultValue,
    onChange,
    hideLabel,
    indeterminateCheck,
    indeterminateCheckProps = {},
    ...rest
  } = props;
  const { indented, ...restIndeterminate } = indeterminateCheckProps;
  const isIndented = indeterminateCheckProps?.indented ?? true;
  const helperId = helper ? helper?.id ?? `${id}-helper` : undefined;
  const showIndeterminate = indeterminateCheck && type === 'default' && inputType === 'checkbox';

  const [innerValue, setInnerValue] = React.useState<TChoiceGroupValue>(() => {
    if (defaultValue) {
      return defaultValue;
    } else if (inputType === 'checkbox') {
      return [];
    } else {
      return null;
    }
  });

  const isValueControlled = (value = props.value): value is TChoiceGroupValue => {
    return !!onChange && typeof value !== 'undefined';
  };

  const currentValue: TChoiceGroupValue = isValueControlled(value) ? value : innerValue;

  const isNoneSelected = React.useMemo(() => currentValue?.length === 0, [currentValue?.length]);
  const isAllSelected = React.useMemo(
    () => currentValue?.length === items?.filter((item) => !item.disabled)?.length,
    [currentValue?.length, items]
  );
  const isSomeSelected = React.useMemo(() => !isNoneSelected && !isAllSelected, [isAllSelected, isNoneSelected]);

  const getIndeterminateLabel = React.useMemo(() => {
    const state = isAllSelected ? 'all' : isNoneSelected ? 'none' : 'some';

    return typeof indeterminateCheck === 'string'
      ? indeterminateCheck
      : typeof indeterminateCheck === 'function'
      ? indeterminateCheck(state)
      : indeterminateCheck
      ? state === 'all'
        ? getLabel('table.filter.remove-all')
        : getLabel('table.filter.select-all')
      : '';
  }, [getLabel, indeterminateCheck, isAllSelected, isNoneSelected]);

  const onChangeHandler = (value: string, checked: boolean): void => {
    let nextValue = currentValue;

    if (inputType === 'checkbox' && nextValue) {
      if (Array.isArray(nextValue)) {
        nextValue = checked ? [...nextValue, value] : nextValue.filter((item) => item !== value);
      } else {
        // When input="radio" and a selection has been made and then inputType is dynamically changed to 'checkbox',
        // then the nextValue needs to be placed back into array to get checkbox functionality back
        nextValue = checked ? [nextValue, value] : [nextValue].filter((item) => item !== value);
      }
    } else {
      nextValue = value;
    }

    if (!isValueControlled()) {
      setInnerValue(Array.isArray(nextValue) ? [...nextValue] : nextValue);
    }

    onChange?.(nextValue);
  };

  const ContextValue: IChoiceGroupContext = {
    name,
    inputType,
    onChange: onChangeHandler,
    currentValue: currentValue,
  };

  let gutterX: Gutter;
  let gutterY: Gutter;

  let ChoiceGroupItemElement:
    | typeof ChoiceGroupCheck
    | typeof ChoiceGroupRadio
    | typeof SelectorItem
    | typeof FilterItem
    | typeof LightItem = LightItem;

  switch (type) {
    case 'default':
      gutterX = 2;
      gutterY = 1;
      ChoiceGroupItemElement = inputType === 'checkbox' ? ChoiceGroupCheck : ChoiceGroupRadio;
      break;
    case 'selector':
      gutterX = 0;
      gutterY = 0;
      ChoiceGroupItemElement = SelectorItem;
      break;
    case 'filter':
      gutterX = 2;
      gutterY = 2;
      ChoiceGroupItemElement = FilterItem;
      break;
    case 'light':
      gutterX = 1;
      gutterY = 1;
      ChoiceGroupItemElement = LightItem;
      break;
  }

  const FieldSetBEM = cn(styles['choice-group'], className);
  const CheckGroupBEM = cn(styles['choice-group__inner'], rowProps?.className, {
    [styles['choice-group__inner--indented']]: showIndeterminate && isIndented,
  });

  const onIndeterminateChangeHandler = (value: string, checked: boolean): void => {
    const nextValue = !isAllSelected ? items?.filter((item) => !item.disabled)?.map((item) => item.value) : [];

    if (!isValueControlled()) {
      setInnerValue([...nextValue]);
    }

    onChange?.(nextValue);
  };

  return (
    <ChoiceGroupContext.Provider value={ContextValue}>
      <fieldset
        data-name="choice-group"
        {...rest}
        className={FieldSetBEM}
        id={id}
        name={name}
        aria-describedby={helperId}
      >
        <legend>
          <FormLabel id={id} label={label} required={required} hideLabel={hideLabel} renderWithoutLabel={true} />
        </legend>
        {items?.length ? (
          <>
            {showIndeterminate && (
              <Check
                id={`${id}-indeterminate`}
                value="indeterminate"
                name="indeterminate"
                {...restIndeterminate}
                label={getIndeterminateLabel}
                indeterminate={isSomeSelected}
                checked={isAllSelected}
                onChange={onIndeterminateChangeHandler}
              />
            )}
            <Row direction={direction} gutterX={gutterX} gutterY={gutterY} {...rowProps} className={CheckGroupBEM}>
              {items.map((item, key) => (
                <ChoiceGroupItemElement
                  {...item}
                  className={cn(item.className, {
                    [styles['choice-group__item--extra-padding']]: item.extraContent && key !== items.length - 1,
                  })}
                  direction={direction}
                  key={item.id}
                />
              ))}
            </Row>
          </>
        ) : (
          <p>{getLabel('table.filter.no-options')}</p>
        )}
        {helper && <FormHelper {...helper} id={helperId} />}
      </fieldset>
    </ChoiceGroupContext.Provider>
  );
};

export default ChoiceGroup;
