import {
  Component,
  computed,
  HostListener,
  inject,
  input,
  signal,
  viewChild,
  ElementRef,
  OnInit,
  output,
  forwardRef,
} from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from "@angular/forms";
import {
  ClosingButtonComponent,
  FeedbackTextComponent,
  IconComponent,
  TooltipComponent,
  TooltipTriggerComponent,
  TooltipContentComponent,
  InfoButtonComponent,
  TediTranslationPipe,
  TediTranslationService,
  VerticalSpacingDirective,
} from "@tehik-ee/tedi-angular/tedi";
import { CardComponent, CardContentComponent } from "../../cards";
import {
  DropzoneValidatorFunction,
  FeedbackTextProps,
  FileDropzone,
  FileInputMode,
  SizeDisplayStandard,
} from "./types";
import {
  formatBytes,
  getDefaultHelpers,
  validateFileSize,
  validateFileType,
} from "./utils";
import { FileService } from "./file.service";

@Component({
  selector: "tedi-file-dropzone",
  templateUrl: "./file-dropzone.component.html",
  styleUrls: ["./file-dropzone.react.scss", "./file-dropzone.component.scss"],
  imports: [
    IconComponent,
    FeedbackTextComponent,
    CardComponent,
    CardContentComponent,
    ClosingButtonComponent,
    TooltipComponent,
    TooltipTriggerComponent,
    TooltipContentComponent,
    InfoButtonComponent,
    ReactiveFormsModule,
    VerticalSpacingDirective,
    TediTranslationPipe,
  ],
  providers: [
    FileService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileDropzoneComponent),
      multi: true,
    },
  ],
})
export class FileDropzoneComponent implements ControlValueAccessor, OnInit {
  /**
   * Specifies the allowed file types (e.g., "image/png, image/jpeg").
   *
   * Does not validate the contents of the file, only the file extension.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept
   **/
  accept = input<string>("");
  /**
   * The maximum file size allowed for upload, in bytes.
   * @default 0 (no limit)
   **/
  maxSize = input<number>(0);
  /**
   * Specifies the standard to use when displaying file sizes or maximum file size.
   * Options are "SI" (base 10) or "IEC" (base 2).
   *
   * SI units are in multiples of 1000 (e.g., 1 kB = 1000 bytes).
   *
   * IEC units are in multiples of 1024 (e.g., 1 KiB = 1024 bytes).
   * @default "IEC"
   *
   * https://wiki.ubuntu.com/UnitsPolicy
   */
  sizeDisplayStandard = input<SizeDisplayStandard>("IEC");
  /**
   * Determines if multiple files can be uploaded at once via the file picker.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/multiple
   * @default false
   **/
  multiple = input<boolean>(false);
  /**
   * If true, each file is validated separately instead of rejecting all at once.
    @default false
   **/
  validateIndividually = input(false);
  /**
   * An array of default files that are preloaded in the upload list.
   * @default false
   **/
  defaultFiles = input<File[] | FileDropzone[]>([]);
  /**
   * The unique identifier for the input element that this label is associated with.
   * This ID should match the input element's `id` attribute to ensure accessibility.
   */
  inputId = input<string>();
  /**
   * The name attribute for the file input, used for form submission and identifying the field.
   */
  name = input<string>();
  /**
   * The text label displayed for the file dropzone, providing context for users.
   */
  label = input<string>("file-dropzone.label");
  /**
   * Additional CSS class names to apply to the dropzone for custom styling
   */
  className = input<string>();
  /**
   * Specifies how to handle file name conflicts when multiple file of the same name are added.
   * Options are:
   * - "append": Adds new files to the end of the list, keeping existing files
   * - "replace": Replaces existing files with new files of the same name
   *  @default "append"
   */
  mode = input<FileInputMode>("append");
  /**
   * If true, allows uploading folders instead of just files.
   * This enables the user to select a folder and upload all its contents.
   * Default file browser behaviour will prevent upload of files in this state.
   * @default false
   */
  uploadFolder = input<boolean>(false);
  /**
   * Validation functions that can be used to validate files.
   * Each function should return a string error message if validation fails, or undefined if it passes
   */
  validators = input<DropzoneValidatorFunction[]>([
    validateFileSize,
    validateFileType,
  ]);
  /**
   * If true, shows the file dropzone as in a erroring state with red border.
   * Overrides default validation state.
   * @default false
   **/
  hasError = input<boolean>(false);
  /**
   * Output event triggered when files are added.
   **/
  fileChange = output<FileDropzone[]>();
  /**
   * Output event triggered when a file is removed.
   **/
  fileDelete = output<FileDropzone>();

  fileInputElement =
    viewChild.required<ElementRef<HTMLInputElement>>("fileInput");

