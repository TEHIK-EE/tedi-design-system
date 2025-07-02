import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { VerticalSpacing } from '../../../../tedi';
import MapAccordion, { MapAccordionProps } from './map-accordion';
import MapAccordionItem, { MapAccordionItemProps } from './map-accordion-item';
import MapAccordionItemContent, { MapAccordionItemContentProps } from './map-accordion-item-content';
import MapAccordionItemHeader, { MapAccordionItemHeaderProps } from './map-accordion-item-header';

/**
 * <a href="?path=/docs/community-map-components-rightpanel--docs" target="_BLANK">Part of RightPanel component</a><br/>
 * <a href="?path=/docs/community-map-components-leftpanel--docs" target="_BLANK">Part of LeftPanel component</a><br/>
 */

const meta: Meta<typeof MapAccordion> = {
  component: MapAccordion,
  subcomponents: {
    'MapAccordion.Item': MapAccordion.Item,
    'MapAccordion.Header': MapAccordion.Header,
    'MapAccordion.Content': MapAccordion.Content,
  },
  title: 'Community/Map components/MapAccordion',
};

const ACCORDION_ITEM_CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

interface AccordionItemDto {
  id: string;
  header: string;
  content: string;
  disabled?: boolean;
  itemProps?: Omit<MapAccordionItemProps, 'id'>;
  headerProps?: MapAccordionItemHeaderProps;
  contentProps?: MapAccordionItemContentProps;
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
  accordion: MapAccordionProps;
  accordionItem: Omit<MapAccordionItemProps, 'id'>;
  accordionItemHeader: MapAccordionItemHeaderProps;
  accordionItemContent: MapAccordionItemContentProps;
}

type Story = StoryObj<AccordionStory>;

const Template: StoryFn<AccordionStory> = ({ items = accordionItems, ...args }) => {
  return (
    <VerticalSpacing size={1}>
      <MapAccordion {...args.accordion}>
        {items.map(({ id, header, content, disabled, itemProps, headerProps, contentProps }: AccordionItemDto) => (
          <MapAccordionItem key={id} {...args.accordionItem} {...itemProps} id={id} disabled={disabled}>
            <MapAccordionItemHeader {...args.accordionItemHeader} {...headerProps} title={header}>
              {header}
            </MapAccordionItemHeader>
            <MapAccordionItemContent {...args.accordionItemContent} {...contentProps}>
              {content}
            </MapAccordionItemContent>
          </MapAccordionItem>
        ))}
      </MapAccordion>
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
