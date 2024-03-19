import React from 'react';

import { ColorsFunctional } from '../../commonTypes';
import { ColProps, Direction } from '../../grid';

export type ChoiceGroupItemBackground = Extract<ColorsFunctional, 'positive-main' | 'important-main' | 'warning-main'>;

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
  direction?: Direction;
  /**
   * Possibility to add extra content after label. ExtraContent is not clickable like label
   * Can only be used with ChoiceGroupRadio and Checkbox.
   */
  extraContent?: React.ReactNode;
  /**
   * Possibility to change choice group item background when selected. Will be primary if not provided.
   * Can only be used with FilterItem.
   */
  background?: ChoiceGroupItemBackground;
}
