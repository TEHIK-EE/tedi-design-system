import { Component, inject } from "@angular/core";
import { DIALOG_DATA, DialogModule } from "@angular/cdk/dialog";
import { ModalHeaderComponent } from "./header/modal-header.component";
import { ModalFooterComponent } from "./footer/modal-footer.component";

@Component({
  selector: "tedi-modal",
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.scss",
  imports: [DialogModule, ModalHeaderComponent, ModalFooterComponent],
})
export class ModalComponent {
  // readonly data = inject(DIALOG_DATA, { optional: true });
}
