import cn from 'classnames';
import React from 'react';

import { AllowedHTMLTags } from '../../../helpers/polymorphic/types';
import Print from '../../print/print';
import styles from './breadcrumbs.module.scss';
import Crumb, { CrumbProps } from './crumb/crumb';

type ConditionalTypes<C extends React.ElementType> =
  | {
      /**
       * Render all anchors (except logoLink and skipLink) as this component<br />
       * See [Anchor/CustomComponent](/?path=/docs/components-anchor--custom-component) for an example
       */
      linkAs: AllowedHTMLTags<C, 'a' | React.ComponentType<any>>;
      /**
       * Crumbs array
       */
      crumbs: CrumbProps<C>[];
    }
  | {
      linkAs?: never;
      crumbs: CrumbProps<any>[];
    };

export type BreadcrumbsProps<C extends React.ElementType = 'a'> = ConditionalTypes<C> & {
  /**
   * Additional custom class.
   */
  className?: string;
};

export const Breadcrumbs = <C extends React.ElementType = 'a'>(props: BreadcrumbsProps<C>): JSX.Element => {
  const { className, crumbs, linkAs, ...rest } = props;

  return (
    <Print visibility="hide">
      <ol data-name="breadcrumbs" {...rest} className={cn(className, styles['breadcrumbs'])}>
        {crumbs.map((crumb, idx) => {
          return <Crumb as={linkAs} key={idx} {...crumb} />;
        })}
      </ol>
    </Print>
  );
};

export default Breadcrumbs;
