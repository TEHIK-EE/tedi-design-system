import React from 'react';

export interface IStepperContext {
  activeStep: number;
  onActiveStepChange: (step: number) => void;
}

export const StepperContext = React.createContext<IStepperContext>({
  activeStep: 0,
  onActiveStepChange: () => null,
});
