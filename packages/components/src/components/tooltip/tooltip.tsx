import { arrow, FloatingArrow, FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import cn from 'classnames';
import React from 'react';

import { Card, CardContent, CardProps } from '../card';
import styles from './tooltip.module.scss';
import { ARROW_HEIGHT, ARROW_WIDTH, TooltipContext } from './tooltip-provider';

export interface TooltipProps {
  /**
   * Content.
   */
  children: React.ReactNode;
  /**
   * card props to pass down to card component.
   * By default padding is set to small & type to borderless.
   * Its highly recommended to use same cardProps all over the application.
   */
  cardProps?: CardProps;
  /**
   * Tooltips max width
   * @default medium
   */
  maxWidth?: 'none' | 'small' | 'medium' | 'large';
}

export const Tooltip = (props: TooltipProps): JSX.Element | null => {
  const { children, maxWidth = 'medium', cardProps } = props;
  const { open, x, y, strategy, focusManager, floating, arrowRef, getFloatingProps, placement, context } =
    React.useContext(TooltipContext);

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
            className: cn(styles['tooltip'], { [styles[`tooltip--${maxWidth}`]]: maxWidth }),
          })}
          data-placement={placement}
        >
          <FloatingArrow
            ref={(el) => (arrowRef.current = el)}
            context={context}
            fill="var(--color-bg-default)"
            className={styles['tooltip__arrow']}
            height={ARROW_HEIGHT}
            width={ARROW_WIDTH}
          />
          <Card padding="xsmall" type="borderless" {...cardProps}>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </FloatingFocusManager>
    );

    return open ? content : null;
  };

  return <FloatingPortal data-name="tooltip">{renderTooltip()}</FloatingPortal>;
};

export default Tooltip;
