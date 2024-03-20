import React from 'react';

import { TooltipProps, TooltipProviderProps, TooltipTriggerProps } from '../tooltip';

export interface ChoiceInputProps {
  /**
   * ID property
   */
  id: string;
  /**
   * Label text
   */
  label: React.ReactNode;
  /**
   * Additional classes.
   */
  className?: string;
  /**
   * Value property
   */
  value: string;
  /**
   * name of the input
   */
  name: string;
  /**
   * is the label hidden
   */
  hideLabel?: boolean;
  /**
   * If the option is disabled
   */
  disabled?: boolean;
  /**
   * onChange handler
   */
  onChange?: (value: string, checked: boolean) => void;
  /**
   * Possibility to add extra content after label. ExtraContent is not clickable like label
   * Can only be used with ChoiceGroupRadio and Checkbox.
   */
  extraContent?: React.ReactNode;
  /**
   * If the check is controlled from outside the components
   */
  checked?: boolean;
  /**
   * If the check is checked by default
   */
  defaultChecked?: boolean;
  /**
   * If the item should be in hover state
   */
  hover?: boolean;
  /**
   * Provide content for tooltip.
   */
  tooltip?: React.ReactNode;
}
