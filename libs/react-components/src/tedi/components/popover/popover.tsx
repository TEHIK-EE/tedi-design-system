import { OffsetOptions } from '@floating-ui/react';

import Overlay, { OverlayOpenWith, OverlayProps } from '../overlay/overlay';
import { PopoverContent } from './popover-content';
import { PopoverTrigger } from './popover-trigger';

const ARROW_WIDTH = 34 as const;
const ARROW_HEIGHT = 17 as const;

export interface PopoverProps extends Omit<OverlayProps, 'arrowDimensions' | 'openWith' | 'offset'> {
  /**
   * Adds correct event listeners that change the open state.
   * @default click
   */
  openWith?: OverlayOpenWith;
  /**
   * Offset of content.
   * @default GAP + ARROW_HEIGHT (3px + 17px)
   */
  offset?: OffsetOptions;
}

function Popover(props: PopoverProps) {
  const { openWith = 'click', ...rest } = props;

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

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
export default Popover;
