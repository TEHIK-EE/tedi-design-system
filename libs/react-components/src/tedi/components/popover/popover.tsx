import Overlay, { OverlayProps } from '../overlay/overlay';
import { PopoverContent } from './popover-content';
import { PopoverTrigger } from './popover-trigger';

function Popover(props: OverlayProps) {
  return <Overlay {...props} />;
}

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
export default Popover;
