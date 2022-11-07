import React from 'react';

/**
 * Types for polymorphic components
 */

export type AllowedHTMLTags<C extends React.ElementType, V> = C extends V ? C : never;

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

// This is the type for the "ref" only
export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentPropWithoutRef<
  C extends React.ElementType,
  Props = Record<string, never>
> = React.PropsWithChildren<Props & AsProp<C>> & Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = Record<string, never>
> = PolymorphicComponentPropWithoutRef<C, Props> & {
  ref?: PolymorphicRef<C>;
};
