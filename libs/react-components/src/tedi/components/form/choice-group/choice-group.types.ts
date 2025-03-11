import { ColProps, Direction } from '../../../../tedi/components/grid';
import { ChoiceInputProps } from '../choice-input.types';

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
}
