import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import { VerticalSpacing } from '../../../../tedi';
import Accordion, { AccordionProps } from './accordion';
import AccordionItem, { AccordionItemProps } from './accordion-item';
import AccordionItemContent, { AccordionItemContentProps } from './accordion-item-content';
import AccordionItemHeader, { AccordionItemHeaderProps } from './accordion-item-header';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  subcomponents: { AccordionItem, AccordionItemContent, AccordionItemHeader } as never,
  title: 'Community/Map components/Accordion',
};

const ACCORDION_ITEM_CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

interface AccordionItemDto {
  id: string;
  header: string;
  content: string;
  disabled?: boolean;
  itemProps?: Omit<AccordionItemProps, 'id'>;
  headerProps?: AccordionItemHeaderProps;
  contentProps?: AccordionItemContentProps;
}

const accordionItems: AccordionItemDto[] = [
  { id: 'first', header: 'First', content: ACCORDION_ITEM_CONTENT },
  { id: 'second', header: 'Second', content: ACCORDION_ITEM_CONTENT },
  { id: 'disabled', header: 'Disabled', content: ACCORDION_ITEM_CONTENT, disabled: true },
  { id: 'fourth', header: 'Fourth', content: ACCORDION_ITEM_CONTENT },
];

export default meta;

export interface AccordionStory {
  items?: AccordionItemDto[];
  accordion: AccordionProps;
  accordionItem: Omit<AccordionItemProps, 'id'>;
  accordionItemHeader: AccordionItemHeaderProps;
  accordionItemContent: AccordionItemContentProps;
}

type Story = StoryObj<AccordionStory>;

const Template: StoryFn<AccordionStory> = ({ items = accordionItems, ...args }) => {
  return (
    <VerticalSpacing size={1}>
      <Accordion {...args.accordion}>
        {items.map(({ id, header, content, disabled, itemProps, headerProps, contentProps }: AccordionItemDto) => (
          <AccordionItem key={id} {...args.accordionItem} {...itemProps} id={id} disabled={disabled}>
            <AccordionItemHeader {...args.accordionItemHeader} {...headerProps} title={header}>
              {header}
            </AccordionItemHeader>
            <AccordionItemContent {...args.accordionItemContent} {...contentProps}>
              {content}
            </AccordionItemContent>
          </AccordionItem>
        ))}
      </Accordion>
    </VerticalSpacing>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    accordionItemContent: {
      padding: 1,
    },
  },
};

export const DefaultOpen: Story = {
  render: Template,
  args: {
    accordion: {
      defaultOpenItem: ['second'],
    },
    accordionItemContent: {
      padding: 1,
    },
  },
};

export const SecondaryHeader: Story = {
  render: Template,
  args: {
    accordionItemHeader: {
      backgroundColor: 'secondary',
      hasSeparator: true,
    },
    accordionItemContent: {
      padding: 1,
    },
  },
};
