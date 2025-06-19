import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FooterBodyComponent } from "./footer-body.component";
import { signal } from "@angular/core";

describe("FooterBodyComponent", () => {
  let component: FooterBodyComponent;
  let fixture: ComponentFixture<FooterBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterBodyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have the base tedi-footer-body class", () => {
    const element = fixture.nativeElement;
    expect(element.classList).toContain("tedi-footer-body");
  });

  it("should not have mobile class when screen is above sm breakpoint", () => {
    component.mobileLayout = signal(false);
    fixture.detectChanges();

    const element = fixture.nativeElement;
    expect(element.classList).not.toContain("tedi-footer-body--mobile");
  });

  it("should have mobile class when screen is below sm breakpoint", () => {
    component.mobileLayout = signal(true);
    fixture.detectChanges();

    const element = fixture.nativeElement;
    expect(element.classList).toContain("tedi-footer-body--mobile");
  });

  it("should project content", () => {
    const testContent = "<div>Test Content</div>";
    fixture.nativeElement.innerHTML = testContent;
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain("Test Content");
  });
});
