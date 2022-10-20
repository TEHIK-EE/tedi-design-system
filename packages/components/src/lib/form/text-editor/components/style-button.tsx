import cn from 'classnames';
import { DraftBlockType, DraftInlineStyleType } from 'draft-js';

import Icon from '../../../icon/icon';
import styles from '../text-editor.module.scss';

export interface StyleButtonProps {
  label: string;
  style: DraftInlineStyleType | DraftBlockType;
  onToggle: (style: DraftInlineStyleType | DraftBlockType) => void;
  active?: boolean;
}

export const StyleButton = (props: StyleButtonProps): JSX.Element => {
  const { active, style, label, onToggle } = props;
  const BEM = cn(styles['style-button'], { [styles['style-button--active']]: active });

  const onToggleHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    onToggle(style);
  };

  return (
    <button className={BEM} onClick={onToggleHandler}>
      <Icon name={label} size={24} />
    </button>
  );
};

export default StyleButton;
