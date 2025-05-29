import { useFloating } from '@floating-ui/react';
import { useState } from 'react';

export const useSidenavState = (initialOpen = false) => {
  const [menuOpen, setMenuOpen] = useState(initialOpen);
  const { refs, context, floatingStyles } = useFloating({
    open: menuOpen,
    onOpenChange: setMenuOpen,
  });

  const toggle = () => setMenuOpen((prev) => !prev);

  return {
    menuOpen,
    setMenuOpen,
    toggle,
    floatingContext: context,
    floatingStyles,
    floatingRef: refs.setFloating,
    referenceRef: refs.setReference,
    getReferenceProps: refs.reference,
  };
};
