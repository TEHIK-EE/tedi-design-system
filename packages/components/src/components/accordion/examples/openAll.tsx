import { Story } from '@storybook/react';
import React from 'react';

import Button from '../../button/button';
import Col from '../../grid/col';
import Row from '../../grid/row';
import VerticalSpacing from '../../vertical-spacing/vertical-spacing';
import Accordion from '../accordion';
import AccordionItem from '../accordion-item/accordion-item';
import AccordionItemContent from '../accordion-item-content/accordion-item-content';
import AccordionItemHeader from '../accordion-item-header/accordion-item-header';

const allIDs = ['first', 'second', 'third'];

export const OpenAll: Story = (args) => {
  const [allOpen, setAllOpen] = React.useState(false);
  const [open, setOpen] = React.useState<string[]>([]);

  const onClick = () => {
    setOpen(allOpen ? [] : allIDs);
    setAllOpen(!allOpen);
  };

  const onToggle = (id: string) => {
    setOpen((prevOpen) => {
      if (prevOpen.includes(id)) {
        const clone = [...prevOpen];
        clone.splice(prevOpen.indexOf(id), 1);
        if (clone.length === 0) {
          setAllOpen(false);
        }
        return clone;
      } else {
        return [...prevOpen, id];
      }
    });
  };

  return (
    <VerticalSpacing size={1}>
      <Row justifyContent="end">
        <Col width="auto">
          <Button visualType="secondary" onClick={onClick}>
            {allOpen ? 'Sulge kõik' : 'Ava kõik'}
          </Button>
        </Col>
      </Row>

      <Accordion openItem={open} onToggleItem={onToggle}>
        <AccordionItem id="first">
          <AccordionItemHeader closeText="Sulge" openText="Ava">
            First
          </AccordionItemHeader>
          <AccordionItemContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </AccordionItemContent>
        </AccordionItem>

        <AccordionItem id="second">
          <AccordionItemHeader>Second</AccordionItemHeader>
          <AccordionItemContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </AccordionItemContent>
        </AccordionItem>

        <AccordionItem id="third">
          <AccordionItemHeader>Third</AccordionItemHeader>
          <AccordionItemContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>
    </VerticalSpacing>
  );
};
