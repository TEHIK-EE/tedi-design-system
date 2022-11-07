import React from 'react';

import { PolymorphicRef } from '../../helpers/polymorphic/types';
import ButtonContent, { ButtonContentProps } from '../button-content/button-content';

export interface InternalAnchorProps {
  /**
   * If button should take all the space it has
   */
  fullWidth?: boolean;
}

type AllowedTags = 'a' | React.ComponentType<any>;

export type AnchorProps<C extends React.ElementType = 'a'> = ButtonContentProps<C, InternalAnchorProps, AllowedTags>;

export type AnchorComponent = <C extends React.ElementType = 'a'>(props: AnchorProps<C>) => React.ReactElement | null;

const InternalAnchor = React.forwardRef(
  <C extends React.ElementType = 'a'>(props: AnchorProps<C>, ref?: PolymorphicRef<C>) => {
    const { visualType = 'link', as, children, ...rest } = props;

    const ComponentAs = as || 'a';

    return (
      <ButtonContent {...(rest as any)} ref={ref} as={ComponentAs} visualType={visualType}>
        {children}
      </ButtonContent>
    );
  }
);

InternalAnchor.displayName = 'Anchor';

/**
 * By default, the navigation is performed with a native `<a>` element. You can customize it to use your own router. For instance, using Next.js's Link or react-router.<br />
 * Inherits all props from the component passed into `as`. If `as` is omitted, then the default is native `<a>` tag
 */

export const Anchor: AnchorComponent = InternalAnchor;

export default Anchor;
