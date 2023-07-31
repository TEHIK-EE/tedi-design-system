import React from 'react';

import { ColProps } from '../../grid';

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
  /**
   * Direction
   */
  direction?: 'row' | 'column';
  /**
   * Possibility to add extra content after label. ExtraContent is not clickable like label
   * Can only be used with ChoiceGroupRadio and Checkbox.
   */
  extraContent?: React.ReactNode;
}
