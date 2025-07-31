import { JSX, useEffect, useRef, useState } from 'react';

import { Icon } from '../../../../tedi';
import styles from './resizer.module.scss';

interface ResizerProps {
  /**
   * The content to be rendered inside the resizable container.
   */
  children: React.ReactNode;
  /**
   * Minimum allowed width in pixels. Optional.
   */
  minWidth?: number;
  /**
   * Maximum allowed width in pixels. Optional.
   */
  maxWidth?: number;
  /**
   * Initial width of the container in pixels. Optional.
   */
  initialWidth?: number;
  /**
   * Minimum allowed height in pixels. Optional.
   */
  minHeight?: number;
  /**
   * Maximum allowed height in pixels. Optional.
   */
  maxHeight?: number;
  /**
   * Initial height of the container in pixels. Optional.
   */
  initialHeight?: number;
  /**
   * Position of the resize handle. Can be `'right'`, `'left'`, `'top'`, or `'bottom'`.
   * Determines the direction from which resizing is possible.
   */
  handlePosition?: 'right' | 'left' | 'top' | 'bottom';
  /**
   * Optional additional class name(s) for the container.
   */
  className?: string;
  /**
   * Whether to show a visual resize indicator (e.g., drag handle). Optional.
   */
  showIndicator?: boolean;
}

export const Resizer = (props: ResizerProps): JSX.Element => {
  const {
    children,
    minWidth = 300,
    maxWidth = 600,
    initialWidth = 350,
    minHeight = 200,
    maxHeight = 600,
    initialHeight = 350,
    className,
    handlePosition = 'right',
    showIndicator = false,
  } = props;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isResizing = useRef(false);
  const startPosition = useRef<{ x: number; y: number; width: number; height: number }>({
    x: 0,
    y: 0,
    width: initialWidth,
    height: initialHeight,
  });

  const [dimensions, setDimensions] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current || !wrapperRef.current) return;

      e.preventDefault();
      const dx = e.clientX - startPosition.current.x;
      const dy = e.clientY - startPosition.current.y;

      setDimensions((prev) => {
        let newWidth = prev.width;
        let newHeight = prev.height;

        if (handlePosition === 'right') {
          newWidth = Math.min(Math.max(startPosition.current.width + dx, minWidth), maxWidth);
        } else if (handlePosition === 'left') {
          newWidth = Math.min(Math.max(startPosition.current.width - dx, minWidth), maxWidth);
        } else if (handlePosition === 'bottom') {
          newHeight = Math.min(Math.max(startPosition.current.height + dy, minHeight), maxHeight);
        } else if (handlePosition === 'top') {
          newHeight = Math.min(Math.max(startPosition.current.height - dy, minHeight), maxHeight);
        }

        return { width: newWidth, height: newHeight };
      });
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handlePosition, minWidth, maxWidth, minHeight, maxHeight]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.userSelect = 'none';

    startPosition.current = {
      x: e.clientX,
      y: e.clientY,
      width: dimensions.width,
      height: dimensions.height,
    };
  };

  return (
    <div
      ref={wrapperRef}
      className={`${styles['tedi-resize__wrapper']} ${className || ''}`}
      style={{
        width: `${dimensions.width}px`,
        height: handlePosition === 'top' || handlePosition === 'bottom' ? `${dimensions.height}px` : 'auto',
        position: 'relative',
        display: 'block',
      }}
    >
      <div className={styles['tedi-resize__content']}>{children}</div>
      <div
        className={`${styles['tedi-resize__handle-wrapper']} ${styles[`direction-${handlePosition}`]}`}
        onMouseDown={handleMouseDown}
        data-show-indicator={showIndicator}
      >
        <div className={styles['tedi-resize__drag-handle']}>
          <Icon name="drag_handle" size={18} />
        </div>
        {!showIndicator && (
          <div className={styles['tedi-resize__drag-indicator']}>
            <Icon name="drag_handle" color="brand" size={18} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Resizer;
