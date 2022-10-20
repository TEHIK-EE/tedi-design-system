import cn from 'classnames';
import React from 'react';
import AnimateHeight from 'react-animate-height';

import { AccordionContext } from '../accordion';
import styles from '../accordion.module.scss';
import { AccordionItemContext } from '../accordion-item/accordion-item';

export interface AccordionItemContentProps {
  /**
   * Contents of the accordion item
   */
  children?: React.ReactNode;
  /**
   * Additional class.
   */
  className?: string;
}

export const AccordionItemContent = (props: AccordionItemContentProps): JSX.Element => {
  const { children, className } = props;
  const { isOpen } = React.useContext(AccordionContext);
  const { id } = React.useContext(AccordionItemContext);

  return (
    <AnimateHeight duration={300} height={isOpen(id) ? 'auto' : 0}>
      <div className={cn(styles['accordion__item-content'], className)}>{children}</div>
    </AnimateHeight>
  );
};

export default AccordionItemContent;
