import cn from 'classnames';
import React from 'react';

import { useDeclareLoader } from '../../providers/accessibility-provider/use-declare-loader';
import { useLabels } from '../../providers/label-provider';
import styles from './skeleton.module.scss';

export interface SkeletonProps {
  /**
   * PlaceholderBlocks content
   */
  children?: React.ReactNode | React.ReactNode[];
  /**
   * Additional custom class
   */
  className?: string;
  /**
   * Accessibility label for screen-readers when component mounts and certain delay has passed
   * When omitted then info about all the skeletons currently on the page get combined into one info message.
   * @default getLabel('skeleton.loading')
   */
  label?: string;
  /**
   * Accessibility label for screen-readers that gets read when component unmounts
   * When label isn't read due to not meeting labelDelay requirement, then this props is ignored
   * @default getLabel('skeleton.loading-completed')
   */
  completedLabel?: string;
  /**
   * Delay in ms before the label is announced by screen-readers
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
  const SkeletonBEM = cn(styles['skeleton'], className);
  useDeclareLoader(label, completedLabel, labelDelay);

  return (
    <div data-name="skeleton" {...rest} className={SkeletonBEM}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
};

export default Skeleton;
