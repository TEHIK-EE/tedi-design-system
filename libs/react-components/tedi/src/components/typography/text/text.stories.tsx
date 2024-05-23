import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Column, Row, TextRow } from '../../../providers/storybook-provider/storybook-provider';
import { HeadingModifiers, Text, TextColor } from './text';

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
    <Row className="border-bottom">
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
        <Text color="primary" element="label">
          Label
        </Text>
      }
      mobileText={
        <Text color="primary" element="label">
          Label
        </Text>
      }
      className="border-bottom"
    />
    <TextRow
      desktopText={
        <Text color="primary" element="label" modifiers="small">
          Label Small
        </Text>
      }
      mobileText={
        <Text color="primary" element="label" modifiers="small">
          Label Small
        </Text>
      }
    />
  </div>
);

const TemplateLink: StoryFn = (args) => (
  <div className="example-list w-100">
    <Row className="border-bottom">
      <Column>
        <Text color="primary">Desktop</Text>
      </Column>
      <Column>
        <Text color="primary">Mobile</Text>
      </Column>
    </Row>
    <TextRow desktopText="Link regular" mobileText="Link regular" isLink={true} className="border-bottom" />
    <TextRow
      desktopText="Link regular no underline"
      mobileText="Link regular no underline"
      isLink={true}
      noUnderline={true}
      className="border-bottom"
    />
    <TextRow
      desktopText={<small>Link small</small>}
      mobileText={<small>Link small</small>}
      isLink={true}
      className="border-bottom"
    />
    <TextRow
      desktopText={<small>Link small</small>}
      mobileText={<small>Link small</small>}
      isLink={true}
      noUnderline={true}
    />
  </div>
);

const TemplateBodyText: StoryFn = (args) => (
  <div className="example-list w-100">
    <Row className="border-bottom">
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

interface GeneralTextTemplateProps {
  color: TextColor;
  children: React.ReactNode;
}

const GeneralTextTemplate: React.FC<GeneralTextTemplateProps> = ({ color, children }) => (
  <Row>
    <Text color={color}>{children}</Text>
  </Row>
);

const TemplateGeneralText: StoryFn = (args) => (
  <div className="text-story-wrapper">
    <GeneralTextTemplate color="primary">
      Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on
      oranžid. Eestis eelistab ta elupaigana metsatukkasid.
    </GeneralTextTemplate>
    <GeneralTextTemplate color="secondary">
      Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on
      oranžid. Eestis eelistab ta elupaigana metsatukkasid.
    </GeneralTextTemplate>
    <GeneralTextTemplate color="tertiary">
      Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on
      oranžid. Eestis eelistab ta elupaigana metsatukkasid.
    </GeneralTextTemplate>
    <GeneralTextTemplate color="disabled">
      Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on
      oranžid. Eestis eelistab ta elupaigana metsatukkasid.
    </GeneralTextTemplate>
    <GeneralTextTemplate color="distinctive">
      Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on
      oranžid. Eestis eelistab ta elupaigana metsatukkasid.
    </GeneralTextTemplate>
    <Row className="with-background">
      <Text color="white">
        Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad
        on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
      </Text>
    </Row>
  </div>
);

const TemplateLinkColors: StoryFn = (args) => (
  <div className="text-story-wrapper">
    <GeneralTextTemplate color="primary">
      <a href="#" className="underlined">
        Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad
        on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
      </a>
    </GeneralTextTemplate>
    <GeneralTextTemplate color="primary">
      <a href="#" className="no-underline">
        Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad
        on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
      </a>
    </GeneralTextTemplate>
    <GeneralTextTemplate color="primary">
      <div className="with-background">
        <a href="#" className="link-white underlined">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </a>
      </div>
    </GeneralTextTemplate>
    <GeneralTextTemplate color="primary">
      <div className="with-background">
        <a href="#" className="no-underline link-white">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </a>
      </div>
    </GeneralTextTemplate>
  </div>
);
const TemplateStatusText: StoryFn = (args) => (
  <div className="text-story-wrapper">
    <GeneralTextTemplate color="success">
      Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on
      oranžid. Eestis eelistab ta elupaigana metsatukkasid.
    </GeneralTextTemplate>
    <GeneralTextTemplate color="warning">
      Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on
      oranžid. Eestis eelistab ta elupaigana metsatukkasid.
    </GeneralTextTemplate>
    <GeneralTextTemplate color="danger">
      Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on
      oranžid. Eestis eelistab ta elupaigana metsatukkasid.
    </GeneralTextTemplate>
    <GeneralTextTemplate color="primary">
      Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on
      oranžid. Eestis eelistab ta elupaigana metsatukkasid.
    </GeneralTextTemplate>
  </div>
);

export const BodyText: Story = {
  render: TemplateBodyText,
  name: 'Body',
};

export const Subtitles: Story = {
  render: TemplateSubtitles,
};

export const Links: Story = {
  render: TemplateLink,
  name: 'Link',
};

export const GeneralText: Story = {
  render: TemplateGeneralText,
  name: 'General text colors',
};

export const LinkText: Story = {
  render: TemplateLinkColors,
  name: 'Link colors',
};

export const StatusText: Story = {
  render: TemplateStatusText,
  name: 'Status text colors',
};
