import cn from 'classnames';
import React from 'react';

import { Layouts, useLayout } from '../../helpers';
import { useLabels } from '../../providers/label-provider';
import Affix from '../affix/affix';
import Button from '../button/button';
import { Card, CardContent, CardHeader } from '../card';
import { Col, Row } from '../grid';
import Icon from '../icon/icon';
import {
  IModalContext,
  Modal,
  ModalContext,
  ModalProps,
  ModalProvider,
  ModalProviderProps,
  ModalTrigger,
} from '../modal';
import StretchContent from '../stretch-content/stretch-content';
import Heading from '../typography/heading/heading';
import { Text } from '../typography/text/text';
import { VerticalSpacing } from '../vertical-spacing';
import styles from './table-of-contents.module.scss';

export interface TableOfContentsItem {
  /**
   * Content should generally use the anchor or button element
   * For example:
   * Link - <Anchor href="#abc">Something</Anchor>
   * Button - <Button onClick={() => setCurrentStep(i)} />
   * Function - Also accepts a callback that has the closeModal function as parameter
   */
  content: React.ReactNode | ((props: Pick<IModalContext, 'closeModal'>) => React.ReactNode);
  /**
   * Can contain true/false/undefined -
   * true/false for validated fields
   * undefined for fields that haven't been touched
   */
  isValid?: boolean;
}

export interface TableOfContentsProps {
  /**
   * List of items to be shown in the table of contents
   */
  items: TableOfContentsItem[];
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
}

/**
 * TableOfContents is helper component that can be used to show table of contents for long pages or multistep forms. It keeps itself fixed next to the content when scrolled (On desktop). <br /><br />
 * When used to link to sections on the same page, make sure to use the same id on the section and the table of contents item Anchor. Setting `tabIndex` on the section is also necessary for the focus to work correctly in some screen-readers.
 * More info <a href="https://github.com/gettalong/kramdown/issues/215" target="_blank">here</a> and <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=262171" target="_blank">here</a>.<br /><br />
 * When used to keep track of multistep form progress, usage on `showIcons={true}` is recommended. Keep in mind that `isValid` property is optional and can be undefined to show not validated steps. <br />
 * Also it is possible to use disabled-text as item content, to show that user can't skip to next step. <br /><br />
 */
export const TableOfContents = (props: TableOfContentsProps) => {
  const { breakToMobile = ['mobile'] } = props;
  const isMobileLayout = useLayout(breakToMobile);

  return (
    <Affix
      bottom={0}
      right={0}
      left={0}
      top={isMobileLayout ? 'unset' : 1.5}
      position={isMobileLayout ? 'fixed' : 'sticky'}
    >
      <StretchContent>
        {isMobileLayout ? (
          <TableOfContentsModal {...props} />
        ) : (
          <Card>
            <CardContent>
              <TableOfContentsItems {...props} />
            </CardContent>
          </Card>
        )}
      </StretchContent>
    </Affix>
  );
};

