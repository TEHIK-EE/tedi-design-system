import { MultiValueProps } from 'react-select';

import { Tag } from '../../../tags/tag/tag';
import { ISelectOption } from '../select';

type MultiValueType = MultiValueProps<ISelectOption> & { isTagRemovable?: boolean };

export const SelectMultiValue = ({ isTagRemovable, children, removeProps }: MultiValueType): JSX.Element => {
  const handleClose: React.MouseEventHandler<HTMLButtonElement> & React.KeyboardEventHandler<HTMLButtonElement> = (
    event
  ) => {
    if (event.type === 'click' && removeProps.onClick) {
      removeProps.onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
    }

    if (event.type === 'keydown') {
      const keyboardEvent = event as React.KeyboardEvent<HTMLButtonElement>;
      if ((keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') && removeProps.onClick) {
        keyboardEvent.preventDefault();
        keyboardEvent.stopPropagation();
        removeProps.onClick(keyboardEvent as unknown as React.MouseEvent<HTMLDivElement>);
      }
    }
  };

  return (
    <div onMouseDown={(event) => event.stopPropagation()}>
      <Tag color="primary" onClose={isTagRemovable ? handleClose : undefined}>
        {children}
      </Tag>
    </div>
  );
};
