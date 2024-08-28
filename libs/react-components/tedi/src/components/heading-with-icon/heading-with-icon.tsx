import cn from 'classnames';

import { Icon, IconProps } from '../icon/icon';
import { Heading, HeadingProps } from '../typography/heading/heading';
import styles from './heading-with-icon.module.scss';

export interface HeadingWithIconProps extends HeadingProps, Pick<IconProps, 'name' | 'size'> {
  /**
   * Heading text
   */
  children: React.ReactNode;
  /**
   * Additional class
   */
  className?: string;
}

const HeadingWithIcon = (props: HeadingWithIconProps) => {
  const { children, className, element = 'h4', name, size = 24 } = props;
  const headingWithIconBEM = cn(styles['tedi-heading-with-icon'], className);

  return (
    <Heading element={element} className={headingWithIconBEM}>
      {name && <Icon name={name} color="brand" size={size} />}
      {children}
    </Heading>
  );
};

export default HeadingWithIcon;
