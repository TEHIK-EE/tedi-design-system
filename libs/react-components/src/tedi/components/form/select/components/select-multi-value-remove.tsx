import { MultiValueRemoveProps } from 'react-select';

import { useLabels } from '../../../../../tedi/providers/label-provider';
import ClosingButton from '../../../buttons/closing-button/closing-button';
import Separator from '../../../misc/separator/separator';
import { ISelectOption } from '../select';
import styles from '../select.module.scss';

export const SelectMultiValueRemove = ({ innerProps }: MultiValueRemoveProps<ISelectOption>): JSX.Element => {
  const { getLabel } = useLabels();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (innerProps.onClick) {
      innerProps.onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick(event as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  return (
    <>
      <ClosingButton
        onMouseDown={(event) => event.stopPropagation()}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={styles['tedi-select__multi-value-clear']}
        title={getLabel('clear')}
      />
      <Separator color="primary" axis="vertical" className={styles['tedi-select__separator']} />
    </>
  );
};
