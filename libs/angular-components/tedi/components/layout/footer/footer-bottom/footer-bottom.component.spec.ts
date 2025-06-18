import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FooterBottomComponent } from "./footer-bottom.component";
import { BreakpointService } from "../../../../services/breakpoint/breakpoint.service";
import { LinkComponent } from "../../../navigation/link/link.component";

@Component({
  standalone: true,
  imports: [FooterBottomComponent, LinkComponent],
  template: `
    <tedi-footer-bottom>
      <a tedi-link href="#">Link 1</a>
      <a tedi-link href="#">Link 2</a>
      <a tedi-link href="#">Link 3</a>
    </tedi-footer-bottom>
  `,
})
class TestHostComponent {}

describe("FooterBottomComponent", () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let mockBreakpointService: {
    isBelowBreakpoint: jest.Mock;
    getBreakpointInputs: jest.Mock;
  };

  beforeEach(async () => {
    mockBreakpointService = {
      isBelowBreakpoint: jest.fn().mockReturnValue(false),
      getBreakpointInputs: jest.fn().mockImplementation((inputs) => inputs),
    };

    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        {
          provide: BreakpointService,
          useValue: mockBreakpointService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it("should create component", () => {
    const footer = fixture.debugElement.query(
      By.directive(FooterBottomComponent),
    );
    expect(footer).toBeTruthy();
  });

  it("should insert ellipsis SVGs between links when in mobile mode", () => {
    mockBreakpointService.isBelowBreakpoint.mockReturnValue(true);
    fixture.detectChanges();
    const ellipsis = fixture.debugElement.nativeElement.querySelectorAll(
      ".tedi-footer-bottom__ellipsis",
    );
    expect(ellipsis.length).toBe(2);
  });

  it("should not show ellipsis SVGs in desktop mode", () => {
    mockBreakpointService.isBelowBreakpoint.mockReturnValue(false);
    fixture.detectChanges();
    const ellipsis = fixture.debugElement.nativeElement.querySelectorAll(
      ".tedi-footer-bottom__ellipsis",
    );
    expect(ellipsis.length).toBe(2);
  });

  it("should update ellipsis visibility when breakpoint changes", () => {
    mockBreakpointService.isBelowBreakpoint.mockReturnValue(false);
    fixture.detectChanges();
    let ellipsis = fixture.debugElement.nativeElement.querySelectorAll(
      ".tedi-footer-bottom__ellipsis",
    );
    expect(ellipsis.length).toBe(2);
    mockBreakpointService.isBelowBreakpoint.mockReturnValue(true);
    fixture.detectChanges();
    ellipsis = fixture.debugElement.nativeElement.querySelectorAll(
      ".tedi-footer-bottom__ellipsis",
    );
    expect(ellipsis.length).toBe(2);
  });
});

describe("FooterBottomComponent with single link", () => {
  let singleFixture: ComponentFixture<SingleLinkHostComponent>;
  let mockBreakpointService: {
    isBelowBreakpoint: jest.Mock;
    getBreakpointInputs: jest.Mock;
  };

  @Component({
    standalone: true,
    imports: [FooterBottomComponent, LinkComponent],
    template: ` <tedi-footer-bottom>
      <a tedi-link href="#">Link 1</a>
    </tedi-footer-bottom>`,
  })
  class SingleLinkHostComponent {}

  beforeEach(async () => {
    mockBreakpointService = {
      isBelowBreakpoint: jest.fn().mockReturnValue(true),
      getBreakpointInputs: jest.fn().mockImplementation((inputs) => inputs),
    };
    await TestBed.configureTestingModule({
      imports: [SingleLinkHostComponent],
      providers: [
        { provide: BreakpointService, useValue: mockBreakpointService },
      ],
    }).compileComponents();
    singleFixture = TestBed.createComponent(SingleLinkHostComponent);
    singleFixture.detectChanges();
  });

  it("should not insert ellipsis if only one link is present", () => {
    const ellipsis = singleFixture.debugElement.nativeElement.querySelectorAll(
      ".tedi-footer-bottom__ellipsis",
    );
    expect(ellipsis.length).toBe(0);
  });
});
