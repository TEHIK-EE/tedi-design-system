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
import { ComponentProps, createContext, ReactNode, useCallback, useMemo, useRef, useState } from 'react';

import { useIsMounted, useIsTouchDevice } from '../../helpers';
import { useLabels } from '../../providers/label-provider';
import { OverlayContent } from './overlay-content';
import { OverlayTrigger } from './overlay-trigger';

export type OverlayOpenWith = 'click' | 'hover';
const GAP = 3 as const;

export interface OverlayProps {
  /**
   * Trigger and Content components
   */
  children: ReactNode | ReactNode[];
  /**
   * Placement of content.
   * @default bottom
   */
  placement?: Placement;
  /**
   * Adds correct event listeners that change the open state.
   * @default hover
   */
  openWith?: OverlayOpenWith;
  /**
   * Props passed to FloatingFocusManager
   */
  focusManager?: Omit<ComponentProps<typeof FloatingFocusManager>, 'context' | 'children'>;
  /**
   * Is open by default?<br />
   * Does not work with open and onToggle props.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Is open?<br />
   * Use this with onToggle prop for controlled component.
   */
  open?: boolean;
  /**
   * Callback when toggled.<br />
   * Use this with open prop for state outside of component.
   */
  onToggle?: (open: boolean) => void;
  /**
   * Changes aria attributes on trigger and content based on the components role
   * @default tooltip
   */
  role?: UseRoleProps['role'];
  /**
   * Content overlay arrow dimensions.
   */
  arrowDimensions?: {
    width: number;
    height: number;
  };
  /**
   * Offset of content.<br />
   * Used to align HeaderDropdown with bottom of the Header.
   * @default GAP + ARROW_HEIGHT (3px + 7px)
   */
  offset?: OffsetOptions;
  /**
   * Is dismissible by clicking outside or Escape button?
   * @default true
   */
  dismissible?: boolean;
  /**
   * Is scrolling locked outside of Popover content?
   * @default false
   */
  scrollLock?: boolean;
}

export interface OverlayContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isMounted: boolean;
  openWith: OverlayOpenWith;
  focusManager?: OverlayProps['focusManager'];
  reference: (node: ReferenceType | null) => void;
  floating: (node: HTMLElement | null) => void;
  arrowRef: React.MutableRefObject<SVGSVGElement | null>;
  x: number | null;
  y: number | null;
  strategy: Strategy;
  getReferenceProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  arrow?: {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    centerOffset?: number;
  };
  placement: Placement;
  context: FloatingContext<ReferenceType>;
  scrollLock?: boolean;
}

export const OverlayContext = createContext<OverlayContextType>({
  open: false,
  onOpenChange: () => {},
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
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    centerOffset: 0,
  },
  placement: 'top',
  context: {} as FloatingContext,
  scrollLock: undefined,
});

function Overlay(props: OverlayProps) {
  const { getLabel } = useLabels();
  const isTouchDevice = useIsTouchDevice();

  const {
    children,
    placement: placementDefault = 'bottom',
    openWith = isTouchDevice ? 'click' : 'hover',
    defaultOpen = false,
    open: externalOpen,
    onToggle,
    role = 'tooltip',
    arrowDimensions,
    offset: offsetOptions = GAP + (arrowDimensions?.height ?? 0),
    focusManager,
    dismissible,
    scrollLock,
  } = props;

  const {
    order = ['reference', 'content'],
    modal = false,
    initialFocus = -1,
    ...restFocusManager
  } = focusManager ?? {};

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
      enabled: openWith === 'hover',
      handleClose: safePolygon(),
    }),
    useClick(context, {
      toggle: dismissible,
    }),
    useFocus(context, {
      enabled: openWith === 'hover',
    }),
    useRole(context, { role }),
    useDismiss(context, {
      enabled: dismissible,
      outsidePressEvent: openWith === 'click' ? 'mousedown' : 'pointerdown',
    }),
  ]);

  return (
    <OverlayContext.Provider
      value={{
        open: isOpen,
        onOpenChange,
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
          width: arrowDimensions?.width,
          height: arrowDimensions?.height,
          ...middlewareData.arrow,
        },
        context,
        placement,
        scrollLock,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
}

Overlay.Trigger = OverlayTrigger;
Overlay.Content = OverlayContent;
export default Overlay;
