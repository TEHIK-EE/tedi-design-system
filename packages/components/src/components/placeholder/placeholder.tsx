import React from 'react';

import { useBreakpoint } from '../../helpers';
import { Card, CardContent, CardProps } from '../card';
import { Col, Row } from '../grid';
import Icon, { IconProps } from '../icon/icon';

export interface PlaceholderProps {
  /**
   * Placeholder block content
   */
  children?: React.ReactNode;
  /**
   * When icon is a string we render a `<Icon>`
   */
  icon?: string | React.ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * Icon props that get passed to `<Icon>`. Only used when `icon` is a string.
   */
  iconProps?: Omit<IconProps, 'name'>;
  /**
   * Card props that get passed to `<Card>`
   */
  cardProps?: Omit<CardProps, 'className'>;
  /**
   * Use when nesting inside other components like `<CardContent>`. Passes certain default props to the inner card, like `type='borderless'`, `padding='none'` etc.
   * This is just a shortcut. The same result can be achieved using `cardProps`
   */
  isNested?: boolean;
}

/**
 * Placeholder is used to indicate, that there is no data to show. It can be used on its own or inside other components, like a `<CardContent>`.
 * Other components also use it internally for displaying empty state. (E.g. `<Table>`)
 */
export const Placeholder = (props: PlaceholderProps): JSX.Element => {
  const { icon = 'spa', className, children, iconProps, cardProps, isNested, ...rest } = props;
  const breakpoint = useBreakpoint();
  const isMobileLayout = ['xs', 'sm'].includes(breakpoint || '');

  const { size = 36, ...restIconProps } = iconProps ?? {};
  const {
    type = isNested ? 'borderless' : undefined,
    padding = isNested ? 'none' : isMobileLayout ? 'medium' : 'large',
    background = isNested ? undefined : isMobileLayout ? 'background' : 'white',
    ...restCardProps
  } = cardProps ?? {};

  return (
    <Card
      data-name="placeholder"
      {...rest}
      className={className}
      type={type}
      padding={padding}
      background={background}
      {...restCardProps}
    >
      <CardContent>
        <Row direction="column" alignItems="center" gutter={2}>
          <Col width="auto">
            {typeof icon === 'string' ? (
              <Icon name={icon} size={size} className="text-primary" {...restIconProps} />
            ) : (
              icon
            )}
          </Col>
          <Col width="auto" className="text-center text-secondary">
            {children}
          </Col>
        </Row>
      </CardContent>
    </Card>
  );
};

export default Placeholder;
