import { Component, inject, input, model, OnInit } from "@angular/core";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { ButtonComponent, FeedbackTextComponent } from "tedi/components";
import { Dialog, DIALOG_DATA } from "@angular/cdk/dialog";
import { ModalComponent, ModalSizes } from "./modal.component";
import { SelectComponent } from "community/components/form/select/select.component";
import { SelectOptionComponent } from "community/components/form/select/select-option.component";
import { resetIndexId, indexId } from "community/utils/unique-id";
import { LabelComponent } from "community/components/form/label/label.component";
import { NgFor, NgIf } from "@angular/common";
import { ModalHeaderComponent } from "./header/modal-header.component";
import {
  ModalFooterButton,
  ModalFooterComponent,
  ModalIconPosition,
} from "./footer/modal-footer.component";
import { ComponentInputs } from "tedi/types";

type StoryBookArgs = StorybookModalComponent & {
  maxWidth: ModalSizes;
  height: string;
  title?: string;
  feedback?: ComponentInputs<FeedbackTextComponent>;
  buttons?: ModalFooterButton[];
  alignButtons?: string;
};

resetIndexId();

@Component({
  selector: "storybook-open-modal",
  template: `<button tedi-button (click)="openDialog()">
    Open Select modal
  </button> `,
  imports: [ButtonComponent],
})
class ModalOpenComponent {
  args = input<StoryBookArgs>();
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
    <tedi-modal [maxWidth]="args()?.maxWidth">
      <tedi-modal-header header-slot [feedback]="args()?.feedback" />

      <label tedi-label [for]="selectOneId">Label</label>

      <tedi-select [id]="selectOneId" state="default">
        <tedi-select-option
          *ngFor="let option of options"
          [value]="option.value"
          [label]="option.label"
        />
      </tedi-select>

      <label tedi-label [for]="selectTwoId">Label</label>
      <tedi-select [id]="selectTwoId" state="default">
        <tedi-select-option
          *ngFor="let option of options"
          [value]="option.value"
          [label]="option.label"
        />
      </tedi-select>

      <tedi-modal-footer
        footer-slot
        *ngIf="args()?.buttons?.length"
        [buttons]="args()?.buttons"
        [alignButtons]="args()?.alignButtons"
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
    NgFor,
    NgIf,
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

  readonly args = model<StoryBookArgs>();
  readonly dialogData = inject<StoryBookArgs>(DIALOG_DATA, { optional: true });

  selectOneId?: string;
  selectTwoId?: string;

  ngOnInit(): void {
    if (this.dialogData) {
      this.args.set(this.dialogData);
    }

    this.selectOneId = indexId("select-one");
    this.selectTwoId = indexId("select-two");
  }
}

const meta: Meta<StoryBookArgs> = {
  title: "Community Angular/Overlay/Modal",
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
      options: [ModalSizes.Small, ModalSizes.Medium, ModalSizes.Large],
      description: "Maximum Width of the modal container",
    },
    title: {
      control: "text",
      description: "Title of the modal",
    },
    alignButtons: {
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
  },
  args: {
    maxWidth: ModalSizes.Large,
    title: "Title",
    alignButtons: "flex-end",
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
  },
};

export default meta;

type Story = StoryObj<StoryBookArgs>;

const renderExampleModal = () =>
  `<storybook-modal style="display: inline-block;" [args]="args" />`;

const renderFull = () => `
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <storybook-open-modal [args]="args" />
    <div>
      ${renderExampleModal()}
    </div>
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
    alignButtons: "space-between",
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
        iconPosition: ModalIconPosition.End,
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
