import { Component, inject, input } from "@angular/core";
import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from "@storybook/angular";
import { ButtonComponent } from "tedi/components";
import { Dialog } from "@angular/cdk/dialog";
import { ModalComponent } from "./modal.component";
import { SelectComponent } from "community/components/form/select/select.component";
import { SelectOptionComponent } from "community/components/form/select/select-option.component";

@Component({
  selector: "storybook-open-modal",
  template: `<button tedi-button (click)="openDialog()">Open modal</button> `,
  imports: [ButtonComponent],
})
class ModalOpenComponent {
  args = input.required<unknown[]>();
  dialog = inject(Dialog);

  openDialog() {
    console.log(this.args());
    this.dialog.open(ModalComponent, { data: this.args() });
  }
}

@Component({
  selector: "storybook-select-open-modal",
  template: `<button tedi-button (click)="openDialog()">
    Open Select modal
  </button> `,
  imports: [ButtonComponent],
})
class SelectModalOpenComponent {
  args = input.required<unknown[]>();
  dialog = inject(Dialog);

  openDialog() {
    this.dialog.open(SelectModalComponent, { data: this.args() });
  }
}

@Component({
  selector: "storybook-select-modal",
  template: `
    <tedi-modal [title]="title()" [description]="description()">
      <tedi-select placeholder="Select an option" state="default">
        <tedi-select-option value="1" label="Option 1" />
        <tedi-select-option value="2" label="Option 2" />
        <tedi-select-option value="3" label="Option 3" />
        <tedi-select-option value="4" label="Option 4" />
        <tedi-select-option value="5" label="Option 5" />
      </tedi-select>
    </tedi-modal>
  `,
  imports: [SelectComponent, SelectOptionComponent, ModalComponent],
})
class SelectModalComponent {
  title = input<string | undefined>();
  description = input<string | undefined>();
}

const meta: Meta<ModalComponent> = {
  title: "Community Angular/Overlay/Modal",
  component: ModalComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ModalOpenComponent,
        SelectModalOpenComponent,
        SelectModalComponent,
      ],
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
      <tedi-modal ${argsToTemplate(args)} />
    </div>
    `,
  }),
};

export const WithSelect: Story = {
  render: (args) => ({
    props: { ...args, args },
    template: `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <storybook-select-open-modal [args]="args" />
      <storybook-select-modal ${argsToTemplate(args)} />
    </div>
    `,
  }),
};
