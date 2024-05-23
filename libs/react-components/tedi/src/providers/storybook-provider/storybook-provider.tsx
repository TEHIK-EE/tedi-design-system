import React from 'react';

import { Text } from '../../components/typography/text/text';

interface RowProps {
  children: React.ReactNode;
  className?: string;
}

export const Row: React.FC<RowProps> = ({ children, className = '' }) => (
  <div className={`row ${className} padding-14-16`}>{children}</div>
);

interface ColumnProps {
  children: React.ReactNode;
  className?: string;
}

export const Column: React.FC<ColumnProps> = ({ children, className = '' }) => (
  <div className={`column w-50 text-left ${className}`}>{children}</div>
);

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
    <Column>
      {isLink ? (
        <a href="#" className={noUnderline ? 'no-underline' : 'underlined'}>
          {desktopText}
        </a>
      ) : (
        <Text className="desktop">{desktopText}</Text>
      )}
    </Column>
    <Column>
      {isLink ? (
        <a href="#" className={noUnderline ? 'no-underline' : 'underlined'}>
          {mobileText}
        </a>
      ) : (
        <Text className="mobile">{mobileText}</Text>
      )}
    </Column>
  </Row>
);
