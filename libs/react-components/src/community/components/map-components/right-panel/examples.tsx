import { Button, Card, Checkbox, ChoiceGroup, Col, Row, Separator, Text, VerticalSpacing } from '../../../../tedi';
import Accordion from '../accordion/accordion';
import AccordionItem from '../accordion/accordion-item';
import AccordionItemContent from '../accordion/accordion-item-content';
import AccordionItemHeader from '../accordion/accordion-item-header';

const layers = [
  { id: 'koordinaadid', label: <Text>Koordinaadid</Text>, content: <>Lorem</> },
  { id: 'hoone', label: <Text>Hoone (7291722)</Text>, content: <>Lorem</> },
  { id: 'metainfo', label: <Text>Metainfo (587545)</Text>, content: <>Lorem</> },
];

export const measurementContent = (
  <Card borderRadius={false} borderless>
    <Card.Content>
      <ChoiceGroup
        id="choice-group"
        inputType="radio"
        items={[
          { id: 'radio-card-1', label: 'Mõõda joone pikkust', value: 'value-1', defaultChecked: true },
          { id: 'radio-card-2', label: 'Mõõda pindala', value: 'value-2' },
          { id: 'radio-card-3', label: 'Mõõda ringina', value: 'value-3' },
        ]}
        hideLabel
        label="Filter"
        name="Map actions"
        color="secondary"
        showIndicator
        variant="card"
        layout="separated"
      />
      <Separator color="primary" spacing={1} />
      <VerticalSpacing size={0.5}>
        <Checkbox
          id="show-lengths"
          label="Näita pikkusi"
          name="show-lengths"
          value="checkbox"
          tooltip="This is a tooltip"
        />
        <Checkbox id="show-angles" label="Näita nurki" name="show-angles" value="checkbox" />
      </VerticalSpacing>
      <Separator color="primary" spacing={1} />
      <VerticalSpacing>
        <div>
          <Text color="secondary">Joone kogupikkus</Text>
          <Text modifiers="bold">345,234 km</Text>
        </div>
        <div>
          <Text color="secondary">Viimane jooksev lõik</Text>
          <Text modifiers="bold">34,23 km</Text>
        </div>
      </VerticalSpacing>
      <Separator color="primary" spacing={1} />
      <Row justifyContent="between">
        <Col width="auto">
          <Button visualType="secondary" iconLeft="edit">
            Muuda
          </Button>
        </Col>
        <Col>
          <Button visualType="secondary" iconLeft="delete">
            Kustuta
          </Button>
        </Col>
      </Row>
    </Card.Content>
  </Card>
);

export const infoQueryContent = (
  <Card borderRadius={false} borderless padding={0}>
    <Card.Content>
      <Accordion>
        {layers.map(({ id, label, content }) => (
          <AccordionItem key={id} id={id}>
            <AccordionItemHeader backgroundColor="secondary" hasSeparator>
              {label}
            </AccordionItemHeader>
            <AccordionItemContent padding={0}>
              <Card borderRadius={false} borderless>
                <Card.Content padding={1}>{content}</Card.Content>
              </Card>
            </AccordionItemContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card.Content>
  </Card>
);
