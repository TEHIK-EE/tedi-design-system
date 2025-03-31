import { ComponentFixture, TestBed } from "@angular/core/testing";
import { VerticalSpacingItemDirective } from "./vertical-spacing-item.directive";
import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import type { VerticalSpacingSize } from "./vertical-spacing.directive";

@Component({
  template: `<div [tediVerticalSpacingItem]="spacing"></div> `,
  imports: [VerticalSpacingItemDirective],
  standalone: true,
  schemas: [NO_ERRORS_SCHEMA],
})
class HostComponent {
  spacing: VerticalSpacingSize = 2;
}

describe("VerticalSpacingDirective", () => {
  let fixture: ComponentFixture<HostComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalSpacingItemDirective, HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it("should create host component with directive", () => {
    const hostEl = fixture.debugElement.query(By.css("div"));
    expect(hostEl).toBeTruthy();
  });

  it("should have class tedi-vertical-spacing__item", () => {
    const hostEl = fixture.debugElement.query(By.css("div"));
    expect(hostEl.nativeElement.classList).toContain(
      "tedi-vertical-spacing__item",
    );
  });
});
