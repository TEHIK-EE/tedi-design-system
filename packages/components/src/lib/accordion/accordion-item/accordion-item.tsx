import cn from 'classnames';
import React from 'react';

import HashTrigger from '../../hash-trigger/hash-trigger';
import { AccordionContext } from '../accordion';
import styles from '../accordion.module.scss';

export interface AccordionItemProps {
  /**
   * ID of the item
   */
  id: string;
  /**
   * Accordion item children
   */
  children?: React.ReactNode;
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Is the item disabled?
   */
  disabled?: boolean;
  /**
   * The element border type attribute specifies the color of accordion item border.
   */
  borderType?: 'primary' | 'secondary';
}

export interface IAccordionItemContext {
  disabled: boolean;
  id: string;
}

export const AccordionItemContext = React.createContext<IAccordionItemContext>({
  id: '',
  disabled: false,
});

export const AccordionItem = (props: AccordionItemProps): JSX.Element => {
  const { children, className, id, disabled = false, borderType = 'secondary' } = props;
  const { onToggle } = React.useContext(AccordionContext);

  const onMatch = (id: string) => {
    if (!disabled) onToggle(id);
  };

  const AccordionItemBEM = cn(styles['accordion__item'], styles[`accordion__item--border-${borderType}`], className, {
    [styles['accordion__item--disabled']]: disabled,
  });

  return (
    <AccordionItemContext.Provider value={{ id, disabled }}>
      <HashTrigger id={id} onMatch={() => onMatch(id)}>
        <div className={AccordionItemBEM} id={id}>
          {children}
        </div>
      </HashTrigger>
    </AccordionItemContext.Provider>
  );
};

export default AccordionItem;
