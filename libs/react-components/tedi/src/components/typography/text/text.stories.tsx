import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Column, Row, TextRow } from '../../../providers/storybook-provider/storybook-provider';
import { Text } from './text';

/**
 * [Figma ↗](https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?node-id=115-11630&m=dev)<br/>
 * [Zeroheight ↗](https://zeroheight.com/1ee8444b7/p/4651ec-typography)
 */

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'Tedi-components/Base/Typography/Text',
};

export default meta;
type Story = StoryObj<typeof Text>;

const TemplateSubtitles: StoryFn = (args) => (
  <div className="example-list w-100">
    <Row className="border-bottom border-bottom--3x">
      <Column>
        <Text color="primary">Desktop</Text>
      </Column>
      <Column>
        <Text color="primary">Mobile</Text>
      </Column>
    </Row>
    <TextRow
      desktopText={
        <Text color="primary" subtitle={true}>
          Subtitle
        </Text>
      }
      mobileText={
        <Text color="primary" subtitle={true}>
          Subtitle
        </Text>
      }
      className="border-bottom"
    />
    <TextRow
      desktopText={
        <Text color="primary" subtitle={true} modifiers="small">
          Subtitle Small
        </Text>
      }
      mobileText={
        <Text color="primary" subtitle={true} modifiers="small">
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

const TemplateBodyText: StoryFn = (args) => (
  <div className="example-list w-100">
    <Row className="border-bottom border-bottom--3x">
      <Column>
        <Text color="primary">Desktop</Text>
      </Column>
      <Column>
        <Text color="primary">Mobile</Text>
      </Column>
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

const TemplateGeneralText: StoryFn = (args) => (
  <div className="text-story-wrapper">
    <Row>
      <Text color="primary">
        Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad
        on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
      </Text>
    </Row>
    <Row>
      <Text color="secondary">
        Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad
        on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
      </Text>
    </Row>
    <Row>
      <Text color="tertiary">
        Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad
        on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
      </Text>
    </Row>
    <Row>
      <Text color="distinctive">
        Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad
        on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
      </Text>
    </Row>
    <Row className="with-background">
      <Text color="white">
        Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad
        on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
      </Text>
    </Row>
  </div>
);

const TemplateStatusText: StoryFn = (args) => (
  <div className="text-story-wrapper">
    <Row>
      <Text color="success">
        Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad
        on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
      </Text>
    </Row>
    <Row>
      <Text color="warning">
        Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad
        on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
      </Text>
    </Row>
    <Row>
      <Text color="danger">
        Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad
        on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
      </Text>
    </Row>
    <Row>
      <Text color="info">
        Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad
        on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
      </Text>
    </Row>
    <Row>
      <Text color="neutral">
        Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad
        on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
      </Text>
    </Row>
  </div>
);

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
