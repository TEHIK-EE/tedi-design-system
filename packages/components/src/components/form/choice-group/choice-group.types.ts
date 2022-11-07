import React from 'react';

import { ColProps } from '../../grid';
import { FormHelperProps } from '../form-helper/form-helper';
import { FormLabelProps } from '../form-label/form-label';
import { TChoiceGroupType, TChoiceGroupValue } from './choice-group';

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
