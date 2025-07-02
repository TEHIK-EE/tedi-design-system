import classNames from 'classnames';
import React, { useState } from 'react';

import { FloatingButton } from '../../../../tedi';
import styles from './carousel.module.scss';

export interface CarouselProps {
  /**
   * Number of items visible at once in the carousel viewport.
   * Determines the width of each item and how many are shown side by side.
   */
  itemCountShown: number;
  /**
   * React children elements to be rendered inside the carousel.
   * Typically a list of identical or similar components like cards or items.
   */
  children: React.ReactNode;
  /**
   * Optional class name to apply custom styling to the outermost carousel wrapper.
   */
  className?: string;
}

export const Carousel = (props: CarouselProps): JSX.Element => {
  const { itemCountShown, children, className } = props;
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
    <div className={`${styles['tedi-carousel__wrapper']} ${className ?? ''}`}>
      <FloatingButton
        className={classNames(styles['tedi-carousel__navigation-button'], styles['tedi-carousel__prev'])}
        onClick={handlePrev}
        visualType="secondary"
        disabled={scrollIndex === 0}
        icon="west"
      >
        Prev
      </FloatingButton>

      <div className={styles['tedi-carousel__viewport']}>
        <div className={styles['tedi-carousel__carousel-track']} style={{ transform: translateX }}>
          {items.map((child, index) => (
            <div key={index} className={styles['tedi-carousel__item']} style={{ flex: `0 0 ${100 / itemCountShown}%` }}>
              {child}
            </div>
          ))}
        </div>
      </div>

      <FloatingButton
        className={classNames(styles['tedi-carousel__navigation-button'], styles['tedi-carousel__next'])}
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

export default Carousel;
