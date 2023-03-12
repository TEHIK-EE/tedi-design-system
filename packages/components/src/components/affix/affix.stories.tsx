import { faker } from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';

import { useLayout } from '../../helpers';
import { Card, CardContent } from '../card';
import Collapse from '../collapse/collapse';
import { Col, Row } from '../grid';
import Icon from '../icon/icon';
import Layout, { ILayoutProps } from '../layout/layout/layout';
import { Default as LayoutDefault } from '../layout/layout/layout.stories';
import ScrollFade from '../scrollfade/scroll-fade';
import { Section } from '../section/section';
import Separator from '../separator/separator';
import { VerticalSpacing } from '../vertical-spacing';
import Affix, { AffixProps } from './affix';

export default {
  title: 'components/Affix',
  component: Affix,
  parameters: {
    docs: {
      description: {
        component: `<p>
          Affix is helper component to use <code>__position: "sticky" | "fixed"__</code> on children. By default Affix gives Sticky behavior with top spacing of 1.5rem. <br/>
          Default example demos additional side navigation that moves along when scrolling content and is fixed to bottom in mobile.
          </p>`,
      },
      inlineStories: false,
      iframeHeight: 700,
    },
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
  },
} as Meta;

const NavigationContent = () => {
  const isMobile = useLayout(['mobile']);

  if (isMobile) {
    return (
      <CardContent padding="xsmall">
        <Collapse
          heading={{
            children: <Icon name="home" />,
          }}
          id="collapse-1"
        >
          <Separator fullWidth />
          <div style={{ maxHeight: 200 }}>
            <ScrollFade>
              {faker.random
                .words(15)
                .split(' ')
                .map((w, key) => (
                  <p key={key}>{w}</p>
                ))}
            </ScrollFade>
          </div>
        </Collapse>
      </CardContent>
    );
  }

  return (
    <CardContent>
      {faker.random
        .words(15)
        .split(' ')
        .map((w, key) => (
          <p key={key}>{w}</p>
        ))}
    </CardContent>
  );
};

const Template: Story<AffixProps> = (args) => {
  const isMobile = useLayout(['mobile']);

  return (
    <Layout {...(LayoutDefault.args as ILayoutProps)}>
      <VerticalSpacing>
        <Section>
          <Row>
            <Col width={12} md={9}>
              <Card>
                <CardContent>
                  <VerticalSpacing size={2}>
                    <h1>{faker.random.words(5)}</h1>
                    {faker.lorem
                      .paragraphs(20, ',')
                      .split(',')
                      .map((p, key) => (
                        <p key={key}>{p}</p>
                      ))}
                  </VerticalSpacing>
                </CardContent>
              </Card>
            </Col>
            <Col width={12} md={3}>
              <Affix
                position={isMobile ? 'fixed' : 'sticky'}
                top={isMobile ? 'unset' : 1.5}
                right={isMobile ? 0 : undefined}
                bottom={isMobile ? 0 : undefined}
                left={isMobile ? 0 : undefined}
              >
                <Card>
                  <NavigationContent />
                </Card>
              </Affix>
            </Col>
          </Row>
        </Section>

        <Section>
          <Row>
            <Col width={12} md={9}>
              <Card>
                <CardContent>
                  <VerticalSpacing size={2}>
                    <h1>{faker.random.words(5)}</h1>
                    {faker.lorem
                      .paragraphs(20, ',')
                      .split(',')
                      .map((p, key) => (
                        <p key={key}>{p}</p>
                      ))}
                  </VerticalSpacing>
                </CardContent>
              </Card>
            </Col>
          </Row>
        </Section>
      </VerticalSpacing>
    </Layout>
  );
};

const StickyTemplate: Story<AffixProps> = (args) => (
  <div style={{ height: 1500 }}>
    <div style={{ height: 600, marginTop: 100, border: '1px solid red' }}>
      <Affix {...args}>This text is Sticky in its container!</Affix>
    </div>
  </div>
);

const FixedTemplate: Story<AffixProps> = (args) => (
  <div style={{ height: 1500 }}>
    <div style={{ height: 600, marginTop: 100, border: '1px solid red' }}>
      <Affix {...args}>This text is Fixed on bottom of page!</Affix>
    </div>
  </div>
);

export const Default = Template.bind({});

export const StickyDefault = StickyTemplate.bind({});

export const StickyTop0 = StickyTemplate.bind({});
StickyTop0.args = {
  top: 0,
};

export const FixedExample = FixedTemplate.bind({});
FixedExample.args = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  top: 'unset',
};
