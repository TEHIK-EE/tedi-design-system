import { Component, inject, input, OnInit } from "@angular/core";
import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from "@storybook/angular";
import { ButtonComponent, FeedbackTextComponent } from "tedi/components";
import { Dialog } from "@angular/cdk/dialog";
import { ModalComponent } from "./modal.component";
import { SelectComponent } from "community/components/form/select/select.component";
import { SelectOptionComponent } from "community/components/form/select/select-option.component";
import { resetIndexId, indexId } from "community/utils/unique-id";
import { LabelComponent } from "community/components/form/label/label.component";

enum ModalMaxWidth {
  Small = 328,
  Medium = 460,
  Large = 616,
}

resetIndexId();

@Component({
  selector: "storybook-open-modal",
  template: `<button tedi-button (click)="openDialog()">
    Open Select modal
  </button> `,
  imports: [ButtonComponent],
})
class ModalOpenComponent {
  width = input(ModalMaxWidth.Large);
  dialog = inject(Dialog);

  openDialog() {
    this.dialog.open(StorybookModalComponent, {
      maxWidth: `${this.width()}px`,
      minWidth: `${this.width()}px`,
    });
  }
}

@Component({
  selector: "storybook-modal",
  template: `
    <tedi-modal>
      <label tedi-label [id]="selectOneId">Modal Label</label>
      <tedi-select
        [id]="selectOneId"
        placeholder="Select an option"
        state="default"
      >
        <tedi-select-option value="1" label="Option 1" />
        <tedi-select-option value="2" label="Option 2" />
      </tedi-select>

      <label tedi-label [id]="selectTwoId">Modal Label Secondary</label>
      <tedi-select
        [id]="selectTwoId"
        placeholder="Select an option"
        state="default"
      >
        <tedi-select-option value="1" label="Option 1" />
        <tedi-select-option value="2" label="Option 2" />
      </tedi-select>
    </tedi-modal>
  `,
  imports: [
    SelectComponent,
    SelectOptionComponent,
    ModalComponent,
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
  selectOneId?: string;
  selectTwoId?: string;

  ngOnInit(): void {
    this.selectOneId = indexId("select-one");
    this.selectTwoId = indexId("select-two");
  }
}

type StoryBookArgs = StorybookModalComponent & {
  width: ModalMaxWidth;
};

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
      description: "Width of the modal",
    },
  },
  args: {
    width: ModalMaxWidth.Small,
  },
  // argTypes: {
  //   title: {
  //     control: "text",
  //     description: "Title of the modal",
  //   },
  //   description: {
  //     control: "text",
  //     description: "Description of the modal",
  //   },
  // },
  // args: {
  //   title: "Modal Title",
  //   description: "Modal Description",
  // },
};

export default meta;

type Story = StoryObj<ModalOpenComponent>;

export const Default: Story = {
  render: (args) => ({
    // we need the args object for passing into the modal conveniently
    props: args,
    template: `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <storybook-open-modal ${argsToTemplate(args)} />
      <div style="width: ${args.width}px">
        <storybook-modal />
      </div>
    </div>
    `,
  }),
};
