import cn from 'classnames';
import React from 'react';

import useLayout from '../../helpers/hooks/use-layout';
import { Card, CardContent, CardProps } from '../card';
import { Col, Row } from '../grid';
import Icon, { IconProps } from '../icon/icon';
import Print from '../print/print';
import Text from '../typography/text/text';

export interface PlaceholderProps {
  /**
   * Placeholder block content
   */
  children?: React.ReactNode;
  /**
   * Placeholder icon name, IconProps object or ReactNode(e.g SVG)
   * @default spa
   */
  icon?: string | IconProps | React.ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
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
  const { icon = 'spa', className, children, cardProps, isNested, ...rest } = props;
  const isSmallLayout = useLayout(['mobile', 'tablet']);

  const {
    type = isNested ? 'borderless' : undefined,
    padding = isNested ? 'none' : isSmallLayout ? 'medium' : 'large',
    background = isNested ? undefined : isSmallLayout ? 'bg-subtle' : 'white',
    ...restCardProps
  } = cardProps ?? {};

  const getIcon = (icon: string | IconProps | React.ReactNode) => {
    const iconBEM = cn('text-primary');
    const defaultIconProps: Partial<IconProps> = { size: 36, className: iconBEM };
    const iconProps: IconProps | undefined =
      typeof icon === 'string'
        ? { ...defaultIconProps, name: icon }
        : typeof icon === 'object' && !React.isValidElement(icon)
        ? {
            ...defaultIconProps,
            ...(icon as IconProps),
            className: cn(defaultIconProps.className, (icon as IconProps)?.className),
          }
        : undefined;

    return iconProps ? <Icon {...iconProps} /> : (icon as React.ReactNode);
  };

  return (
    <Print breakInside="avoid">
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
            {icon && <Col width="auto">{getIcon(icon)}</Col>}
            <Col width="auto">
              <Text color="muted" modifiers="center">
                {children}
              </Text>
            </Col>
          </Row>
        </CardContent>
      </Card>
    </Print>
  );
};

export default Placeholder;
