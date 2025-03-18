import { Col, Row } from '../../../tedi/components/layout/grid';
import { VerticalSpacing } from '../../../tedi/components/layout/vertical-spacing';
import { Separator } from '../../../tedi/components/misc/separator/separator';
import { Button, Card, CardContent, Heading, Text } from '../../index';

const ButtonGroups = () => (
  <VerticalSpacing>
    <Card borderless={true}>
      <CardContent>
        <VerticalSpacing>
          <Heading>Button group</Heading>
          <Heading element="h2">Button hierarchy and alignment within a group</Heading>
          <p>
            All buttons have their priority in the context of a page or a process and are placed according to the
            hierarchy.
          </p>
          <ul>
            <li>
              <b>Primary buttons</b> represent the main action you want users to take on a given page or screen. They
              are the most prominent buttons.
            </li>
            <li>
              <b>Secondary buttons</b> represent an alternative, less important action that users can take.
            </li>
            <li>
              <b>Tertiary buttons</b> represent actions that are helpful but not critical.
            </li>
          </ul>
          <p>Spacing between buttons is 12px.</p>
          <Horizontal />
          <Vertical />
        </VerticalSpacing>
      </CardContent>
    </Card>
    <Separator spacing={5} />
    <Card borderless={true} background="bg-muted">
      <CardContent>
        <VerticalSpacing size={2.5}>
          <ButtonGroupAlignment />
          <RightAlignment />
          <RightAlignmentBack />
          <CentralAlignment />
          <LeftAlignment />
        </VerticalSpacing>
      </CardContent>
    </Card>
  </VerticalSpacing>
);

const Horizontal = () => (
  <Row>
    <Col lg={8}>
      <Card background="bg-muted" borderless={true}>
        <CardContent>
          <VerticalSpacing size={2}>
            <Row direction="row-reverse" alignItems="center" gutterX={1} gap={2}>
              <Col width="auto">
                <Text color="subtle">1</Text>
              </Col>
              <Col width="auto">
                <Button>Primary</Button>
              </Col>
              <Col width="auto">
                <Button visualType="secondary">Secondary</Button>
              </Col>
              <Col width="auto">
                <Button visualType="tertiary">Tertiary</Button>
              </Col>
            </Row>
            <Row direction="row-reverse" alignItems="center" gutterX={1} gap={2}>
              <Col width="auto">
                <Text color="subtle">2</Text>
              </Col>
              <Col width="auto">
                <Button>Primary</Button>
              </Col>
              <Col width="auto">
                <Button visualType="tertiary">Tertiary</Button>
              </Col>
            </Row>
            <Row direction="row-reverse" alignItems="center" gutterX={1} gap={2}>
              <Col width="auto">
                <Text color="subtle">3</Text>
              </Col>
              <Col width="auto">
                <Button visualType="secondary">Secondary</Button>
              </Col>
              <Col width="auto">
                <Button visualType="tertiary">Tertiary</Button>
              </Col>
            </Row>
          </VerticalSpacing>
        </CardContent>
      </Card>
    </Col>
    <Col lg={4}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Horizontal</Text>
        <Text>
          The primary button is always on the right, followed by secondary and then tertiary. The design does not have
          to have all 3 button types.
        </Text>
      </VerticalSpacing>
    </Col>
  </Row>
);

const Vertical = () => (
  <Row>
    <Col lg={8}>
      <Card background="bg-muted" borderless={true}>
        <CardContent>
          <Row justifyContent="center">
            <Col width="auto">
              <Row direction="column" alignItems="center" gutterX={1} gap={2}>
                <Col width="auto">
                  <Text color="subtle">1</Text>
                </Col>
                <Col width="auto">
                  <Button>Primary</Button>
                </Col>
                <Col width="auto">
                  <Button visualType="secondary">Secondary</Button>
                </Col>
                <Col width="auto">
                  <Button visualType="tertiary">Tertiary</Button>
                </Col>
              </Row>
            </Col>
            <Col width="auto">
              <Row direction="column" alignItems="center" gutterX={1} gap={2}>
                <Col width="auto">
                  <Text color="subtle">2</Text>
                </Col>
                <Col width="auto">
                  <Button>Primary</Button>
                </Col>
                <Col width="auto">
                  <Button visualType="tertiary">Tertiary</Button>
                </Col>
              </Row>
            </Col>
            <Col width="auto">
              <Row direction="column" alignItems="center" gutterX={1} gap={2}>
                <Col width="auto">
                  <Text color="subtle">3</Text>
                </Col>
                <Col width="auto">
                  <Button visualType="secondary">Secondary</Button>
                </Col>
                <Col width="auto">
                  <Button visualType="tertiary">Tertiary</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </CardContent>
      </Card>
    </Col>
    <Col lg={4}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Vertical</Text>
        <Text>
          The primary button is always on the top, followed by secondary and then tertiary. The design does not have to
          have all 3 button types.
        </Text>
      </VerticalSpacing>
    </Col>
  </Row>
);

