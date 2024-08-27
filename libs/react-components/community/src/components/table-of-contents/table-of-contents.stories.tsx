import { faker } from '@faker-js/faker';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import { VerticalSpacing } from '../../../../tedi/src/components/vertical-spacing';
import Anchor from '../anchor/anchor';
import Button from '../button/button';
import { Card, CardContent } from '../card';
import { Col, Row } from '../grid';
import Layout, { ILayoutProps } from '../layout/layout/layout';
import { WithNotice as LayoutDefault } from '../layout/layout/layout.stories';
import { Section } from '../section/section';
import ToggleOpen from '../toggle-open/toggle-open';
import Heading from '../typography/heading/heading';
import Text from '../typography/text/text';
import { TableOfContents, TableOfContentsProps } from './table-of-contents';

const meta: Meta<TableOfContentsProps> = {
  component: TableOfContents,
  title: 'Community/TableOfContents',
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 700,
      },
    },
    layout: 'fullscreen',
    backgrounds: { default: 'subtle' },
  },
};

export default meta;

const steps = [...Array(10).keys()].map(() => faker.commerce.productName());
const longSteps = [...steps, ...steps];

const Template: StoryFn<TableOfContentsProps> = (args) => {
  return (
    <Layout {...(LayoutDefault.args as ILayoutProps)}>
      <VerticalSpacing>
        <Section>
          <Row>
            <Col xs={12} md={8} xl={9}>
              <Card>
                <CardContent>
                  <VerticalSpacing size={2}>
                    {steps.map((step, i) => (
                      <VerticalSpacing size={0.5} key={i}>
                        <Heading element="h2" modifiers="h3" id={step}>
                          {step}
                        </Heading>
                        <p>{faker.lorem.paragraphs(5)}</p>
                      </VerticalSpacing>
                    ))}
                  </VerticalSpacing>
                </CardContent>
              </Card>
            </Col>
            <Col xs={12} md={4} xl={3}>
              <TableOfContents {...args} />
            </Col>
          </Row>
        </Section>
      </VerticalSpacing>
    </Layout>
  );
};

type Story = StoryObj<TableOfContentsProps>;

export const Default: Story = {
  render: Template,
  args: {
    items: steps.map((step, i) => ({
      content: ({ closeModal }) => (
        <Anchor href={`#${step}`} onClick={() => closeModal()}>
          {step}
        </Anchor>
      ),
      isValid: i < 5 ? true : i === 5 ? false : undefined,
    })),
  },
};

export const WithIcons: Story = {
  render: Template,
  args: {
    ...Default.args,
    showIcons: true,
  },
};

export const WithManySteps: Story = {
  render: Template,
  args: {
    items: longSteps.map((step, i) => ({
      content: ({ closeModal }) => (
        <Anchor href={`#${step}`} onClick={() => closeModal()}>
          {`${i + 1}. ${step}`}
        </Anchor>
      ),
      isValid: i < 5 ? true : i === 5 ? false : undefined,
    })),
  },
};

/**
 * When using TableOfContents next to multistep form, that doesn't allow user to skip to next step.
 * Use disabled text as content, not button or anchor.
 */
export const CustomFormValidation: Story = {
  args: {
    showIcons: true,
    items: [
      {
        content: ({ closeModal }) => (
          <Button
            visualType="link"
            onClick={() => {
              console.log('step 1 clicked');
              closeModal();
            }}
          >
            Subject
          </Button>
        ),
        isValid: true,
      },
      {
        content: ({ closeModal }) => (
          <Button
            visualType="link"
            onClick={() => {
              console.log('step 2 clicked');
              closeModal();
            }}
          >
            How to proceed?
          </Button>
        ),
        isValid: true,
      },
      {
        content: ({ closeModal }) => (
          <Button
            visualType="link"
            onClick={() => {
              console.log('step 3 clicked');
              closeModal();
            }}
          >
            Event description and time
          </Button>
        ),
      },
      {
        content: <Text color="disabled">Add notes</Text>,
      },
    ],
  },
};

/**
 * Some items can have hidden icons.
 */
export const WithHiddenIcons: Story = {
  render: Template,
  args: {
    ...Default.args,
    showIcons: true,
    items: steps.map((step, index) => ({
      content: <Anchor href={`#${step}`}>{step}</Anchor>,
      hideIcon: index % 2 === 0,
    })),
  },
};

/**
 * Some items can have separators after them.
 */
export const WithSeparators: Story = {
  render: Template,
  args: {
    ...Default.args,
    items: steps.map((step, index) => ({
      content: <Anchor href={`#${step}`}>{step}</Anchor>,
      separator: index % 2 === 0,
    })),
  },
};

const NestedTemplate: StoryFn<TableOfContentsProps> = (args) => {
  const { items, openItems, ...rest } = args;
  const [openedItems, setOpenedItems] = React.useState<string[]>(openItems || []);
  const handleToggle = (id: string) => {
    if (openedItems?.includes(id)) {
      setOpenedItems(openedItems.filter((item) => item !== id));
    } else {
      setOpenedItems([...openedItems, id]);
    }
  };

  const itemsWithContent = steps.map((step, index) => {
    const id = `step-${index}`;
    return {
      id,
      content: () => (
        <ToggleOpen
          openText={step}
          closeText={step}
          isOpen={openedItems?.includes(id) || false}
          visualType="link"
          onClick={() => handleToggle(id)}
        ></ToggleOpen>
      ),
      children: [...Array(2).keys()]
        .map(() => faker.commerce.productName())
        .map((child, j) => ({
          content: () => <Anchor>{child}</Anchor>,
        })),
    };
  });

  return (
    <Layout {...(LayoutDefault.args as ILayoutProps)}>
      <VerticalSpacing>
        <Section>
          <Row>
            <Col xs={12} md={8} xl={9}>
              <Card>
                <CardContent>
                  <VerticalSpacing size={2}>
                    {steps.map((step, i) => (
                      <VerticalSpacing size={0.5} key={i}>
                        <Heading element="h2" modifiers="h3" id={step}>
                          {step}
                        </Heading>
                        <p>{faker.lorem.paragraphs(5)}</p>
                      </VerticalSpacing>
                    ))}
                  </VerticalSpacing>
                </CardContent>
              </Card>
            </Col>
            <Col xs={12} md={4} xl={3}>
              <TableOfContents items={itemsWithContent} openItems={openedItems} {...rest} />
            </Col>
          </Row>
        </Section>
      </VerticalSpacing>
    </Layout>
  );
};

/**
 * Every item can have children.
 */
export const NestedExample: Story = {
  render: NestedTemplate,
  args: {
    ...Default.args,
    showIcons: false,
  },
};
