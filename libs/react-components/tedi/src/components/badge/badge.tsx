import cn from 'classnames';

import { BreakpointSupport, useBreakpointProps } from '../../helpers';
import { Icon, IconColor } from '../icon/icon';
import styles from './badge.module.scss';

export type BadgeColor = 'default' | 'primary' | 'accent' | 'success' | 'danger' | 'warning' | 'transparent';
export type BadgeVariant = 'filled' | 'filled-bordered' | 'bordered';
export type BadgeSize = 'default' | 'large';
export type BadgeStatus = 'danger' | 'success' | 'warning' | 'inactive';

type BadgePropsBreakpointProps = {
  /**
   * Specifies the color scheme of the Badge.
   * @default default
   */
  color?: BadgeColor;
  /**
   * Determines the style or visual type of the Badge.
   * @default filled
   */
  variant?: BadgeVariant;
  /**
   * Specifies the size of the Badge.
   * @default default
   */
  size?: BadgeSize;
  /**
   * Badge status indicator
   */
  status?: BadgeStatus;
  /**
   * The name of the icon to be displayed inside the Badge. The icon is rendered using the `Icon` component.
   */
  icon?: string;
};

export interface BadgeProps extends BreakpointSupport<BadgePropsBreakpointProps> {
  /**
   * The content to be displayed inside the Badge.
   * If not provided and `icon` is set, the badge will display the icon only.
   */
  children?: React.ReactNode;
  /**
   * Additional classes to apply custom styles to the Badge.
   */
  className?: string;
  /**
   * Provides the full text or description when the Badge represents an abbreviation.
   * This is typically shown as a tooltip on hover.
   */
  title?: string;
  /**
   * ID attribute
   */
  id?: string;
}

export const Badge = (props: BadgeProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const {
    color = 'default',
    variant = 'filled',
    size = 'default',
    children,
    className,
    title,
    status,
    icon,
    id,
    ...rest
  } = getCurrentBreakpointProps<BadgeProps>(props);

  const BadgeElement = title ? 'abbr' : 'div';

  const mapBadgeColorToIconColor = (badgeColor: BadgeColor): IconColor => {
    switch (badgeColor) {
      case 'primary':
        return 'brand';
      case 'success':
        return 'success';
      case 'accent':
        return 'secondary';
      case 'danger':
        return 'danger';
      case 'warning':
        return 'warning';
      default:
        return 'primary';
    }
  };

  const badgeClass = cn(
    styles['tedi-badge'],
    styles[`tedi-badge--${variant}--${color}`],
    status && styles[`tedi-badge--status`],
    status && styles[`tedi-badge--status-${status}`],
    size === 'large' && styles['tedi-badge--large'],
    icon && !children && styles['tedi-badge--icon-only'],
    className
  );

  return (
    <BadgeElement className={badgeClass} id={id} title={title} {...rest}>
      {icon && (
        <Icon
          name={icon}
          color={mapBadgeColorToIconColor(color)}
          size={16}
          className={styles[`tedi-badge__icon-${color}`]}
        />
      )}
      {children && <span className={styles['tedi-badge__inner-text']}>{children}</span>}
    </BadgeElement>
  );
};
