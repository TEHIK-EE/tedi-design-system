import { Component, input } from "@angular/core";
import { DialogModule } from "@angular/cdk/dialog";
import { ModalHeaderComponent } from "./header/modal-header.component";
import { ModalFooterComponent } from "./footer/modal-footer.component";

export type ModalSizes = "small" | "medium" | "large";

@Component({
  selector: "tedi-modal",
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.scss",
  imports: [DialogModule, ModalHeaderComponent, ModalFooterComponent],
})
export class ModalComponent {
  readonly maxWidth = input<ModalSizes>("large");
}
