import classNames from 'classnames';
import React, { useState } from 'react';

import { FloatingButton } from '../../../../tedi';
import styles from './slider.module.scss';

interface SliderProps {
  /**
   * Number of items visible at once in the slider viewport.
   * Determines the width of each item and how many are shown side by side.
   */
  itemCountShown: number;
  /**
   * React children elements to be rendered inside the slider.
   * Typically a list of identical or similar components like cards or items.
   */
  children: React.ReactNode;
  /**
   * Optional class name to apply custom styling to the outermost slider wrapper.
   */
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({ itemCountShown, children, className }) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const items = React.Children.toArray(children);
  const totalItems = items.length;

  const handleNext = () => {
    if (scrollIndex + itemCountShown < totalItems) {
      setScrollIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (scrollIndex > 0) {
      setScrollIndex((prev) => prev - 1);
    }
  };

  const translateX = `translateX(-${(100 / itemCountShown) * scrollIndex}%)`;

  return (
    <div className={`${styles['tedi-slider__wrapper']} ${className ?? ''}`}>
      <FloatingButton
        className={classNames(styles['tedi-slider__navigation-button'], styles['tedi-slider__prev'])}
        onClick={handlePrev}
        visualType="secondary"
        disabled={scrollIndex === 0}
        icon="west"
      >
        Prev
      </FloatingButton>

      <div className={styles['tedi-slider__viewport']}>
        <div className={styles['tedi-slider__slider-track']} style={{ transform: translateX }}>
          {items.map((child, index) => (
            <div key={index} className={styles['tedi-slider__item']} style={{ flex: `0 0 ${100 / itemCountShown}%` }}>
              {child}
            </div>
          ))}
        </div>
      </div>

      <FloatingButton
        className={classNames(styles['tedi-slider__navigation-button'], styles['tedi-slider__next'])}
        onClick={handleNext}
        visualType="secondary"
        disabled={scrollIndex + itemCountShown >= totalItems}
        icon="east"
      >
        Next
      </FloatingButton>
    </div>
  );
};

export default Slider;
