import cn from 'classnames';
import Link, { LinkProps } from 'next/link';

import ButtonContent, { ButtonContentAnchorProps } from '../button-content/button-content';
import styles from './anchor.module.scss';

export interface AnchorSharedProps extends Omit<ButtonContentAnchorProps, 'element' | 'disabled' | 'href'> {
  /**
   * URL the anchor should link to.
   */
  url: LinkProps['href'];
  /**
   * Target attribute.
   */
  target?: string;
}

export interface AnchorVisualProps extends AnchorSharedProps {
  /**
   * If anchor is not visual anchor. For example link is needed to wrap logo.
   */
  notVisual?: never;
  children?: never;
}

export interface AnchorNotVisualProps extends AnchorSharedProps {
  /**
   * If anchor is not visual anchor. For example link is needed to wrap logo.
   */
  notVisual: true;
  children: React.ReactNode;
}

export type AnchorProps = AnchorNotVisualProps | AnchorVisualProps;

export const Anchor = (props: AnchorProps) => {
  const { url, target, attributes, type = 'link', children, notVisual, className, ...rest } = props;

  const anchorBem = cn(className, { [styles['anchor--not-visual']]: notVisual });

  // TODO: Remove NextLink logic
  return (
    <Link href={url} passHref legacyBehavior>
      <ButtonContent attributes={{ ...attributes, target }} {...rest} element="a" type={type} className={anchorBem}>
        {notVisual ? children : undefined}
      </ButtonContent>
    </Link>
  );
};

export default Anchor;
