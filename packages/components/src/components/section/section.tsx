import cn from 'classnames';

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
}

export const Section = (props: SectionProps): JSX.Element => {
  const { children, className, ...rest } = props;
  const SectionBEM = cn(styles['section'], className);

  return (
    <div data-name="section" {...rest} className={SectionBEM}>
      {children}
    </div>
  );
};

export default Section;
