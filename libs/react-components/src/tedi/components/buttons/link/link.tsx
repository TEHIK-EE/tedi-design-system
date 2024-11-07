import React, { forwardRef } from 'react';

import { PolymorphicRef } from '../../../helpers/polymorphic/types';
import { useLabels } from '../../../providers/label-provider';
import { UnknownType } from '../../../types/commonTypes';
import ButtonContent, { ButtonContentProps } from '../button-content/button-content';

export type InternalLinkProps = {
  // custom Link specific props
};

type AllowedTags = 'a' | React.ComponentType<UnknownType>;

export type LinkProps<C extends React.ElementType = 'a'> = ButtonContentProps<C, InternalLinkProps, AllowedTags> & {
  /**
   * Whether the link should be underlined by default
   * @default true
   */
  underline?: boolean;
};

type LinkComponentProps<C extends React.ElementType> = LinkProps<C> & { ref?: PolymorphicRef<C> };

const LinkComponent = forwardRef(
  <C extends React.ElementType = 'a'>(props: LinkComponentProps<C>, ref?: PolymorphicRef<C>) => {
    const { getLabel } = useLabels();
    const { visualType = 'link', underline = true, as, children, ...rest } = props;

    const ComponentAs = as || 'a';

    return (
      <ButtonContent
        data-name="link"
        {...(rest as UnknownType)}
        ref={ref}
        as={ComponentAs}
        visualType={visualType}
        underline={underline}
      >
        {children}
        {rest.target === '_blank' && <span className="sr-only">({getLabel('anchor.new-tab')})</span>}
      </ButtonContent>
    );
  }
);

LinkComponent.displayName = 'Link';

/**
 * The Link component should always be used when an `href` is provided, and an `<a>` element is needed.
 * If you require a button-like appearance but still want to navigate as a link, use the `visualType` prop.
 *
 * **Note:** Disabled button styles are not available when using an anchor element.
 *
 * By default, navigation is handled by a native `<a>` element, but you can customize it to work with your preferred router, such as Next.js’s Link or React Router.
 * The component inherits all properties of the element passed into `as`. If `as` is omitted, a native `<a>` tag is used by default.
 *
 * To use a custom Link as a direct child of the Header component, ensure you set its `displayName`. [Learn more about settings for Header components.](#settings)
 */

export const Link = LinkComponent as <C extends React.ElementType = 'a'>(
  props: LinkProps<C>
) => React.ReactElement | null;

export default Link;
