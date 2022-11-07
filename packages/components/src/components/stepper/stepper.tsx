import React from 'react';

import Step, { StepProps } from './step';
import { StepperContext } from './stepper-context';
import StepperNav, { StepperNavItem } from './stepper-nav';

export interface StepperProps {
  /**
   * Set the active step (zero based index).
   */
  activeStep: number;
  /**
   * Callback for activeStep change.
   */
  onActiveStepChange: (step: number) => void;
  /**
   * Two or more `<Step />` components.
   */
  children: React.ReactElement<StepProps>[];
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Navigation aria-label
   */
  ariaLabel: string;
  /**
   * Completed label, added only for screen-readers.
   * Defaults to "Completed".
   */
  completedLabel?: string;
  /**
   * Not Completed label, added only for screen-readers.
   * Defaults to "Not completed".
   */
  notCompletedLabel?: string;
}

export const Stepper = (props: StepperProps): JSX.Element => {
  const { activeStep, children, className, ariaLabel, completedLabel, notCompletedLabel, onActiveStepChange } = props;

  const childrenArray = React.Children.map(children, (child: React.ReactNode) => {
    if (React.isValidElement(child) && child.type === Step) {
      return child;
    }

    return null;
  });

  const steps = childrenArray.map((step: JSX.Element, index) => {
    return React.cloneElement<StepProps>(step, {
      key: index,
      index,
      ...step.props,
    });
  });

  const getNavItems = (): StepperNavItem[] => {
    return React.Children.toArray(props.children)
      .filter((child: React.ReactNode): child is React.ReactElement<StepProps> => {
        return React.isValidElement(child) && child.type === Step;
      })
      .map((item: React.ReactElement<StepProps>, index) => {
        const { label, completed, id } = item.props;
        return { label, completed: !!completed, index, id };
      });
  };

  const contextValue = React.useMemo(() => ({ activeStep, onActiveStepChange }), [activeStep, onActiveStepChange]);

  return (
    <StepperContext.Provider value={contextValue}>
      <div className={className}>
        <StepperNav
          items={getNavItems()}
          ariaLabel={ariaLabel}
          completedLabel={completedLabel}
          notCompletedLabel={notCompletedLabel}
        />
        {steps}
      </div>
    </StepperContext.Provider>
  );
};

export default Stepper;
