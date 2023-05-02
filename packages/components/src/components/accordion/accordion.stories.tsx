import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import Button from '../button/button';
import { Col, Row } from '../grid';
import { VerticalSpacing } from '../vertical-spacing';
import Accordion, { AccordionProps } from './accordion';
import AccordionItem from './accordion-item/accordion-item';
import AccordionItemContent from './accordion-item-content/accordion-item-content';
import AccordionItemHeader from './accordion-item-header/accordion-item-header';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
};

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

export default meta;
type Story = StoryObj<typeof Accordion>;

const Template: StoryFn<typeof Accordion> = (args) => {
  return (
    <VerticalSpacing size={1}>
      <Accordion {...args}>
        {accordionItems.map(({ id, header, content }: AccordionItemProp) => (
          <AccordionItem key={id} id={id}>
            <AccordionItemHeader>{header}</AccordionItemHeader>
            <AccordionItemContent>{content}</AccordionItemContent>
          </AccordionItem>
        ))}
      </Accordion>
    </VerticalSpacing>
  );
};

const TemplatePrimaryBorder: StoryFn<AccordionProps> = (args) => {
  const [activeAccordionItemId, setActiveAccordionItemId] = React.useState<string | undefined>(undefined);

  const getHeaderRow = (headerLabel: string, id: string): JSX.Element => {
    const isCurrent = activeAccordionItemId === id;

    const handleChoiceButtonClick = (
      event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
      selectedAccordionItemId: string
    ): void => {
      event.preventDefault();
      event.stopPropagation();

      setActiveAccordionItemId(isCurrent ? undefined : selectedAccordionItemId);
    };

    return (
      <Row justifyContent="between" alignItems="center">
        <Col>{headerLabel}</Col>
        <Col width="auto">
          <Button
            iconLeft={isCurrent ? 'check' : undefined}
            visualType={isCurrent ? undefined : 'secondary'}
            onClick={(event) => handleChoiceButtonClick(event, id)}
          >
            {isCurrent ? 'Valitud' : 'Vali'}
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <Accordion>
      {accordionItems.map(({ id, header, content }: AccordionItemProp) => {
        return (
          <AccordionItem key={id} id={id} borderType={activeAccordionItemId === id ? 'primary' : 'secondary'}>
            <AccordionItemHeader>{getHeaderRow(header, id)}</AccordionItemHeader>
            <AccordionItemContent>{content}</AccordionItemContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export const Default: Story = {
  render: Template,
};

export const DefaultOpen: Story = {
  render: Template,
  args: {
    defaultOpenItem: ['second'],
  },
};

export const OutsideControlledState: Story = {
  render: Template,
  args: {
    openItem: accordionItems.map(({ id }) => id),
    onToggleItem: (id: string) => {
      // Handle state in your component
    },
  },
};

export const PrimaryBorder: Story = {
  render: TemplatePrimaryBorder,
};
