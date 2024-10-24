import React, { forwardRef } from 'react';

import { useLabels } from '../../../tedi/providers/label-provider';
import { PolymorphicRef } from '../../helpers/polymorphic/types';
import { IntentionalAny } from '../../types';
import ButtonContent, { ButtonContentProps } from '../button-content/button-content';

export type InternalAnchorProps = {
  // custom Anchor specific props
};

type AllowedTags = 'a' | React.ComponentType<IntentionalAny>;

export type AnchorProps<C extends React.ElementType = 'a'> = ButtonContentProps<C, InternalAnchorProps, AllowedTags>;

export type AnchorComponent = <C extends React.ElementType = 'a'>(props: AnchorProps<C>) => React.ReactElement | null;
const InternalAnchor = forwardRef(
  <C extends React.ElementType = 'a'>(props: AnchorProps<C>, ref?: PolymorphicRef<C>) => {
    const { getLabel } = useLabels();
    const { visualType = 'link', as, children, ...rest } = props;

    const ComponentAs = as || 'a';

    return (
      <ButtonContent
        data-name="anchor"
        {...(rest as IntentionalAny)}
        ref={ref}
        as={ComponentAs}
        visualType={visualType}
      >
        {children}
        {rest.target === '_blank' && <span className="sr-only">({getLabel('anchor.new-tab')})</span>}
      </ButtonContent>
    );
  }
);

InternalAnchor.displayName = 'Anchor';

/**
 * Anchor component that should be always used when href is passed and a element should be rendered. If u need to use visually button, but still redirect as link use `visualType` prop. <br/>
 * __NB! U can not use disabled button visuals with anchor.__
 *
 * By default, the navigation is performed with a native `<a>` element. You can customize it to use your own router. For instance, using Next.js's Link or react-router.<br />
 * Inherits all props from the component passed into `as`. If `as` is omitted, then the default is native `<a>` tag
 *
 * To allow Customized Anchor usage as direct children of Header you need to add displayName to it. <a href="/docs/components-layout-header-header-overview--header-overview#settings">See more.</a>
 */

// TODO: Remove ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Anchor: AnchorComponent = InternalAnchor;

export default Anchor;
