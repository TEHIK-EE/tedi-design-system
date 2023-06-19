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
   * Should modal be dismissable by pressing escape or outside of the modal.
   * @default true
   */
  isDismissable?: boolean;
}

export interface IModalContext {
  isOpen: boolean;
  reference: (node: ReferenceType | null) => void;
  floating: (node: HTMLElement | null) => void;
  getReferenceProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  closeModal: () => void;
  context: FloatingContext<ReferenceType>;
  isDismissable: boolean;
}

export const ModalContext = React.createContext<IModalContext>({
  isOpen: false,
  reference: () => null,
  floating: () => null,
  getReferenceProps: () => ({}),
  getFloatingProps: () => ({}),
  closeModal: () => null,
  context: {} as FloatingContext<ReferenceType>,
  isDismissable: true,
});

export const ModalProvider = (props: ModalProviderProps): JSX.Element => {
  const { children, defaultOpen = false, onToggle, isDismissable = true } = props;
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);

  const isOpen = onToggle && typeof props.open !== 'undefined' ? props.open : innerOpen;

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: (open: boolean) => (open ? openModal() : closeModal()),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context, { enabled: isDismissable }),
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
        reference: refs.setReference,
        floating: refs.setFloating,
        getReferenceProps,
        getFloatingProps,
        closeModal,
        context,
        isDismissable,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
