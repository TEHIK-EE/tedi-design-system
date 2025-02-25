import React from 'react';

import { FeedbackTextProps } from './feedback-text/feedback-text';

export interface ChoiceInputProps {
  /**
   * ID property
   */
  id: string;
  /**
   * Label text
   */
  label: string;
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
   * Helper text displayed below the input.
   */
  helper?: FeedbackTextProps;
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
  /**
   *  Input size
   */
  size?: 'default' | 'large';
  /**
   * Whether the input is marked as invalid.
   */
  invalid?: boolean;
}