  formatBytes = (bytes: number): string =>
    formatBytes(bytes, this.sizeDisplayStandard());

  private _uploadState = computed(() => this._fileService.uploadState());

  private _onChange = (_: FileDropzone[]) => {};
  private _onTouched = () => {};

  private _translationService = inject(TediTranslationService);
  private _fileService = inject(FileService);

  isDragActive = signal<boolean>(false);
  disabled = signal<boolean>(false);

  uploadError = signal<string | null>(null);
  files = this._fileService.files;

  classes = computed(() => {
    const classList = ["tedi-file-dropzone"];

    if (this.disabled()) {
      classList.push("tedi-file-dropzone--disabled");
    }
    if (this.hasError()) {
      classList.push("tedi-file-dropzone--invalid");
    } else if (this._uploadState() !== "none") {
      classList.push(`tedi-file-dropzone--${this._uploadState()}`);
    }
    if (this.isDragActive()) {
      classList.push("tedi-file-dropzone--drop-over");
    }
    if (this.className()) {
      classList.push(this.className()!);
    }

    return classList.join(" ");
  });

  helperText = computed<FeedbackTextProps>(() => ({
    text: getDefaultHelpers(
      this.accept(),
      this.maxSize(),
      this.sizeDisplayStandard(),
      this._translationService.translate.bind(this._translationService)
    ),
    type: "hint",
    position: "left",
  }));

  ngOnInit(): void {
    this.addFiles(this.defaultFiles());
    this._fileService.maxSize = this.maxSize;
    this._fileService.accept = this.accept;
    this._fileService.mode = this.mode;
    this._fileService.validators = this.validators;
    this._fileService.sizeDisplayStandard = this.sizeDisplayStandard;
  }

  fileClasses = (file: FileDropzone): string => {
    const classList = ["tedi-file-dropzone__file-item"];
    if (file.className) {
      classList.push(...file.className);
    }
    if (file.fileStatus != "none") {
      classList.push(`tedi-file-dropzone__file-item--${file.fileStatus}`);
    }
    return classList.join(" ");
  };

  tooltipClasses = (file: FileDropzone): string => {
    const classes = ["tedi-file-dropzone__tooltip"];
    classes.push(`tedi-file-dropzone__tooltip--${file.helper?.type || "hint"}`);
    return classes.join(" ");
  };

  selectionChange = (event: Event) => {
    const fileList = (event.target as HTMLInputElement).files;
    const files = Array.from(fileList || []);
    this.addFiles(files);
    this.fileInputElement().nativeElement.value = "";
  };

  @HostListener("blur")
  onBlur() {
    this._onTouched();
  }

  @HostListener("keydown.code.enter")
  openFilePicker() {
    this.fileInputElement().nativeElement.click();
  }

  @HostListener("dragover", ["$event"])
  onDragOver = (event: DragEvent) => {
    event?.preventDefault();
  };

  @HostListener("dragenter", ["$event"])
  onDragEnter = (event: DragEvent) => {
    event?.preventDefault();
    this.isDragActive.set(true);

    if (event?.dataTransfer) {
      event.dataTransfer.dropEffect = "copy";
    }
  };

  @HostListener("dragleave", ["$event"])
  onDragLeave = (event: DragEvent) => {
    event?.preventDefault();

    this.isDragActive.set(false);
  };

  @HostListener("drop", ["$event"])
  onDrop = async (event: DragEvent) => {
    this.onDragLeave(event);
    event?.preventDefault();
    if (!event.dataTransfer) return;

    const files = Array.from(event.dataTransfer.files);
    this.addFiles(files);
  };

  async addFiles(files: FileDropzone[] | File[]) {
    if (!Array.isArray(files) || !files.length) {
      return;
    }

    const error = await this._fileService.addFiles(files);
    const normalizedFiles = this._fileService.normalizeFiles(files);

    this._updateErrorState(error);

    this._onChange(this._fileService.files());
    this.fileChange.emit(normalizedFiles);
  }

  removeFile(file: FileDropzone) {
    const error = this._fileService.removeFiles([file]);
    this._updateErrorState(error);

    this._onChange(this._fileService.files());
    this.fileDelete.emit(file);
  }

  private _updateErrorState(error: string[]) {
    if (
      this._uploadState() === "invalid" &&
      !this.validateIndividually() &&
      error.length
    ) {
      this.uploadError.set(error[0]);
    } else {
      this.uploadError.set("");
    }
  }

  onContainerClick() {
    this.openFilePicker();
  }

  writeValue(files: FileDropzone[]) {
    this.addFiles(files || []);
  }

  registerOnChange(fn: (value: FileDropzone[]) => void) {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
