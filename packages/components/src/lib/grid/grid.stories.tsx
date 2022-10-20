import { ArgsTable, Description, Primary, PRIMARY_STORY, Stories, Subtitle, Title } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';

import Notification from '../notification/notification';
import { Col } from './col';
import { Row } from './row';

export default {
  title: 'components/Grid',
  component: Row,
  subcomponents: { Col },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>Grid that is built with Row and Col components</Subtitle>
          <Description>
            Row and Col components are inspired by bootstrap V5 Grid System. U can use different bootstrap grid classes
            throught component props. https://getbootstrap.com/docs/5.1/layout/grid/
          </Description>
          <Notification title="Important!">
            Row component should be always used with Col components as direct children. And Col component should always
            have Row as wrapper!
          </Notification>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as Meta;

export const Default = () => {
  return (
    <div>
      <Row className="example-row">
        <Col className="example-box">Col-1</Col>
        <Col className="example-box">Col-2</Col>
        <Col className="example-box">Col-3</Col>
      </Row>
      <Row className="example-row" justifyContent="between">
        <Col className="example-box" sm={2} lg={3}>
          Col-1
        </Col>
        <Col className="example-box" sm={2} lg={3}>
          Col-2
        </Col>
        <Col className="example-box" sm={2} lg={3}>
          Col-3
        </Col>
      </Row>
      <Row className="example-row" cols={1} md={2} lg={3} xl={{ justifyContent: 'around' }}>
        <Col className="example-box" xl={{ width: 3, order: 'last' }}>
          Col-1
        </Col>
        <Col className="example-box" xl={{ width: 3, order: 0 }}>
          Col-2
        </Col>
        <Col className="example-box" xl={{ width: 3, order: 'first' }}>
          Col-3
        </Col>
      </Row>
      <Row className="example-row" gap={5}>
        <Col className="example-box">Col-1</Col>
        <Col className="example-box">Col-2</Col>
        <Col className="example-box">Col-3</Col>
      </Row>
    </div>
  );
};
