import { Story } from '@storybook/react';
import React from 'react';

import Button from '../../button/button';
import Col from '../../grid/col';
import Row from '../../grid/row';
import Accordion from '../accordion';
import AccordionItem from '../accordion-item/accordion-item';
import AccordionItemContent from '../accordion-item-content/accordion-item-content';
import AccordionItemHeader from '../accordion-item-header/accordion-item-header';

const ACCORDION_ITEM_CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

interface AccordionItemProp {
  id: string;
  header: string;
  content: string;
}

const accordionItems: AccordionItemProp[] = [
  { id: 'first', header: 'First', content: ACCORDION_ITEM_CONTENT },
  { id: 'second', header: 'Second', content: ACCORDION_ITEM_CONTENT },
  { id: 'third', header: 'Third', content: ACCORDION_ITEM_CONTENT },
];

export const PrimaryBorder: Story = (args) => {
  const [activeAccordionItemId, setActiveAccordionItemId] = React.useState<string>('');

  const handleChoiceButtonClick = (
    event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    selectedAccordionItemId: string
  ): void => {
    event.preventDefault();
    event.stopPropagation();

    setActiveAccordionItemId(selectedAccordionItemId);
  };

  const HeaderRow = (headerLabel: string, id: string): JSX.Element => (
    <Row justifyContent="between" alignItems="center">
      <Col>{headerLabel}</Col>
      <Col width="auto">
        {activeAccordionItemId === id && <Button iconLeft="check">Valitud</Button>}

        {activeAccordionItemId !== id && (
          <Button visualType="secondary" onClick={(event) => handleChoiceButtonClick(event, id)}>
            Vali
          </Button>
        )}
      </Col>
    </Row>
  );

  return (
    <Accordion>
      {accordionItems.map((accordionItem: AccordionItemProp) => (
        <AccordionItem
          key={accordionItem.id}
          id={accordionItem.id}
          borderType={activeAccordionItemId === accordionItem.id ? 'primary' : 'secondary'}
        >
          <AccordionItemHeader>{HeaderRow(accordionItem.header, accordionItem.id)}</AccordionItemHeader>
          <AccordionItemContent>{accordionItem.content}</AccordionItemContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
