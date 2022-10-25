import cn from 'classnames';
import {
  convertFromRaw,
  convertToRaw,
  DraftBlockType,
  DraftHandleValue,
  DraftInlineStyleType,
  Editor,
  EditorCommand,
  EditorState,
  RichUtils,
} from 'draft-js';
import { draftjsToMd, mdToDraftjs } from 'draftjs-md-converter';
import React from 'react';

import { useIsMounted } from '../../helper';
import FormHelper, { FormHelperProps } from '../form-helper/form-helper';
import FormLabel, { FormLabelProps } from '../form-label/form-label';
import BlockStyleControls from './components/block-style-controls';
import InlineStyleControls from './components/inline-style-controls';
import styles from './text-editor.module.scss';

export interface TextEditorProps extends FormLabelProps {
  /**
   * ID attribute.
   */
  id: string;
  /*
   * Name attribute
   * */
  name?: string;
  /**
   * Default value of input.
   */
  defaultValue?: string;
  /**
   * onChange callback handler.
   */
  onChange?: (value: string) => void;
  /**
   * Input field placeholder.
   */
  placeholder?: string;
  /**
   * Additional classes.
   */
  className?: string;
  /**
   * Select which inlineStyleControls should be visible.
   * Defaults to ['BOLD', 'ITALIC', 'UNDERLINE'].
   */
  inlineStyleControls?: DraftInlineStyleType[];
  /**
   * Select which inlineStyleControls should be visible.
   * Defaults to ['blockquote', 'unordered-list-item'].
   */
  blockStyleControls?: DraftBlockType[];
  /**
   * Textfield helper.
   */
  helper?: FormHelperProps;
  /**
   * onFocus callback handler.
   */
  onFocus?: () => void;
  /**
   * onBlur callback handler.
   */
  onBlur?: () => void;
  /**
   * If text-editor is invalid.
   */
  invalid?: boolean;
}

export const TextEditor = (props: TextEditorProps): JSX.Element => {
  const {
    inlineStyleControls,
    blockStyleControls,
    label,
    id,
    required,
    requiredLabel,
    helper,
    className,
    hideLabel,
    placeholder,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    invalid,
  } = props;

  const isMounted = useIsMounted();

  const getDefaultValue = React.useMemo((): EditorState => {
    const defaultRawData = mdToDraftjs(defaultValue || '');
    const defaultContentState = convertFromRaw(defaultRawData);
    return EditorState.createWithContent(defaultContentState);
  }, [defaultValue]);

  const [editorState, setEditorState] = React.useState(getDefaultValue);
  const [isFocused, setIsFocused] = React.useState(false);

  const getMarkdown = React.useMemo(() => {
    const content = editorState.getCurrentContent();
    return draftjsToMd(convertToRaw(content));
  }, [editorState]);

  const isInvalid = React.useMemo((): boolean => {
    return invalid || helper?.type === 'error';
  }, [invalid, helper]);

  const isValid = React.useMemo((): boolean => {
    return !invalid && helper?.type === 'valid';
  }, [invalid, helper]);

  React.useEffect(() => {
    onChange?.(getMarkdown);
  }, [getMarkdown, onChange]);

  const handleKeyCommand = (command: EditorCommand, editorState: EditorState): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const toggleInlineStyle = (inlineStyle: DraftInlineStyleType | string): void => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleBlockType = (blockType: DraftBlockType): void => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const TextEditorBEM = cn(
    styles['text-editor'],
    className,
    { [styles['text-editor--invalid']]: isInvalid },
    { [styles['text-editor--valid']]: isValid },
    { [styles['text-editor--focused']]: isFocused }
  );

  return (
    <div className={TextEditorBEM}>
      <FormLabel id={id} label={label} requiredLabel={requiredLabel} required={required} hideLabel={hideLabel} />
      <div
        className={styles['text-editor__inner']}
        onClick={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <div className={styles['text-editor__controls']}>
          <InlineStyleControls
            inlineStyleControls={inlineStyleControls}
            editorState={editorState}
            onToggle={toggleInlineStyle}
          />
          <BlockStyleControls
            blockStyleControls={blockStyleControls}
            editorState={editorState}
            onToggle={toggleBlockType}
          />
        </div>
        <div className={styles['text-editor__content']}>
          {isMounted && (
            <Editor
              placeholder={placeholder}
              editorState={editorState}
              onChange={setEditorState}
              handleKeyCommand={handleKeyCommand}
              preserveSelectionOnBlur={true}
              editorKey="editor"
              onBlur={onBlur}
              onFocus={onFocus}
            />
          )}
        </div>
      </div>
      {helper && <FormHelper {...helper} />}
    </div>
  );
};

export default TextEditor;
