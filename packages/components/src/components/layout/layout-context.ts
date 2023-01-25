import { FloatingContext, ReferenceType } from '@floating-ui/react';
import React from 'react';

export interface ILayoutContext {
  menuOpen: boolean;
  toggleMenu: () => void;
  reference: (node: ReferenceType | null) => void;
  floating: (node: HTMLElement | null) => void;
  getReferenceProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  context: FloatingContext<ReferenceType>;
  hasSidenavItems: boolean;
  y: number | null;
}

export const LayoutContext = React.createContext<ILayoutContext>({
  menuOpen: false,
  toggleMenu: () => null,
  reference: () => null,
  floating: () => null,
  getReferenceProps: () => ({}),
  getFloatingProps: () => ({}),
  context: {} as FloatingContext<ReferenceType>,
  hasSidenavItems: false,
  y: null,
});
