import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { Component, input } from "@angular/core";
import { TooltipComponent, TooltipPosition, TooltipTrigger, TooltipWidth } from "./tooltip.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";

const tooltipContent = "Tooltip content";
const triggerText = "Tooltip trigger";

@Component({
  standalone: true,
  template: `
    <tedi-tooltip [text]="text()" [position]="position()" [openWith]="openWith()" [maxWidth]="maxWidth()">
      <button #tooltipTrigger>${triggerText}</button>
    </tedi-tooltip>
  `,
  imports: [TooltipComponent],
})
class TooltipHostComponent {
  text = input.required<string>();
  position = input<TooltipPosition>("top");
  openWith = input<TooltipTrigger>("hover");
  maxWidth = input<TooltipWidth>("medium");
}

describe("TooltipComponent", () => {
  let fixture: ComponentFixture<TooltipHostComponent>;
  let hostEl: HTMLElement;
  let buttonEl: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TooltipHostComponent, OverlayModule, PortalModule],
    });

    fixture = TestBed.createComponent(TooltipHostComponent);
    fixture.componentRef.setInput("text", tooltipContent);
    fixture.detectChanges();

    hostEl = fixture.nativeElement;
    buttonEl = hostEl.querySelector("button")!;
  });

  it("should create component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should initialize with default inputs", () => {
    expect(fixture.componentInstance.position()).toBe("top");
    expect(fixture.componentInstance.openWith()).toBe("hover");
    expect(fixture.componentInstance.maxWidth()).toBe("medium");
    expect(fixture.componentInstance.text()).toBe(tooltipContent);
  });
});
