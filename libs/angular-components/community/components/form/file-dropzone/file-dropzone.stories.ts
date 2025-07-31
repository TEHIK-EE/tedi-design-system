import { ComponentInputs } from "tedi/types";
import { FileDropzoneComponent } from "./file-dropzone.component";
import { argsToTemplate, Meta, StoryObj } from "@storybook/angular";
import { validateFileSize, validateFileType } from "./utils";

/**
 * FileDropzoneComponent is a component that allows users to drag and drop files or select them through a file input.
 *
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.13.19?node-id=12457-128384&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/70876f-file-dropzone" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<FileDropzoneComponent> = {
  component: FileDropzoneComponent,
  title: "Community Angular/Form/FileDropzone",
  args: {
    accept: "",
    maxSize: 0,
    multiple: false,
    validateIndividually: false,
    defaultFiles: [],
    inputId: "file-dropzone",
    className: "",
    label: undefined,
    disabled: false,
    mode: "append",
    name: "file-dropzone",
    uploadFolder: false,
    validators: [validateFileSize, validateFileType],
    uploadError: "",
  },
  argTypes: {
    accept: {
      description: `Specifies the allowed file types (e.g., "image/png, image/jpeg").
      Does not validate the contents of the file, only the file extension.
      https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept`,
    },
    maxSize: {
      description: `The maximum file size allowed for upload, in bytes.`,
    },
    multiple: {
      description: `Determines if multiple files can be uploaded at once via the file picker.`,
    },
    validateIndividually: {
      description: `If true, each file will be validated individually. If false, all files will be validated together.
      Decides on what kind of UI elements are used to display validation errors.`,
    },
    defaultFiles: {
      description: `An array of default files that are preloaded in the upload list when the component is loaded.`,
    },
    inputId: {
      description: `The unique identifier for the file dropzone component. Used for form control binding and accessibility.`,
    },
    name: {
      description: `The name of the file input, used for form submission and identification.`,
    },
    label: {
      description: `The text label displayed for the file dropzone, providing context for users`,
    },
    className: {
      description: `Additional CSS class names to apply to the dropzone for custom styling, which are added to the main containing button element.`,
    },
    disabled: {
      description: `Disables the file dropzone, preventing user interaction.`,
    },
    mode: {
      control: {
        type: "radio",
      },
      options: ["append", "replace"],
      description: `Specifies how to handle file name conflicts when multiple file of the same name are added.
        Options are:
        - "append": Adds new files to the end of the list, keeping existing files

        - "replace": Replaces existing files with new files of the same name"`,
    },
    uploadFolder: {
      description: ` If true, allows uploading folders instead of just files. This enables the user to select a folder and upload all its contents. Default file browser behaviour will prevent upload of files in this state.`,
    },
    validators: {
      control: false,
      description:
        "Validation functions that can be used to validate files. Each function should return a string error message if validation fails, or undefined if it passes.",
    },
    uploadError: {
      description:
        "An error message that can be set to indicate a problem with the file upload process. Displays a error like the validateIndividually validation error on false.",
    },
  },
};

export default meta;
type Story = StoryObj<FileDropzoneComponent>;
type StoryArgs = ComponentInputs<FileDropzoneComponent>;

/** Replaces any same-name files, when usually it indexes them. */
export const Replace: Story = {
  render: (args) => ({
    template: `<tedi-file-dropzone ${argsToTemplate(args)} />`,
    props: args,
  }),
  args: {
    mode: "replace",
  },
};

const Template = (args: StoryArgs) => `
  <div>
    <div>
      <tedi-file-dropzone ${argsToTemplate(args)} />
    </div>
  </div>
  `;

/** Custom un-translated label text. */
export const WithHint: Story = {
  render: (args) => ({ template: Template(args), props: args }),
  args: {
    name: "file",
    label: "Custom hint here",
  },
};

/** Disabled state, non-interactive. */
export const Disabled: Story = {
  render: (args) => ({ template: Template(args), props: args }),
  args: {
    inputId: "file-dropzone-disabled",
    name: "file-loading",
    disabled: true,
  },
};

/** Allows uploading of multiple files via the file picker via CTRL/SHIFT-modifier keys */
export const Multiple: Story = {
  render: (args) => ({ template: Template(args), props: args }),
  args: {
    inputId: "file-dropzone-multiple",
    name: "file-multiple",
    accept: ".jpg,.png,.pdf",
    multiple: true,
    defaultFiles: [
      new File([""], "image1.jpg"),
      new File([""], "image2.png"),
      new File([""], "document.pdf"),
    ],
  },
};

/** Allows uploading of folders, should upload only the contents of the folders */
export const Folder: Story = {
  render: (args) => ({ template: Template(args), props: args }),
  args: {
    inputId: "file-dropzone-multiple",
    name: "file-multiple",
    uploadFolder: true,
    defaultFiles: [],
  },
};

/** Single file, one error. */
export const ValidationFailed: Story = {
  args: {
    inputId: "file-dropzone-validation-failed",
    name: "file-validation-failed",
    maxSize: 1000000,
    accept: ".pdf,.txt",
    multiple: true,
    validateIndividually: true,
    defaultFiles: [new File([""], "invalid_file.pdz")],
  },
  render: (args) => ({ template: Template(args), props: args }),
};

/** Should only show the first error. */
export const MultipleValidation: Story = {
  args: {
    inputId: "file-dropzone-multiple-individual-validation",
    name: "file-multiple-individual-validation",
    multiple: true,
    maxSize: 10,
    accept: ".txt",
    validateIndividually: false,
    defaultFiles: [
      new File(["1231231"], "report.txt"),
      new File(["123123123"], "document.pdf"),
      new File(["123123123"], "taotlus_scan_lk_1.pdf"),
      new File(["123123123"], "taotlus_scan_lk_2.pdf"),
      new File(["12312312312312311231231"], "taotlus_scan_lk_3.txt"),
      new File(["123123123"], "taotlus_scan_lk_4.txt"),
    ],
  },
  render: (args) => ({ template: Template(args), props: args }),
};

/** Should show a tooltip on each erroring file. */
export const MultipleWithIndividualValidation: Story = {
  args: {
    inputId: "file-dropzone-multiple-individual-validation",
    name: "file-multiple-individual-validation",
    multiple: true,
    maxSize: 10,
    accept: ".pdf,.txt",
    validateIndividually: true,
    defaultFiles: [
      new File(["1231231230000000000000"], "report.txt"),
      new File(["123123123"], "document.pdf"),
      new File(["123123123"], "taotlus_scan_lk_1.txs"),
      new File(["12312"], "taotlus_scan_lk_2.txt"),
      new File(["123123123123123123"], "taotlus_scan_lk_3.pdf"),
      new File(["123123123"], "taotlus_scan_lk_4.pdf"),
    ],
  },
  render: (args) => ({ template: Template(args), props: args }),
};
