import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  Placement,
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
import classNames from 'classnames';
import React, { cloneElement, JSX } from 'react';

import { useLabels } from '../../../../tedi';
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
  children: React.ReactNode;
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
  onOpenChange?: (isOpen: boolean) => void;
  className?: string;
  placement?: Placement;
  layout?: 'column' | 'row';
  /**
   * Controlled open state
   */
  isOpen?: boolean;
  sameWidth?: boolean;
};

type DropdownTriggerProps = {
  children: React.ReactElement;
};

export type DropdownContentProps = {
  items?: DropdownItem[];
  children?: React.ReactNode;
};

const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
  return children;
};

const DropdownContent = ({ items, children }: DropdownContentProps) => {
  return null;
};

export const Dropdown = (props: DropdownProps) => {
  const {
    children,
    onItemClick,
    closeMenuOnClick = true,
    onOpenChange,
    placement: placementProp = 'bottom-start',
    layout = 'column',
    isOpen: isOpenProp,
    sameWidth = false,
    className,
  } = props;
  const { initialFocus = -1, modal = false, ...restFocusManager } = props.focusManager ?? {};
  const { getLabel } = useLabels();
  const { visuallyHiddenDismiss = modal ? getLabel('close') : false } = restFocusManager ?? {};
  const nodeId = useFloatingNodeId();
  const listItemsRef = React.useRef<Array<HTMLAnchorElement | null>>([]);
  const [internalIsOpen, setIsOpen] = React.useState(false);
  const isOpen = isOpenProp !== undefined ? isOpenProp : internalIsOpen;
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  let contentItems: DropdownItem[] = [];
  let customContent: React.ReactNode = null;
  let trigger: React.ReactElement | null = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === DropdownTrigger) {
        trigger = (child.props as DropdownTriggerProps).children;
      } else if (child.type === DropdownContent) {
        const contentProps = child.props as DropdownContentProps;
        const { items, children: contentChildren } = contentProps;

        if (
          Array.isArray(items) &&
          items.every((item): item is DropdownItem => typeof item === 'object' && item !== null && 'children' in item)
        ) {
          contentItems = items;
        } else if (contentChildren) {
          customContent = contentChildren;
        }
      }
    }
  });

  if (!trigger) {
    throw new Error('Dropdown must have a Dropdown.Trigger child');
  }

  const sameWidthMiddleware = {
    name: 'sameWidth',
    fn: ({ rects, elements }: { rects: { reference: { width: number } }; elements: { floating: HTMLElement } }) => {
      const width = rects.reference.width;
      elements.floating.style.width = `${width}px`;
      return {
        data: { width },
      };
    },
  };

  const { x, y, strategy, refs, placement, context } = useFloating({
    placement: placementProp,
    nodeId,
    open: isOpen,
    onOpenChange: (open) => {
      if (isOpenProp === undefined) {
        setIsOpen(open);
      }
      onOpenChange?.(open);
    },
    middleware: [...(sameWidth ? [sameWidthMiddleware] : []), flip(), shift(), offset(5)],
    whileElementsMounted: autoUpdate,
  });

  const firstSelectedItemIndex = contentItems.findIndex((i) => i.isActive);

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
    useDismiss(context, {
      outsidePress: (event) => {
        const isNestedDropdown = event.target instanceof Element && event.target.closest('[data-floating-ui-portal]');
        return !isNestedDropdown;
      },
      escapeKey: false,
      referencePress: false,
    }),
  ]);

  const renderDropdown = (): JSX.Element | null => {
    if (!isOpen) return null;

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
            className: classNames(
              styles['tedi-dropdown'],
              {
                [styles['tedi-dropdown--row']]: layout === 'row',
                [styles['tedi-dropdown--column']]: layout === 'column',
              },
              className
            ),
            onKeyDown(event) {
              if (event.key === 'Tab') {
                setIsOpen(false);
              }
            },
          })}
          data-placement={placement}
        >
          {contentItems.length > 0 ? contentItems.map((item, key) => renderDropdownItem(item, key)) : customContent}
        </div>
      </FloatingFocusManager>
    );

    return content;
  };

  const DropdownItemBEM = (item: DropdownItem) =>
    cn(styles['tedi-dropdown__item'], {
      [styles['tedi-dropdown__item--active']]: item.isActive,
      [styles['tedi-dropdown__item--disabled']]: item.isDisabled,
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

  const triggerWithProps = trigger
    ? cloneElement(trigger, {
        ...getReferenceProps({
          ref: refs.setReference,
          tabIndex: 0,
          // @ts-expect-error: 'rest' props do not fully match Anchor's expected props, but they are validated elsewhere
          ...trigger.props,
        }),
      })
    : null;

  return (
    <>
      {triggerWithProps}
      <FloatingPortal>{renderDropdown()}</FloatingPortal>
    </>
  );
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;

export default Dropdown;
