import cn from 'classnames';
import React, { JSX } from 'react';

import { HashTrigger } from '../../../../tedi';
import { AccordionContext } from './accordion';
import styles from './accordion.module.scss';
import { AccordionItemContentProps } from './accordion-item-content';
import { AccordionItemHeaderProps } from './accordion-item-header';

export interface AccordionItemProps {
  /**
   * ID of the item
   */
  id: string;
  /**
   * AccordionItemHeader and AccordionItemContent.
   */
  children?:
    | React.ReactElement<AccordionItemContentProps | AccordionItemHeaderProps>
    | React.ReactElement<AccordionItemContentProps | AccordionItemHeaderProps>[]
    | React.ReactNode;
  /**
   * Is the item disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Adds visual styles and correct arias to show the item is selected.
   * @default false
   */
  selected?: boolean;
  className?: string;
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
  const { children, className, id, disabled = false, selected = false, ...rest } = props;
  const { onToggle, isOpen, renderCloseButton } = React.useContext(AccordionContext);

  const BEM = cn(styles['tedi-accordion__item'], className, {
    [styles['tedi-accordion__item--disabled']]: disabled,
    [styles['tedi-accordion__item--open']]: isOpen(id),
  });

  return (
    <AccordionItemContext.Provider value={{ id, disabled }}>
      <HashTrigger
        id={id}
        onMatch={(id) => {
          if (!disabled) {
            onToggle(id);
          }
        }}
      >
        <div data-name="accordion-item" className={BEM} {...rest}>
          {children}
        </div>
      </HashTrigger>
    </AccordionItemContext.Provider>
  );
};

export default AccordionItem;
