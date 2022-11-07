import React from 'react';

export interface ILayoutContext {
  menuOpen: boolean;
  toggleMenu: () => void;
}

export const LayoutContext = React.createContext<ILayoutContext>({
  menuOpen: false,
  toggleMenu: () => null,
});
