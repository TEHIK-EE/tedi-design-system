import React from 'react';

export interface IStepperContext {
  activeStep: number;
  allowStepLabelClick: boolean;
  handleActiveStepChange: (step: number) => void;
}

export const StepperContext = React.createContext<IStepperContext>({
  activeStep: 0,
  allowStepLabelClick: true,
  handleActiveStepChange: () => null,
});
