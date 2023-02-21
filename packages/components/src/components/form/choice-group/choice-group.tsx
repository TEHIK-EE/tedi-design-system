import cn from 'classnames';
import React from 'react';

import { Row } from '../../grid';
import FormHelper, { FormHelperProps } from '../form-helper/form-helper';
import FormLabel, { FormLabelProps } from '../form-label/form-label';
import styles from './choice-group.module.scss';
import { ChoiceGroupItemProps } from './choice-group.types';
import { ChoiceGroupContext, IChoiceGroupContext } from './choice-group-context';
import ChoiceGroupCheck from './components/choice-group-check/choice-group-check';
import ChoiceGroupRadio from './components/choice-group-radio/choice-group-radio';
import FilterItem from './components/filter-item/filter-item';
import { SelectorItem } from './components/selector-item/selector-item';

export type TChoiceGroupValue = string | string[] | null;
export type TChoiceGroupType = 'radio' | 'checkbox';

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
  type?: 'selector' | 'filter' | 'default';
}

export const ChoiceGroup = (props: ChoiceGroupProps): JSX.Element => {
  const {
    id,
    className,
    label,
    requiredLabel,
    required,
    helper,
    items,
    name,
    inputType = 'radio',
    value,
    defaultValue,
    onChange,
    hideLabel,
    type = 'default',
    ...rest
  } = props;

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

  const onChangeHandler = (value: string, checked: boolean): void => {
    let nextValue = currentValue;

    if (inputType === 'checkbox' && Array.isArray(nextValue)) {
      if (checked) {
        nextValue.push(value);
      } else {
        nextValue = nextValue.filter((item) => item !== value);
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

  let ChoiceGroupItemElement:
    | typeof ChoiceGroupCheck
    | typeof ChoiceGroupRadio
    | typeof SelectorItem
    | typeof FilterItem = FilterItem;

  switch (type) {
    case 'default':
      ChoiceGroupItemElement = inputType === 'checkbox' ? ChoiceGroupCheck : ChoiceGroupRadio;
      break;
    case 'selector':
      ChoiceGroupItemElement = SelectorItem;
      break;
    case 'filter':
      ChoiceGroupItemElement = FilterItem;
      break;
  }

  const FieldSetBEM = cn(styles['choice-group'], className);

  return (
    <ChoiceGroupContext.Provider value={ContextValue}>
      <fieldset data-name="choice-group" {...rest} className={FieldSetBEM} id={id} name={name}>
        <FormLabel id={id} label={label} requiredLabel={requiredLabel} required={required} hideLabel={hideLabel} />
        <Row className={styles['choice-group__inner']} gutter={0}>
          {items.map((item, key) => (
            <ChoiceGroupItemElement {...item} key={key} />
          ))}
        </Row>
        {helper && <FormHelper {...helper} />}
      </fieldset>
    </ChoiceGroupContext.Provider>
  );
};

export default ChoiceGroup;
