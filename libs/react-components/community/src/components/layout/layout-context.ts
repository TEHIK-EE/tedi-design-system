import { FloatingContext, ReferenceType } from '@floating-ui/react';
import React from 'react';

import { IntentionalAny } from '../../../../shared/types';
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
  sideNavProps?: SideNavProps<IntentionalAny>;
  y: number | null;
  /**
   * reference to header element to position HeaderDropdown aligned with bottom of header.
   */
  headerElement: React.RefObject<HTMLElement> | null;
  /**
   * reference to header bottom element to position affixes relative to it.
   */
  headerBottomElement: React.RefObject<HTMLDivElement> | null;
  headerBottomSize?: DOMRect;
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
  headerElement: null,
  headerBottomElement: null,
  headerBottomSize: undefined,
});
