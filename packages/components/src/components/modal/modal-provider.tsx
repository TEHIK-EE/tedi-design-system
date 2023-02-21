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
}

export interface IModalContext {
  isOpen: boolean;
  reference: (node: ReferenceType | null) => void;
  floating: (node: HTMLElement | null) => void;
  getReferenceProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  closeModal: () => void;
  context: FloatingContext<ReferenceType>;
}

export const ModalContext = React.createContext<IModalContext>({
  isOpen: false,
  reference: () => null,
  floating: () => null,
  getReferenceProps: () => ({}),
  getFloatingProps: () => ({}),
  closeModal: () => null,
  context: {} as FloatingContext<ReferenceType>,
});

export const ModalProvider = (props: ModalProviderProps): JSX.Element => {
  const { children, defaultOpen = false, onToggle } = props;
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);

  const isOpen = onToggle && typeof props.open !== 'undefined' ? props.open : innerOpen;

  const { reference, floating, context } = useFloating({
    open: isOpen,
    onOpenChange: (open: boolean) => (open ? openModal() : closeModal()),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context, { role: 'dialog' }),
    useDismiss(context),
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
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
