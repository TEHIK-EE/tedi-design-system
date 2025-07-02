import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { JSX } from 'react';

import { ClosingButton, Icon, useLabels } from '../../../../tedi';
import styles from './directions.module.scss';

export type DirectionItemProps = {
  /**
   * Unique identifier for the direction item, used by the drag-and-drop system.
   */
  id: string;
  /**
   * Callback triggered when the item's remove (delete) button is clicked.
   */
  onDelete?: () => void;
  /**
   * Children nodes to be rendered inside the item.
   */
  children: React.ReactNode;
  /**
   * Indicates whether the item is currently being dragged.
   */
  isDragging?: boolean;
  /**
   * If true, show a visual indicator above the item during drag operations.
   */
  showAboveIndicator?: boolean;
  /**
   * If true, show a visual indicator below the item during drag operations.
   */
  showBelowIndicator?: boolean;
};

export const DirectionItem = (props: DirectionItemProps): JSX.Element => {
  const { id, children, onDelete, isDragging = false, showAboveIndicator = false, showBelowIndicator = false } = props;
  const { getLabel } = useLabels();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className={`${styles['tedi-directions__item']} ${isDragging ? styles['tedi-directions__item--dragging'] : ''}`}
      style={style}
    >
      <div className={styles['tedi-directions__content']}>
        {showAboveIndicator && <div className={styles['tedi-directions__drop-indicator']} />}
        {children}
        <div className={styles['tedi-directions__drag-icon']} {...attributes} {...listeners}>
          <Icon name="drag_indicator" size={12} background="brand-secondary" />
        </div>
        {showBelowIndicator && <div className={styles['tedi-directions__drop-indicator']} />}
      </div>
      {onDelete && (
        <ClosingButton
          className={styles['tedi-directions__remove']}
          onClick={onDelete}
          aria-label={getLabel('remove')}
        />
      )}
    </div>
  );
};

export default DirectionItem;
