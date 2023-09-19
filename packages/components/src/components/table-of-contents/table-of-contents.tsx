import cn from 'classnames';

import { Layouts, useLayout } from '../../helpers';
import { useLabels } from '../../providers/label-provider';
import Affix from '../affix/affix';
import { Card, CardContent } from '../card';
import Collapse, { CollapseProps } from '../collapse/collapse';
import { Col, Row } from '../grid';
import Icon from '../icon/icon';
import Separator from '../separator/separator';
import StretchContent from '../stretch-content/stretch-content';
import Heading from '../typography/heading/heading';
import { Text } from '../typography/text/text';
import { VerticalSpacing } from '../vertical-spacing';
import styles from './table-of-contents.module.scss';

export interface TableOfContentsItem {
  /*
   * Content should generally use the anchor or button element
   * For example:
   * Link - <Anchor href="#abc">Something</Anchor>
   * Button - <Button onClick={() => setCurrentStep(i)} />
   */
  content: React.ReactNode;
  /**
   * Can contain true/false/undefined -
   * true/false for validated fields
   * undefined for fields that haven't been touched
   */
  isValid?: boolean;
}

export interface TableOfContentsProps {
  /**
   * List of items to be shown in the table of contents
   */
  items: TableOfContentsItem[];
  /**
   * Heading of the table of contents
   * @default Value from LabelProvider
   */
  heading?: string;
  /**
   * Collapse properties shown on mobile devices
   * Use when need to override default properties/labels
   */
  collapse?: CollapseProps;
  /**
   * Show icons before items
   * @default false
   */
  showIcons?: boolean;
  /**
   * When should mobile layout to be used
   * @default 'mobile'
   */
  breakToMobile?: Layouts;
}

/**
 * TableOfContents is helper component that can be used to show table of contents for long pages or multi step forms. It keeps fixed next to the content when srcolled. <br />
 * When used to link to sections on the same page, make sure to use the same id on the section and the table of contents item Anchor. <br />
 * When used to keep track of multi step form progress, usage on `showIcons={true}` is recommended. Keep in mind that `isValid` property is optional and can be undefined to show not validated steps. <br />
 * Also it is possible to use disabled-text as item content, to show that user can't skip to next step. <br />
 */
export const TableOfContents = (props: TableOfContentsProps) => {
  const { breakToMobile = ['mobile'] } = props;
  const isMobileLayout = useLayout(breakToMobile);

  return (
    <Affix
      bottom={0}
      right={0}
      left={0}
      top={isMobileLayout ? 'unset' : 1.5}
      position={isMobileLayout ? 'fixed' : 'sticky'}
    >
      <StretchContent>
        <Card className={cn({ [styles['card-shadow']]: isMobileLayout })}>
          <CardContent>
            {isMobileLayout ? <TableOfContentsCollapse {...props} /> : <TableOfContentsItems {...props} />}
          </CardContent>
        </Card>
      </StretchContent>
    </Affix>
  );
};

const TableOfContentsCollapse = (props: TableOfContentsProps) => {
  const { getLabel } = useLabels();
  const { items, showIcons, heading, collapse } = props;
  const validatedItems = items.map((i) => typeof i.isValid === 'boolean').filter(Boolean).length;
  const correctItems = items.map((i) => i.isValid === true).filter(Boolean).length;
  const invalidItems = items.map((i) => i.isValid === false).filter(Boolean).length;

  return (
    <Collapse
      id="table-of-contents-collapse"
      title={
        <div>
          {showIcons && validatedItems !== items.length ? (
            <Row gutter={2}>
              <Col width="auto">
                <Icon name="check" color="positive" />
              </Col>
              <Col width="auto">
                {correctItems} / {items.length}
              </Col>
            </Row>
          ) : showIcons ? (
            <Row gutter={2}>
              <Col width="auto">
                <Icon name="check" color="positive" />
              </Col>
              <Col>{correctItems}</Col>
              <Col width="auto">
                <Icon name="warning" color="important" />
              </Col>
              <Col>{invalidItems}</Col>
            </Row>
          ) : (
            <Heading element="h2" modifiers={['normal', 'bold']}>
              {getLabel('table-of-contents.title') || heading}
            </Heading>
          )}
        </div>
      }
      {...collapse}
    >
      <VerticalSpacing size={0.5}>
        <Separator fullWidth />
        <TableOfContentsItems {...props} />
      </VerticalSpacing>
    </Collapse>
  );
};

const TableOfContentsItems = (props: TableOfContentsProps) => {
  const { items, showIcons, heading, breakToMobile = ['mobile'] } = props;
  const isMobileLayout = useLayout(breakToMobile);
  const { getLabel } = useLabels();
  const showTitle = showIcons ? true : !isMobileLayout;

  return (
    <Row direction="column">
      {showTitle && (
        <Col>
          <Heading element="h2" modifiers="h4">
            {getLabel('table-of-contents.title') || heading}
          </Heading>
        </Col>
      )}
      {items.map((i, index) => (
        <Col key={`toc-item-${index}`}>
          <VerticalSpacing size={2}>
            <Row gutter={2}>
              {showIcons && (
                <Col width="auto">
                  {i?.isValid === false ? (
                    <Icon name="warning" color="important" />
                  ) : (
                    <Icon name="check" color={i?.isValid === true ? 'positive' : 'disabled'} />
                  )}
                </Col>
              )}
              <Col>
                <Text element="div" modifiers="break-word">
                  {i?.content}
                </Text>
              </Col>
            </Row>
          </VerticalSpacing>
        </Col>
      ))}
    </Row>
  );
};

export default TableOfContents;
