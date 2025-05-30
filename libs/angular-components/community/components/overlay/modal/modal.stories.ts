import { Component, inject } from "@angular/core";
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

@Component({
  selector: "storybook-open-modal",
  template: `<button tedi-button (click)="openDialog()">
    Open Select modal
  </button> `,
  imports: [ButtonComponent],
})
class ModalOpenComponent {
  dialog = inject(Dialog);

  openDialog() {
    this.dialog.open(StorybookModalComponent);
  }
}

@Component({
  selector: "storybook-modal",
  template: `
    <tedi-modal>
      <tedi-feedback-text text="Test Description" />
      <tedi-select placeholder="Select an option" state="default">
        <tedi-select-option value="1" label="Option 1" />
        <tedi-select-option value="2" label="Option 2" />
      </tedi-select>

      <tedi-feedback-text text="Test Description" />
      <tedi-select placeholder="Select an option" state="default">
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
  ],
})
class StorybookModalComponent {
  readonly options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
    { value: "5", label: "Option 5" },
  ];
}

const meta: Meta<StorybookModalComponent> = {
  title: "Community Angular/Overlay/Modal",
  component: ModalComponent,
  decorators: [
    moduleMetadata({
      imports: [ModalOpenComponent, StorybookModalComponent],
    }),
  ],
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
    props: { ...args, args },
    template: `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <storybook-open-modal [args]="args" />
      <storybook-modal ${argsToTemplate(args)} />
    </div>
    `,
  }),
};