const TableOfContentsModal = (props: TableOfContentsProps) => {
  const { getLabel } = useLabels();
  const { items, modalProps, modalProviderProps, showIcons, heading, open, defaultOpen, onToggle } = props;
  const correctItems = items.map((i) => i.isValid === true).filter(Boolean).length;
  const invalidItems = items.map((i) => i.isValid === false).filter(Boolean).length;
  const id = React.useId();
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);

  const isOpen = onToggle && typeof open !== 'undefined' ? open : innerOpen;
  const validLabel = getLabel('table-of-contents.valid');
  const invalidLabel = getLabel('table-of-contents.invalid');

  const handleToggle = (open: boolean) => {
    setInnerOpen(open);
    onToggle?.(open);
  };

  const renderHeader = (
    <>
      <Text element="span" modifiers={['normal', 'bold']} className={cn({ 'sr-only': showIcons })}>
        {getLabel('table-of-contents.title') || heading}
      </Text>
      {showIcons && invalidItems === 0 ? (
        <Row gutter={1}>
          <Col width="auto">
            <Icon name="check" color="positive" />
          </Col>
          <Col width="auto">
            <Text element="span" aria-hidden={true}>
              {correctItems} / {items.length}
            </Text>
            <Text element="span" className="sr-only">
              {typeof validLabel === 'string' ? validLabel : validLabel?.(`${correctItems} / ${items.length}`)}
            </Text>
          </Col>
        </Row>
      ) : showIcons ? (
        <Row gutter={3}>
          <Col width="auto">
            <Row gutter={1}>
              <Col width="auto">
                <Icon name="check" color="positive" />
              </Col>
              <Col width="auto">
                <Text element="span" aria-hidden={true}>
                  {correctItems}
                </Text>
                <Text element="span" className="sr-only">
                  {typeof validLabel === 'string' ? validLabel : validLabel?.(correctItems)}
                </Text>
              </Col>
            </Row>
          </Col>
          <Col width="auto">
            <Row gutter={1}>
              <Col width="auto">
                <Icon name="warning" color="important" />
              </Col>
              <Col width="auto">
                <Text element="span" aria-hidden={true}>
                  {invalidItems}
                </Text>
                <Text element="span" className="sr-only">
                  {typeof invalidLabel === 'string' ? invalidLabel : invalidLabel?.(invalidItems)}
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : null}
    </>
  );

  return (
    <ModalProvider open={isOpen} onToggle={handleToggle} {...modalProviderProps}>
      <Heading element="h2" modifiers="normal">
        <ModalTrigger>
          <Button fullWidth noStyle className={styles['table-of-contents__trigger']}>
            <Card>
              <CardContent>
                <Row>
                  <Col>{renderHeader}</Col>
                  <Col width="auto" aria-hidden={true}>
                    <Text element="span" color="primary">
                      <Row alignItems="center" gutter={1}>
                        <Col width="auto">{getLabel('open')}</Col>
                        <Col width="auto">
                          <Icon name="expand_more" />
                        </Col>
                      </Row>
                    </Text>
                  </Col>
                </Row>
              </CardContent>
            </Card>
          </Button>
        </ModalTrigger>
      </Heading>
      <Modal aria-labelledby={id} position="bottom" {...modalProps}>
        <CardHeader variant="white" id={id}>
          <Heading element="h2" modifiers="normal">
            {renderHeader}
          </Heading>
        </CardHeader>
        <CardContent>
          <TableOfContentsItems {...props} />
        </CardContent>
      </Modal>
    </ModalProvider>
  );
};

const TableOfContentsItems = (props: TableOfContentsProps) => {
  const { items, showIcons, heading, breakToMobile = ['mobile'] } = props;
  const isMobileLayout = useLayout(breakToMobile);
  const { closeModal } = React.useContext(ModalContext);
  const { getLabel } = useLabels();
  const showTitle = showIcons ? true : !isMobileLayout;

  const handleModalClose = (preventFocusReturn = true) => {
    closeModal?.(preventFocusReturn);
  };

  return (
    <Row direction="column">
      {showTitle && (
        <Col>
          <Heading element="h2" modifiers="h4" aria-hidden={isMobileLayout && showIcons}>
            {getLabel('table-of-contents.title') || heading}
          </Heading>
        </Col>
      )}
      {items.map((i, index) => (
        <Col key={`toc-item-${index}`}>
          <VerticalSpacing size={2}>
            <Row gutter={2}>
              {showIcons && (
                <Col width="auto">
                  {i?.isValid === false ? (
                    <Icon name="warning" color="important" />
                  ) : (
                    <Icon name="check" color={i?.isValid === true ? 'positive' : 'disabled'} />
                  )}
                </Col>
              )}
              <Col>
                <Text element="div" modifiers="break-word">
                  {typeof i?.content === 'function' ? i?.content?.({ closeModal: handleModalClose }) : i?.content}
                </Text>
              </Col>
            </Row>
          </VerticalSpacing>
        </Col>
      ))}
    </Row>
  );
};

export default TableOfContents;
