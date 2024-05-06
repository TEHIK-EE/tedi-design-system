import cn from 'classnames';
import React, { useContext } from 'react';

import { useLabels } from '../../../../shared/providers/label-provider';
import Button from '../button/button';
import ButtonContent from '../button-content/button-content';
import { Card, CardContent, CardHeader } from '../card';
import { Col, Row } from '../grid';
import Icon from '../icon/icon';
import { Modal, ModalProvider, ModalTrigger } from '../modal';
import Heading from '../typography/heading/heading';
import { Text } from '../typography/text/text';
import { TableOfContentsContext, TableOfContentsProps } from './table-of-contents';
import styles from './table-of-contents.module.scss';
import { TableOfContentsItems } from './table-of-contents-items';

export const TableOfContentsModal = (props: TableOfContentsProps) => {
  const { getLabel } = useLabels();
  const { items, modalProps, modalProviderProps, heading, open, defaultOpen, onToggle } = props;
  const correctItems = items.map((i) => i.isValid === true).filter(Boolean).length;
  const invalidItems = items.map((i) => i.isValid === false).filter(Boolean).length;
  const id = React.useId();
  const [returnFocus, setReturnFocus] = React.useState(true);
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const { showIcons } = useContext(TableOfContentsContext);

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
        {heading}
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
            <Card className={styles['table-of-contents__trigger-card']}>
              <CardContent>
                <Row>
                  <Col>{renderHeader}</Col>
                  <Col width="auto" aria-hidden={true}>
                    <ButtonContent as="span" visualType="link" iconRight="expand_more">
                      {getLabel('open')}
                    </ButtonContent>
                  </Col>
                </Row>
              </CardContent>
            </Card>
          </Button>
        </ModalTrigger>
      </Heading>
      <Modal aria-labelledby={id} position="bottom" returnFocus={returnFocus} {...modalProps}>
        <CardHeader variant="white" id={id}>
          <Heading element="h2" modifiers="normal">
            {renderHeader}
          </Heading>
        </CardHeader>
        <CardContent>
          <TableOfContentsItems {...props} setReturnFocus={setReturnFocus} />
        </CardContent>
      </Modal>
    </ModalProvider>
  );
};
