import cn from 'classnames';
import React from 'react';

import styles from './section.module.scss';

export interface SectionProps {
  /**
   * Section content
   */
  children?: React.ReactNode;
  /**
   * Additional class names
   */
  className?: string;
  /**
   * Defines the HTML element to render (e.g., section, article, aside, etc.)
   */
  as?: 'section' | 'article' | 'aside' | 'div'; // Add more if needed
  /**
   * ARIA role for accessibility
   */
  role?: string;
  /**
   * Unique identifier for the section
   */
  id?: string;
}

export const Section = (props: SectionProps): JSX.Element => {
  const { children, className, as = 'section', ...rest } = props;
  const SectionBEM = cn(styles['tedi-section'], className);

  const Element = as;

  return (
    <Element data-name="section" {...rest} className={SectionBEM}>
      {children}
    </Element>
  );
};

export default Section;
