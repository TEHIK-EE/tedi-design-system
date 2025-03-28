import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  VerticalSpacingDirective,
  VerticalSpacingSize,
} from "./vertical-spacing.directive";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <div id="container" [appVerticalSpacing]="spacing">
      <p>Item 2</p>
      <p>Item 2</p>
      <p>Item 3</p>
      <p>Item 4</p>
    </div>
  `,
  imports: [VerticalSpacingDirective],
  standalone: true,
})
class HostComponent {
  spacing: VerticalSpacingSize = 2;
}

describe("VerticalSpacingDirective", () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComponent: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalSpacingDirective, HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create host component with directive", () => {
    let hostEl = fixture.debugElement.query(By.css("#container"));
    console.log(hostEl.nativeElement.outerHTML);
    expect(hostEl).toBeTruthy();
  });
});
