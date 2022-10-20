import { DraftInlineStyleType, EditorState } from 'draft-js';

import styles from '../text-editor.module.scss';
import StyleButton from './style-button';

interface InlineStyle {
  label: string;
  style: DraftInlineStyleType;
}

const INLINE_STYLES: InlineStyle[] = [
  { label: 'format_bold', style: 'BOLD' },
  { label: 'format_italic', style: 'ITALIC' },
  { label: 'format_underlined', style: 'UNDERLINE' },
  { label: 'code', style: 'CODE' },
];

export interface InlineStyleControlsProps {
  editorState: EditorState;
  onToggle: (style: DraftInlineStyleType | string) => void;
  /**
   * Select which inlineStyleControls should be visible.
   * Defaults to ['BOLD', 'ITALIC', 'UNDERLINE'].
   */
  inlineStyleControls?: DraftInlineStyleType[];
}

export const InlineStyleControls = (props: InlineStyleControlsProps): JSX.Element => {
  const { inlineStyleControls = ['BOLD', 'ITALIC'], onToggle, editorState } = props;
  const currentStyle = editorState.getCurrentInlineStyle();

  const filteredStyles = INLINE_STYLES.filter((item) => inlineStyleControls.includes(item.style));
  return (
    <div className={styles['text-editor__control-block']}>
      {filteredStyles.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default InlineStyleControls;
