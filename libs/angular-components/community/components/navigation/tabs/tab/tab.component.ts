import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
  OnInit,
  model,
  output,
  computed,
} from "@angular/core";
import { RouterLinkActive } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { startWith } from "rxjs";

@Component({
  selector: "[tedi-tab]",
  imports: [],
  templateUrl: "./tab.component.html",
  styleUrl: "./tab.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-tab]": "true",
    "[class.tedi-tab--selected]": "selected()",
    "[class.tedi-tab--disabled]": "disabled()",
    "[attr.role]": "'tab'",
    "(click)": "selectTab()",
  },
  hostDirectives: [
    {
      directive: RouterLinkActive,
      inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive"],
      outputs: ["isActiveChange"],
    },
  ],
})
export class TabComponent implements OnInit {
  tabId = input.required<string>();
  selected = model(false);
  disabled = input(false, { transform: booleanAttribute });
  tabSelected = output<void>();

  private readonly routerLinkActive = inject(RouterLinkActive, { self: true });
  private linkActive = toSignal(
    this.routerLinkActive.isActiveChange.pipe(
      startWith(this.routerLinkActive.isActive),
    ),
  );

  isTabActive = computed(() => this.selected() || this.linkActive());

  selectTab() {
    this.selected.set(true);
    this.tabSelected.emit();
  }

  ngOnInit() {
    this.routerLinkActive.routerLinkActive = ["tedi-tab--active"]; // should be changed once hostDirectives allow default values
  }
}
