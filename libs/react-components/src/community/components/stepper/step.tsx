import cn from 'classnames';
import React from 'react';

import styles from './stepper.module.scss';
import { StepperContext } from './stepper-context';

export interface StepProps {
  /**
   * ID of step
   */
  id: string;
  /**
   * Step content.
   */
  children: React.ReactNode;
  /**
   * Label of step.
   */
  label: string;
  /**
   * Additional class.
   */
  className?: string;
  /**
   * The position of the step.
   * The prop defaults to the value inherited from the parent Stepper component.
   */
  index?: number;
  /**
   * Mark the step as completed
   */
  completed?: boolean;
}

export const Step = (props: StepProps): JSX.Element | null => {
  const { children, className, index, id } = props;
  const { activeStep } = React.useContext(StepperContext);
  const StepBEM = cn(styles['stepper__step'], className, { [styles['stepper__step--current']]: activeStep === index });

  return activeStep === index ? (
    <div data-name="step" id={id} role="tabpanel" className={StepBEM}>
      {children}
    </div>
  ) : null;
};

export default Step;
