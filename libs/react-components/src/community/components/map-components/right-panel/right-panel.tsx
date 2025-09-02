import classNames from 'classnames';
import React, { JSX } from 'react';

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

  /**
   * Optional custom close button renderer (receives the item's id).
   * If omitted and `showCloseButton` is true, a default close button is used.
   * If `showCloseButton` is false, this prop is ignored.
   */
  renderCloseButton?: (id: string) => React.ReactNode;

  /**
   * Show or hide the close button per item.
   * If false, no close button is rendered.
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Side-effect hook invoked after an item is removed (closed).
   * Useful to notify backend or update global state.
   */
  onCloseItem?: (id: string) => void;
}

type DefaultCloseButtonProps = { id: string; isSingleItem: boolean; onClose: (id: string) => void };

export const DefaultCloseButton = ({ id, isSingleItem, onClose }: DefaultCloseButtonProps): JSX.Element => (
  <ClosingButton
    className={styles['tedi-right-panel__closer']}
    size={isSingleItem ? 'large' : 'medium'}
    onClick={() => onClose(id)}
    title="Sulge aken"
  />
);
DefaultCloseButton.displayName = 'DefaultCloseButton';

const createDefaultRenderCloseButton = (isSingleItem: boolean, onClose: (id: string) => void) => {
  const RightPanelDefaultRenderCloseButton = (id: string) => (
    <DefaultCloseButton id={id} isSingleItem={isSingleItem} onClose={onClose} />
  );
  RightPanelDefaultRenderCloseButton.displayName = 'RightPanelDefaultRenderCloseButton';
  return RightPanelDefaultRenderCloseButton;
};

export const RightPanel = (props: RightPanelProps): JSX.Element => {
  const {
    items,
    defaultOpenItem = [],
    expanderTitle = 'Toimingu aknad',
    renderToggleButton,
    renderCloseButton,
    showCloseButton = true,
    onCloseItem,
  } = props;

  // track which items were dismissed (removed) locally
  const [dismissedIds, setDismissedIds] = React.useState<Set<string>>(new Set());

  // prune dismissed ids if parent no longer supplies those items (keeps state tidy)
  React.useEffect(() => {
    setDismissedIds((prev) => {
      const next = new Set<string>();
      const currentIds = new Set(items.map((i) => i.id));
      prev.forEach((id) => {
        if (currentIds.has(id)) next.add(id);
      });
      return next;
    });
  }, [items]);

  // compute visible items by filtering out dismissed ones
  const visibleItems = React.useMemo(() => items.filter(({ id }) => !dismissedIds.has(id)), [items, dismissedIds]);

  // central close handler — removes item locally and notifies parent
  const handleClose = (id: string) => {
    setDismissedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    onCloseItem?.(id);
  };

  // decide which close renderer to pass into MapAccordion
  // If showCloseButton=false -> undefined (no close button rendered at all)
  const isSingleItem = visibleItems.length === 1;
  const effectiveRenderCloseButton = showCloseButton
    ? renderCloseButton ?? createDefaultRenderCloseButton(isSingleItem, handleClose)
    : undefined;

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
        renderCloseButton={effectiveRenderCloseButton}
      >
        {visibleItems.map(({ id, title, content }) => (
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
