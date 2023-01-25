/**
 * This file contains only Anchor helper components that are shared between different stories. These are not exported in the component library
 */
import Link from 'next/link';
import React from 'react';

import { Anchor, AnchorProps } from './anchor';

// reuse this function when you want to pass it into other components that accept Anchor props (E.g Logo, Header etc)
const LinkBehaviour = React.forwardRef<HTMLAnchorElement, React.ComponentProps<typeof Link>>(
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
const CustomAnchor = (props: AnchorProps<typeof Link>) => {
  return <Anchor as={LinkBehaviour} {...props} />;
};

export { LinkBehaviour, CustomAnchor };
