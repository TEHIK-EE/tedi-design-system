import classNames from 'classnames';
import React, { JSX, useRef, useState } from 'react';

import { Button, Icon } from '../../../../tedi';
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

const Comparison = (props: ComparisonProps): JSX.Element => {
  const { left, right, primary, width, height, position = 'relative', onClose } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderX, setSliderX] = useState(50);

  const handleDrag = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newX = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderX(Math.max(0, Math.min(newX, 100)));
  };

  return (
    <div
      className={classNames(styles['tedi-comparison__wrapper'], styles[`tedi-comparison__wrapper--${position}`])}
      ref={containerRef}
      onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
      onMouseDown={handleDrag}
      style={{
        width: typeof width === 'number' ? `${width}px` : width ?? '100%',
        height: typeof height === 'number' ? `${height}px` : height ?? '100%',
        position,
        overflow: 'hidden',
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
          clipPath: `inset(0 ${100 - sliderX}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - sliderX}% 0 0)`,
        }}
      >
        {left}
      </div>

      <div className={styles['tedi-comparison__drag-indicator']} style={{ left: `${sliderX}%` }}>
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
            Close comparison
          </Button>
        )}
      </div>
    </div>
  );
};

export default Comparison;
