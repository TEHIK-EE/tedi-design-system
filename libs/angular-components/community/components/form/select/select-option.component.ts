import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  inject,
  input,
  viewChild,
} from "@angular/core";

@Component({
  selector: "tedi-select-option",
  standalone: true,
  imports: [],
  template: `<ng-content />`,
})
export class SelectOptionComponent implements OnInit {
  /*
   * The value of the option.
   */
  value = input.required<any>();

  /*
   * Should the option be disabled?
   */
  isDisabled = input<boolean>(false);

  textContent!: string;
  innerHtml!: string;

  optionRef = inject(ElementRef);

  ngOnInit() {
    this.textContent = this.optionRef?.nativeElement?.textContent;
    this.innerHtml = this.optionRef?.nativeElement?.innerHTML;
  }
}
