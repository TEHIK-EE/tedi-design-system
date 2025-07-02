import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  FooterSideComponent,
  type FooterSidePosition,
} from "./footer-side.component";
import { BreakpointService } from "../../../../services/breakpoint/breakpoint.service";
import { signal } from "@angular/core";

type TestCase = {
  attribute: string;
  expectedClass: string;
};

type PositionTestCase = {
  position: FooterSidePosition;
  expectedClass: string;
};

const testCases: TestCase[] = [
  { attribute: "tedi-footer-start", expectedClass: "tedi-footer-side--start" },
  { attribute: "tedi-footer-end", expectedClass: "tedi-footer-side--end" },
];

const positionCases: PositionTestCase[] = [
  { position: "start", expectedClass: "tedi-footer-side--vertical-start" },
  { position: "center", expectedClass: "tedi-footer-side--vertical-center" },
  { position: "end", expectedClass: "tedi-footer-side--vertical-end" },
];

class BreakpointServiceMock {
  isMobile = false;
  isBelowBreakpoint() {
    return signal(this.isMobile);
  }
}

describe.each(testCases)(
  "FooterSideComponent with attribute '$attribute'",
  ({ attribute, expectedClass }) => {
    @Component({
      standalone: true,
      imports: [FooterSideComponent],
      template: `<tedi-footer-side ${attribute}
        >Test Content</tedi-footer-side
      >`,
    })
    class TestHostComponent {}

    let fixture: ComponentFixture<TestHostComponent>;
    let element: HTMLElement;
    let breakpointServiceMock: BreakpointServiceMock;

    beforeEach(async () => {
      breakpointServiceMock = new BreakpointServiceMock();

      await TestBed.configureTestingModule({
        imports: [TestHostComponent],
        providers: [
          {
            provide: BreakpointService,
            useValue: breakpointServiceMock,
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      element = fixture.nativeElement.querySelector("tedi-footer-side")!;
    });

    it(`should apply class '${expectedClass}'`, () => {
      expect(element.classList.contains(expectedClass)).toBe(true);
    });

    it("should apply class 'tedi-footer-side--mobile' if isBelowBreakpoint returns true", () => {
      breakpointServiceMock.isMobile = true;
      fixture = TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();

      element = fixture.nativeElement.querySelector("tedi-footer-side")!;

      expect(element.classList.contains("tedi-footer-side--mobile")).toBe(true);
    });

    it("should be positioned to center by default", () => {
      expect(
        element.classList.contains("tedi-footer-side--vertical-center"),
      ).toBe(true);
    });
  },
);

describe.each(positionCases)(
  "FooterSideComponent with position '$position'",
  ({ position, expectedClass }) => {
    @Component({
      standalone: true,
      imports: [FooterSideComponent],
      template: `<tedi-footer-side tedi-footer-start [position]="'${position}'">
        Test Content
      </tedi-footer-side>`,
    })
    class PositionHostComponent {}

    let fixture: ComponentFixture<PositionHostComponent>;
    let element: HTMLElement;
    let breakpointServiceMock: BreakpointServiceMock;

    beforeEach(async () => {
      breakpointServiceMock = new BreakpointServiceMock();

      await TestBed.configureTestingModule({
        imports: [PositionHostComponent],
        providers: [
          {
            provide: BreakpointService,
            useValue: breakpointServiceMock,
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(PositionHostComponent);
      fixture.detectChanges();

      element = fixture.nativeElement.querySelector("tedi-footer-side")!;
    });

    it(`should apply class '${expectedClass}'`, () => {
      expect(element.classList.contains(expectedClass)).toBe(true);
    });
  },
);
