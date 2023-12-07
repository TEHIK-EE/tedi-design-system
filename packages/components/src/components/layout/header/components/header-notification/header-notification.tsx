import React from 'react';

import { Card, CardContent, CardProps } from '../../../../card';
import { Col, Row } from '../../../../grid';
import Icon from '../../../../icon/icon';

export interface HeaderNotificationProps {
  /**
   * Content of the notification
   */
  children?: React.ReactNode;
  /**
   * Name of material symbols icon
   * https://fonts.google.com/icons?icon.set=Material+Symbols
   * @default info
   */
  icon?: string;
  /**
   * Background color of card content
   * @default primary-highlight
   */
  background?: CardProps['background'];
}

export const HeaderNotification = (props: HeaderNotificationProps) => {
  const { children, icon = 'info', background = 'primary-highlight' } = props;

  return (
    <Card borderless background={background} borderRadius={false}>
      <CardContent>
        <Row justifyContent="between" alignItems="center" gap={1} gutter={0}>
          <Col width="auto">
            <Icon name={icon} />
          </Col>
          <Col>{children}</Col>
        </Row>
      </CardContent>
    </Card>
  );
};

export default HeaderNotification;
