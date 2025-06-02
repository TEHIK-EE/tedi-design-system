import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClosingButtonComponent } from "./closing-button.component";

describe("ClosingButtonComponent", () => {
  let fixture: ComponentFixture<ClosingButtonComponent>;
  let component: ClosingButtonComponent;
  let buttonElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClosingButtonComponent],
    });

    fixture = TestBed.createComponent(ClosingButtonComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
    expect(component.size()).toBe("default");
    expect(buttonElement.classList).toContain("tedi-closing-button");
    expect(buttonElement.classList).not.toContain("tedi-closing-button--small");
  });

  it("should have default title as 'Sulge'", () => {
    expect(component.title()).toBe("Sulge");
    expect(buttonElement.getAttribute("title")).toBe("Sulge");
    expect(buttonElement.getAttribute("aria-label")).toBe("Sulge");
  });

  it("should update size when input changes", () => {
    fixture.componentRef.setInput("size", "small");
    fixture.detectChanges();

    expect(buttonElement.classList).toContain("tedi-closing-button--small");
  });

  it("should update title when input changes", () => {
    fixture.componentRef.setInput("title", "Close");
    fixture.detectChanges();

    expect(buttonElement.getAttribute("title")).toBe("Close");
    expect(buttonElement.getAttribute("aria-label")).toBe("Close");
  });
});
