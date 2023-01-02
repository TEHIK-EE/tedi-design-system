import cn from 'classnames';

import styles from './section.module.scss';

export interface SectionProps {
  /**
   * Section content
   */
  children?: React.ReactNode;
}

export const Section = (props: SectionProps): JSX.Element => {
  const { children, ...rest } = props;
  const SectionBEM = cn(styles['section']);

  return (
    <div data-name="section" {...rest} className={SectionBEM}>
      {children}
    </div>
  );
};

export default Section;
