import { Component, inject } from "@angular/core";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { ButtonComponent } from "tedi/components";
import { Dialog } from "@angular/cdk/dialog";
import { ModalComponent } from "./modal.component";

@Component({
  selector: "storybook-modal",
  template: `<button tedi-button (click)="openDialog()">Open modal</button> `,
  standalone: true,
  imports: [ButtonComponent],
})
class ModalStorybookComponent {
  dialog = inject(Dialog);

  openDialog() {
    this.dialog.open(ModalComponent);
    this.dialog.afterAllClosed.subscribe(() => {
      console.log("closed dialog");
    });
  }
}

const meta: Meta<ModalStorybookComponent> = {
  title: "Community Angular/Overlay/Modal",
  component: ModalStorybookComponent,
  decorators: [
    moduleMetadata({
      imports: [ModalStorybookComponent, ModalComponent],
    }),
  ],
};

export default meta;

type Story = StoryObj<ModalStorybookComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <storybook-modal />
      <tedi-modal />
    `,
  }),
};

export const WithSelect: Story = {
  render: () => ({
    template: `
      <storybook-modal />
      <tedi-modal>
        <tedi-select></tedi-select>
      </tedi-modal>
    `,
  }),
};
