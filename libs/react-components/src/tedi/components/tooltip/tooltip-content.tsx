import { FloatingArrow, FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import cn from 'classnames';
import React from 'react';

import { Card, CardContent, CardProps } from '../../../community/components/card';
import { getCardBorderPlacementColor } from '../../../community/components/card/utility';
import { TColorsBackground, TColorsBorder } from '../../../community/components/commonTypes';
import { TooltipContext } from './tooltip';
import styles from './tooltip.module.scss';
import { ARROW_HEIGHT, ARROW_WIDTH } from './tooltip-provider';

export interface TooltipContentProps {
  /**
   * Content.
   */
  children: React.ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * card props to pass down to card component.
   * By default padding=0.5 & borderless=true.
   * Its highly recommended to use same cardProps all over the application.
   */
  cardProps?: CardProps;
  /**
   * Tooltips max width
   * @default medium
   */
  maxWidth?: 'none' | 'small' | 'medium' | 'large';
}

export const TooltipContent = (props: TooltipContentProps): JSX.Element | null => {
  const { children, maxWidth = 'medium', cardProps, className } = props;
  const { open, x, y, strategy, focusManager, floating, arrowRef, getFloatingProps, placement, context } =
    React.useContext(TooltipContext);

  const [cardBorderPlacement, cardBorderColor] = getCardBorderPlacementColor(cardProps?.border);

  const getArrowStrokeColor = (): 'none' | `var(--color-${TColorsBorder})` => {
    if (cardBorderPlacement && cardBorderColor) {
      return `var(--color-${cardBorderColor})`;
    }

    return 'none';
  };

  const hasArrowStroke = getArrowStrokeColor() !== 'none';

  const getArrowFill = (): `var(--color-${TColorsBackground})` => {
    if (cardProps?.background) {
      return `var(--color-${cardProps?.background})`;
    }

    return 'var(--color-bg-default)';
  };

  const renderTooltip = (): JSX.Element | null => {
    const content = (
      <FloatingFocusManager {...focusManager} context={context}>
        <div
          {...getFloatingProps({
            ref: floating,
            style: {
              position: strategy,
              left: x ?? 0,
              top: y ?? 0,
            },
            className: cn(styles['tooltip'], className, { [styles[`tooltip--${maxWidth}`]]: maxWidth }),
          })}
          data-placement={placement}
        >
          <FloatingArrow
            ref={(el) => (arrowRef.current = el)}
            context={context}
            fill={getArrowFill()}
            stroke={getArrowStrokeColor()}
            strokeWidth={hasArrowStroke ? 4 : 0}
            className={cn(styles['tooltip__arrow'], { [styles['tooltip__arrow--stroke']]: hasArrowStroke })}
            height={ARROW_HEIGHT}
            width={ARROW_WIDTH}
          />
          <Card padding={0.5} borderless={true} {...cardProps}>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </FloatingFocusManager>
    );

    return open ? content : null;
  };

  return <FloatingPortal data-name="tooltip">{renderTooltip()}</FloatingPortal>;
};

export default TooltipContent;
