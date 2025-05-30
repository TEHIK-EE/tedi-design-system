import { Component } from "@angular/core";
import { ButtonComponent } from "tedi/components";

@Component({
  selector: "tedi-modal-footer",
  templateUrl: "./modal-footer.component.html",
  styleUrl: "./modal-footer.component.scss",
  imports: [ButtonComponent],
})
export class ModalFooterComponent {}
