import cn from 'classnames';

import styles from './section.module.scss';

export interface SectionProps {
  /**
   * Section content
   */
  children?: React.ReactNode;
}

export const Section = (props: SectionProps): JSX.Element => {
  const { children } = props;
  const SectionBEM = cn(styles['section']);

  return <div className={SectionBEM}>{children}</div>;
};

export default Section;
