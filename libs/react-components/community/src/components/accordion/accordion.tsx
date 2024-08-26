import cn from 'classnames';
import React from 'react';

import { VerticalSpacing, VerticalSpacingSize } from '../../../../tedi/src/components/vertical-spacing';
import styles from './accordion.module.scss';

export interface AccordionProps {
  /**
   * Accordion children
   */
  children?: React.ReactNode;
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Open item's property. Used to control the openItems outside the components.
   * Should be used with onToggle function
   */
  openItem?: string[];
  /**
   * onToggle handler.
   */
  onToggleItem?: (id: string) => void;
  /**
   * The list of IDs items that should be open by default
   * @default []
   */
  defaultOpenItem?: string[];
  /**
   * Vertical spacing between AccordionItems
   * @default 0.5
   */
  gutter?: VerticalSpacingSize;
}

export interface IAccordionContext {
  isOpen: (id: string) => boolean;
  onToggle: (id: string) => void;
}

export const AccordionContext = React.createContext<IAccordionContext>({
  isOpen: () => true,
  onToggle: () => null,
});

export const Accordion = (props: AccordionProps): JSX.Element => {
  const { children, className, openItem, gutter = 0.5, onToggleItem, defaultOpenItem = [], ...rest } = props;
  const openValues = openItem ? openItem : defaultOpenItem;
  const [innerOpenItem, setOpen] = React.useState<string[]>(openValues);

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

  return (
    <AccordionContext.Provider value={{ isOpen, onToggle }}>
      <div data-name="accordion" {...rest} className={cn(styles['accordion'], className)}>
        <VerticalSpacing size={gutter}>{children}</VerticalSpacing>
      </div>
    </AccordionContext.Provider>
  );
};

export default Accordion;
