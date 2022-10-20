import {
  arrow,
  autoUpdate,
  flip,
  offset,
  Placement,
  ReferenceType,
  safePolygon,
  shift,
  Strategy,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions';
import React from 'react';

import { useIsMounted } from '../helper';

export type TooltipOpenWith = 'click' | 'hover';

export interface TooltipProviderProps {
  /**
   * TooltipTrigger and Tooltip components
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Placement of tooltip, defaults to bottom
   */
  placement?: Placement;
  /**
   * Adds correct event listeners that change the open state
   * Defaults to hover
   */
  openWith?: TooltipOpenWith;
  /**
   * Should Tooltip be initially shown. Won't work with open and onToggle.
   */
  defaultOpen?: boolean;
  /**
   * Should the Tooltip be open or closed.
   * Use to handle state outside of component, should use with onToggle prop.
   */
  open?: boolean;
  /**
   * Callback when Tooltip is toggled.
   * Use to handle state outside of component, should use with open prop.
   */
  onToggle?: (open: boolean) => void;
}

export interface ITooltipContext {
  open: boolean;
  isMounted: boolean;
  openWith: TooltipOpenWith;
  reference: (node: ReferenceType | null) => void;
  floating: (node: HTMLElement | null) => void;
  arrowRef: React.MutableRefObject<HTMLElement | null>;
  x: number | null;
  y: number | null;
  strategy: Strategy;
  getReferenceProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  arrow?: {
    x?: number | undefined;
    y?: number | undefined;
    centerOffset?: number | undefined;
  };
  placement: Placement;
}

export const TooltipContext = React.createContext<ITooltipContext>({
  open: false,
  isMounted: false,
  openWith: 'hover',
  reference: () => null,
  floating: () => null,
  arrowRef: { current: null },
  x: null,
  y: null,
  strategy: 'absolute',
  getReferenceProps: () => ({}),
  getFloatingProps: () => ({}),
  arrow: {
    x: 0,
    y: 0,
    centerOffset: 0,
  },
  placement: 'top',
});

export const TooltipProvider = (props: TooltipProviderProps): JSX.Element => {
  const {
    children,
    placement: placementDefault = 'bottom',
    openWith = 'hover',
    defaultOpen = false,
    open: openOuter,
    onToggle,
  } = props;
  const [open, setOpen] = React.useState(defaultOpen);
  const arrowRef = React.useRef<HTMLElement | null>(null);

  const isOpen = onToggle && typeof openOuter !== 'undefined' ? openOuter : open;

  const onOpenChange = (open: boolean): void => {
    if (typeof openOuter === 'undefined') {
      setOpen(open);
    }

    onToggle?.(open);
  };

  const isMounted = useIsMounted();
  const { x, y, reference, floating, strategy, context, middlewareData, placement } = useFloating({
    placement: placementDefault,
    open: isOpen,
    onOpenChange,
    middleware: [
      offset(8),
      flip(),
      shift({ padding: 8 }),
      arrow({
        element: arrowRef,
        padding: 4,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      handleClose: safePolygon(),
      enabled: openWith === 'hover',
    }),
    useClick(context, {
      enabled: openWith === 'click',
    }),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  return (
    <TooltipContext.Provider
      value={{
        open: isOpen,
        isMounted,
        openWith,
        reference,
        floating,
        arrowRef,
        x,
        y,
        strategy,
        getReferenceProps,
        getFloatingProps,
        arrow: {
          ...middlewareData.arrow,
        },
        placement,
      }}
    >
      {children}
    </TooltipContext.Provider>
  );
};

export default TooltipProvider;
