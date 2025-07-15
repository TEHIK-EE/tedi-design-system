import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LinkComponent } from "./link.component";
import { IconComponent } from "../../base/icon/icon.component";

describe("Link Component", () => {
  let fixture: ComponentFixture<LinkComponent>;
  let linkElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LinkComponent, IconComponent],
    });

    fixture = TestBed.createComponent(LinkComponent);
    linkElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should apply the base class", () => {
    expect(linkElement.classList).toContain("tedi-link");
  });

  it("should apply the inverted variant class", () => {
    fixture.componentRef.setInput("variant", "inverted");
    fixture.detectChanges();

    expect(linkElement.classList).toContain("tedi-link--inverted");
  });

  it("should not include undefined classes", () => {
    expect(linkElement.classList).not.toContain("undefined");
  });

  it("should render with default inputs", () => {
    const instance = fixture.componentInstance;
    expect(instance.variant()).toBe("default");
    expect(instance.size()).toBe("default");
    expect(instance.underline()).toBe(true);
  });

  it("should have tabIndex attribute", () => {
    expect(linkElement.getAttribute("tabIndex")).toBe("0");
  });

  it("should wrap text nodes in a span", () => {
    linkElement.textContent = "Click me";
    fixture.detectChanges();
    fixture.componentInstance.ngAfterContentChecked();
  
    const span = linkElement.querySelector("span");
    expect(span).toBeTruthy();
    expect(span?.textContent).toBe("Click me");
  });

  it("should apply the small size class", () => {
    fixture.componentRef.setInput("size", "small");
    fixture.detectChanges();
  
    expect(linkElement.classList).toContain("tedi-link--small");
  });

  it("should apply the no-underline class when underline is false", () => {
    fixture.componentRef.setInput("underline", false);
    fixture.detectChanges();
  
    expect(linkElement.classList).toContain("tedi-link--no-underline");
  });
});
