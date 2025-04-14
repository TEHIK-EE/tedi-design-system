import cn from 'classnames';
import React from 'react';

import { useDeclareLoader } from '../../../providers/accessibility-provider/use-declare-loader';
import { useLabels } from '../../../providers/label-provider';
import styles from './skeleton.module.scss';
import SkeletonBlock from './skeleton-block/skeleton-block';

export interface SkeletonProps {
  /**
   * The content to be rendered inside the skeleton placeholder.
   */
  children?: React.ReactNode | React.ReactNode[];
  /**
   * Custom class names to apply to the skeleton component for styling purposes.
   */
  className?: string;
  /**
   * The accessibility label announced by screen readers when the skeleton component mounts.
   * This message informs users that content is loading.
   * If omitted, all skeletons on the page are combined into a single status message.
   * @default getLabel('skeleton.loading')
   */
  label?: string;
  /**
   * The accessibility label announced by screen readers when the skeleton component unmounts.
   * This message informs users that content has finished loading.
   * This label is only announced if the delay specified by `labelDelay` is met.
   * @default getLabel('skeleton.loading-completed')
   */
  completedLabel?: string;
  /**
   * The delay, in milliseconds, before the screen reader announces the `label` when the component mounts.
   * If the content loads faster than this delay, the label may not be announced to avoid unnecessary interruptions.
   * @default 1000ms
   */
  labelDelay?: number;
}

export const Skeleton = (props: SkeletonProps): JSX.Element => {
  const { getLabel } = useLabels();
  const {
    children,
    className,
    label = getLabel('skeleton.loading'),
    completedLabel = getLabel('skeleton.loading-completed'),
    labelDelay = 1000,
    ...rest
  } = props;
  const SkeletonBEM = cn(styles['tedi-skeleton'], className);
  useDeclareLoader(label, completedLabel, labelDelay);

  return (
    <div data-name="skeleton" {...rest} className={SkeletonBEM}>
      <span className="sr-only" aria-live="polite">
        {label}
      </span>
      {children}
    </div>
  );
};

Skeleton.Block = SkeletonBlock;
export default Skeleton;
