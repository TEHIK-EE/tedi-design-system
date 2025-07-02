import cn from 'classnames';
import React, { JSX } from 'react';
import AnimateHeight from 'react-animate-height';

import { Card, CardContentProps, usePrint } from '../../../../tedi';
import { MapAccordionContext } from './map-accordion';
import styles from './map-accordion.module.scss';
import { MapAccordionItemContext } from './map-accordion-item';

export type MapAccordionItemContentProps = CardContentProps;

export const MapAccordionItemContent = (props: MapAccordionItemContentProps): JSX.Element => {
  const { children, className, ...rest } = props;
  const { isOpen } = React.useContext(MapAccordionContext);
  const { id, disabled } = React.useContext(MapAccordionItemContext);
  const isPrinting = usePrint();

  const BEM = cn(styles['tedi-map-accordion__item-content'], className);

  const content = (
    <Card borderRadius={false} borderless>
      <Card.Content data-name="map-accordion-item-content" {...rest} className={BEM} padding={0}>
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

export default MapAccordionItemContent;
