import { ColProps, Direction } from '../../../../tedi/components/grid';
import { CardBackground } from '../../cards/card/utility';
import { ChoiceInputProps } from '../choice-input.types';

export type ChoiceGroupItemBackground = Extract<CardBackground, 'positive-main' | 'important-main' | 'warning-main'>;

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
  background?: string | undefined;
}
