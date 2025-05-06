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

  it("should accept iconLeft and iconRight inputs", () => {
    fixture.componentRef.setInput("iconLeft", "arrow-left");
    fixture.componentRef.setInput("iconRight", "arrow-right");
    fixture.detectChanges();

    const instance = fixture.componentInstance;
    expect(instance.iconLeft()).toBe("arrow-left");
    expect(instance.iconRight()).toBe("arrow-right");
  });

  it("should have tabIndex attribute", () => {
    expect(linkElement.getAttribute("tabIndex")).toBe("0");
  });
});
