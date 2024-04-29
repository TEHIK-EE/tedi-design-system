import React from 'react';

import { Layouts, useLayout } from '../../helpers';
import { useLabels } from '../../providers/label-provider';
import Affix from '../affix/affix';
import { Card, CardContent } from '../card';
import HideOnScroll from '../hide-on-scroll/hide-on-scroll';
import { ModalProps, ModalProviderProps } from '../modal';
import StretchContent from '../stretch-content/stretch-content';
import { TableOfContentsItemProps } from './table-of-contents-item';
import { TableOfContentsItems } from './table-of-contents-items';
import { TableOfContentsModal } from './table-of-contents-modal';

export interface TableOfContentsProps {
  /**
   * List of items to be shown in the table of contents
   */
  items: TableOfContentsItemProps[];
  /**
   * Heading of the table of contents
   * @default Value from LabelProvider
   */
  heading?: string;
  /**
   * Should component be initially shown. Won't work with open and onToggle.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Should the component be open or closed.
   * Use to handle state outside of component, should use with onToggle prop.
   */
  open?: boolean;
  /**
   * Callback when component is toggled.
   * Use to handle state outside of component, should use with open prop.
   */
  onToggle?: (open: boolean) => void;
  /**
   * Show icons before items
   * @default false
   */
  showIcons?: boolean;
  /**
   * When should mobile layout to be used
   * @default 'mobile'
   */
  breakToMobile?: Layouts;
  /**
   * Props passed to ModalProvider
   */
  modalProviderProps?: ModalProviderProps;
  /**
   * Props passed to Modal
   */
  modalProps?: ModalProps;
  /**
   * Should the component hide on mobile view when the page is scrolled
   * @default true
   */
  hideOnScroll?: boolean;
  /**
   * Open items' id's
   **/
  openItems?: string[];
}

interface TableOfContentsContext {
  openItems?: string[];
  showIcons?: boolean;
}

export const TableOfContentsContext = React.createContext<TableOfContentsContext>({
  openItems: undefined,
  showIcons: undefined,
});

/**
 * TableOfContents is helper component that can be used to show table of contents for long pages or multistep forms. It keeps itself fixed next to the content when scrolled (On desktop). <br /><br />
 * When used to link to sections on the same page, make sure to use the same id on the section and the table of contents item Anchor. Setting `tabIndex` on the section is also necessary for the focus to work correctly in some screen-readers.
 * More info <a href="https://github.com/gettalong/kramdown/issues/215" target="_blank">here</a> and <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=262171" target="_blank">here</a>.<br /><br />
 * When used to keep track of multistep form progress, usage on `showIcons={true}` is recommended. Keep in mind that `isValid` property is optional and can be undefined to show not validated steps. <br />
 * Also it is possible to use disabled-text as item content, to show that user can't skip to next step. <br /><br />
 */
export const TableOfContents = (props: TableOfContentsProps) => {
  const { getLabel } = useLabels();
  const { breakToMobile = ['mobile'], heading = getLabel('table-of-contents.title'), hideOnScroll = true } = props;
  const isMobileLayout = useLayout(breakToMobile);
  const { showIcons, openItems, ...rest } = props;

  return (
    <TableOfContentsContext.Provider value={{ openItems, showIcons }}>
      <Affix
        right={0}
        left={0}
        bottom={isMobileLayout ? 0 : 1.5}
        top={isMobileLayout ? 'unset' : 1.5}
        position={isMobileLayout ? 'fixed' : 'sticky'}
      >
        <StretchContent>
          {isMobileLayout ? (
            <HideOnScroll animationDirection="down" enabled={hideOnScroll}>
              <TableOfContentsModal {...rest} heading={heading} />
            </HideOnScroll>
          ) : (
            <Card>
              <CardContent>
                <TableOfContentsItems {...rest} heading={heading} />
              </CardContent>
            </Card>
          )}
        </StretchContent>
      </Affix>
    </TableOfContentsContext.Provider>
  );
};

export default TableOfContents;
