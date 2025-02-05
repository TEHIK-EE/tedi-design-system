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
import { ComponentProps, createContext, ReactNode, useCallback, useContext, useMemo, useRef, useState } from 'react';

import { useIsMounted } from '../../../tedi/helpers';
import { useLabels } from '../../../tedi/providers/label-provider';
import { TooltipContent } from './tooltip-content';
import { TooltipProvider, TooltipProviderContext } from './tooltip-provider';
import { TooltipTrigger } from './tooltip-trigger';

export type TooltipOpenWith = 'click' | 'hover';

export interface TooltipProps {
  /**
   * TooltipTrigger and Tooltip components
   */
  children: ReactNode | ReactNode[];
  /**
   * Placement of tooltip.<br />
   * By default uses Tooltip.Provider values.
   * @default bottom
   */
  placement?: Placement;
  /**
   * Adds correct event listeners that change the open state.<br />
   * By default uses Tooltip.Provider values.
   * @default hover
   */
  openWith?: TooltipOpenWith;
  /**
   * Props passed to FloatingFocusManager
   */
  focusManager?: Omit<ComponentProps<typeof FloatingFocusManager>, 'context' | 'children'>;
  /**
   * Is tooltip open by default?<br />
   * Does not work with open and onToggle props.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Is tooltip open?<br />
   * Use this with onToggle prop for controlled component.
   */
  open?: boolean;
  /**
   * Callback when Tooltip is toggled.<br />
   * Use this with open prop for state outside of component.
   */
  onToggle?: (open: boolean) => void;
  /**
   * Changes aria attributes on trigger and tooltip based on the components role
   * @default tooltip
   */
  role?: UseRoleProps['role'];
  /**
   * Offset of tooltip.<br />
   * Used to align HeaderDropdown with bottom of the Header.<br />
   * By default uses Tooltip.Provider values.
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

export const TooltipContext = createContext<TooltipContextType>({
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
  } = useContext(TooltipProviderContext);

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
  const [open, setOpen] = useState(defaultOpen);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const isMounted = useIsMounted();

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
