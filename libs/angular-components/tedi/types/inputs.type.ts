import { InputSignal } from "@angular/core";

export type ComponentInputs<TComponent> = {
  [K in keyof TComponent as TComponent[K] extends InputSignal<infer _> ? K : never]: 
    TComponent[K] extends InputSignal<infer U> ? U : never;
}