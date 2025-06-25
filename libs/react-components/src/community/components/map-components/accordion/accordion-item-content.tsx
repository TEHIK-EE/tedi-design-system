import cn from 'classnames';
import React, { JSX } from 'react';
import AnimateHeight from 'react-animate-height';

import { Card, CardContentProps, usePrint } from '../../../../tedi';
import { AccordionContext } from './accordion';
import styles from './accordion.module.scss';
import { AccordionItemContext } from './accordion-item';

export type AccordionItemContentProps = CardContentProps;

export const AccordionItemContent = (props: AccordionItemContentProps): JSX.Element => {
  const { children, className, ...rest } = props;
  const { isOpen } = React.useContext(AccordionContext);
  const { id, disabled } = React.useContext(AccordionItemContext);
  const isPrinting = usePrint();

  const BEM = cn(styles['tedi-accordion__item-content'], className);

  const content = (
    <Card borderRadius={false} borderless>
      <Card.Content data-name="accordion-item-content" {...rest} className={BEM} padding={0}>
        {children}
      </Card.Content>
    </Card>
  );

  return isPrinting && !disabled ? (
    content
  ) : (
    <AnimateHeight
      duration={300}
      height={isOpen(id) ? 'auto' : 0}
      role="region"
      aria-labelledby={id}
      id={`${id}-content`}
    >
      {content}
    </AnimateHeight>
  );
};

export default AccordionItemContent;
