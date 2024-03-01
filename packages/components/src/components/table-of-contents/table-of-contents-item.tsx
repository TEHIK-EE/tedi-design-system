import { useContext, useEffect, useState } from 'react';

import { Col, Row } from '../grid';
import Icon from '../icon/icon';
import { IModalContext } from '../modal';
import Separator from '../separator/separator';
import Text from '../typography/text/text';
import { TableOfContentsContext } from './table-of-contents';

export interface TableOfContentsItem {
  /**
   * Content should generally use the anchor or button element
   * For example:
   * Link - <Anchor href="#abc">Something</Anchor>
   * Button - <Button onClick={() => setCurrentStep(i)} />
   * Function - Also accepts a callback that has the closeModal function as parameter
   */
  content:
    | React.ReactNode
    | ((props: Pick<IModalContext, 'closeModal'>) => React.ReactNode)
    | ((props: { isOpen: boolean; handleToggle: () => void }) => React.ReactNode);
  /**
   * Can contain true/false/undefined -
   * true/false for validated fields
   * undefined for fields that haven't been touched
   */
  isValid?: boolean;
  /**
   * Optional children to create a nested list
   */
  children?: TableOfContentsItem[];
  /**
   * Render a separator below the item
   */
  separator?: boolean;
  /**
   * Hide icon before the item
   */
  hideIcon?: boolean;
  /**
   * Unique id for the item
   */
  id?: string;
}
export function TableOfContentsItem(
  props: TableOfContentsItem & { handleCloseModal: () => void; showIcons?: boolean }
) {
  const { children, content, isValid, showIcons, separator, hideIcon, id, handleCloseModal, ...rest } = props;
  const { activeItem } = useContext(TableOfContentsContext);
  const [isOpen, setIsOpen] = useState(activeItem === id);
  const handleToggle = () => setIsOpen(!isOpen);
  const extraProps = { ...rest, isOpen, handleToggle };
  useEffect(() => {
    if (activeItem) {
      setIsOpen(activeItem === id);
    }
  }, [activeItem, id]);
  return (
    <>
      <Col>
        <Row gutter={2} alignItems="center">
          {showIcons && (
            <>
              {hideIcon ? (
                <Col width="auto">
                  <div style={{ width: '24px' }}></div>
                </Col>
              ) : (
                <Col width="auto">
                  {isValid === false ? (
                    <Icon name="warning" color="important" />
                  ) : (
                    <Icon name="check" color={isValid === true ? 'positive' : 'disabled'} />
                  )}
                </Col>
              )}
            </>
          )}
          <Col>
            <Text element="div" modifiers="break-word">
              {typeof content === 'function' ? content?.({ closeModal: handleCloseModal, ...extraProps }) : content}
            </Text>
          </Col>
        </Row>
      </Col>

      {children &&
        isOpen &&
        children.map((child, i) => (
          <Col key={`${id}-${i}`}>
            <Row element="ul" direction="column" gap={2}>
              <TableOfContentsItem {...child} showIcons={showIcons} handleCloseModal={handleCloseModal} />
            </Row>
          </Col>
        ))}
      {separator && (
        <Col>
          <Separator />
        </Col>
      )}
    </>
  );
}
