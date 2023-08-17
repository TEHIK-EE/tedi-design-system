import { FloatingContext, ReferenceType } from '@floating-ui/react';
import React from 'react';

import { SideNavProps } from './sidenav/sidenav';

export interface ILayoutContext {
  menuOpen: boolean;
  toggleMenu: () => void;
  /**
   * Type of the Header
   * - System header is meant for logged in system
   * - Public is meant for public pages where user is not yer signed in, usally also does not have sidenav on desktop
   * @default 'system'
   */
  headerType: 'system' | 'public';
  reference: (node: ReferenceType | null) => void;
  floating: (node: HTMLElement | null) => void;
  getReferenceProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  context: FloatingContext<ReferenceType>;
  sideNavProps?: SideNavProps<any>;
  y: number | null;
}

export const LayoutContext = React.createContext<ILayoutContext>({
  menuOpen: false,
  toggleMenu: () => null,
  headerType: 'system',
  reference: () => null,
  floating: () => null,
  getReferenceProps: () => ({}),
  getFloatingProps: () => ({}),
  context: {} as FloatingContext<ReferenceType>,
  y: null,
});
