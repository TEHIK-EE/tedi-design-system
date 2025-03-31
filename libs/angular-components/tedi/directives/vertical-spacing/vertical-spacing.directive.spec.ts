import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  VerticalSpacingDirective,
  VerticalSpacingSize,
} from "./vertical-spacing.directive";
import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <div id="container" [tediVerticalSpacing]="spacing">
      <p>Item 2</p>
      <p>Item 2</p>
      <p>Item 3</p>
      <p>Item 4</p>
    </div>
  `,
  imports: [VerticalSpacingDirective],
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
      imports: [VerticalSpacingDirective, HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it("should create host component with directive", () => {
    const hostEl = fixture.debugElement.query(By.css("#container"));
    expect(hostEl).toBeTruthy();
  });

  it("should have class tedi-vertical-spacing", () => {
    const hostEl = fixture.debugElement.query(By.css("#container"));
    expect(hostEl.nativeElement.classList).toContain("tedi-vertical-spacing");
  });
});
