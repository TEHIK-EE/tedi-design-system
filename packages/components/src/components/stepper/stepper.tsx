import cn from 'classnames';
import React from 'react';

import { Card, CardContent, CardHeader, CardProps } from '../card';
import Step, { StepProps } from './step';
import styles from './stepper.module.scss';
import { AllowStepLabelClick, StepperContext } from './stepper-context';
import StepperNav, { StepperNavItem } from './stepper-nav';

export interface StepperProps {
  /**
   * The activeStep index that should be open by default (zero based index).
   * Do not use with activeStep
   * @default 0
   */
  defaultActiveStep?: number;
  /**
   * Set the active step (zero based index). Used to control the activeStep outside the components.
   * Should be used with onActiveStepChange function
   */
  activeStep?: number;
  /**
   * Callback for activeStep change.
   */
  onActiveStepChange?: (step: number) => void;
  /**
   * Allow user to navigate between steps by clicking on the step label.
   *
   * - false - disable navigation from labels
   * - true - allow navigation from labels
   * - 'completed' - allow navigation from labels only if the step is completed
   * - 'completed-or-next':
   *   - allow navigation from labels if the step is completed
   *   - allow navigation if the step is not completed and is the next step
   *   - allow navigation if the step is next of the last completed step
   *
   * @default true
   */
  allowStepLabelClick?: AllowStepLabelClick;
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
  const {
    activeStep,
    defaultActiveStep,
    onActiveStepChange,
    allowStepLabelClick = true,
    children,
    className,
    ariaLabel,
    completedLabel,
    notCompletedLabel,
    card,
  } = props;
  const [innerActiveStep, setActiveStep] = React.useState<number>(defaultActiveStep || 0);

  const isActiveStepControlled = React.useCallback(
    (activeStep = props.activeStep): activeStep is number => {
      return typeof activeStep !== 'undefined';
    },
    [props.activeStep]
  );

  const handleActiveStepChange = React.useCallback(
    (newActiveStep: number): void => {
      onActiveStepChange?.(newActiveStep);

      if (!isActiveStepControlled(activeStep)) {
        setActiveStep(newActiveStep);
      }
    },
    [activeStep, isActiveStepControlled, onActiveStepChange]
  );

  const getActiveStep = React.useMemo(
    () => (isActiveStepControlled(activeStep) ? activeStep : innerActiveStep),
    [activeStep, innerActiveStep, isActiveStepControlled]
  );

  const childrenArray = React.Children.map(children, (child: React.ReactNode) => {
    if (React.isValidElement(child) && child.type === Step) {
      return child;
    }

    return null;
  });

  const steps = childrenArray?.map((step: JSX.Element, index) => {
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

  const contextValue = React.useMemo(
    () => ({ activeStep: getActiveStep, handleActiveStepChange, allowStepLabelClick }),
    [allowStepLabelClick, getActiveStep, handleActiveStepChange]
  );

  const CardBEM = cn(styles['stepper'], className, {
    [styles['stepper--card']]: !!card,
  });

  const getContent = () => {
    if (card) {
      const cardProps = card === true ? {} : card;

      return (
        <Card padding={1.5} {...cardProps} data-name="stepper" className={CardBEM}>
          <CardHeader padding={0} variant="white">
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
