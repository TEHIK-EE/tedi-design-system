import { Component, inject, input, OnInit } from "@angular/core";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { ButtonComponent, FeedbackTextComponent } from "tedi/components";
import { Dialog, DIALOG_DATA } from "@angular/cdk/dialog";
import { ModalComponent } from "./modal.component";
import { SelectComponent } from "community/components/form/select/select.component";
import { SelectOptionComponent } from "community/components/form/select/select-option.component";
import { resetIndexId, indexId } from "community/utils/unique-id";
import { LabelComponent } from "community/components/form/label/label.component";
import { NgFor, NgIf } from "@angular/common";
import { ModalHeaderComponent } from "./header/modal-header.component";
import {
  ModalFooterButton,
  ModalFooterComponent,
} from "./footer/modal-footer.component";

enum ModalMaxWidth {
  Small = 328,
  Medium = 460,
  Large = 616,
}

type StoryBookArgs = StorybookModalComponent & {
  width: ModalMaxWidth;
  height: number;
  title?: string;
  description?: string;
  buttons?: ModalFooterButton[];
  alignButtons?: string;
};

const defaultHeight = 340;
const defaultWidth = ModalMaxWidth.Large;

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

  width = input(defaultWidth);
  height = input(defaultHeight);
  dialog = inject(Dialog);

  openDialog() {
    this.dialog.open(StorybookModalComponent, {
      maxWidth: `${this.width()}px`,
      minWidth: `${this.width()}px`,
      maxHeight: `${this.height()}px`,
      minHeight: `${this.height()}px`,
      data: this.args(),
    });
  }
}

@Component({
  selector: "storybook-modal",
  template: `
    <tedi-modal>
      <tedi-modal-header
        header-slot
        [title]="dialogData?.title ?? args()?.title"
        [description]="dialogData?.description ?? args()?.description"
      />

      <label tedi-label [id]="selectOneId">Label</label>

      <tedi-select [id]="selectOneId" state="default">
        <tedi-select-option
          *ngFor="let option of options"
          [value]="option.value"
          [label]="option.label"
        />
      </tedi-select>

      <label tedi-label [id]="selectTwoId">Label</label>
      <tedi-select [id]="selectTwoId" state="default">
        <tedi-select-option
          *ngFor="let option of options"
          [value]="option.value"
          [label]="option.label"
        />
      </tedi-select>

      <tedi-modal-footer
        footer-slot
        *ngIf="dialogData?.buttons || args()?.buttons"
        [buttons]="dialogData?.buttons ?? args()?.buttons"
        [alignButtons]="dialogData?.alignButtons ?? args()?.alignButtons"
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
  selectOneId?: string;
  selectTwoId?: string;

  args = input<StoryBookArgs>();

  dialogData = inject<StoryBookArgs>(DIALOG_DATA, { optional: true });

  ngOnInit(): void {
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
    width: {
      control: {
        type: "number",
      },
      description: "Width of the modal container",
    },
    height: {
      control: {
        type: "number",
      },
      description: "Height of the modal container",
    },
    title: {
      control: "text",
      description: "Title of the modal",
    },
    description: {
      control: "text",
      description: "Description of the modal",
    },
  },
  args: {
    width: ModalMaxWidth.Large,
    height: defaultHeight,
    title: "Title",
    description: "",
  },
};

export default meta;

type Story = StoryObj<StoryBookArgs>;

const renderModal = (
  width: StoryBookArgs["width"],
  height: StoryBookArgs["height"],
  argsName = "args"
) => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <storybook-open-modal [width]="width" [height]="height" [args]="${argsName}" />
      <div style="width: ${width}px; height: ${height}px;">
        <storybook-modal [args]="${argsName}" />
      </div>
    </div>
    `;

export const Default: Story = {
  render: ({ width, height, ...args }) => {
    const secondArgs = {
      ...args,
      alignButtons: "flex-start",
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
    };

    return {
      props: { args, secondArgs, width, height },
      template: `
        ${renderModal(width, height)}
        ${renderModal(width, height, "secondArgs")}
      `,
    };
  },
};
