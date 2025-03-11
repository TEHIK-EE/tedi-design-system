import cn from 'classnames';

import { BreakpointSupport, useBreakpointProps } from '../../helpers';
import { Icon, IconColor } from '../icon/icon';
import styles from './status-badge.module.scss';

export type StatusBadgeColor = 'neutral' | 'brand' | 'accent' | 'success' | 'danger' | 'warning' | 'transparent';
export type StatusBadgeVariant = 'filled' | 'filled-bordered' | 'bordered';
export type StatusBadgeSize = 'default' | 'large';
export type StatusBadgeStatus = 'danger' | 'success' | 'warning' | 'inactive';

type StatusBadgePropsBreakpointProps = {
  /**
   * Specifies the color scheme of the StatusBadge.
   * @default default
   */
  color?: StatusBadgeColor;
  /**
   * Determines the style or visual type of the StatusBadge.
   * @default filled
   */
  variant?: StatusBadgeVariant;
  /**
   * Specifies the size of the StatusBadge.
   * @default default
   */
  size?: StatusBadgeSize;
  /**
   * StatusBadge status indicator
   */
  status?: StatusBadgeStatus;
  /**
   * The name of the icon to be displayed inside the StatusBadge. The icon is rendered using the `Icon` component.
   */
  icon?: string;
};

export interface StatusBadgeProps extends BreakpointSupport<StatusBadgePropsBreakpointProps> {
  /**
   * The content to be displayed inside the StatusBadge.
   * If not provided and `icon` is set, the badge will display the icon only.
   */
  children?: React.ReactNode;
  /**
   * Additional classes to apply custom styles to the StatusBadge.
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
  /**
   * ARIA role attribute for accessibility.
   */
  role?: React.AriaRole;
}

export const StatusBadge = (props: StatusBadgeProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const {
    color = 'neutral',
    variant = 'filled',
    size = 'default',
    children,
    className,
    title,
    status,
    icon,
    id,
    role,
    ...rest
  } = getCurrentBreakpointProps<StatusBadgeProps>(props);

  const BadgeElement = title ? 'abbr' : 'div';

  const mapBadgeColorToIconColor = (badgeColor: StatusBadgeColor): IconColor => {
    switch (badgeColor) {
      case 'brand':
        return 'brand-dark';
      case 'success':
        return 'success';
      case 'accent':
        return 'secondary';
      case 'danger':
        return 'danger';
      case 'warning':
        return 'warning-dark';
      default:
        return 'primary';
    }
  };

  const badgeClass = cn(
    styles['tedi-status-badge'],
    styles[`tedi-status-badge--variant-${variant}`],
    styles[`tedi-status-badge--color-${color}`],
    status && styles['tedi-status-badge--status'],
    status && styles[`tedi-status-badge--status-${status}`],
    size === 'large' && styles['tedi-status-badge--large'],
    icon && !children && styles['tedi-status-badge__icon-only'],
    className
  );

  const ariaLive = role === 'alert' ? 'assertive' : role === 'status' ? 'polite' : undefined;

  return (
    <BadgeElement
      className={badgeClass}
      id={id}
      title={title}
      role={role}
      aria-live={role ? ariaLive : undefined}
      {...rest}
    >
      {icon && (
        <Icon
          name={icon}
          color={mapBadgeColorToIconColor(color)}
          size={16}
          className={styles[`tedi-status-badge__icon-${color}`]}
        />
      )}
      {children && <span className={styles['tedi-status-badge__inner-text']}>{children}</span>}
    </BadgeElement>
  );
};
