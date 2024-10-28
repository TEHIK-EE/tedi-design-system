import cn from 'classnames';
import React from 'react';

import Print from '../../../../tedi/components/print/print';
import { useLabels } from '../../../../tedi/providers/label-provider';
import useLayout, { Layouts } from '../../../helpers/hooks/use-layout';
import { AllowedHTMLTags } from '../../../helpers/polymorphic/types';
import { IntentionalAny } from '../../../types';
import styles from './breadcrumbs.module.scss';
import Crumb, { CrumbProps } from './crumb/crumb';

type ConditionalTypes<C extends React.ElementType> =
  | {
      /**
       * Render all anchors (except logoLink and skipLink) as this component<br />
       * See [Anchor/CustomComponent](/?path=/docs/components-anchor--custom-component) for an example
       */
      linkAs: AllowedHTMLTags<C, 'a' | React.ComponentType<IntentionalAny>>;
      /**
       * Crumbs array
       */
      crumbs: CrumbProps<C>[];
    }
  | {
      linkAs?: never;
      crumbs: CrumbProps<IntentionalAny>[];
    };

export type BreadcrumbsProps<C extends React.ElementType = 'a'> = ConditionalTypes<C> & {
  /**
   * Additional custom class.
   */
  className?: string;
  /**
   * Show only last interactive crumb.
   * Can be defined as an array of layouts/breakpoints or boolean
   * @default ['mobile', 'tablet']
   */
  showMinimalCrumbs?: boolean | Layouts;
};

export const Breadcrumbs = <C extends React.ElementType = 'a'>(props: BreadcrumbsProps<C>): JSX.Element | null => {
  const { getLabel } = useLabels();
  const { className, crumbs, linkAs, showMinimalCrumbs = ['mobile', 'tablet'], ...rest } = props;
  const isSmallLayout = useLayout(
    showMinimalCrumbs === true ? ['mobile', 'tablet', 'desktop'] : showMinimalCrumbs || []
  );
  const minimalCrumbs = !!showMinimalCrumbs && isSmallLayout;

  const filteredCrumbs = minimalCrumbs ? crumbs.filter((crumb) => !crumb.isLast).slice(-1) : crumbs;

  if (!filteredCrumbs?.length) {
    return null;
  }

  return (
    <Print visibility="hide">
      <nav
        data-name="breadcrumbs"
        aria-label={getLabel('breadcrumbs')}
        {...rest}
        className={cn(className, styles['breadcrumbs'])}
      >
        <ol className={styles['breadcrumbs__list']}>
          {filteredCrumbs.map((crumb, index) => {
            return <Crumb as={linkAs} key={index} singleCrumb={minimalCrumbs} {...crumb} />;
          })}
        </ol>
      </nav>
    </Print>
  );
};

export default Breadcrumbs;
