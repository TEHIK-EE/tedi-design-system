import cn from 'classnames';
import React, { forwardRef } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { PolymorphicRef } from '../../../helpers/polymorphic/types';
import { useLabels } from '../../../providers/label-provider';
import { UnknownType } from '../../../types/commonTypes';
import ButtonContent, { ButtonContentProps } from '../../buttons/button-content/button-content';
import styles from '../../buttons/button-content/button-content.module.scss';

export type InternalLinkProps = {
  /**
   * If true, the icon will be placed in a separate column
   */
  iconStandalone?: boolean;
};

type AllowedTags = 'a' | React.ComponentType<UnknownType>;

export type LinkProps<C extends React.ElementType = 'a'> = BreakpointSupport<
  ButtonContentProps<C, InternalLinkProps, AllowedTags> & {
    /**
     * Whether the link should be underlined by default
     * @default true
     */
    underline?: boolean;
  }
>;

const LinkComponent = forwardRef(<C extends React.ElementType = 'a'>(props: LinkProps<C>, ref?: PolymorphicRef<C>) => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const { getLabel } = useLabels();

  const {
    visualType = 'link',
    iconStandalone = false,
    underline = true,
    as,
    children,
    ...rest
  } = getCurrentBreakpointProps<LinkProps<C>>(props);

  const ComponentAs = as || 'a';

  return (
    <ButtonContent
      data-name="link"
      {...(rest as UnknownType)}
      ref={ref}
      as={ComponentAs}
      visualType={visualType}
      underline={underline}
      className={cn(rest.className, { [styles['tedi-btn__icon-standalone--link']]: iconStandalone })}
    >
      {children}
      {rest.target === '_blank' && <span className="sr-only">({getLabel('anchor.new-tab')})</span>}
    </ButtonContent>
  );
});

LinkComponent.displayName = 'Link';

export const Link = LinkComponent as <C extends React.ElementType = 'a'>(
  props: LinkProps<C>
) => React.ReactElement | null;

export default Link;
