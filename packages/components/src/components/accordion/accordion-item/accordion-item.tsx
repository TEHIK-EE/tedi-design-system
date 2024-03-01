import cn from 'classnames';
import React from 'react';

import { CardBorderType, CardProps } from '../../card';
import Card from '../../card/card';
import HashTrigger from '../../hash-trigger/hash-trigger';
import { AccordionContext } from '../accordion';
import styles from '../accordion.module.scss';
import { AccordionItemContentProps } from '../accordion-item-content/accordion-item-content';
import { AccordionItemHeaderProps } from '../accordion-item-header/accordion-item-header';

export interface AccordionItemProps extends CardProps {
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
   * The element border type attribute specifies the color of accordion item border.
   * @deprecated use selected or border instead
   */
  borderType?: 'primary' | 'secondary';
  /**
   * Adds visual styles and correct arias to show the item is selected.
   * @default false
   */
  selected?: boolean;
}

export interface IAccordionItemContext {
  disabled: boolean;
  id: string;
  selected: boolean;
}

export const AccordionItemContext = React.createContext<IAccordionItemContext>({
  id: '',
  disabled: false,
  selected: false,
});

export const AccordionItem = (props: AccordionItemProps): JSX.Element => {
  const {
    children,
    className,
    id,
    disabled = false,
    borderType,
    selected = false,
    border = 'border-default',
    ...rest
  } = props;
  const { onToggle, isOpen } = React.useContext(AccordionContext);

  const onMatch = (id: string) => {
    if (!disabled) onToggle(id);
  };

  const BEM = cn(styles['accordion__item'], className, {
    [styles['accordion__item--disabled']]: disabled,
    [styles['accordion__item--open']]: isOpen(id),
  });

  const mappedBorder: CardBorderType = selected || borderType === 'primary' ? 'primary-main' : border; // map deprecated borderType prop to border. TODO remove when borderType prop is removed

  return (
    <AccordionItemContext.Provider value={{ id, disabled, selected }}>
      <HashTrigger id={id} onMatch={() => onMatch(id)}>
        <Card data-name="accordion-item" border={mappedBorder} className={BEM} {...rest}>
          {children}
        </Card>
      </HashTrigger>
    </AccordionItemContext.Provider>
  );
};

export default AccordionItem;
