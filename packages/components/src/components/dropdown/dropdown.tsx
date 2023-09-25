import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../providers/label-provider';
import { Button, ButtonProps } from '../button/button';
import styles from './dropdown.module.scss';

export type DropdownItem = {
  /**
   * Content of the item
   */
  children: React.ReactNode;
  /**
   * Callback when item is clicked
   */
  onClick?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  /**
   * Is item active
   */
  isActive?: boolean;
  /**
   * Is item disabled
   */
  isDisabled?: boolean;
};

export type DropdownProps = {
  /**
   * Dropdown items
   */
  items: DropdownItem[];
  /**
   * Dropdown trigger props
   */
  button: ButtonProps;
  /**
   * Callback when one of the items is clicked
   */
  onItemClick?: (item: DropdownItem, index: number, e: React.MouseEvent | React.KeyboardEvent) => void;
  /**
   * Close menu when item is clicked.
   * @default true
   */
  closeMenuOnClick?: boolean;
  /**
   * Props passed to FloatingFocusManager
   */
  focusManager?: Omit<React.ComponentProps<typeof FloatingFocusManager>, 'context' | 'children'>;
};

export const Dropdown = (props: DropdownProps) => {
  const { getLabel } = useLabels();
  const { button, items, onItemClick, closeMenuOnClick = true, ...rest } = props;
  const { initialFocus = -1, modal = false, ...restFocusManager } = props.focusManager ?? {};
  const { visuallyHiddenDismiss = modal ? getLabel('close') : false } = restFocusManager ?? {};
  const nodeId = useFloatingNodeId();
  const listItemsRef = React.useRef<Array<HTMLAnchorElement | null>>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const { x, y, strategy, refs, placement, context } = useFloating({
    placement: 'bottom-start',
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const firstSelectedItemIndex = (items as DropdownItem[]).findIndex((i) => i.isActive);

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useClick(context),
    useListNavigation(context, {
      listRef: listItemsRef,
      activeIndex,
      selectedIndex: firstSelectedItemIndex,
      onNavigate: setActiveIndex,
      loop: true,
    }),
    useRole(context, { role: 'listbox' }),
    useDismiss(context),
  ]);

  const renderDropdown = (): JSX.Element | null => {
    const content = (
      <FloatingFocusManager
        context={context}
        initialFocus={initialFocus}
        visuallyHiddenDismiss={visuallyHiddenDismiss}
        modal={modal}
        {...restFocusManager}
      >
        <div
          {...getFloatingProps({
            ref: refs.setFloating,
            style: {
              position: strategy,
              left: x ?? 0,
              top: y ?? 0,
            },
            className: styles['dropdown'],
            onKeyDown(event) {
              if (event.key === 'Tab') {
                setIsOpen(false);
              }
            },
          })}
          data-placement={placement}
        >
          {items.map((item, key) => renderDropdownItem(item, key))}
        </div>
      </FloatingFocusManager>
    );

    return isOpen ? content : null;
  };

  const DropdownItemBEM = (item: DropdownItem) =>
    cn(styles['dropdown__item'], {
      [styles['dropdown__item--active']]: item.isActive,
      [styles['dropdown__item--disabled']]: item.isDisabled,
    });

  const onClick = (item: DropdownItem, index: number, e: React.MouseEvent | React.KeyboardEvent) => {
    onItemClick?.(item, index, e);
    item?.onClick?.(e);

    closeMenuOnClick && setIsOpen(false);
  };

  const renderDropdownItem = (item: DropdownItem, key: number): JSX.Element => (
    <button
      key={key}
      {...getItemProps({
        disabled: item.isDisabled,
        tabIndex: activeIndex === key ? 0 : -1,
        role: 'option',
        className: DropdownItemBEM(item),
        onClick: (e) => onClick(item, key, e),
        onKeyDown(event) {
          if (event.key === 'Enter') {
            onClick(item, key, event);
          }
        },
        ref(node: HTMLAnchorElement) {
          listItemsRef.current[key] = node;
        },
      })}
    >
      {item.children}
    </button>
  );

  return (
    <>
      <Button
        data-name="dropdown"
        {...rest}
        {...button}
        {...getReferenceProps({
          ref: refs.setReference,
          tabIndex: 0,
        })}
      />
      <FloatingPortal>{renderDropdown()}</FloatingPortal>
    </>
  );
};

export default Dropdown;
