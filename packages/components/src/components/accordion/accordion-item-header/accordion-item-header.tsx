import cn from 'classnames';
import React from 'react';

import Col from '../../grid/col';
import Row from '../../grid/row';
import ToggleOpen from '../../toggle-open/toggle-open';
import Heading, { HeadingProps } from '../../typography/heading/heading';
import Text from '../../typography/text/text';
import { AccordionContext } from '../accordion';
import styles from '../accordion.module.scss';
import { AccordionItemContext } from '../accordion-item/accordion-item';

export interface AccordionItemHeaderProps {
  /**
   * Accordion item header children
   */
  children?: React.ReactNode;
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Name on the button to open the item
   */
  openText?: string;
  /**
   * Name on the button to close the item
   */
  closeText?: string;
}

export const AccordionItemHeader = (props: AccordionItemHeaderProps): JSX.Element => {
  const { children, className, openText, closeText, ...rest } = props;
  const [isHovered, setIsHovered] = React.useState(false);

  const { onToggle, isOpen } = React.useContext(AccordionContext);
  const { id, disabled } = React.useContext(AccordionItemContext);

  const onClick = (): void => {
    if (!disabled) onToggle(id);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.code === 'Enter' || e.code === 'Space') && !e.repeat) {
      e.preventDefault();
      onClick();
    }
  };

  const setHovered = (isHovered: boolean) => {
    if (!disabled) setIsHovered(isHovered);
  };

  const AccordionItemHeaderBEM = cn(styles['accordion__item-header'], className);

  // detect if the singular child is a heading element
  const contentHeading =
    React.Children.toArray(children)?.length === 1
      ? (React.Children.toArray(children).find(
          (child) =>
            React.isValidElement(child) &&
            (child.type === Heading ||
              (child.type === Text && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(child.props.element)))
        ) as React.ReactElement<HeadingProps, string> | undefined)
      : undefined;

  const renderItem = (content: AccordionItemHeaderProps['children']) => (
    <div
      data-name="accordion-item-header"
      {...rest}
      role="button"
      tabIndex={disabled ? -1 : 0}
      className={AccordionItemHeaderBEM}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-expanded={isOpen(id)}
      aria-controls={id}
    >
      {openText && closeText && !disabled ? (
        <Row justifyContent="between" alignItems="center">
          <Col>{content}</Col>
          <Col width="auto">
            <ToggleOpen
              openText={openText}
              closeText={closeText}
              isActive={isHovered}
              isOpen={isOpen(id)}
              visualType="link"
              tabIndex={-1}
            />
          </Col>
        </Row>
      ) : (
        content
      )}
    </div>
  );

  const renderHeadingItem = () => {
    const { element, children, ...rest } = contentHeading?.props ?? {};

    return (
      <Heading element={element} modifiers="normal">
        {renderItem(
          <Text element="span" {...rest}>
            {children}
          </Text>
        )}
      </Heading>
    );
  };

  return contentHeading ? renderHeadingItem() : renderItem(children);
};

export default AccordionItemHeader;
