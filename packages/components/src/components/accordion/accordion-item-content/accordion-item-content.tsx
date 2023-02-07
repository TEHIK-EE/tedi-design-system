import cn from 'classnames';
import React from 'react';
import AnimateHeight from 'react-animate-height';

import { usePrint } from '../../../helpers';
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
  const { children, className, ...rest } = props;
  const { isOpen } = React.useContext(AccordionContext);
  const { id, disabled } = React.useContext(AccordionItemContext);
  const isPrinting = usePrint();

  const content = (
    <div data-name="accordion-item-content" {...rest} className={cn(styles['accordion__item-content'], className)}>
      {children}
    </div>
  );

  return isPrinting && !disabled ? (
    content
  ) : (
    <AnimateHeight duration={300} height={isOpen(id) ? 'auto' : 0}>
      {content}
    </AnimateHeight>
  );
};

export default AccordionItemContent;
