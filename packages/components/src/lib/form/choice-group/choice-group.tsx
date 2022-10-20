import cn from 'classnames';
import React from 'react';

import { ColProps, Row } from '../../grid';
import FormHelper, { FormHelperProps } from '../form-helper/form-helper';
import FormLabel, { FormLabelProps } from '../form-label/form-label';
import styles from './choice-group.module.scss';
import Check from './components/check/check';
import FilterItem from './components/filter-item/filter-item';
import Radio from './components/radio/radio';
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
   * Defaults to selector
   */
  type?: 'selector' | 'filter' | 'default';
}

export interface ChoiceGroupItemProps {
  /**
   * ID property
   */
  id: string;
  /**
   * Label text
   */
  label: React.ReactNode;
  /**
   * Value property
   */
  value: string;
  /**
   * hideLabel
   */
  hideLabel?: boolean;
  /**
   * If the option is disabled
   */
  disabled?: boolean;
  /**
   * onChange handler
   */
  onChange?: (checked: boolean) => void;
  /**
   * Item col element props. Use to set width of item.
   */
  colProps?: ColProps;
}

interface IChoiceGroupContext {
  name: string;
  inputType: TChoiceGroupType;
  currentValue: TChoiceGroupValue;
  onChange: (value: string, checked: boolean) => void;
}

export const ChoiceGroupContext = React.createContext<IChoiceGroupContext>({
  name: '',
  inputType: 'radio',
  onChange: () => null,
  currentValue: [],
});

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

  let ChoiceGroupItemElement: typeof Check | typeof Radio | typeof SelectorItem | typeof FilterItem = FilterItem;

  switch (type) {
    case 'default':
      ChoiceGroupItemElement = inputType === 'checkbox' ? Check : Radio;
      break;
    case 'selector':
      ChoiceGroupItemElement = SelectorItem;
      break;
    case 'filter':
      ChoiceGroupItemElement = FilterItem;
      break;
  }

  const FieldSetBEM = cn(
    styles['choice-group'],
    className,
    { [styles['choice-group--invalid']]: helper?.type === 'error' },
    { [styles[`choice-group--${type}`]]: type }
  );

  return (
    <ChoiceGroupContext.Provider value={ContextValue}>
      <fieldset className={FieldSetBEM} id={id} name={name}>
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
