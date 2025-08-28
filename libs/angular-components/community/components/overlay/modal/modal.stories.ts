import { Component, inject, input, model, OnInit } from "@angular/core";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import {
  ButtonComponent,
  FeedbackTextComponent,
  LabelComponent,
} from "tedi/components";
import { Dialog } from "@angular/cdk/dialog";
import {
  DialogData,
  modalBreakpoints,
  ModalComponent,
} from "./modal.component";
import { SelectComponent } from "../../form/select/select.component";
import { SelectOptionComponent } from "../../form/select/select-option.component";
import { resetIndexId, indexId } from "../../../helpers/unique-id";
import { ModalFooterComponent } from "./footer/modal-footer.component";
import { ModalHeaderComponent } from "./header/modal-header.component";

resetIndexId();

@Component({
  selector: "storybook-open-modal",
  template: `<button tedi-button (click)="openDialog()">
    Open Select modal
  </button> `,
  imports: [ButtonComponent],
})
class ModalOpenComponent {
  args = input<DialogData>();
  dialog = inject(Dialog);

  openDialog() {
    this.dialog.open(StorybookModalComponent, {
      data: this.args(),
    });
  }
}

@Component({
  selector: "storybook-modal",
  template: `
    <tedi-modal [maxWidth]="args()?.maxWidth" [variant]="args()?.variant">
      <tedi-modal-header
        [title]="args()?.title"
        [feedback]="args()?.feedback"
        [closeButton]="args()?.closeButton"
      />

      <label tedi-label [for]="selectOneId">Label</label>
      <tedi-select [id]="selectOneId" state="default">
        @for (option of options; track option.value) {
          <tedi-select-option [value]="option.value" [label]="option.label" />
        }
      </tedi-select>

      <label tedi-label [for]="selectTwoId">Label</label>
      <tedi-select [id]="selectTwoId" state="default">
        @for (option of options; track option.value) {
          <tedi-select-option [value]="option.value" [label]="option.label" />
        }
      </tedi-select>

      <tedi-modal-footer
        footer-slot
        [buttons]="args()?.buttons"
        [align]="args()?.align"
      />
    </tedi-modal>
  `,
  imports: [
    SelectComponent,
    SelectOptionComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
    FeedbackTextComponent,
    LabelComponent,
  ],
})
class StorybookModalComponent implements OnInit {
  readonly options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
    { value: "5", label: "Option 5" },
  ];

  readonly args = model<DialogData>();

  selectOneId?: string;
  selectTwoId?: string;

  ngOnInit(): void {
    this.selectOneId = indexId("select-one");
    this.selectTwoId = indexId("select-two");
  }
}

/**
 * **ModalComponent** is a component that is optimized for use via @angular/cdk/dialog.
 * It has 3 slots: header-slot, footer-slot and the default slot.
 *
 * It is also possible to re-use **ModalFooterComponent** and **ModalHeaderComponent** in your own components
 * with custom arguments, or modified inside the modal component's slots.
 * For convenience, you can supply args to all modal components via the `args` input in cdk dialog's `open()` function's option object.
 */
const meta: Meta<DialogData> = {
  title: "Community/Overlay/Modal",
  component: ModalComponent,
  decorators: [
    moduleMetadata({
      imports: [ModalOpenComponent, StorybookModalComponent],
    }),
  ],
  argTypes: {
    maxWidth: {
      control: {
        type: "radio",
      },
      options: modalBreakpoints,
      description: "Maximum width of the modal container",
    },
    title: {
      control: "text",
      description: "Title of the modal",
    },
    align: {
      control: "text",
      description: "Alignment of the buttons in the footer",
    },
    feedback: {
      control: "object",
      description: "Description of the modal",
    },
    buttons: {
      control: "object",
      description: "Buttons to display in the modal footer",
    },
    closeButton: {
      control: "boolean",
      description: "Whether to show the close button in the header",
    },
    variant: {
      control: "radio",
      options: ["small", "default"],
      description: "Variant of the modal padding to use",
    },
  },
  args: {
    maxWidth: "sm",
    title: "Title",
    align: "flex-end",
    feedback: {
      text: "",
      type: "hint",
      position: "left",
    },
    buttons: [
      {
        label: "Cancel",
        variant: "secondary",
        icon: "",
        style: {},
        action: () => {},
      },
      {
        label: "Save",
        variant: "primary",
        icon: "",
        style: {},
        action: () => {},
      },
    ],
    closeButton: true,
    variant: "default",
  },
};

export default meta;

type Story = StoryObj<DialogData>;

const renderExampleModal = () =>
  `<storybook-modal style="display: contents;" [args]="args" />`;

const renderFull = () => `
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <storybook-open-modal [args]="args" />
    ${renderExampleModal()}
  </div>
  `;

export const Default: Story = {
  render: (args) => {
    return {
      props: { args },
      template: renderFull(),
    };
  },
};

export const leftAlignedButtons: Story = {
  args: {
    align: "space-between",
    buttons: [
      {
        label: "Cancel",
        variant: "secondary",
        action: () => {},
      },
      {
        label: "Approve",
        variant: "primary",
        action: () => {},
      },
    ],
  },
  render: (args) => {
    return {
      props: { args },
      template: renderFull(),
    };
  },
};

export const threeButtons: Story = {
  args: {
    buttons: [
      {
        label: "Back",
        variant: "neutral",
        icon: "arrow_back",
        style: { "margin-right": "auto" },
        action: () => {},
      },
      {
        label: "Cancel",
        variant: "secondary",
        action: () => {},
      },
      {
        label: "Continue",
        variant: "primary",
        icon: "arrow_forward",
        iconPosition: "end",
        action: () => {},
      },
    ],
  },

  render: (args) => {
    return {
      props: { args },
      template: renderFull(),
    };
  },
};
