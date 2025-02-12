import Overlay, { OverlayProps } from '../overlay/overlay';
import { PopoverContent } from './popover-content';
import { PopoverTrigger } from './popover-trigger';

const ARROW_WIDTH = 34 as const;
const ARROW_HEIGHT = 17 as const;

interface PopoverProps extends Omit<OverlayProps, 'arrowDimensions'> {}

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
