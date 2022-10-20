import cn from 'classnames';
import Link, { LinkProps } from 'next/link';

import styles from './anchor.module.scss';

export interface AnchorProps {
  /**
   * URL the anchor should link to.
   */
  url: LinkProps['href'];
  /**
   * Target attribute.
   */
  target?: string;
  /**
   * Anchor content
   */
  children: React.ReactNode;
  /**
   * Additional custom class name.
   */
  className?: string;
  /**
   * onClick handler.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  /**
   * ID attribute.
   */
  id?: string;
  /**
   * Anchor label for assistive technologies.
   */
  'aria-label'?: string;
  /**
   * Indicates selected element for assistive technologies.
   */
  'aria-selected'?: boolean | 'false' | 'true';
  /**
   * ID of element which anchor controls.
   */
  'aria-controls'?: string;
  /**
   * ARIA role.
   */
  role?: string;
}

export const Anchor = (props: AnchorProps) => {
  const { url, children, className, id, target, onClick, role } = props;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    onClick?.(event);
  };

  return (
    <Link href={url}>
      <a
        className={cn(styles['anchor'], className)}
        href={typeof url === 'string' ? url : url.pathname || undefined}
        id={id}
        target={target}
        aria-label={props['aria-label']}
        aria-selected={props['aria-selected']}
        aria-controls={props['aria-controls']}
        onClick={handleClick}
        role={role}
      >
        {children}
      </a>
    </Link>
  );
};

export default Anchor;
