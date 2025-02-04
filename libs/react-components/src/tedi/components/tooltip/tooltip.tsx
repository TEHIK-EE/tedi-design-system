import {
  arrow,
  autoUpdate,
  flip,
  FloatingContext,
  FloatingFocusManager,
  offset,
  OffsetOptions,
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
  UseRoleProps,
} from '@floating-ui/react';
import React, { useCallback, useMemo } from 'react';

import { useIsMounted } from '../../../tedi/helpers';
import { useLabels } from '../../../tedi/providers/label-provider';
import TooltipContent from './tooltip-content';
import { TooltipProvider, TooltipProviderContext } from './tooltip-provider';
import TooltipTrigger from './tooltip-trigger';

export type TooltipOpenWith = 'click' | 'hover';

export interface TooltipProps {
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
  /**
   * Allows to overwrite offSet options.
   * Used to align HeaderDropdown with bottom of the Header.
   * @default GAP + ARROW_HEIGHT (3px + 7px)
   */
  offset?: OffsetOptions;
}

export interface TooltipContextType {
  open: boolean;
  isMounted: boolean;
  openWith: TooltipOpenWith;
  focusManager?: TooltipProps['focusManager'];
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

export const TooltipContext = React.createContext<TooltipContextType>({
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

function Tooltip(props: TooltipProps) {
  const { getLabel } = useLabels();

  const {
    openWith: providerOpenWith,
    placement: providerPlacement,
    offset: providerOffset,
  } = React.useContext(TooltipProviderContext);

  const {
    children,
    placement: placementDefault = providerPlacement,
    openWith = providerOpenWith,
    defaultOpen = false,
    open: externalOpen,
    onToggle,
    role = 'tooltip',
    offset: offsetOptions = providerOffset,
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

  const isOpen = useMemo(() => {
    if (onToggle && typeof externalOpen !== 'undefined') return externalOpen;
    return open;
  }, [onToggle, externalOpen, open]);

  const onOpenChange = useCallback(
    (open: boolean): void => {
      if (typeof externalOpen === 'undefined') {
        setOpen(open);
      }

      onToggle?.(open);
    },
    [externalOpen, setOpen, onToggle]
  );

  const isMounted = useIsMounted();
  const { x, y, refs, strategy, context, middlewareData, placement } = useFloating({
    placement: placementDefault,
    open: isOpen,
    onOpenChange,
    middleware: [
      offset(offsetOptions),
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
    useDismiss(context, {
      outsidePressEvent: openWith === 'click' ? 'mousedown' : 'pointerdown', // https://floating-ui.com/docs/dialog#interaction-hooks
    }),
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
}

Tooltip.Provider = TooltipProvider;
Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;
export default Tooltip;
