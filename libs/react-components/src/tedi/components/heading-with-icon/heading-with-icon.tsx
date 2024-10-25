import cn from 'classnames';

import { Icon, IconColor, IconProps } from '../icon/icon';
import { Heading, HeadingProps } from '../typography/heading/heading';
import styles from './heading-with-icon.module.scss';

export interface HeadingWithIconProps extends Omit<HeadingProps, 'color'>, Omit<IconProps, 'color'> {
  /**
   * Heading text
   */
  children: React.ReactNode;
  /**
   * Additional class
   */
  className?: string;
  /**
   * Heading text color
   */
  headingColor?: HeadingProps['color'];
  /**
   * Icon color
   */
  iconColor?: IconColor;
}

export const HeadingWithIcon = (props: HeadingWithIconProps): JSX.Element => {
  const {
    children,
    className,
    element = 'h4',
    name,
    size = 24,
    headingColor = 'primary',
    iconColor = 'primary',
    ...rest
  } = props;

  const headingProps: HeadingProps = {
    children,
    element,
    className: cn(styles['tedi-heading-with-icon'], className),
    color: headingColor,
    ...rest,
  };

  const iconProps: IconProps = { name, color: iconColor, size, ...rest };

  return (
    <Heading {...headingProps}>
      {name && <Icon {...iconProps} />}
      {children}
    </Heading>
  );
};

export default HeadingWithIcon;
