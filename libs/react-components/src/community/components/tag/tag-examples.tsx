import { Col, ColProps, Row } from '../../../tedi/components/layout/grid';
import { VerticalSpacing } from '../../../tedi/components/layout/vertical-spacing';
import { Skeleton } from '../../../tedi/components/loaders/skeleton';
import { Separator } from '../../../tedi/components/misc/separator/separator';
import { Card, CardContent, CardProps, Heading, Icon, Tag, TagProps } from '../../index';

const TagExamples = () => {
  return (
    <VerticalSpacing size={2}>
      <VerticalSpacing size={0.5}>
        <Heading element="h3">Example: copy</Heading>
        <Row>
          <TagExampleCard
            tags={[{ children: 'Submitted', color: 'positive' }]}
            card={{ background: 'positive-highlight' }}
            description={
              <p>
                Use: <br />
                Short, clear and descriptive tags.
              </p>
            }
          />
          <TagExampleCard
            tags={[{ children: 'Application is now submitted', color: 'primary' }]}
            card={{ background: 'important-highlight' }}
            description={
              <p>
                Avoid:
                <br /> Long and non-descriptive text.
              </p>
            }
          />
        </Row>
      </VerticalSpacing>

      <VerticalSpacing size={0.5}>
        <Heading element="h3">Example: accent tag & accessibility</Heading>
        <Row>
          <TagExampleCard
            tags={[{ children: 'J', color: 'accent' }]}
            card={{ background: 'positive-highlight' }}
            description={
              <p>
                Use:
                <br />
                The accent tag should only be used as an illustrative element, due to it&apos;s readability issues.
              </p>
            }
            content="John Smith"
          />
          <TagExampleCard
            tags={[{ children: 'Paid', color: 'accent' }]}
            card={{ background: 'important-highlight' }}
            description={
              <p>
                Avoid: <br />
                Do not use an accent tag alone or to convey meaningful information, since it&apos;s hard to read and
                it&apos;s not compliant with WCAG AA contrast standards
              </p>
            }
          />
        </Row>
      </VerticalSpacing>

      <Separator spacing={5} />
      <VerticalSpacing size={0.5}>
        <Heading element="h2">Variants</Heading>
        <VerticalSpacing>
          <Row>
            <TagExampleCard
              card={{ background: 'bg-muted' }}
              tags={[{ children: 'J' }, { children: 'J', size: 'large' }]}
            />
            <Col width="auto">
              <VerticalSpacing size={0.5}>
                <p>
                  <b>Size</b>
                </p>
                <ul>
                  <li>Default: 24px</li>
                  <li>Large: 40px</li>
                </ul>
              </VerticalSpacing>
            </Col>
          </Row>
          <Row>
            <TagExampleCard
              card={{ background: 'bg-muted' }}
              tags={[
                { children: 'J' },
                { children: 'J', color: 'primary' },
                { children: 'J', color: 'accent' },
                { children: 'J', color: 'positive' },
                { children: 'J', color: 'warning' },
                { children: 'J', color: 'important' },
              ]}
            />
            <Col width="auto">
              <VerticalSpacing size={0.5}>
                <p>
                  <b>Color</b>
                </p>
                <ul>
                  <li>Default</li>
                  <li>Primary</li>
                  <li>Accent</li>
                  <li>Positive</li>
                  <li>Warning</li>
                  <li>Important</li>
                </ul>
              </VerticalSpacing>
            </Col>
          </Row>
          <Row>
            <TagExampleCard
              card={{ background: 'bg-muted' }}
              tags={[
                { children: 'J', color: 'primary' },
                { children: 'J', color: 'primary', type: 'secondary' },
                { children: 'J', color: 'primary', type: 'ghost' },
                { children: 'J', color: 'primary', type: 'invisible' },
              ]}
            />
            <Col width="auto">
              <VerticalSpacing size={0.5}>
                <p>
                  <b>Type</b>
                </p>
                <ul>
                  <li>Default</li>
                  <li>Secondary</li>
                  <li>Ghost</li>
                  <li>Invisible</li>
                </ul>
              </VerticalSpacing>
            </Col>
          </Row>
        </VerticalSpacing>
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Heading element="h2">Additional variations</Heading>
        <Row>
          <TagExampleCard
            card={{ background: 'bg-muted' }}
            tags={[
              { children: 'J', hasArrow: true },
              { children: 'Sent', color: 'primary', hasArrow: true },
            ]}
            col={{ lg: 3 }}
            description={
              <p>
                <b>Arrow</b> <br />- True/False
              </p>
            }
          />
          <TagExampleCard
            card={{ background: 'bg-muted' }}
            tags={[
              { children: 'J', rounded: true },
              { children: 'Sent', color: 'primary', rounded: true },
            ]}
            col={{ lg: 3 }}
            description={
              <p>
                <b>Rounded</b> <br />- True/False
              </p>
            }
          />
          <TagExampleCard
            card={{ background: 'bg-muted' }}
            tags={[
              { children: <Icon name="add" filled size={12} />, iconOnly: true },
              { children: <Icon name="add" filled size={12} />, color: 'primary', iconOnly: true },
            ]}
            col={{ lg: 3 }}
            description={
              <p>
                <b>Icon only</b> <br />- True/False
              </p>
            }
          />
          <TagExampleCard
            card={{ background: 'bg-muted' }}
            tags={[
              { children: 'J', status: 'success' },
              { children: 'John', color: 'primary', status: 'success' },
            ]}
            col={{ lg: 3 }}
            description={
              <p>
                <b>Status</b> <br />- True/False <br />
                Type: Active, Error, Inactive
              </p>
            }
          />
        </Row>
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Heading element="h2">Width</Heading>
        <Row>
          <TagExampleCard
            card={{ background: 'bg-muted' }}
            tags={[{ children: 'Long text' }, { children: 'Long text', size: 'large' }]}
            col={{ lg: 6 }}
            description={
              <p>
                <b>Width behavior</b>
                <br />
                Width adjusts to the content width.
              </p>
            }
          />
          <TagExampleCard
            card={{ background: 'bg-muted' }}
            tags={[{ children: 'J' }, { children: 'J', size: 'large' }]}
            col={{ lg: 6 }}
            description={
              <p>
                <b>Min width</b>
                <ul>
                  <li>Medium: 24px.</li>
                  <li>Large: 40px</li>
                </ul>
              </p>
            }
          />
        </Row>
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Heading element="h2">States</Heading>
        <Skeleton>
          <Row>
            <TagExampleCard
              card={{ background: 'bg-muted' }}
              tags={[
                { children: 'J', type: 'secondary', isLoading: true, color: 'default' },
                { children: 'J', type: 'secondary', isLoading: true, color: 'primary' },
                { children: 'J', type: 'secondary', isLoading: true, color: 'accent' },
                { children: 'J', type: 'secondary', isLoading: true, color: 'positive' },
                { children: 'J', type: 'secondary', isLoading: true, color: 'warning' },
                { children: 'J', type: 'secondary', isLoading: true, color: 'important' },
              ]}
              col={{ lg: 6 }}
              description={
                <p>
                  <b>Loading</b>
                  <br />
                  Subtle gradient movement
                </p>
              }
            />
            <TagExampleCard
              card={{ background: 'bg-muted' }}
              tags={[
                { children: 'J', isDisabled: true, color: 'default' },
                { children: 'J', isDisabled: true, color: 'primary' },
                { children: 'J', isDisabled: true, color: 'accent' },
                { children: 'J', isDisabled: true, color: 'positive' },
                { children: 'J', isDisabled: true, color: 'warning' },
                { children: 'J', isDisabled: true, color: 'important' },
                { children: 'J', type: 'secondary', isDisabled: true, color: 'default' },
                { children: 'J', type: 'secondary', isDisabled: true, color: 'primary' },
                { children: 'J', type: 'secondary', isDisabled: true, color: 'accent' },
                { children: 'J', type: 'secondary', isDisabled: true, color: 'positive' },
                { children: 'J', type: 'secondary', isDisabled: true, color: 'warning' },
                { children: 'J', type: 'secondary', isDisabled: true, color: 'important' },
              ]}
              col={{ lg: 6 }}
              description={
                <VerticalSpacing size={0.5}>
                  <p>
                    <b>Disabled:</b> <br />- Opacity: 0.5
                  </p>
                  <p>
                    Note that a tag is not an interactive element, but it can be placed into one, for example, into a
                    select dropdown. We use the disabled tag style only if its interactive parent element is disabled.
                  </p>
                </VerticalSpacing>
              }
            />
          </Row>
        </Skeleton>
      </VerticalSpacing>
    </VerticalSpacing>
  );
};

interface TagExampleCardProps {
  tags: TagProps[];
  card: CardProps;
  col?: ColProps;
  description?: React.ReactNode;
  content?: React.ReactNode;
}

const TagExampleCard = ({ tags, card, description, content, col }: TagExampleCardProps) => (
  <Col lg={6} {...col}>
    <VerticalSpacing>
      <Card borderless={true} padding={1.5} {...card}>
        <CardContent>
          <Row justifyContent="center" alignItems="center">
            <Col width="auto">
              <Row gutter={2} alignItems="center">
                {tags.map((tag, index) => (
                  <Col width="auto" key={index}>
                    <Tag {...tag} />
                  </Col>
                ))}
                {!!content && <Col width="auto">{content}</Col>}
              </Row>
            </Col>
          </Row>
        </CardContent>
      </Card>
      {description}
    </VerticalSpacing>
  </Col>
);

export default TagExamples;
