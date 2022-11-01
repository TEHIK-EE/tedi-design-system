import { getOverflowAncestors, shift, useFloating } from '@floating-ui/react-dom';
import cn from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';

import { useIsMounted } from '../../helpers';
import Anchor, { AnchorProps } from '../anchor/anchor';
import { Button, ButtonProps } from '../button/button';
import styles from './dropdown.module.scss';

export interface DropdownItem extends Omit<AnchorProps, 'children'> {
  /**
   * Label of item
   */
  label: string;
  /**
   * If the item is active
   */
  isActive?: boolean;
}

export interface DropdownProps {
  /**
   * Dropdown trigger props
   */
  button: ButtonProps;
  /**
   * Dropdown items
   */
  items: DropdownItem[];
}

export const Dropdown = (props: DropdownProps) => {
  const { button, items } = props;

  const [isOpen, setIsOpen] = React.useState(false);
  const isMounted = useIsMounted();

  const { x, y, reference, floating, strategy, update, refs } = useFloating({
    placement: 'bottom-start',
    middleware: [shift()],
  });

  // Handle click outside
  React.useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  });

  // Update on scroll and resize for all relevant nodes
  React.useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return;
    }

    // refs.reference.current is a VirtualElement, not a Node
    // So this component could do with a refactor

    const parents = [
      ...getOverflowAncestors(refs.reference.current as unknown as Node),
      ...getOverflowAncestors(refs.floating.current),
    ];

    parents.forEach((parent) => {
      parent.addEventListener('scroll', update);
      parent.addEventListener('resize', update);
    });

    return () => {
      parents.forEach((parent) => {
        parent.removeEventListener('scroll', update);
        parent.removeEventListener('resize', update);
      });
    };
  }, [refs.reference, refs.floating, update]);

  const onClickOutside = (event: MouseEvent): void => {
    const clickedOnDropdown =
      refs.floating.current && event.target instanceof Node && refs.floating.current.contains(event.target);
    const clickedOnTrigger =
      refs.reference.current &&
      event.target instanceof Node &&
      (refs.reference.current as unknown as any).contains(event.target); // eslint-disable-line @typescript-eslint/no-explicit-any

    if (clickedOnDropdown || clickedOnTrigger) {
      return;
    }

    setIsOpen(false);
  };

  const renderDropdown = (): JSX.Element => {
    return (
      <div
        ref={floating}
        style={{
          position: strategy,
          top: y ?? '',
          left: x ?? '',
          display: isOpen ? 'block' : 'none',
        }}
        className={styles['dropdown-wrapper']}
      >
        <ul className={styles['dropdown']} role="listbox">
          {items.map((item, key) => renderDropdownItem(item, key))}
        </ul>
      </div>
    );
  };

  const DropdownItemBEM = (item: DropdownItem) =>
    cn(styles['dropdown__item'], { [styles['dropdown__item--active']]: item.isActive });

  const renderDropdownItem = (item: DropdownItem, key: number): JSX.Element => (
    <li className={DropdownItemBEM(item)} key={key} role="option" aria-selected={item.isActive}>
      <Anchor className={styles['dropdown__link']} {...item}>
        {item.label}
      </Anchor>
    </li>
  );

  return (
    <>
      <Button {...button} onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)} ref={reference} />
      {isMounted && isOpen ? ReactDOM.createPortal(renderDropdown(), document.body) : renderDropdown()}
    </>
  );
};

export default Dropdown;
