import { Meta } from '@storybook/react';

import Accordion from './accordion';
import AccordionItem from './accordion-item/accordion-item';
import AccordionItemContent from './accordion-item-content/accordion-item-content';
import AccordionItemHeader from './accordion-item-header/accordion-item-header';
import { OpenAll } from './examples/openAll';

export default {
  title: 'components/Accordion',
  component: Accordion,
  subcomponents: { AccordionItem, AccordionItemHeader, AccordionItemContent },
} as Meta;

export const Default = () => {
  return (
    <Accordion>
      <AccordionItem id="first">
        <AccordionItemHeader closeText="Sulge" openText="Ava">
          First
        </AccordionItemHeader>
        <AccordionItemContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </AccordionItemContent>
      </AccordionItem>

      <AccordionItem id="second">
        <AccordionItemHeader>Second</AccordionItemHeader>
        <AccordionItemContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </AccordionItemContent>
      </AccordionItem>

      <AccordionItem id="third" disabled={true}>
        <AccordionItemHeader closeText="Sulge" openText="Ava">
          Third
        </AccordionItemHeader>
        <AccordionItemContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  );
};

export const DefaultOpen = () => {
  return (
    <Accordion defaultOpenItem={['second']}>
      <AccordionItem id="first">
        <AccordionItemHeader closeText="Sulge" openText="Ava">
          First
        </AccordionItemHeader>
        <AccordionItemContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </AccordionItemContent>
      </AccordionItem>

      <AccordionItem id="second">
        <AccordionItemHeader>Second</AccordionItemHeader>
        <AccordionItemContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </AccordionItemContent>
      </AccordionItem>

      <AccordionItem id="third">
        <AccordionItemHeader>Third</AccordionItemHeader>
        <AccordionItemContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  );
};

export { OpenAll };
