import { autoUpdate, offset, shift, useFloating } from '@floating-ui/react-dom';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { ClosingButton, Heading, Icon } from '../../../../tedi';
import styles from './sheet.module.scss';

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  side?: 'bottom' | 'top';
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  hasActiveActions?: boolean;
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

  if (!shouldRender && !isVisible) return null;

  const handleHeaderClick = () => {
    if (!open && isVisible) {
      setIsSheetOpen(!isSheetOpen);
    }
  };

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
            })}
            onMouseDown={handleHeaderClick}
          >
            <div className={styles['tedi-sheet__handle']} />
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
