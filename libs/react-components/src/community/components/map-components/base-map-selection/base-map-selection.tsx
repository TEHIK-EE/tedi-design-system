import classNames from 'classnames';
import { JSX } from 'react';

import styles from './base-map-selection.module.scss';

type BaseMapSelectionType = 'button' | 'historical' | 'selection';

export interface BaseMapSelectionProps {
  /**
   * The title displayed within the component.
   */
  title: string;
  /**
   * The main content of the selection card. Can be any valid React node.
   */
  content: React.ReactNode;
  /**
   * Indicates whether the current item is selected.
   * Used to apply specific visual styles.
   */
  selected?: boolean;
  /**
   * Callback function triggered when the selection is clicked
   * or activated via keyboard (Enter or Space).
   */
  onSelect?: () => void;
  /**
   * The type of the selection, which controls styling.
   * - `'button'`: default interactive selection
   * - `'historical'`: styled for historical context
   * - `'selection'`: styled for multi-selection context
   */
  type: BaseMapSelectionType;
  /**
   * Optional custom class name to apply additional styles.
   */
  className?: string;
  /**
   * Optional HTML `id` attribute to identify the element.
   */
  id?: string;
  /**
   * When `true`, indicates that multiple selections are allowed.
   * Affects the visual style.
   */
  multiple?: boolean;
}

export const BaseMapSelection = (props: BaseMapSelectionProps): JSX.Element => {
  const { title, content, selected, onSelect, type = 'button', className, id, multiple } = props;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.();
    }
  };

  const mapSelectionBEM = classNames(
    styles['tedi-base-map-selection__wrapper'],
    selected && styles['tedi-base-map-selection--selected'],
    type && styles[`tedi-base-map-selection--${type}`],
    multiple && styles['tedi-base-map-selection--multiple'],
    className
  );

  return (
    <div role="button" tabIndex={0} onClick={onSelect} onKeyDown={handleKeyDown} className={mapSelectionBEM} id={id}>
      <div className={styles['tedi-base-map-selection__content']}>{content}</div>
      <div className={styles['tedi-base-map-selection__title']}>{title}</div>
    </div>
  );
};

export default BaseMapSelection;
