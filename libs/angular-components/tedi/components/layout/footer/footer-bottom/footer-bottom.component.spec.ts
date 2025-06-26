import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FooterBottomComponent } from "./footer-bottom.component";
import { LinkComponent } from "../../../navigation/link/link.component";
import { BreakpointService } from "../../../../services/breakpoint/breakpoint.service";
import { By } from "@angular/platform-browser";
import { signal } from "@angular/core";

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

@Component({
  standalone: true,
  imports: [FooterBottomComponent, LinkComponent],
  template: `
    <tedi-footer-bottom>
      <a tedi-link href="#">Link 1</a>
    </tedi-footer-bottom>
  `,
})
class TestHostSingleLinkComponent {}

describe("FooterBottomComponent", () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let mockBreakpointService: {
    isBelowBreakpoint: jest.Mock;
    getBreakpointInputs: jest.Mock;
  };

  beforeEach(async () => {
    mockBreakpointService = {
      isBelowBreakpoint: jest.fn().mockReturnValue(signal(false)),
      getBreakpointInputs: jest.fn().mockReturnValue({}),
    };

    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TestHostSingleLinkComponent],
      providers: [
        { provide: BreakpointService, useValue: mockBreakpointService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should add ellipsis elements when in mobile layout", () => {
    mockBreakpointService.isBelowBreakpoint.mockReturnValue(signal(true));
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const ellipsisEls = fixture.debugElement.queryAll(
      By.css(".tedi-footer-bottom__ellipsis"),
    );
    expect(ellipsisEls.length).toBe(2);
  });

  it("should not add ellipsis elements if there is only one link", () => {
    mockBreakpointService.isBelowBreakpoint.mockReturnValue(signal(true));
    const singleLinkFixture = TestBed.createComponent(
      TestHostSingleLinkComponent,
    );
    singleLinkFixture.detectChanges();
    const ellipsisEls = singleLinkFixture.debugElement.queryAll(
      By.css(".tedi-footer-bottom__ellipsis"),
    );
    expect(ellipsisEls.length).toBe(0);
  });
});
