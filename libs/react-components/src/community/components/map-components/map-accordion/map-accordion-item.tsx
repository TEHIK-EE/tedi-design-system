import cn from 'classnames';
import React, { JSX } from 'react';

import { HashTrigger } from '../../../../tedi';
import { MapAccordionContext } from './map-accordion';
import styles from './map-accordion.module.scss';
import { MapAccordionItemContentProps } from './map-accordion-item-content';
import { MapAccordionItemHeaderProps } from './map-accordion-item-header';

export interface MapAccordionItemProps {
  /**
   * ID of the item
   */
  id: string;
  /**
   * AccordionItemHeader and AccordionItemContent.
   */
  children?:
    | React.ReactElement<MapAccordionItemContentProps | MapAccordionItemHeaderProps>
    | React.ReactElement<MapAccordionItemContentProps | MapAccordionItemHeaderProps>[]
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

export const MapAccordionItemContext = React.createContext<IAccordionItemContext>({
  id: '',
  disabled: false,
});

export const MapAccordionItem = (props: MapAccordionItemProps): JSX.Element => {
  const { children, className, id, disabled = false, ...rest } = props;
  const { onToggle, isOpen } = React.useContext(MapAccordionContext);

  const BEM = cn(styles['tedi-map-accordion__item'], className, {
    [styles['tedi-map-accordion__item--disabled']]: disabled,
    [styles['tedi-map-accordion__item--open']]: isOpen(id),
  });

  return (
    <MapAccordionItemContext.Provider value={{ id, disabled }}>
      <HashTrigger
        id={id}
        onMatch={(id) => {
          if (!disabled) {
            onToggle(id);
          }
        }}
      >
        <div data-name="map-accordion-item" className={BEM} {...rest}>
          {children}
        </div>
      </HashTrigger>
    </MapAccordionItemContext.Provider>
  );
};

export default MapAccordionItem;
