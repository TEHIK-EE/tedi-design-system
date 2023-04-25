import cn from 'classnames';
import React from 'react';

import { Card, CardContent, CardHeader, CardProps } from '../card';
import Step, { StepProps } from './step';
import styles from './stepper.module.scss';
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
   * Navigation aria-label
   */
  ariaLabel: string;
  /**
   * Two or more `<Step />` components.
   */
  children: React.ReactElement<StepProps>[];
  /**
   * Additional class.
   */
  className?: string;
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
  /**
   * Card props to be passed to the Card component around the Stepper.
   * When truthy, default card padding will be large
   */
  card?: CardProps | boolean;
}

export const Stepper = (props: StepperProps): JSX.Element => {
  const { activeStep, children, className, ariaLabel, completedLabel, notCompletedLabel, onActiveStepChange, card } =
    props;

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

  const CardBEM = cn(styles['stepper'], className, {
    [styles['stepper--card']]: !!card,
  });

  const getContent = () => {
    if (card) {
      const cardProps = card === true ? {} : card;

      return (
        <Card padding="large" {...cardProps} data-name="stepper" className={CardBEM}>
          <CardHeader padding="none" variant="white">
            <StepperNav
              items={getNavItems()}
              ariaLabel={ariaLabel}
              completedLabel={completedLabel}
              notCompletedLabel={notCompletedLabel}
            />
          </CardHeader>
          <CardContent>{steps}</CardContent>
        </Card>
      );
    }

    return (
      <div data-name="stepper" className={className}>
        <StepperNav
          items={getNavItems()}
          ariaLabel={ariaLabel}
          completedLabel={completedLabel}
          notCompletedLabel={notCompletedLabel}
        />
        {steps}
      </div>
    );
  };

  return <StepperContext.Provider value={contextValue}>{getContent()}</StepperContext.Provider>;
};

export default Stepper;
