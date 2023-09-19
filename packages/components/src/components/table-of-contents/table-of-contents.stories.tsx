import { faker } from '@faker-js/faker';
import { Meta, StoryFn, StoryObj } from '@storybook/react';

import Anchor from '../anchor/anchor';
import Button from '../button/button';
import { Card, CardContent } from '../card';
import { Col, Row } from '../grid';
import Layout, { ILayoutProps } from '../layout/layout/layout';
import { Default as LayoutDefault } from '../layout/layout/layout.stories';
import { Section } from '../section/section';
import Heading from '../typography/heading/heading';
import Text from '../typography/text/text';
import { VerticalSpacing } from '../vertical-spacing';
import { TableOfContents, TableOfContentsProps } from './table-of-contents';

const meta: Meta<TableOfContentsProps> = {
  component: TableOfContents,
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
      content: <Anchor href={`#${step}`}>{step}</Anchor>,
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

export const CustomFormValidation: Story = {
  args: {
    showIcons: true,
    items: [
      {
        content: (
          <Button visualType="link" onClick={() => console.log('step 1 clicked')}>
            Subjekt
          </Button>
        ),
        isValid: true,
      },
      {
        content: (
          <Button visualType="link" onClick={() => console.log('step 2 clicked')}>
            Kuidas soovid jätkata?
          </Button>
        ),
        isValid: true,
      },
      {
        content: (
          <Button visualType="link" onClick={() => console.log('step 3 clicked')}>
            Olukorra kirjeldus ja aeg
          </Button>
        ),
      },
      {
        content: <Text color="disabled">Lisa märksõnad</Text>,
      },
    ],
  },

  parameters: {
    docs: {
      description: {
        story: `When using TableOfContents next to multi step form, that doesn't allow user to skip to next step.
          Use disabled text as content, not button or anchor.`,
      },
    },
  },
};
