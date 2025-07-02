import { Meta, StoryObj } from '@storybook/react';

import { Card, Col, Icon, Row, Text } from '../../../../tedi';
import Toggle from '../../form/toggle/toggle';
import MapAccordion from '../map-accordion/map-accordion';
import MapAccordionItem from '../map-accordion/map-accordion-item';
import MapAccordionItemContent from '../map-accordion/map-accordion-item-content';
import MapAccordionItemHeader from '../map-accordion/map-accordion-item-header';
import MapLayer, { LayerOption } from '../map-layer/map-layer';
import Select from '../map-select/map-select';
import LeftPanel from './left-panel';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=427-91631&m=dev" target="_BLANK">Figma ↗</a><br/>
 */

const meta: Meta<typeof LeftPanel> = {
  component: LeftPanel,
  title: 'Community/Map components/LeftPanel',
};

export default meta;
type Story = StoryObj<typeof LeftPanel>;

const mapOptions = [
  { value: 'maainfo', label: 'Maainfo' },
  { value: 'mahekaart', label: 'Mahekaart' },
  { value: 'merekaart', label: 'Merekaart' },
  { value: 'murakaart', label: 'Mürakaart' },
  { value: 'ajaloolised kaardid', label: 'Ajaloolised kaardid' },
  { value: 'aluskaardid', label: 'Aluskaardid' },
];

const mapLayers = [
  { id: 'katastrikaart', label: <Toggle ariaLabel="Lorem ipsum" label={<Text>Katastrikaart</Text>} /> },
  { id: 'maakorralduskavad', label: <Toggle ariaLabel="Lorem ipsum" label={<Text>Maakorralduskavad</Text>} /> },
  {
    id: 'hinna-ja-viljakutsoonid',
    label: <Toggle ariaLabel="Lorem ipsum" label={<Text>Hinna- ja viljakustsoonid</Text>} />,
  },
  { id: 'koordinaatvõrgud', label: <Toggle ariaLabel="Lorem ipsum" label={<Text>Koordinaatvõrgud</Text>} /> },
  { id: 'kaardilehtede-jaotus', label: <Toggle ariaLabel="Lorem ipsum" label={<Text>Kaardilehtede jaotus</Text>} /> },
  { id: 'korgusandmed', label: <Toggle ariaLabel="Lorem ipsum" label={<Text>Kõrgusandmed</Text>} /> },
  { id: 'huvipunktid', label: <Toggle ariaLabel="Lorem ipsum" label={<Text>Huvipunktid</Text>} /> },
  {
    id: 'haldus-ja-asustuspiirid',
    label: <Toggle ariaLabel="Lorem ipsum" label={<Text>Haldus- ja asustuspiirid</Text>} />,
  },
  {
    id: 'eesti-topograafia-andmekogu',
    label: <Toggle ariaLabel="Lorem ipsum" label={<Text>Eesti topograafia andmekogu</Text>} />,
  },
];

const LayerPanelItems: LayerOption[] = [
  {
    defaultChecked: true,
    id: 'boundary',
    label: 'KÜ piiripunktid',
    name: 'boundary',
    type: 'checkbox' as const,
    value: 'boundary',
  },
  {
    children: [
      {
        defaultValue: {
          label: 'Tunnus',
          value: 'tunnus',
        },
        id: 'select-tunnus',
        label: '',
        options: [
          {
            label: 'Tunnus',
            value: 'tunnus',
          },
          {
            label: 'Koordinaat',
            value: 'koordinaat',
          },
          {
            label: 'Piir',
            value: 'piir',
          },
        ],
        placeholder: 'Tunnus',
        type: 'select',
      },
    ],
    id: 'show-on-map',
    label: 'Kuva kaardil',
    name: 'show-on-map',
    type: 'checkbox',
    value: 'show-on-map',
  },
  {
    defaultChecked: true,
    id: 'ownership',
    label: 'KÜ omandivorm',
    name: 'ownership',
    type: 'checkbox',
    value: 'ownership',
  },
  {
    id: 'purpose',
    label: 'KÜ sihtotstarbe järgi',
    name: 'purpose',
    type: 'checkbox',
    value: 'purpose',
  },
];

const dropdownContent = [
  {
    children: (
      <>
        <Icon name="add" display="inline" size={24} /> Lisa kiht
      </>
    ),
    onClick: () => console.log('Lisa kiht'),
  },
  {
    children: (
      <>
        <Icon name="folder" display="inline" size={24} /> Lisa grupp
      </>
    ),
    onClick: () => console.log('Lisa grupp'),
  },
  {
    children: (
      <>
        <Icon name="my_location" display="inline" size={24} /> Jälgi teekonda
      </>
    ),
    onClick: () => console.log('Jälgi teekonda'),
  },
  {
    children: (
      <>
        <Icon name="download" display="inline" size={24} /> Laadi alla
      </>
    ),
    onClick: () => console.log('Laadi alla'),
  },
];

export const Default: Story = {
  render: () => (
    <LeftPanel show2D3DButtons={false} showAlert={false}>
      <Card borderless>
        <Card.Content padding={0.5}>
          <Row gutterY={2}>
            <Col>
              <Text color="secondary">Teemakaardid</Text>
              <Select options={mapOptions} id="" label="" defaultValue={{ label: 'Maainfo', value: 'maainfo' }} />
            </Col>
          </Row>
        </Card.Content>
      </Card>

      <MapAccordion defaultOpenItem={['first']}>
        <MapAccordionItem id="first">
          <MapAccordionItemHeader
            title="Maainfo"
            dropdownContent={[
              { children: 'Lisa pöördumine', onClick: () => console.log('Lisa pöördumine') },
              { children: 'Lisa toetus', onClick: () => console.log('Lisa toetus') },
            ]}
            actions={
              <div className="flex align-items-center gap-2">
                <Icon name="history" color="white" size={18} />
                <Text modifiers={['small']}>Taasta algseis</Text>
              </div>
            }
          />
          <MapAccordionItemContent>
            <MapAccordion>
              {mapLayers.map(({ id, label }) => (
                <MapAccordionItem key={id} id={id}>
                  <MapAccordionItemHeader backgroundColor="secondary" hasSeparator title={label} />
                  <MapAccordionItemContent padding={0}>
                    <Card borderRadius={false} borderless>
                      <Card.Content padding={0}>
                        <MapLayer items={LayerPanelItems} />
                      </Card.Content>
                    </Card>
                  </MapAccordionItemContent>
                </MapAccordionItem>
              ))}
            </MapAccordion>
          </MapAccordionItemContent>
        </MapAccordionItem>

        <MapAccordionItem id="second">
          <MapAccordionItemHeader title="Minu kihid" dropdownContent={dropdownContent} />
          <MapAccordionItemContent>
            <Card borderRadius={false} borderless>
              <Card.Content padding={1}>Lorem ipsum</Card.Content>
            </Card>
          </MapAccordionItemContent>
        </MapAccordionItem>
      </MapAccordion>
    </LeftPanel>
  ),
};
