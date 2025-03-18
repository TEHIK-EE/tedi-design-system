import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import { Col, Row } from '../../../tedi/components/layout/grid';
import { VerticalSpacing } from '../../../tedi/components/layout/vertical-spacing/vertical-spacing';
import Separator from '../../../tedi/components/misc/separator/separator';
import Button from '../button/button';
import Heading from '../typography/heading/heading';
import Accordion, { AccordionProps } from './accordion';
import AccordionItem, { AccordionItemProps } from './accordion-item/accordion-item';
import AccordionItemContent, { AccordionItemContentProps } from './accordion-item-content/accordion-item-content';
import AccordionItemHeader, { AccordionItemHeaderProps } from './accordion-item-header/accordion-item-header';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  subcomponents: { AccordionItem, AccordionItemContent, AccordionItemHeader } as never,
  title: 'Community/Accordion',
};

const ACCORDION_ITEM_CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

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
            <AccordionItemHeader {...args.accordionItemHeader} {...headerProps}>
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

const TemplateBackgrounds: StoryFn<AccordionStory> = ({ items = accordionItems, ...args }) => {
  return (
    <VerticalSpacing size={1}>
      {items.map(({ id, header, content, disabled, itemProps, headerProps, contentProps }: AccordionItemDto, index) => (
        <React.Fragment key={id}>
          {index !== 0 && <Separator />}
          <Accordion {...args.accordion} defaultOpenItem={[`${id}-1`]}>
            <AccordionItem {...args.accordionItem} {...itemProps} id={`${id}-0`} disabled={disabled}>
              <AccordionItemHeader {...args.accordionItemHeader} {...headerProps}>
                {header}
              </AccordionItemHeader>
              <AccordionItemContent {...args.accordionItemContent} {...contentProps}>
                {content}
              </AccordionItemContent>
            </AccordionItem>
            <AccordionItem {...args.accordionItem} {...itemProps} id={`${id}-1`} disabled={disabled}>
              <AccordionItemHeader {...args.accordionItemHeader} {...headerProps}>
                {header}
              </AccordionItemHeader>
              <AccordionItemContent {...args.accordionItemContent} {...contentProps}>
                {content}
              </AccordionItemContent>
            </AccordionItem>
          </Accordion>
        </React.Fragment>
      ))}
    </VerticalSpacing>
  );
};

const TemplateSelected: StoryFn<AccordionStory> = (args) => {
  const [activeAccordionItemId, setActiveAccordionItemId] = React.useState<string | undefined>('second');

  const getHeaderRow = (headerLabel: string, id: string, disabled?: boolean): JSX.Element => {
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
            disabled={disabled}
            visualType={isCurrent ? undefined : 'secondary'}
            aria-pressed={isCurrent}
            onClick={(event) => handleChoiceButtonClick(event, id)}
          >
            {isCurrent ? 'Selected' : 'Select'}
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <Accordion {...args.accordion}>
      {accordionItems.map(({ id, header, content, disabled }: AccordionItemDto) => {
        return (
          <AccordionItem
            key={id}
            {...args.accordionItem}
            selected={activeAccordionItemId === id}
            id={id}
            disabled={disabled}
          >
            <AccordionItemHeader {...args.accordionItemHeader}>
              {getHeaderRow(header, id, disabled)}
            </AccordionItemHeader>
            <AccordionItemContent {...args.accordionItemContent}>{content}</AccordionItemContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

const TemplateWithButton: StoryFn<AccordionStory> = (args) => {
  return (
    <VerticalSpacing size={1}>
      <Accordion {...args.accordion}>
        {accordionItems.map(({ id, header, content, disabled }: AccordionItemDto) => (
          <AccordionItem key={id} {...args.accordionItem} id={id} disabled={disabled}>
            <AccordionItemHeader {...args.accordionItemHeader}>{header}</AccordionItemHeader>
            <AccordionItemContent {...args.accordionItemContent}>{content}</AccordionItemContent>
          </AccordionItem>
        ))}
      </Accordion>
    </VerticalSpacing>
  );
};

const TemplateWithHeading: StoryFn<AccordionStory> = (args) => {
  return (
    <VerticalSpacing size={1}>
      <Accordion {...args.accordion}>
        {accordionItems.map(({ id, header, content, disabled }: AccordionItemDto) => (
          <AccordionItem key={id} {...args.accordion} id={id} disabled={disabled}>
            <AccordionItemHeader {...args.accordionItemHeader}>
              <Heading element="h4" modifiers="h5">
                {header}
              </Heading>
            </AccordionItemHeader>
            <AccordionItemContent {...args.accordionItemContent}>{content}</AccordionItemContent>
          </AccordionItem>
        ))}
      </Accordion>
    </VerticalSpacing>
  );
};

export const Default: Story = {
  render: Template,
};

export const DefaultOpen: Story = {
  render: Template,
  args: {
    accordion: {
      defaultOpenItem: ['second'],
    },
  },
};

export const OutsideControlledState: Story = {
  render: Template,
  args: {
    accordion: {
      openItem: accordionItems.map(({ id }) => id),
      onToggleItem: (id: string) => {
        // Handle state in your component
      },
    },
  },
};

/**
 * Since `AccordionItem` internally uses a `Card` and `CardContent`, then it also supports different paddings.
 */
export const Padding: Story = {
  render: Template,
  args: {
    accordion: {
      defaultOpenItem: ['second'],
    },
    accordionItem: {
      padding: 0.5,
    },
  },
};

export const Gutter: Story = {
  render: Template,
  args: {
    accordion: {
      defaultOpenItem: ['second'],
      gutter: 0.25,
    },
  },
};

/**
 * Since `AccordionItem` internally uses a `Card` and `CardHeader`, then it also supports different backgrounds for the header and content.
 */
export const Background: Story = {
  render: TemplateBackgrounds,
  args: {
    items: [
      { id: 'default', header: 'Default', content: ACCORDION_ITEM_CONTENT },
      {
        id: 'primary',
        header: 'Primary',
        content: ACCORDION_ITEM_CONTENT,
        headerProps: { background: 'primary' },
        itemProps: { background: 'bg-subtle' },
      },
      {
        id: 'white/primary',
        header: 'White/primary',
        content: ACCORDION_ITEM_CONTENT,
        headerProps: { background: 'white/primary' },
        itemProps: { background: 'bg-subtle' },
      },
      {
        id: 'muted/primary',
        header: 'Muted/primary',
        content: ACCORDION_ITEM_CONTENT,
        headerProps: { background: 'muted/primary' },
      },
    ],
    accordionItemHeader: {
      openText: ' ',
      closeText: ' ',
    },
  },
};

/**
 * When you want to display the card as selected.
 */
export const Selected: Story = {
  render: TemplateSelected,
};

export const WithButtons: Story = {
  render: TemplateWithButton,
  args: {
    accordionItemHeader: {
      openText: 'Open',
      closeText: 'Close',
    },
  },
};

/**
 * Because `AccordionItemHeader` renders a button it is not a valid HTML to have a h1-h6 as its content.<br/>
 * The component automatically moves an immediate `<Heading>` and `<Text element="h1-h6">` outside and wraps the `AccordionItemHeader` with it.<br/>
 * When you have a more complex `AccordionItemHeader`, then you should not render a h1-h6 tag inside it.
 */
export const HeadingContent: Story = {
  args: {
    accordionItemHeader: {
      openText: 'Open',
      closeText: 'Close',
    },
  },
  render: TemplateWithHeading,
};
