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

import { AllowedHTMLTags } from '../../helpers/polymorphic/types';
import { useLabels } from '../../providers/label-provider';
import Anchor, { AnchorProps } from '../anchor/anchor';
import { Button, ButtonProps } from '../button/button';
import styles from './dropdown.module.scss';

export type DropdownItem<C extends React.ElementType = 'a'> = AnchorProps<C>;

type ConditionalTypes<C extends React.ElementType = 'a'> =
  | {
      /**
       * Render all links as this component<br />
       * See [Anchor/CustomComponent](/?path=/docs/components-anchor--custom-component) for an example
       */
      linkAs: AllowedHTMLTags<C, 'a' | React.ComponentType<any>>;
      /**
       * dropdown items
       */
      items: DropdownItem<C>[];
    }
  | {
      linkAs?: never;
      items: DropdownItem<any>[];
    };

export type DropdownProps<C extends React.ElementType = 'a'> = ConditionalTypes<C> & {
  /**
   * Dropdown trigger props
   */
  button: ButtonProps;
  /**
   * Callback when one of the items is clicked
   */
  onItemClick?: (item: DropdownItem<C>, index: number, e: React.MouseEvent) => void;
  /**
   * Close menu when item is clicked. default is true
   */
  closeMenuOnClick?: boolean;
  /**
   * Props passed to FloatingFocusManager
   */
  focusManager?: Omit<React.ComponentProps<typeof FloatingFocusManager>, 'context' | 'children'>;
};

export const Dropdown = <C extends React.ElementType = 'a'>(props: DropdownProps<C>) => {
  const { getLabel } = useLabels();
  const { button, items, linkAs, onItemClick, closeMenuOnClick = true, ...rest } = props;
  const { initialFocus = -1, modal = false, ...restFocusManager } = props.focusManager ?? {};
  const { visuallyHiddenDismiss = modal ? getLabel('close') : false } = restFocusManager ?? {};
  const nodeId = useFloatingNodeId();
  const listItemsRef = React.useRef<Array<HTMLAnchorElement | null>>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const { x, y, strategy, floating, placement, context, reference } = useFloating({
    placement: 'bottom-start',
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const firstSelectedItemIndex = (items as DropdownItem<C>[]).findIndex((i) => i.isActive);

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
            ref: floating,
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
          {(items as DropdownItem<C>[]).map((item, key) => renderDropdownItem(item, key))}
        </div>
      </FloatingFocusManager>
    );

    return isOpen ? content : null;
  };

  const DropdownItemBEM = (item: DropdownItem<C>) =>
    cn(styles['dropdown__item'], { [styles['dropdown__item--active']]: item.isActive });

  const onClick = (item: DropdownItem<C>, index: number, e: React.MouseEvent) => {
    onItemClick?.(item, index, e);
    item?.onClick?.(e);

    closeMenuOnClick && setIsOpen(false);
  };

  const renderDropdownItem = (item: DropdownItem<C>, key: number): JSX.Element => (
    <Anchor
      as={linkAs}
      key={key}
      {...item}
      {...getItemProps({
        tabIndex: activeIndex === key ? 0 : -1,
        role: 'option',
        className: DropdownItemBEM(item),
        onClick: (e) => onClick(item, key, e),
        ref(node: HTMLAnchorElement) {
          listItemsRef.current[key] = node;
        },
      })}
    >
      {item.children}
    </Anchor>
  );

  return (
    <>
      <Button
        data-name="dropdown"
        {...rest}
        {...button}
        {...getReferenceProps({
          ref: reference,
          tabIndex: 0,
        })}
      />
      <FloatingPortal>{renderDropdown()}</FloatingPortal>
    </>
  );
};

export default Dropdown;
