import {
  arrow,
  autoUpdate,
  flip,
  FloatingContext,
  FloatingFocusManager,
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
} from '@floating-ui/react';
import { UseRoleProps } from '@floating-ui/react/src/hooks/useRole';
import React from 'react';

import { useIsMounted } from '../../helpers';
import { useLabels } from '../../providers/label-provider';

export type TooltipOpenWith = 'click' | 'hover';
export const ARROW_HEIGHT = 7;
export const ARROW_WIDTH = 14;
export const GAP = 3;

export interface TooltipProviderProps {
  /**
   * TooltipTrigger and Tooltip components
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Placement of tooltip
   * @default bottom
   */
  placement?: Placement;
  /**
   * Adds correct event listeners that change the open state
   * @default hover
   */
  openWith?: TooltipOpenWith;
  /**
   * Props passed to FloatingFocusManager
   */
  focusManager?: Omit<React.ComponentProps<typeof FloatingFocusManager>, 'context' | 'children'>;
  /**
   * Should Tooltip be initially shown. Won't work with open and onToggle.
   * @default false
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
  /**
   * Changes aria attributes on trigger and tooltip based on the components role
   * @default tooltip
   */
  role?: UseRoleProps['role'];
}

export interface ITooltipContext {
  open: boolean;
  isMounted: boolean;
  openWith: TooltipOpenWith;
  focusManager?: TooltipProviderProps['focusManager'];
  reference: (node: ReferenceType | null) => void;
  floating: (node: HTMLElement | null) => void;
  arrowRef: React.MutableRefObject<SVGSVGElement | null>;
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
  context: FloatingContext<ReferenceType>;
}

export const TooltipContext = React.createContext<ITooltipContext>({
  open: false,
  isMounted: false,
  openWith: 'hover',
  reference: () => null,
  floating: () => null,
  focusManager: {},
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
  context: {} as FloatingContext,
});

export const TooltipProvider = (props: TooltipProviderProps): JSX.Element => {
  const { getLabel } = useLabels();
  const {
    children,
    placement: placementDefault = 'bottom',
    openWith = 'hover',
    defaultOpen = false,
    open: openOuter,
    onToggle,
    role = 'tooltip',
  } = props;
  const {
    order = ['reference', 'content'],
    modal = false,
    initialFocus = -1,
    ...restFocusManager
  } = props.focusManager ?? {};
  const { visuallyHiddenDismiss = modal ? getLabel('close') : false } = restFocusManager ?? {};
  const [open, setOpen] = React.useState(defaultOpen);
  const arrowRef = React.useRef<SVGSVGElement | null>(null);

  const isOpen = onToggle && typeof openOuter !== 'undefined' ? openOuter : open;

  const onOpenChange = (open: boolean): void => {
    if (typeof openOuter === 'undefined') {
      setOpen(open);
    }

    onToggle?.(open);
  };

  const isMounted = useIsMounted();
  const { x, y, refs, strategy, context, middlewareData, placement } = useFloating({
    placement: placementDefault,
    open: isOpen,
    onOpenChange,
    middleware: [
      offset(GAP + ARROW_HEIGHT),
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
    useClick(context),
    useFocus(context, {
      enabled: openWith === 'hover',
    }),
    useRole(context, { role }),
    useDismiss(context),
  ]);

  return (
    <TooltipContext.Provider
      value={{
        open: isOpen,
        isMounted,
        openWith,
        reference: refs.setReference,
        floating: refs.setFloating,
        arrowRef,
        focusManager: {
          order,
          initialFocus,
          modal,
          visuallyHiddenDismiss,
          ...restFocusManager,
        },
        x,
        y,
        strategy,
        getReferenceProps,
        getFloatingProps,
        arrow: {
          ...middlewareData.arrow,
        },
        context,
        placement,
      }}
    >
      {children}
    </TooltipContext.Provider>
  );
};

export default TooltipProvider;
