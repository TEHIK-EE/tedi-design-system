import { ColProps, Direction } from '../../../../tedi/components/grid';
import { CardBackground } from '../../cards/card/utility';
import { ChoiceInputProps } from '../choice-input.types';

export type ChoiceGroupItemBackground = 'success-primary' | 'danger-primary' | 'warning-primary' | CardBackground;
export type ChoiceGroupItemType = 'radio' | 'checkbox';
export type ChoiceGroupItemVariant = 'default' | 'card';
export type ChoiceGroupItemLayout = 'segmented' | 'separated';
export type ChoiceGroupItemColor = 'primary' | 'secondary';
export type ChoiceGroupIndeterminateState = 'none' | 'some' | 'all';
export type ChoiceGroupValue = string | string[] | null;

export interface ChoiceGroupItemProps extends Omit<ChoiceInputProps, 'name'> {
  /**
   * Item col element props. Use to set width of item.
   */
  colProps?: ColProps;
  /**
   * Direction
   */
  direction?: Direction;
  /**
   * Possibility to change choice group item background when selected. Will be primary if not provided.
   * Can only be used with FilterItem.
   */
  background?: ChoiceGroupItemBackground;
}
