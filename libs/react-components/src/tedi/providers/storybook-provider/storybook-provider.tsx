import React from 'react';

import { Col, Row } from '../../components/grid';
import { Text } from '../../components/typography/text/text';

interface TextRowProps {
  desktopText: React.ReactNode;
  mobileText: React.ReactNode;
  isLink?: boolean;
  noUnderline?: boolean;
  className?: string;
}

export const TextRow: React.FC<TextRowProps> = ({
  desktopText,
  mobileText,
  isLink = false,
  noUnderline = false,
  className = '',
}) => (
  <Row className={className}>
    <Col>
      {isLink ? (
        <a href="javascript: void(0)" className={noUnderline ? 'no-underline' : 'underlined'}>
          {desktopText}
        </a>
      ) : (
        <Text className="desktop padding-14-16">{desktopText}</Text>
      )}
    </Col>
    <Col>
      {isLink ? (
        <a href="javascript: void(0)" className={noUnderline ? 'no-underline' : 'underlined'}>
          {mobileText}
        </a>
      ) : (
        <Text className="mobile padding-14-16">{mobileText}</Text>
      )}
    </Col>
  </Row>
);

TextRow.displayName = 'TextRow';
