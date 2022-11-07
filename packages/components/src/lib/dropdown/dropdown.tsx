import { getOverflowAncestors, shift, useFloating } from '@floating-ui/react-dom';
import cn from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';

import { useIsMounted } from '../../helpers';
import { AllowedHTMLTags } from '../../helpers/polymorphic/types';
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
};

export const Dropdown = <C extends React.ElementType = 'a'>(props: DropdownProps<C>) => {
  const { button, items, linkAs } = props;

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
          {(items as DropdownItem<C>[]).map((item, key) => renderDropdownItem(item, key))}
        </ul>
      </div>
    );
  };

  const DropdownItemBEM = (item: DropdownItem<C>) =>
    cn(styles['dropdown__item'], { [styles['dropdown__item--active']]: item.isActive });

  const renderDropdownItem = (item: DropdownItem<C>, key: number): JSX.Element => (
    <li className={DropdownItemBEM(item)} key={key} role="option" aria-selected={item.isActive}>
      <Anchor as={linkAs} className={styles['dropdown__link']} {...item}>
        {item.children}
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
