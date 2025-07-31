import {
  ComponentInputs,
  FeedbackTextComponent,
} from "@tehik-ee/tedi-angular/tedi";

type PartialExcept<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;

export type FileUploadFile = Partial<File>;

export type FeedbackTextProps = PartialExcept<
  ComponentInputs<FeedbackTextComponent>,
  "text"
>;

export class FileDropzone {
  /*
   * Additional CSS class names to apply to the dropzone for custom styling
   */
  className?: string[];
  /*
   * The text label displayed for the file dropzone, providing context for users.
   */
  label?: string;
  /*
   * Provides helper text or feedback (such as an error or instruction message) to guide the user.
   */
  helper?: FeedbackTextProps;
  /*
   * Disables the file button, preventing user interaction.
   */
  disabled?: boolean;
  /*
   * Per file status of the file set by validation.
   */
  fileStatus?: ValidationState;
  /*
   * Possible additional properties for the file, such as metadata.
   */
  metaData?: Record<string, unknown>;

  /*
   * The actual file object being uploaded.
   */
  file: File;

  constructor(file: File) {
    this.file = file;
  }

  get name(): string {
    return this.file.name;
  }

  get size(): number {
    return this.file.size;
  }

  get type(): string {
    return this.file.type;
  }
}

export type FileInputMode = "append" | "replace";

export type ValidationState = "none" | "valid" | "invalid";

export type DropzoneValidatorFunction = (
  maxSize: number,
  acceptFileTypes: string,
  file: FileDropzone,
  translate: (key: string, ...args: unknown[]) => string
) => string | undefined;
