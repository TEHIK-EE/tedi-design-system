import cn from 'classnames';
import React, { JSX } from 'react';

import { Button, Icon } from '../../../../tedi';
import styles from './accordion.module.scss';
import AccordionItem from './accordion-item';

export interface AccordionProps {
  /**
   * Accordion children – typically a list of AccordionItem components.
   */
  children?: React.ReactNode;
  /**
   * Optional custom class name for additional styling.
   */
  className?: string;
  /**
   * Controlled prop to define which item IDs are open.
   * Use in combination with `onToggleItem` to manage state externally.
   */
  openItem?: string[];
  /**
   * Handler called when an accordion item is toggled.
   * Receives the toggled item's ID.
   */
  onToggleItem?: (id: string) => void;
  /**
   * List of item IDs that should be open by default.
   * Used for uncontrolled behavior (default state only).
   * @default []
   */
  defaultOpenItem?: string[];
  /**
   * If `true`, enables expander mode – typically used to show/hide the entire panel.
   */
  expanderMode?: boolean;
  /**
   * Title shown for the expander when `expanderMode` is enabled.
   */
  expanderTitle?: string;
  /**
   * Optional render function for a custom close button per item.
   * Receives the item's ID and returns a ReactNode to render.
   */
  renderCloseButton?: (id: string) => React.ReactNode;
}

export interface IAccordionContext {
  /**
   * Function to check if a given item ID is open.
   */
  isOpen: (id: string) => boolean;
  /**
   * Function to toggle an item open/closed.
   */
  onToggle: (id: string) => void;
  /**
   * Optional render function for a custom close button per item.
   */
  renderCloseButton?: (id: string) => React.ReactNode;
}

export const AccordionContext = React.createContext<IAccordionContext>({
  isOpen: () => true,
  onToggle: () => null,
});

export const Accordion = (props: AccordionProps): JSX.Element => {
  const {
    children,
    className,
    openItem,
    onToggleItem,
    renderCloseButton,
    defaultOpenItem = [],
    expanderMode,
    expanderTitle,
  } = props;
  const openValues = openItem ? openItem : defaultOpenItem;
  const [innerOpenItem, setOpen] = React.useState<string[]>(openValues);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const isOpenItemControlled = (openItem = props.openItem): openItem is string[] => {
    return !!onToggleItem && typeof openItem !== 'undefined';
  };

  const onToggle = (id: string): void => {
    if (onToggleItem) {
      return onToggleItem(id);
    }
    if (!isOpenItemControlled(openItem)) {
      setOpen((prevOpen) => {
        if (prevOpen.includes(id)) {
          return prevOpen.filter((i) => i !== id);
        } else {
          return [...prevOpen, id];
        }
      });
    }
  };

  const getOpenItems = (): string[] => {
    return onToggleItem && typeof openItem !== 'undefined' ? openItem : innerOpenItem;
  };

  const isOpen = (id: string): boolean => {
    return getOpenItems().includes(id);
  };

  const itemCount = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === AccordionItem
  ).length;

  return (
    <AccordionContext.Provider value={{ isOpen, onToggle, renderCloseButton }}>
      <div className={cn(styles['tedi-accordion'], className)}>
        {expanderMode && isCollapsed ? (
          <div className={styles['tedi-accordion__collapsed']}>
            <div className={styles['tedi-accordion__collapsed-header']}>
              {expanderTitle} ({itemCount})
            </div>
          </div>
        ) : (
          children
        )}
        {expanderMode && (
          <Button
            fullWidth
            noStyle
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={styles['tedi-accordion__expander-button']}
          >
            <Icon
              name={expanderMode && isCollapsed ? 'keyboard_double_arrow_down' : 'keyboard_double_arrow_up'}
              color="brand"
            />
          </Button>
        )}
      </div>
    </AccordionContext.Provider>
  );
};

export default Accordion;
