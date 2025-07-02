import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React, { Children, cloneElement, isValidElement, JSX, ReactNode } from 'react';

import { Button } from '../../../../tedi';
import DirectionItem, { DirectionItemProps } from './direction-item';
import styles from './directions.module.scss';

export type DirectionsProps = {
  /**
   * Children DirectionItem components to render and manage.
   */
  children: ReactNode;
  /**
   * Callback fired when the list of direction items changes
   * (e.g., due to adding, deleting, or reordering items).
   */
  onChange: (items: { id: string; element: ReactNode }[]) => void;
};

export const DirectionsComponent = ({ children, onChange }: DirectionsProps): JSX.Element => {
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [overId, setOverId] = React.useState<string | null>(null);

  // Convert children to items array
  const items = Children.toArray(children)
    .filter((child) => isValidElement(child) && child.type === DirectionItem)
    .map((child) => ({
      id: (child as React.ReactElement<DirectionItemProps>).props.id,
      element: (child as React.ReactElement<DirectionItemProps>).props.children,
    }));

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    setOverId((event.over?.id as string) || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const reordered = arrayMove(items, oldIndex, newIndex);
      onChange(reordered);
    }
  };

  const handleDelete = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    onChange(updated);
  };

  const handleSwap = () => {
    if (items.length === 2) {
      onChange([items[1], items[0]]);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={() => {
        setActiveId(null);
        setOverId(null);
      }}
    >
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <div className={styles['tedi-directions']}>
          <div className={styles['tedi-directions__items']}>
            {Children.map(children, (child) => {
              if (!isValidElement(child) || child.type !== DirectionItem) {
                return child;
              }

              const itemProps = child.props as DirectionItemProps;
              const isOverCurrent = overId === itemProps.id && activeId !== itemProps.id;
              const activeIndex = items.findIndex((i) => i.id === activeId);
              const overIndex = items.findIndex((i) => i.id === overId);
              const showAboveIndicator = isOverCurrent && activeIndex > overIndex;
              const showBelowIndicator = isOverCurrent && activeIndex < overIndex;

              return (
                <div className={styles['tedi-directions__item-wrapper']} key={itemProps.id}>
                  {cloneElement(child as React.ReactElement<DirectionItemProps>, {
                    onDelete: () => handleDelete(itemProps.id),
                    isDragging: activeId === itemProps.id,
                    showAboveIndicator,
                    showBelowIndicator,
                  })}
                </div>
              );
            })}
          </div>
          {items.length === 2 && (
            <div className={styles['tedi-directions__swap-container']}>
              <Button
                visualType="neutral"
                onClick={handleSwap}
                icon="swap_vert"
                aria-label="Vaheta asukohad"
                className={styles['tedi-directions__swap-button']}
              >
                Vaheta asukohad
              </Button>
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
};

DirectionsComponent.displayName = 'Directions';

export const Directions = Object.assign(DirectionsComponent, {
  Item: DirectionItem,
});

export default Directions;
