import { StoryFn } from '@storybook/react/*';

import { Button } from '../../buttons/button/button';
import { Col, Row } from '../../grid';
import { HeadingWithIcon } from '../../heading-with-icon/heading-with-icon';
import { Icon } from '../../icon/icon';
import { Link } from '../../navigation/link/link';
import { Separator } from '../../separator/separator';
import { StatusBadge } from '../../status-badge/status-badge';
import { Heading } from '../../typography/heading/heading';
import { Text } from '../../typography/text/text';
import { VerticalSpacing } from '../../vertical-spacing';
import { CardStory } from './card.stories';
import { Card, CardContent, CardContentPadding, CardHeader } from './index';
import { CardBackground } from './utility';

export const HeaderTypesTemplate: StoryFn<CardStory> = () => (
  <VerticalSpacing>
    <Row>
      <Col>
        <Card>
          <CardHeader>
            <Heading element="h3">Title</Heading>
          </CardHeader>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <CardHeader>
            <Heading element="h3">Title</Heading>
            <Text color="secondary">Description</Text>
          </CardHeader>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <CardHeader>
            <Row>
              <Col>
                <Heading element="h3">Title</Heading>
              </Col>
              <Col width="auto">
                <Button>Create</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Text color="secondary">Description</Text>
              </Col>
            </Row>
          </CardHeader>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <CardHeader>
            <Row>
              <Col>
                <Heading element="h3">Title</Heading>
              </Col>
              <Col width="auto" style={{ display: 'flex', gap: 10 }}>
                <Button visualType="secondary" iconLeft={{ name: 'share' }}>
                  Share
                </Button>
                <Button visualType="secondary" iconLeft={{ name: 'print' }}>
                  Print
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Text color="secondary">Description</Text>
              </Col>
            </Row>
          </CardHeader>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <CardHeader>
            <Row>
              <Col>
                <Heading element="h3">Title</Heading>
              </Col>
              <Col width="auto">
                <Link id="card-link" iconRight={{ name: 'arrow_right_alt' }} href="#">
                  View result
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Text color="secondary">Description</Text>
              </Col>
            </Row>
          </CardHeader>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <CardHeader>
            <Row>
              <Col>
                <Heading element="h3">Title</Heading>
              </Col>
              <Col width="auto">
                <StatusBadge color="brand">Approved</StatusBadge>
              </Col>
            </Row>
            <Row>
              <Col>
                <Text color="secondary">Description</Text>
              </Col>
            </Row>
          </CardHeader>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <CardHeader background="secondary">
            <Row>
              <Col>
                <Heading element="h3">Title</Heading>
              </Col>
              <Col width="auto">
                <Button>Create</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Text color="secondary">Description</Text>
              </Col>
            </Row>
          </CardHeader>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <CardHeader background="tertiary">
            <Row>
              <Col>
                <Heading element="h3">Title</Heading>
              </Col>
              <Col width="auto">
                <Button>Create</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Text color="secondary">Description</Text>
              </Col>
            </Row>
          </CardHeader>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <CardHeader background="brand-primary">
            <Row>
              <Col>
                <Heading element="h3">Title</Heading>
              </Col>
              <Col width="auto">
                <Button visualType="secondary">Create</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Text>Description</Text>
              </Col>
            </Row>
          </CardHeader>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <CardHeader background="brand-secondary">
            <Row>
              <Col>
                <Heading element="h3">Title</Heading>
              </Col>
              <Col width="auto">
                <Button visualType="secondary">Create</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Text>Description</Text>
              </Col>
            </Row>
          </CardHeader>
        </Card>
      </Col>
    </Row>
  </VerticalSpacing>
);

export const DefaultCardTemplates: StoryFn<CardStory> = () => (
  <VerticalSpacing>
    <Row>
      <Col>
        <Card>
          <CardContent>
            <Text color="secondary">Description</Text>
          </CardContent>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <CardContent>
            <Text color="secondary">Description</Text>
            <StatusBadge color="brand">Approved</StatusBadge>
          </CardContent>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <CardContent>
            <Text modifiers="bold">Title</Text>
            <Text color="secondary">Description</Text>
          </CardContent>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <CardContent>
            <Text modifiers="bold">Title</Text>
            <Row>
              <Col>
                <Text color="secondary">Description</Text>
              </Col>
              <Col width="auto">
                <StatusBadge color="brand">Approved</StatusBadge>
              </Col>
            </Row>
          </CardContent>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <CardContent>
            <Row>
              <Col className="display-flex align-items-center gap-3">
                <Icon name="monitor_heart" />
                <Text color="secondary">Description</Text>
              </Col>
            </Row>
          </CardContent>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <CardContent>
            <Row>
              <Col className="display-flex align-items-center gap-3">
                <Icon name="monitor_heart" />
                <VerticalSpacing size={0}>
                  <Text modifiers="bold">Title</Text>
                  <Text color="secondary">Description</Text>
                </VerticalSpacing>
              </Col>
            </Row>
          </CardContent>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <CardContent>
            <Row>
              <Col className="display-flex align-items-center gap-3">
                <Icon name="monitor_heart" />
                <VerticalSpacing size={0}>
                  <Text modifiers="bold">Title</Text>
                  <Text color="secondary">Description</Text>
                </VerticalSpacing>
              </Col>
              <Col width="auto" className="display-flex align-items-center">
                <Button>Create</Button>
              </Col>
            </Row>
          </CardContent>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col lg={6} sm={12}>
        <Card>
          <CardContent>
            <Row>
              <Col>
                <Text modifiers="bold">Title</Text>
                <Text color="secondary">Description</Text>
                <Separator spacing={1.5} />
                <Row justifyContent="center">
                  <Col width="auto">
                    <Button>Create</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </CardContent>
        </Card>
      </Col>
    </Row>
  </VerticalSpacing>
);

