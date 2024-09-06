import React from 'react';
import { flushSync } from 'react-dom';

import { Row } from '../../../../tedi/src/components/grid';
import { VerticalSpacing } from '../../../../tedi/src/components/vertical-spacing';
import { useLayout } from '../../helpers';
import { ModalContext } from '../modal';
import Heading from '../typography/heading/heading';
import { TableOfContentsProps } from './table-of-contents';
import { TableOfContentsItem } from './table-of-contents-item';

export const TableOfContentsItems = (
  props: TableOfContentsProps & { setReturnFocus?: React.Dispatch<React.SetStateAction<boolean>> }
) => {
  const { items, setReturnFocus, showIcons, heading, breakToMobile = ['mobile'] } = props;
  const isMobileLayout = useLayout(breakToMobile);
  const showTitle = showIcons ? true : !isMobileLayout;
  const { closeModal } = React.useContext(ModalContext);
  const id = React.useId();

  const handleCloseModal = () => {
    // modal has to re-render with the prop returnFocus={false} first before we close it
    // otherwise the focus doesn't stay on the section the user navigated to
    flushSync(() => {
      setReturnFocus?.(false);
    });

    closeModal?.();
    setReturnFocus?.(true);
  };

  return (
    <VerticalSpacing size={0.5}>
      {showTitle && (
        <Heading element="h3" modifiers="h4" id={id}>
          {heading}
        </Heading>
      )}
      <nav aria-labelledby={id}>
        <Row element="ul" direction="column" gap={2}>
          {items.map((i, index) => (
            <TableOfContentsItem key={`toc-item-${index}`} handleCloseModal={handleCloseModal} {...i} />
          ))}
        </Row>
      </nav>
    </VerticalSpacing>
  );
};
