import React from 'react';

export type AllowStepLabelClick = boolean | 'completed' | 'completed-or-next';

export interface IStepperContext {
  activeStep: number;
  allowStepLabelClick: AllowStepLabelClick;
  handleActiveStepChange: (step: number) => void;
}

export const StepperContext = React.createContext<IStepperContext>({
  activeStep: 0,
  allowStepLabelClick: true,
  handleActiveStepChange: () => null,
});