export const CardInfoTemplate: StoryFn<CardStory> = () => (
  <VerticalSpacing>
    <Row>
      <Col>
        <Card>
          <CardContent background="brand-tertiary">
            <Row>
              <Col width="auto" className="display-flex align-items-center gap-3">
                <Icon background="primary" name="assignment_late" />
                <VerticalSpacing size={0}>
                  <Text modifiers="bold">Title</Text>
                  <Text color="secondary">Description</Text>
                </VerticalSpacing>
              </Col>
            </Row>
          </CardContent>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <CardContent
            background="brand-tertiary"
            backgroundImage="card-background-example.svg"
            backgroundSize="75px"
            backgroundPosition="right center"
            backgroundRepeat="no-repeat"
          >
            <Row>
              <Col width="auto" className="display-flex align-items-center gap-3">
                <Icon background="primary" name="assignment_late" />
                <VerticalSpacing size={0}>
                  <Text modifiers="bold">Title</Text>
                  <Text color="secondary">Description</Text>
                </VerticalSpacing>
              </Col>
            </Row>
          </CardContent>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card border="accent">
          <CardContent background="accent">
            <Row>
              <Col width="auto" className="display-flex align-items-center gap-3">
                <Icon background="primary" name="assignment_late" />
                <VerticalSpacing size={0}>
                  <Text modifiers="bold">Title</Text>
                  <Text color="secondary">Description</Text>
                </VerticalSpacing>
              </Col>
            </Row>
          </CardContent>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card border="neutral-primary">
          <CardContent background="neutral-primary">
            <Row>
              <Col width="auto" className="display-flex align-items-center gap-3">
                <Icon background="primary" name="calendar_today" filled />
                <Text color="secondary">
                  Haigusleht: <strong>118.</strong> päev
                </Text>
              </Col>
            </Row>
          </CardContent>
        </Card>
      </Col>
    </Row>
  </VerticalSpacing>
);

export const AlternativeCardsTemplate: StoryFn<CardStory> = () => (
  <VerticalSpacing>
    <Row>
      <Col lg={6} sm={12}>
        <Card>
          <CardHeader>
            <HeadingWithIcon name="assignment_ind" headingColor="brand" iconColor="brand">
              My statement of intention
            </HeadingWithIcon>
          </CardHeader>
          <CardContent padding={{ top: 0, right: 1, bottom: 1, left: 1 }}>
            <Row>
              <Col>
                <Text color="secondary">For example organ donation and blood transfusion</Text>
                <Separator spacing={1.5} />
                <Button visualType="secondary">View statements of intention</Button>
              </Col>
            </Row>
          </CardContent>
        </Card>
      </Col>
      <Col lg={6} sm={12}>
        <Card>
          <CardContent>
            <Row>
              <Col>
                <Text modifiers="bold">Title</Text>
                <Text color="secondary">For example organ donation and blood transfusion</Text>
                <Separator spacing={1.5} />
                <Button visualType="secondary">View statements of intention</Button>
              </Col>
            </Row>
          </CardContent>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col lg={6} sm={12}>
        <Card>
          <CardHeader background="brand-primary">
            <Heading element="h3" color="white">
              Short title
            </Heading>
          </CardHeader>
          <CardContent>
            <Row>
              <Col>
                <VerticalSpacing>
                  <Text color="secondary">For example organ donation and blood transfusion</Text>
                  <Button visualType="secondary">View statements of intention</Button>
                </VerticalSpacing>
              </Col>
            </Row>
          </CardContent>
        </Card>
      </Col>
      <Col lg={6} sm={12}>
        <Card>
          <CardContent>
            <Text color="secondary">For example organ donation and blood transfusion</Text>
          </CardContent>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card border="left-danger-secondary">
          <CardContent>
            <Text>Card important</Text>
          </CardContent>
        </Card>
      </Col>
    </Row>
  </VerticalSpacing>
);

export const SpacingTemplate: StoryFn<CardStory> = () => {
  const paddings: CardContentPadding[] = [
    { top: 0.5, left: 0.5, right: 0.5, bottom: 0.5 },
    { top: 1, left: 1, right: 1, bottom: 1 },
    { top: 1.5, left: 1.5, right: 1.5, bottom: 1.5 },
  ];

  return (
    <Row>
      {paddings.map((padding, index) => (
        <Col lg={4} sm={12} key={index}>
          <Card>
            <CardContent padding={padding}>
              <Text>
                Cabbage, comprising several cultivars of Brassica oleracea, is a leafy green, red (purple), or white
                (pale green) biennial plant grown as an annual vegetable crop for its dense-leaved heads.
              </Text>
            </CardContent>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export const BackgroundColorsTemplate: StoryFn<CardStory> = () => {
  const backgroundColors: CardBackground[] = [
    'primary',
    'secondary',
    'tertiary',
    'brand-primary',
    'brand-secondary',
    'brand-tertiary',
    'brand-quaternary',
    'success-primary',
    'accent',
  ];

  return (
    <Row>
      {backgroundColors.map((color, index) => (
        <Col lg={4} sm={12} key={index} style={{ marginBottom: '1.5rem' }}>
          <Card background={color} borderless={color !== 'primary' ? true : false}>
            <CardContent>
              <Text>
                Cabbage, comprising several cultivars of Brassica oleracea, is a leafy green, red (purple), or white
                (pale green) biennial plant grown as an annual vegetable crop for its dense-leaved heads.
              </Text>
            </CardContent>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
