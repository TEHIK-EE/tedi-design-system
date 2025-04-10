import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { TextRow } from '../../../../providers/storybook-provider/storybook-provider';
import { Col, Row } from '../../../layout/grid';
import { VerticalSpacing } from '../../../layout/vertical-spacing';
import { Text } from './text';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?node-id=115-11630&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/4651ec-typography" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'Tedi-Ready/Base/Typography/Text',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?node-id=115-11630&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

const TemplateSubtitles: StoryFn = () => (
  <div className="example-list w-100">
    <Row className="border-bottom border-bottom--3x">
      <Col>
        <Text color="primary" className="padding-14-16">
          Desktop
        </Text>
      </Col>
      <Col>
        <Text color="primary" className="padding-14-16">
          Mobile
        </Text>
      </Col>
    </Row>
    <TextRow
      desktopText={
        <Text color="primary" modifiers="subtitle">
          Subtitle
        </Text>
      }
      mobileText={
        <Text color="primary" modifiers="subtitle">
          Subtitle
        </Text>
      }
      className="border-bottom"
    />
    <TextRow
      desktopText={
        <Text color="primary" modifiers={['subtitle', 'small']}>
          Subtitle Small
        </Text>
      }
      mobileText={
        <Text color="primary" modifiers={['subtitle', 'small']}>
          Subtitle Small
        </Text>
      }
      className="border-bottom"
    />
    <TextRow
      desktopText={
        <Text color="secondary" element="label">
          Label
        </Text>
      }
      mobileText={
        <Text color="secondary" element="label">
          Label
        </Text>
      }
      className="border-bottom"
    />
    <TextRow
      desktopText={
        <Text element="label" modifiers="bold">
          Label bold
        </Text>
      }
      mobileText={
        <Text element="label" modifiers="bold">
          Label bold
        </Text>
      }
    />
  </div>
);

const TemplateBodyText: StoryFn = () => (
  <div className="example-list w-100">
    <Row className="border-bottom border-bottom--3x">
      <Col>
        <Text color="primary" className="padding-14-16">
          Desktop
        </Text>
      </Col>
      <Col>
        <Text color="primary" className="padding-14-16">
          Mobile
        </Text>
      </Col>
    </Row>
    <TextRow desktopText="Body Regular" mobileText="Body Regular" className="border-bottom" />
    <TextRow
      desktopText={<Text modifiers="bold">Body bold</Text>}
      mobileText={<Text modifiers="bold">Body bold</Text>}
      className="border-bottom"
    />
    <TextRow
      desktopText={<Text modifiers="italic">Body italic</Text>}
      mobileText={<Text modifiers="italic">Body italic</Text>}
      className="border-bottom"
    />
    <TextRow
      desktopText={<Text modifiers="small">Small</Text>}
      mobileText={<Text modifiers="small">Small</Text>}
      className="border-bottom"
    />
    <TextRow
      desktopText={<Text modifiers={['small', 'bold']}>Small bold</Text>}
      mobileText={<Text modifiers={['small', 'bold']}>Small bold</Text>}
      className="border-bottom"
    />
    <TextRow
      desktopText={<Text modifiers={['small', 'italic']}>Small italic</Text>}
      mobileText={<Text modifiers={['small', 'italic']}>Small italic</Text>}
    />
  </div>
);

const TemplateGeneralText: StoryFn = () => (
  <VerticalSpacing>
    <Row>
      <Col>
        <Text color="primary">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
    <Row>
      <Col>
        <Text color="secondary">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
    <Row>
      <Col>
        <Text color="tertiary">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
    <Row>
      <Col>
        <Text color="brand">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
    <Row className="bg bg-primary">
      <Col>
        <Text color="white">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
  </VerticalSpacing>
);

const TemplateStatusText: StoryFn = () => (
  <VerticalSpacing>
    <Row>
      <Col>
        <Text color="success">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
    <Row>
      <Col>
        <Text color="warning">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
    <Row>
      <Col>
        <Text color="danger">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
    <Row>
      <Col>
        <Text color="info">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
    <Row>
      <Col>
        <Text color="neutral">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
  </VerticalSpacing>
);

export const Default: Story = {
  args: {
    children: 'Text',
  },
};

export const BodyText: Story = {
  render: TemplateBodyText,
  name: 'Body',
};

export const Subtitles: Story = {
  render: TemplateSubtitles,
};

export const GeneralText: Story = {
  render: TemplateGeneralText,
  name: 'General text colors',
};

export const StatusText: Story = {
  render: TemplateStatusText,
  name: 'Status text colors',
};
