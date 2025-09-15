import cn from 'classnames';
import React, { useEffect, useState } from 'react';

import { AccessibilityContext } from '../../../providers/accessibility-provider/accessibility-provider';
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
   * @default 200ms
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
    labelDelay = 200,
    ...rest
  } = props;

  const SkeletonBEM = cn(styles['tedi-skeleton'], className);
  const context = React.useContext(AccessibilityContext);
  const [announce, setAnnounce] = useState<string | null>(null);

  useDeclareLoader(label, completedLabel, labelDelay);

  useEffect(() => {
    if (!context) {
      let mounted = true;

      const announceTimer = setTimeout(() => {
        if (mounted) setAnnounce(label);
      }, labelDelay);

      return () => {
        mounted = false;
        clearTimeout(announceTimer);
        setAnnounce(completedLabel);
      };
    }
    return undefined;
  }, [context, label, completedLabel, labelDelay]);

  return (
    <div data-name="skeleton" {...rest} className={SkeletonBEM}>
      {announce && (
        <span className="sr-only" role="status" aria-live="assertive" aria-atomic="true">
          {announce}
        </span>
      )}
      {children}
    </div>
  );
};

Skeleton.Block = SkeletonBlock;
export default Skeleton;
