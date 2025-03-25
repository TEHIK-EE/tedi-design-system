import cn from 'classnames';
import React from 'react';

import { FeedbackText, FeedbackTextProps } from '../../../../tedi/components/form/feedback-text/feedback-text';
import FormLabel, { FormLabelProps } from '../../../../tedi/components/form/form-label/form-label';
import { Col, Direction, Row, RowProps } from '../../../../tedi/components/grid';
import { useLabels } from '../../../../tedi/providers/label-provider';
import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import Checkbox, { CheckboxProps } from '../checkbox/checkbox';
import styles from './choice-group.module.scss';
import {
  ChoiceGroupIndeterminateState,
  ChoiceGroupItemColor,
  ChoiceGroupItemLayout,
  ChoiceGroupItemProps,
  ChoiceGroupItemType,
  ChoiceGroupItemVariant,
  ChoiceGroupValue,
} from './choice-group.types';
import { ChoiceGroupContext, IChoiceGroupContext } from './choice-group-context';
import ChoiceGroupItem from './components/choice-group-item/choice-group-item';

type InvalidSegmentedDirection = {
  layout: 'segmented';
  direction?: Exclude<Direction, 'column'>;
};

type ValidDirection = {
  layout?: Exclude<ChoiceGroupItemLayout, 'segmented'>;
  direction?: Direction;
};

type ValidDirectionByColor = {
  primary: {
    direction?: Exclude<Direction, 'column'>;
    color: 'primary';
  };
  secondary: {
    direction?: Direction;
    color: 'secondary';
  };
};

export type ChoiceGroupProps = FormLabelProps &
  (InvalidSegmentedDirection | ValidDirection) &
  (ValidDirectionByColor['primary'] | ValidDirectionByColor['secondary']) & {
    id: string;
    items: ChoiceGroupItemProps[];
    rowProps?: RowProps;
    name: string;
    inputType?: ChoiceGroupItemType;
    helper?: FeedbackTextProps;
    className?: string;
    defaultValue?: ChoiceGroupValue;
    value?: ChoiceGroupValue;
    onChange?: (value: ChoiceGroupValue) => void;
    variant?: ChoiceGroupItemVariant;
    color?: ChoiceGroupItemColor;
    indeterminateCheck?: boolean | string | ((state: ChoiceGroupIndeterminateState) => string);
    indeterminateCheckProps?: { indented?: boolean } & Partial<
      Omit<CheckboxProps, 'indeterminate' | 'checked' | 'onChange' | 'defaultChecked' | 'label'>
    >;
    showIndicator?: boolean;
  };

export const ChoiceGroup = (props: ChoiceGroupProps): React.ReactElement => {
  const { getLabel } = useLabels();
  const currentBreakpoint = useBreakpoint();
  const {
    id,
    className,
    label,
    required,
    helper,
    items,
    variant = 'default',
    direction = variant === 'default' || isBreakpointBelow(currentBreakpoint, 'md') ? 'column' : 'row',
    rowProps,
    name,
    inputType = 'radio',
    value,
    defaultValue,
    onChange,
    hideLabel,
    indeterminateCheck,
    indeterminateCheckProps = {},
    color,
    layout = inputType === 'radio' && variant === 'card' ? 'segmented' : 'separated',
    showIndicator,
    ...rest
  } = props;

  const { ...restIndeterminate } = indeterminateCheckProps;
  const isIndented = indeterminateCheckProps?.indented ?? true;
  const helperId = helper?.id ?? `${id}-helper`;
  const showIndeterminate = indeterminateCheck && inputType === 'checkbox';

  const [innerValue, setInnerValue] = React.useState<ChoiceGroupValue>(() => {
    if (defaultValue) return defaultValue;
    return inputType === 'checkbox' ? [] : null;
  });

  const isValueControlled = (value = props.value): value is ChoiceGroupValue =>
    !!onChange && typeof value !== 'undefined';

  const currentValue: ChoiceGroupValue = isValueControlled(value) ? value : innerValue;

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
        {label && (
          <legend>
            <FormLabel id={id} label={label} required={required} hideLabel={hideLabel} renderWithoutLabel={true} />
          </legend>
        )}
        <Row>
          <Col>
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
                <Row
                  direction={direction}
                  gutterX={direction === 'row' && layout === 'segmented' ? 0 : 2}
                  gutterY={direction === 'row' && layout === 'segmented' ? 0 : 1}
                  gap={
                    variant === 'default'
                      ? isBreakpointBelow(currentBreakpoint, 'md')
                        ? 1
                        : direction === 'row'
                        ? 1
                        : 0
                      : 0
                  }
                  {...rowProps}
                  className={CheckGroupBEM}
                >
                  {items.map((item) => (
                    <ChoiceGroupItem
                      key={item.id}
                      {...item}
                      color={color}
                      variant={variant}
                      type={inputType}
                      isSegmented={layout === 'segmented'}
                      showIndicator={showIndicator}
                      direction={direction}
                    />
                  ))}
                </Row>
              </>
            ) : (
              <p>{getLabel('table.filter.no-options')}</p>
            )}
          </Col>
        </Row>
        {helper && <FeedbackText {...helper} id={helperId} />}
      </fieldset>
    </ChoiceGroupContext.Provider>
  );
};

ChoiceGroup.Item = ChoiceGroupItem;
export default ChoiceGroup;
