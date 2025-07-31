import classNames from 'classnames';
import React, { JSX, useRef, useState } from 'react';

import { Button, Icon, isBreakpointBelow, useBreakpoint, useLabels } from '../../../../tedi';
import styles from './comparison.module.scss';

export interface ComparisonProps {
  /**
   * React node rendered on the left side of the comparison view.
   */
  left: React.ReactNode;
  /**
   * React node rendered on the right side of the comparison view.
   */
  right: React.ReactNode;
  /**
   * Which side is treated as the primary content.
   * This may influence styling or overlay behavior.
   * Defaults to 'left' if not specified.
   */
  primary?: 'left' | 'right';
  /**
   * Width of the comparison container.
   * Accepts string (e.g., "100%", "400px") or number (pixels).
   */
  width?: string | number;
  /**
   * Height of the comparison container.
   * Accepts string or number, similar to width.
   */
  height?: string | number;
  /**
   * CSS position property for the container.
   * Determines how the component is positioned in the layout.
   * Defaults to 'relative'.
   */
  position?: 'relative' | 'absolute' | 'fixed' | 'static';
  /**
   * Optional close handler. When provided, a close button is displayed,
   * and the handler is called when the button is clicked.
   */
  onClose?: () => void;
}

export const Comparison = (props: ComparisonProps): JSX.Element => {
  const { left, right, primary, width, height, position = 'relative', onClose } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const currentBreakpoint = useBreakpoint();
  const [sliderPercent, setSliderPercent] = useState(50);
  const isMobile = isBreakpointBelow(currentBreakpoint, 'md');
  const { getLabel } = useLabels();

  const calculateSliderPercent = (x: number, y: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const newPercent = isMobile ? ((y - rect.top) / rect.height) * 100 : ((x - rect.left) / rect.width) * 100;

    setSliderPercent(Math.max(0, Math.min(newPercent, 100)));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    calculateSliderPercent(e.clientX, e.clientY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    calculateSliderPercent(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    calculateSliderPercent(touch.clientX, touch.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    calculateSliderPercent(touch.clientX, touch.clientY);
  };

  const clipPathStyle = isMobile ? `inset(0 0 ${100 - sliderPercent}% 0)` : `inset(0 ${100 - sliderPercent}% 0 0)`;

  return (
    <div
      className={classNames(styles['tedi-comparison__wrapper'], styles[`tedi-comparison__wrapper--${position}`])}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      style={{
        width: typeof width === 'number' ? `${width}px` : width ?? '100%',
        height: typeof height === 'number' ? `${height}px` : height ?? '100%',
        position,
        overflow: 'hidden',
        touchAction: 'none',
      }}
    >
      <div
        className={classNames(styles['tedi-comparison__layer'], {
          [styles['tedi-comparison__primary']]: primary === 'right',
        })}
      >
        {right}
      </div>

      <div
        className={classNames(styles['tedi-comparison__layer'], {
          [styles['tedi-comparison__primary']]: primary === 'left',
        })}
        style={{
          clipPath: clipPathStyle,
          WebkitClipPath: clipPathStyle,
        }}
      >
        {left}
      </div>

      <div
        className={styles['tedi-comparison__drag-indicator']}
        style={{
          left: isMobile ? undefined : `${sliderPercent}%`,
          top: isMobile ? `${sliderPercent}%` : undefined,
        }}
      >
        <div className={styles['tedi-comparison__drag-line']} />
        <div className={styles['tedi-comparison__drag-handle']}>
          <Icon name="code" size={18} className={styles['tedi-comparison__drag-handle__icon']} />
        </div>
        {onClose && (
          <Button
            visualType="secondary"
            className={styles['tedi-comparison__close-button']}
            onClick={onClose}
            icon="close"
          >
            {getLabel('close')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Comparison;
