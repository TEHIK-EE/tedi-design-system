/**
 * This file contains only Anchor helper components that are shared between different stories. These are not exported in the component library
 */
import Link from 'next/link';
import React, { forwardRef } from 'react';

import { Link as TediLink, LinkProps } from './link';

// reuse this function when you want to pass it into other components that accept Anchor props (E.g Logo, Header etc)
const LinkBehaviour = forwardRef<HTMLAnchorElement, React.ComponentProps<typeof Link>>(
  ({ children, className, href, ...rest }, ref) => {
    return (
      <Link ref={ref} href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }
);
LinkBehaviour.displayName = 'LinkBehaviour';

// reuse this component when you want to render <Anchor> in JSX. NB! Do not pass this to other components link(s) props.
const CustomAnchor = (props: LinkProps<typeof Link>) => {
  return <TediLink as={LinkBehaviour} {...props} />;
};

export { LinkBehaviour, CustomAnchor };
