import cn from 'classnames';
import React from 'react';

import { CardHeader, CardHeaderBackground, CardHeaderProps } from '../../card';
import Col from '../../grid/col';
import Row from '../../grid/row';
import ToggleOpen from '../../toggle-open/toggle-open';
import Heading, { HeadingProps } from '../../typography/heading/heading';
import Text from '../../typography/text/text';
import { AccordionContext } from '../accordion';
import styles from '../accordion.module.scss';
import { AccordionItemContext } from '../accordion-item/accordion-item';

export interface AccordionItemHeaderProps extends Omit<CardHeaderProps, 'id' | 'role' | 'background' | 'variant'> {
  /**
   * Name on the button to open the item
   */
  openText?: string;
  /**
   * Name on the button to close the item
   */
  closeText?: string;
  /**
   * Background color of accordion header.
   * In addition to the values supported by CardHeader, we also support some dynamic values that have different colors for open/close states.
   * @default white
   */
  background?: 'primary' | CardHeaderBackground;
}

export const AccordionItemHeader = (props: AccordionItemHeaderProps): JSX.Element => {
  const { children, className, background = 'white', openText, closeText, ...rest } = props;
  const [isHovered, setIsHovered] = React.useState(false);

  const { onToggle, isOpen } = React.useContext(AccordionContext);
  const { id, disabled } = React.useContext(AccordionItemContext);

  const onClick = (): void => {
    if (!disabled) onToggle(id);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((e.code === 'Enter' || e.code === 'Space') && !e.repeat) {
      e.preventDefault();
      onClick();
    }
  };

  const setHovered = (isHovered: boolean) => {
    if (!disabled) setIsHovered(isHovered);
  };

  const BEM = cn(styles['accordion__item-header'], className);

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

  // for some predefined background we want to use different color for open/close states
  const dynamicBackground = React.useMemo(() => {
    switch (background) {
      case 'primary':
        return isOpen(id) ? 'primary-active' : 'primary-main';
      default:
        return background;
    }
  }, [background, id, isOpen]);

  const buttonColor = dynamicBackground === 'white' ? undefined : 'inverted'; // for blue backgrounds show the white button

  const renderItem = (content: AccordionItemHeaderProps['children']) => (
    <CardHeader
      data-name="accordion-item-header"
      role="button"
      id={id}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      className={BEM}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-expanded={isOpen(id)}
      aria-controls={`${id}-content`}
      background={dynamicBackground}
      {...rest}
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
              color={buttonColor}
              visualType="link"
              aria-hidden={true}
              tabIndex={-1}
            />
          </Col>
        </Row>
      ) : (
        content
      )}
    </CardHeader>
  );

  const renderHeadingItem = () => {
    const { element, children, ...rest } = contentHeading?.props ?? {};

    return (
      <Heading element={element} modifiers="normal" className={styles['accordion__item-wrapping-heading']}>
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
