import { DraftBlockType, EditorState } from 'draft-js';

import styles from '../text-editor.module.scss';
import StyleButton from './style-button';

interface BlockStyle {
  label: string;
  style: DraftBlockType;
}

const BLOCK_TYPES: BlockStyle[] = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'format_quote', style: 'blockquote' },
  { label: 'format_list_bulleted', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

export interface BlockStyleControlsProps {
  editorState: EditorState;
  onToggle: (style: DraftBlockType) => void;
  /**
   * Select which inlineStyleControls should be visible.
   * Defaults to ['blockquote', 'unordered-list-item'].
   */
  blockStyleControls?: DraftBlockType[];
}

export const BlockStyleControls = (props: BlockStyleControlsProps): JSX.Element => {
  const { editorState, blockStyleControls = ['blockquote', 'unordered-list-item'] } = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  const filteredStyles = BLOCK_TYPES.filter((item) => blockStyleControls.includes(item.style));

  return (
    <div className={styles['text-editor__control-block']}>
      {filteredStyles.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default BlockStyleControls;
