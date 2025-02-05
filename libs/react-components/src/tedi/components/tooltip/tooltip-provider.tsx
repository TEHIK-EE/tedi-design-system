import { OffsetOptions, Placement } from '@floating-ui/react';
import { createContext } from 'react';

import { useIsTouchDevice } from '../../../community/helpers/hooks/use-is-touch-device';

export type TooltipOpenWith = 'click' | 'hover';
export const ARROW_HEIGHT = 7;
export const ARROW_WIDTH = 14;
export const GAP = 3;
export const DEFAULT_TOOLTIP_OFFSET = GAP + ARROW_HEIGHT;

export interface TooltipProviderProps {
  /**
   * Children of Tooltip.Provider.<br />
   * Provider should be used in app root level.
   */
  children: React.ReactNode;
  /**
   * Placement of tooltip.<br />
   * This is passed to all tooltips, but can be overridden.
   * @default bottom
   */
  placement?: Placement;
  /**
   * Adds correct event listeners that change the open state.<br />
   * This is passed to all tooltips, but can be overridden.
   * @default hover
   */
  openWith?: TooltipOpenWith;
  /**
   * Offset of tooltip.<br />
   * This is passed to all tooltips, but can be overridden.<br />
   * Used to align HeaderDropdown with bottom of the Header.
   * @default GAP + ARROW_HEIGHT (3px + 7px)
   */
  offset?: OffsetOptions;
}

export interface TooltipProviderType {
  openWith: TooltipOpenWith;
  placement: Placement;
  offset: OffsetOptions;
}

export const TooltipProviderContext = createContext<TooltipProviderType>({
  openWith: 'hover',
  placement: 'top',
  offset: DEFAULT_TOOLTIP_OFFSET,
});

export const TooltipProvider = (props: TooltipProviderProps) => {
  const isTouchDevice = useIsTouchDevice();

  const {
    children,
    placement = 'bottom',
    openWith = isTouchDevice ? 'click' : 'hover',
    offset = DEFAULT_TOOLTIP_OFFSET,
  } = props;

  return (
    <TooltipProviderContext.Provider
      value={{
        openWith,
        placement,
        offset,
      }}
    >
      {children}
    </TooltipProviderContext.Provider>
  );
};
