import cn from 'classnames';
import React from 'react';

import { FeedbackText, FeedbackTextProps } from '../../../../tedi/components/form/feedback-text/feedback-text';
import FormLabel, { FormLabelProps } from '../../../../tedi/components/form/form-label/form-label';
import { Direction, Gutter, Row, RowProps } from '../../../../tedi/components/grid';
import { useLabels } from '../../../../tedi/providers/label-provider';
import Checkbox, { CheckboxProps } from '../checkbox/checkbox';
import styles from './choice-group.module.scss';
import { ChoiceGroupItemProps } from './choice-group.types';
import { ChoiceGroupContext, IChoiceGroupContext } from './choice-group-context';
import ChoiceGroupItem from './components/choice-group-item/choice-group-item';
import ChoiceGroupOption from './components/choice-group-option/choice-group-option';

export type TChoiceGroupValue = string | string[] | null;
export type TChoiceGroupType = 'radio' | 'checkbox';
export type TChoiceGroupIndeterminateState = 'none' | 'some' | 'all';
export type ChoiceGroupItemVariant = 'default' | 'filter' | 'light' | 'selector';
export type ChoiceGroupItemType = 'radio' | 'checkbox' | 'option';

export interface ChoiceGroupProps extends FormLabelProps {
  id: string;
  items: ChoiceGroupItemProps[];
  direction?: Direction;
  rowProps?: RowProps;
  name: string;
  inputType?: TChoiceGroupType;
  helper?: FeedbackTextProps;
  className?: string;
  defaultValue?: TChoiceGroupValue;
  value?: TChoiceGroupValue;
  onChange?: (value: TChoiceGroupValue) => void;
  type?: ChoiceGroupItemVariant;
  indeterminateCheck?: boolean | string | ((state: TChoiceGroupIndeterminateState) => string);
  indeterminateCheckProps?: { indented?: boolean } & Partial<
    Omit<CheckboxProps, 'indeterminate' | 'checked' | 'onChange' | 'defaultChecked' | 'label'>
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
    direction = type === 'filter' ? 'column' : 'row',
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

  const { ...restIndeterminate } = indeterminateCheckProps;
  const isIndented = indeterminateCheckProps?.indented ?? true;
  const helperId = helper ? helper?.id ?? `${id}-helper` : undefined;
  const showIndeterminate = indeterminateCheck && inputType === 'checkbox';

  const [innerValue, setInnerValue] = React.useState<TChoiceGroupValue>(() => {
    if (defaultValue) return defaultValue;
    return inputType === 'checkbox' ? [] : null;
  });

  const isValueControlled = (value = props.value): value is TChoiceGroupValue =>
    !!onChange && typeof value !== 'undefined';

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
      nextValue = checked
        ? Array.isArray(nextValue)
          ? [...nextValue, value]
          : [value]
        : Array.isArray(nextValue)
        ? nextValue.filter((item) => item !== value)
        : nextValue;
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

  const getGutter = (type: string) => {
    switch (type) {
      case 'default':
        return { gutterX: 2 as Gutter, gutterY: 1 as Gutter };
      case 'selector':
        return { gutterX: 0 as Gutter, gutterY: 0 as Gutter };
      case 'filter':
        return { gutterX: 2 as Gutter, gutterY: 2 as Gutter };
      case 'light':
        return { gutterX: 1 as Gutter, gutterY: 1 as Gutter };
      default:
        return { gutterX: 1 as Gutter, gutterY: 1 as Gutter };
    }
  };

  const { gutterX, gutterY } = getGutter(type);

  const FieldSetBEM = cn(styles['tedi-choice-group'], className);
  const CheckGroupBEM = cn(styles['tedi-choice-group__inner'], rowProps?.className, {
    [styles['tedi-choice-group__inner--indented']]: showIndeterminate && isIndented,
  });

  const onIndeterminateChangeHandler = (): void => {
    const nextValue = !isAllSelected ? items?.filter((item) => !item.disabled)?.map((item) => item.value) : [];

    if (!isValueControlled()) {
      setInnerValue([...nextValue]);
    }

    onChange?.(nextValue);
  };

  return (
    <ChoiceGroupContext.Provider value={ContextValue}>
      <fieldset {...rest} className={FieldSetBEM} id={id} name={name} aria-describedby={helperId}>
        <legend>
          <FormLabel id={id} label={label} required={required} hideLabel={hideLabel} renderWithoutLabel={true} />
        </legend>
        {items?.length ? (
          <>
            {showIndeterminate && (
              <Checkbox
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
              {items.map((item) => {
                const isOption = ['selector', 'filter', 'light'].includes(type);

                return isOption ? (
                  <ChoiceGroupOption key={item.id} {...item} variant={type as 'filter' | 'light' | 'selector'} />
                ) : (
                  <ChoiceGroupItem key={item.id} {...item} variant={type as 'default'} type={inputType} />
                );
              })}
            </Row>
          </>
        ) : (
          <p>{getLabel('table.filter.no-options')}</p>
        )}
        {helper && <FeedbackText {...helper} id={helperId} />}
      </fieldset>
    </ChoiceGroupContext.Provider>
  );
};

ChoiceGroup.Item = ChoiceGroupItem;
export default ChoiceGroup;
