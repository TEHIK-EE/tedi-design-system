import classNames from 'classnames';
import { JSX } from 'react';

import { ClosingButton } from '../../../../tedi';
import MapAccordion from '../map-accordion/map-accordion';
import MapAccordionItem from '../map-accordion/map-accordion-item';
import MapAccordionItemContent from '../map-accordion/map-accordion-item-content';
import MapAccordionItemHeader from '../map-accordion/map-accordion-item-header';
import styles from './right-panel.module.scss';

interface AccordionItemData {
  /**
   * Unique identifier for the accordion item.
   */
  id: string;
  /**
   * Title displayed in the accordion header.
   * Can be a plain string or a custom React node.
   */
  title: string | React.ReactNode;
  /**
   * Content shown when the accordion item is expanded.
   */
  content: React.ReactNode;
}

interface RightPanelProps {
  /**
   * List of accordion items to be displayed in the panel.
   */
  items: AccordionItemData[];
  /**
   * IDs of the accordion items that should be open by default.
   * Can be an empty array or undefined if no items should be open initially.
   */
  defaultOpenItem?: string[];
  /**
   * Optional title for the "expand all/collapse all" control (if rendered).
   */
  expanderTitle?: string;
  /**
   * Whether to render the toggle button for expanding or collapsing all items.
   */
  renderToggleButton?: boolean;
}

const RightPanel = (props: RightPanelProps): JSX.Element => {
  const { items, defaultOpenItem = [], expanderTitle = 'Toimingu aknad', renderToggleButton } = props;
  const isSingleItem = items.length === 1;

  return (
    <div
      className={classNames(styles['tedi-right-panel'], {
        [styles['tedi-right-panel--single']]: isSingleItem,
        [styles['tedi-right-panel--multi']]: !isSingleItem,
      })}
    >
      <MapAccordion
        defaultOpenItem={defaultOpenItem}
        className={styles['tedi-right-panel__accordion']}
        expanderMode
        expanderTitle={expanderTitle}
        renderCloseButton={(id) => (
          <ClosingButton
            className={styles['tedi-right-panel__closer']}
            size={isSingleItem ? 'large' : 'medium'}
            onClick={() => {
              console.log(`Close clicked for item: ${id}`);
            }}
            title="Sulge aken"
          />
        )}
      >
        {items.map(({ id, title, content }) => (
          <MapAccordionItem key={id} id={id}>
            <MapAccordionItemHeader
              className={styles['tedi-right-panel__accordion-header']}
              renderToggleButton={renderToggleButton}
              title={title}
            />
            <MapAccordionItemContent>{content}</MapAccordionItemContent>
          </MapAccordionItem>
        ))}
      </MapAccordion>
    </div>
  );
};

export default RightPanel;
