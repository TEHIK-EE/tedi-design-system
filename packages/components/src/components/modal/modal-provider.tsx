import {
  FloatingContext,
  ReferenceType,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import React from 'react';

export interface ModalProviderProps {
  /**
   * ModalTrigger and Modal components
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Should modal be initially shown. Won't work with open and onToggle.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Should the modal be open or closed.
   * Use to handle state outside of component, should use with onToggle prop.
   */
  open?: boolean;
  /**
   * Callback when modal is toggled.
   * Use to handle state outside of component, should use with open prop.
   */
  onToggle?: (open: boolean) => void;
  /**
   * Should modal stay on screen until explicitly closed.
   * Page content will be accessible.
   * @default false
   */
  persist?: boolean;
}

export interface IModalContext {
  isOpen: boolean;
  reference: (node: ReferenceType | null) => void;
  floating: (node: HTMLElement | null) => void;
  getReferenceProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  closeModal: () => void;
  context: FloatingContext<ReferenceType>;
  persist: boolean;
}

export const ModalContext = React.createContext<IModalContext>({
  isOpen: false,
  reference: () => null,
  floating: () => null,
  getReferenceProps: () => ({}),
  getFloatingProps: () => ({}),
  closeModal: () => null,
  context: {} as FloatingContext<ReferenceType>,
  persist: false,
});

export const ModalProvider = (props: ModalProviderProps): JSX.Element => {
  const { children, defaultOpen = false, onToggle, persist = false } = props;
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);

  const isOpen = onToggle && typeof props.open !== 'undefined' ? props.open : innerOpen;

  const { reference, floating, context } = useFloating({
    open: isOpen,
    onOpenChange: (open: boolean) => (open ? openModal() : closeModal()),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context, { role: persist ? undefined : 'dialog' }),
    useDismiss(context, { escapeKey: !persist, enabled: !persist }),
  ]);

  const closeModal = () => {
    if (typeof props.open === 'undefined') {
      setInnerOpen(false);
    }

    onToggle?.(false);
  };

  const openModal = (): void => {
    if (typeof props.open === 'undefined') {
      setInnerOpen(true);
    }

    onToggle?.(true);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        reference,
        floating,
        getReferenceProps,
        getFloatingProps,
        closeModal,
        context,
        persist,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
