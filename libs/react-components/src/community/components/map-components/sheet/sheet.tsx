import { autoUpdate, offset, shift, useFloating } from '@floating-ui/react-dom';
import classNames from 'classnames';
import { UnknownType } from 'libs/react-components/src/tedi/types/commonTypes';
import { useEffect, useRef, useState } from 'react';

import { ClosingButton, Heading, Icon } from '../../../../tedi';
import styles from './sheet.module.scss';

export interface SheetProps {
  /**
   * Controls whether the sheet is fully open or closed.
   * When true, the sheet expands to its full height/width and becomes interactive.
   * When false, the sheet either closes completely (if isVisible is false) or shows as a peekable element.
   */
  open: boolean;
  /**
   * Callback invoked when the sheet requests to be closed.
   * This occurs when:
   * - User clicks the close button
   * - User clicks the overlay behind the sheet (when open)
   * - Programmatic close is triggered
   */
  onClose: () => void;
  /**
   * Determines which edge of the screen the sheet attaches to.
   *
   * - 'bottom': Sheet slides up from bottom (default)
   * - 'top': Sheet slides down from top
   *
   * Affects both opening animation and final positioning.
   */
  side?: 'bottom' | 'top';
  /**
   * Optional title displayed in the sheet header.
   * Accepts string values that will be rendered as an H6 heading.
   * When combined with isVisible, may include expand/collapse indicators.
   */
  title?: string;
  /**
   * Optional actions displayed in the header, aligned to the end.
   * Typically used for action buttons, menus, or other interactive elements.
   * Renders to the left of the close button in the header area.
   */
  actions?: React.ReactNode;
  /**
   * Main content of the sheet.
   * Rendered between the header and footer areas.
   * Should contain the primary interactive elements of the sheet.
   */
  children: React.ReactNode;
  /**
   * Optional footer content.
   * Rendered at the bottom of the sheet, useful for:
   * - Submit buttons
   * - Secondary actions
   * - Supplemental information
   * - Status indicators
   */
  footer?: React.ReactNode;
  /**
   * Visual indicator for active/destructive actions in the header.
   * When true:
   * - Header background becomes prominent
   * - Text changes to white for better contrast
   * - Close button becomes more visible
   *
   * Useful for marking sheets with destructive or important actions.
   */
  hasActiveActions?: boolean;
  /**
   * Controls the "peek" state of the sheet.
   * When true and open=false:
   * - Shows a minimized version of the sheet (header only by default)
   * - Allows drag-to-open interaction
   * - Displays expand/collapse affordances
   *
   * When false, the sheet either shows fully (open=true) or hides completely.
   */
  isVisible?: boolean;
}

export const Sheet = (props: SheetProps): JSX.Element | null => {
  const {
    open,
    onClose,
    side = 'bottom',
    title = '',
    actions,
    children,
    footer,
    hasActiveActions = false,
    isVisible = false,
  } = props;
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);

  const { x, strategy, update } = useFloating({
    placement: side,
    middleware: [offset(0), shift()],
  });

  useEffect(() => {
    if (!sheetRef.current) return undefined;
    return autoUpdate(sheetRef.current, sheetRef.current, update) || undefined;
  }, [open, update]);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      const timer = setTimeout(() => setIsSheetOpen(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsSheetOpen(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isVisible || open) return;

    setIsDragging(true);
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setStartY(clientY);
    setStartHeight(sheetRef.current?.offsetHeight || 0);
    document.body.style.userSelect = 'none';
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging || !sheetRef.current || open) return;

    const deltaY = startY - e.clientY;
    const newHeight = Math.min(
      window.innerHeight * 0.9,
      Math.max(100, startHeight + (side === 'bottom' ? deltaY : -deltaY))
    );

    sheetRef.current.style.height = `${newHeight}px`;

    if (newHeight > window.innerHeight * 0.3) {
      setIsSheetOpen(true);
      sheetRef.current.style.height = '';
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      document.body.style.userSelect = '';

      if (!isSheetOpen && sheetRef.current) {
        sheetRef.current.style.height = '';
      }
    }
  };

  useEffect(() => {
    if (isVisible) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove as UnknownType);
      window.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove as UnknownType);
      window.removeEventListener('touchend', handleDragEnd);
      document.body.style.userSelect = '';
    };
  }, [isDragging, isVisible, open]);

  const handleHeaderClick = (_e: React.MouseEvent) => {
    if (!open && isVisible && !isDragging) {
      setIsSheetOpen(!isSheetOpen);
    }
  };

  if (!shouldRender && !isVisible) return null;

  return (
    <div
      className={classNames(styles['tedi-sheet-overlay'], {
        [styles['is-visible']]: isSheetOpen,
        [styles['tedi-sheet-overlay--peek']]: isVisible && !open,
      })}
      onClick={open ? onClose : undefined}
    >
      <div
        ref={sheetRef}
        className={classNames(styles['tedi-sheet'], styles[`tedi-sheet--${side}`], {
          [styles['is-visible']]: isSheetOpen,
          [styles['tedi-sheet--peek']]: isVisible && !open,
          [styles['is-dragging']]: isDragging,
        })}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: strategy,
          top: side === 'top' ? 0 : undefined,
          bottom: side === 'bottom' ? 0 : undefined,
          left: x ?? 0,
        }}
      >
        {(title || actions) && (
          <div
            className={classNames(styles['tedi-sheet__header'], {
              [styles['tedi-sheet__header--active']]: hasActiveActions,
              [styles['tedi-sheet__header--peekable']]: isVisible && !open,
            })}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            onClick={handleHeaderClick}
          >
            {isVisible && !open && <div className={styles['tedi-sheet__handle']} />}
            <div className={classNames(styles['tedi-sheet__header-content'])}>
              <Heading
                element="h6"
                color={hasActiveActions ? 'white' : 'primary'}
                className={styles['tedi-sheet__heading']}
              >
                {title} {isVisible && <Icon color="white" name={isSheetOpen ? 'expand_less' : 'expand_more'} />}
              </Heading>
              <div className={styles['tedi-sheet__header-actions']}>
                {actions}
                <ClosingButton
                  size="large"
                  onClick={onClose}
                  className={classNames({ [styles['tedi-sheet__closer--active']]: hasActiveActions })}
                />
              </div>
            </div>
          </div>
        )}
        <div className={styles['tedi-sheet__content']}>{children}</div>
        {footer && <div className={styles['tedi-sheet__footer']}>{footer}</div>}
      </div>
    </div>
  );
};
