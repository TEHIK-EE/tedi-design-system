import {
  Component,
  computed,
  inject,
  model,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { DIALOG_DATA, DialogModule, DialogRef } from "@angular/cdk/dialog";
import { ModalHeaderComponent } from "./header/modal-header.component";
import { ModalFooterComponent } from "./footer/modal-footer.component";
import {
  ComponentInputs,
  Breakpoint,
} from "@tehik-ee/tedi-angular/tedi";

export type DialogData = ComponentInputs<
  ModalHeaderComponent & ModalFooterComponent
> & {
  maxWidth?: Breakpoint;
  variant?: "default" | "small";
};

export const modalBreakpoints = ["xs", "sm", "md", "lg", "xl"];

@Component({
  selector: "tedi-modal",
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.scss",
  imports: [DialogModule],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "hostClasses()",
  },
})
export class ModalComponent implements OnInit {
  readonly maxWidth = model<Breakpoint>("sm");
  readonly variant = model<"default" | "small">("default");

  readonly dialogRef = inject(DialogRef, { optional: true });
  readonly dialogData = inject(DIALOG_DATA, {
    optional: true,
  });

  // host classes
  readonly hostClasses = computed(() => {
    const classes = ["tedi-modal"];

    if (this.variant() === "small") {
      classes.push("tedi-modal--padding-small");
    }

    for (const breakpoint of modalBreakpoints) {
      if (this.maxWidth() === breakpoint) {
        classes.push(`tedi-modal--width-${breakpoint}`);
      }
    }
    return classes.join(" ");
  });

  ngOnInit(): void {
    const data: DialogData = this.dialogData;
    this.dialogRef?.addPanelClass("tedi-modal-panel");

    if (!data) return;

    if (data.maxWidth) {
      this.maxWidth.set(data.maxWidth);
    }
    if (data.variant) {
      this.variant.set(data.variant);
    }
  }
}
