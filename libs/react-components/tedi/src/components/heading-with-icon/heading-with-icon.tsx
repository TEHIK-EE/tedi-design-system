import cn from 'classnames';

import { Icon, IconSize } from '../icon/icon';
import { Heading } from '../typography/heading/heading';
import { HeadingModifiers, TextProps } from '../typography/text/text';
import styles from './heading-with-icon.module.scss';

export interface HeadingWithIconProps {
  /**
   * Heading text
   */
  children: React.ReactNode;
  /**
   * Additional className
   */
  className?: string;
  /**
   * Name of material icon
   * https://fonts.google.com/icons
   */
  icon: string;
  /**
   * Size of the icon
   * @default 24
   */
  iconSize?: IconSize;
  /**
   * Semantic heading tag
   * h1-h6 are allowed values
   * @default h4
   */
  element?: Extract<TextProps['element'], HeadingModifiers>;
}

const HeadingWithIcon = (props: HeadingWithIconProps) => {
  const { children, className, icon, iconSize = 24, element = 'h4' } = props;
  const headingWithIconBEM = cn(styles['tedi-heading-with-icon'], className);

  return (
    <Heading element={element} className={headingWithIconBEM}>
      {icon && <Icon name={icon} color="brand" size={iconSize} />}
      {children}
    </Heading>
  );
};

export default HeadingWithIcon;

HeadingWithIcon.displayName = 'HeadingWithIcon';
