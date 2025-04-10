import { OffsetOptions } from '@floating-ui/react';

import Overlay, { OverlayOpenWith, OverlayProps } from '../overlay/overlay';
import { TooltipContent } from './tooltip-content';
import { TooltipTrigger } from './tooltip-trigger';

const ARROW_HEIGHT = 7 as const;
const ARROW_WIDTH = 14 as const;

export interface TooltipProps
  extends Omit<OverlayProps, 'arrowDimensions' | 'openWith' | 'offset' | 'dismissible' | 'scrollLock'> {
  /**
   * Adds correct event listeners that change the open state.
   * @default hover
   */
  openWith?: OverlayOpenWith;
  /**
   * Offset of content.
   * @default GAP + ARROW_HEIGHT (3px + 7px)
   */
  offset?: OffsetOptions;
}

function Tooltip(props: TooltipProps) {
  const { openWith = 'hover', ...rest } = props;

  return (
    <Overlay
      arrowDimensions={{
        width: ARROW_WIDTH,
        height: ARROW_HEIGHT,
      }}
      openWith={openWith}
      {...rest}
    />
  );
}

Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;
export default Tooltip;
