import React from 'react';

import { VerticalSpacing } from '../../../../tedi/src/components/vertical-spacing';

export interface VerticalProgressProps {
  /**
   * VerticalProgress children (VerticalProgressItem)
   */
  children: React.ReactNode;
  /**
   * Callback when an item is opened
   */
  onItemOpen: (index: number) => void;
}

export interface IVerticalProgressContext {
  onItemOpen: (index: number) => void;
}

export const VerticalProgressContext = React.createContext<IVerticalProgressContext>({
  onItemOpen: () => null,
});

/**
 * VerticalProgress is meant to be used with multi step Forms. It provides a visual representation of the steps and
 * allows the user to navigate between them. Visually it's recommended to use <b>TableOfContent</b> component next to VerticalProgress to help user navigate  <br />
 * Logic how the user can navigate between items is up to application. For example:<br />
 * - User can freely navigate between items back and forth
 * - User can only navigate to next item when current item is completed and come back to previous items
 *
 * VerticalProgressItems can have 5 states: 'active', 'completed', 'error', 'disabled' and undefined. <br />
 * - active - Currently open item. No edit button is shown
 * - completed - Item is completed. Edit button is shown when isToggable != false
 * - error - Item has error. Edit button is shown when isToggable != false
 * - disabled - Item is disabled, user can't yet move to this step. Edit button is not shown
 * - undefined - Item is not current, completed, no error and not disabled. Edit button is shown when isToggable != false
 *
 * Every verticalProgressItem can have content, means that completed,disabled etc. state can also have cotent under Title
 */
export const VerticalProgress = (props: VerticalProgressProps) => {
  const { children, onItemOpen } = props;

  return (
    <VerticalProgressContext.Provider value={{ onItemOpen }}>
      <VerticalSpacing size={0.5}>{children}</VerticalSpacing>
    </VerticalProgressContext.Provider>
  );
};

export default VerticalProgress;
