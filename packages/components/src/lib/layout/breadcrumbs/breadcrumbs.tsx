import cn from 'classnames';
import React from 'react';

import styles from './breadcrumbs.module.scss';
import Crumb, { CrumbProps } from './crumb/crumb';

export interface BreadcrumbsProps {
  /**
   * List of crumbs to show
   */
  crumbs: CrumbProps[];
  /**
   * Additional custom class.
   */
  className?: string;
}

export const Breadcrumbs = (props: BreadcrumbsProps): JSX.Element => {
  const { className, crumbs } = props;

  return (
    <ol className={cn(className, styles['breadcrumbs'])}>
      {crumbs.map((crumb, idx) => {
        return <Crumb key={idx} {...crumb} />;
      })}
    </ol>
  );
};

export default Breadcrumbs;