const ButtonGroupAlignment = () => (
  <VerticalSpacing>
    <Heading element="h2">Button group alignment</Heading>
    <p>
      Buttons and button groups primarily use right alignment. This helps maintain a consistent flow, particularly for
      interfaces that are read left-to-right.
    </p>
    <ul>
      <li>
        <b>Right alignment</b>
        <br /> All button examples: Submit, Accept, Next, Save etc.
      </li>
      <li>
        <b>Right alignment + back action</b>
        <br /> Back action button examples: Back, Cancel.
      </li>
      <li>
        <b>Central alignment</b>
        <br /> Central button examples: Show more, Load more.
      </li>
    </ul>
  </VerticalSpacing>
);

const RightAlignment = () => (
  <VerticalSpacing>
    <Heading element="h3">Right alignment</Heading>
    <p>
      Right alignment of buttons is the default and should be used in most cases across the designs. <br />
      On mobile or in a small space:
      <ul>
        <li>
          if buttons fit in one row:
          <ul>
            <li>button alignment right,</li>
            <li>button alignment centre,</li>
            <li>button alignment centre : vertically</li>
          </ul>
        </li>
        <li>
          If buttons don&apos;t fit in one row:
          <ul>
            <li>
              button alignment centre : vertically, taking into account the button hierarchy starting from primary.
            </li>
          </ul>
        </li>
      </ul>
    </p>
    <img alt="Right alignment examples" src="buttons/right-alignment.svg" />
  </VerticalSpacing>
);
const RightAlignmentBack = () => (
  <VerticalSpacing>
    <Heading element="h3">Right alignment + back action</Heading>
    <p>
      The button for moving a step back in the process or interrupting the process is aligned to the left in the view or
      the form. Users often expect that they&apos;ll find the button to progress further into a process on the right and
      the button to regress or cancel on the left, reflecting the metaphor of moving forward and backward. It also
      supports the back gesture supported by the majority of the browsers.
    </p>
    <p>For example: “Back”, “Cancel” and “Cancel and Delete”.</p>
    <p>
      On mobile or in a small space:
      <ul>
        <li>
          if buttons fit on one row:
          <ul>
            <li>button alignment right + left,</li>
            <li>button alignment center : vertically.</li>
          </ul>
        </li>
        <li>
          If buttons don&apos;t fit in one row:
          <ul>
            <li>
              button alignment center : vertically, taking into account the button hierarchy starting from primary.
            </li>
          </ul>
        </li>
      </ul>
    </p>
    <img alt="Right alignment with back buttons examples" src="buttons/right-alignment-back.svg" />
  </VerticalSpacing>
);

const CentralAlignment = () => (
  <VerticalSpacing>
    <Heading element="h3">Central alignment</Heading>
    <p>
      In some cases it makes sense to align the button to the center. For example, when a button is responsible for
      downloading more content. Generally, it&apos;s only used for a single button. Use this alignment style with care.
    </p>
    <p>
      On mobile or in a small space:
      <ul>
        <li>button alignment center.</li>
      </ul>
    </p>
    <img alt="Central alignment examples" src="buttons/central-alignment.svg" />
  </VerticalSpacing>
);

const LeftAlignment = () => (
  <VerticalSpacing>
    <Heading element="h3">Left alignment</Heading>
    <p>Left alignment is also possible, but not endorsed. Use with great care.</p>
    <img alt="Left alignment examples" src="buttons/left-alignment.svg" />
  </VerticalSpacing>
);

export default ButtonGroups;
