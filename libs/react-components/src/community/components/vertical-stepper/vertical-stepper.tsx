import cn from 'classnames';

import styles from './vertical-stepper.module.scss';

export interface VerticalStepperProps {
  /**
   * SubItem or Separator
   */
  children: React.ReactNode;
  /**
   * Custom class name.
   */
  className?: string;
  /** Compact version of the stepper */
  isCompact?: boolean;
}

export const VerticalStepper = (props: VerticalStepperProps): JSX.Element => {
  const { className, children, isCompact } = props;

  const StepperBEM = cn(styles['stepper'], className, { [styles['stepper--compact']]: isCompact });

  return (
    <ol role="tree" className={StepperBEM}>
      {children}
    </ol>
  );
};

export default VerticalStepper;
