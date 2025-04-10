import { InputSignal } from "@angular/core";

export type InputsWithSignals<TInputs> = {
  [K in keyof TInputs]: InputSignal<TInputs[K]>;
};
