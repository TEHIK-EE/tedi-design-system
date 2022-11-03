import Link, { LinkProps } from 'next/link';

import ButtonContent, { ButtonContentAnchorProps } from '../button-content/button-content';

export interface AnchorProps extends Omit<ButtonContentAnchorProps, 'element' | 'disabled' | 'href'> {
  /**
   * URL the anchor should link to.
   */
  url: LinkProps['href'];
  /**
   * Target attribute.
   */
  target?: string;
}

export const Anchor = (props: AnchorProps) => {
  const { url, target, attributes, type = 'link', ...rest } = props;

  // TODO: Remove NextLink logic
  return (
    <Link href={url} passHref legacyBehavior>
      <ButtonContent element="a" type={type} attributes={{ ...attributes, target }} {...rest} />
    </Link>
  );
};

export default Anchor;
