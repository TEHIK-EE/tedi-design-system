import classNames from 'classnames';
import React, { JSX, useState } from 'react';

import { useLabels } from '../../../../tedi';
import ActionButton from '../action-button/action-button';
import styles from './mini-map.module.scss';

export interface MiniMapProps {
  /**
   * The content to be displayed when the overlay is in the open state.
   * This can be any valid React node, such as a map component, image, or custom UI.
   * The content will automatically fill the container's dimensions when open.
   */
  children: React.ReactNode;
  /**
   * Controls whether the overlay is open (true) or closed (false).
   * When provided, the component becomes controlled and the parent is responsible
   * for managing the open/closed state via onToggle.
   * When undefined, the component manages its own state internally.
   * @default undefined (uncontrolled)
   */
  isOpen?: boolean;
  /**
   * Callback function invoked when the overlay's open state changes.
   * Receives the new state (boolean) as its argument.
   * Required when using controlled mode (isOpen prop).
   */
  onToggle?: (isOpen: boolean) => void;
  /**
   * Custom render function for the closed state.
   * Receives a toggle function as an argument that can be used to open the overlay.
   * When provided, this overrides the default closed state button.
   * @param toggle - Function to call when triggering open action
   * @returns React node to render in closed state
   */
  renderClosedState?: (toggle: () => void) => React.ReactNode;
  /**
   * Custom render function for the open state controls.
   * Receives a toggle function as an argument that can be used to close the overlay.
   * When provided, this overrides the default open state button.
   * Note: The main content (children) will still be rendered automatically.
   * @param toggle - Function to call when triggering close action
   * @returns React node to render as controls in open state
   */
  renderOpenState?: (toggle: () => void) => React.ReactNode;
}

const MiniMap = (props: MiniMapProps): JSX.Element => {
  const { children, isOpen: controlledIsOpen, onToggle, renderClosedState, renderOpenState } = props;
  const { getLabel } = useLabels();
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(true);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  const toggle = () => {
    const newState = !isOpen;
    if (!isControlled) {
      setUncontrolledIsOpen(newState);
    }
    onToggle?.(newState);
  };

  const containerClasses = classNames(
    styles['tedi-mini-map__container'],
    styles[`tedi-mini-map__container--${isOpen ? 'opened' : 'closed'}`]
  );

  const renderContentWrapper = (content: React.ReactNode) => (
    <div className={styles['tedi-mini-map__content-wrapper']}>{content}</div>
  );

  const renderContent = () => {
    if (renderClosedState && !isOpen) {
      return renderContentWrapper(renderClosedState(toggle));
    }

    if (renderOpenState && isOpen) {
      return (
        <>
          {renderContentWrapper(
            <div className={styles['tedi-mini-map__content']} data-state={`${isOpen ? 'opened' : 'closed'}`}>
              {children}
            </div>
          )}
          {renderOpenState(toggle)}
        </>
      );
    }

    return (
      <>
        {isOpen &&
          renderContentWrapper(
            <div className={styles['tedi-mini-map__content']} data-state={`${isOpen ? 'opened' : 'closed'}`}>
              {children}
            </div>
          )}
        <ActionButton
          size="small"
          onClick={toggle}
          icon={isOpen ? 'south_east' : 'north_west'}
          className={styles['tedi-mini-map__button']}
          hideLabel
        >
          {getLabel(isOpen ? 'close' : 'open')}
        </ActionButton>
      </>
    );
  };

  return <div className={containerClasses}>{renderContent()}</div>;
};

export default MiniMap;
