import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FooterComponent } from "./footer.component";
import { BreakpointService } from "../../../services/breakpoint/breakpoint.service";

describe("FooterComponent", () => {
  let mockBreakpointService: jest.Mocked<BreakpointService>;
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    mockBreakpointService = {
      isBelowBreakpoint: jest.fn(),
    } as unknown as jest.Mocked<BreakpointService>;

    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        { provide: BreakpointService, useValue: mockBreakpointService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it("should create component", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should return true for mobileLayout when isBelowBreakpoint returns true", () => {
    mockBreakpointService.isBelowBreakpoint.mockReturnValue(true);
    fixture.detectChanges();
    expect(component.mobileLayout()).toBe(true);
  });

  it("should return false for mobileLayout when isBelowBreakpoint returns false", () => {
    mockBreakpointService.isBelowBreakpoint.mockReturnValue(false);
    fixture.detectChanges();
    expect(component.mobileLayout()).toBe(false);
  });
});
