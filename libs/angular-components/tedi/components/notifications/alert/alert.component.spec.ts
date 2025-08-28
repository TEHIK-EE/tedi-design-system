import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AlertComponent, AlertRole, AlertType } from "./alert.component";

describe("AlertComponent", () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should apply the correct type class based on the type input", () => {
    const types: AlertType[] = ["danger", "info", "success", "warning"];

    for (const type of types) {
      fixture.componentRef.setInput("type", type);
      fixture.detectChanges();

      expect(element.classList).toContain(`tedi-alert--${type}`);
    }
  });

  it("should display the close button when showClose is true", () => {
    fixture.componentRef.setInput("showClose", true);
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(
      By.css(".tedi-alert__close"),
    );

    expect(closeButton).toBeTruthy();
  });

  it("should not display the close button when showClose is false", () => {
    fixture.componentRef.setInput("showClose", false);
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(
      By.css(".tedi-alert__close"),
    );

    expect(closeButton).toBeNull();
  });

  it("should set the correct ARIA role based on the role input", () => {
    const roles: AlertRole[] = ["alert", "none", "status"];

    for (const role of roles) {
      fixture.componentRef.setInput("role", role);
      fixture.detectChanges();

      if (role === "none") {
        expect(element.getAttribute("role")).toBe(null);
      } else {
        expect(element.getAttribute("role")).toBe(role);
      }
    }
  });

  it("should set the correct aria-live attribute based on the role input", () => {
    const roles: AlertRole[] = ["alert", "none", "status"];

    for (const role of roles) {
      fixture.componentRef.setInput("role", role);
      fixture.detectChanges();

      const ariaLive =
        role === "alert" ? "assertive" : role === "status" ? "polite" : "off";
      expect(element.getAttribute("aria-live")).toBe(ariaLive);
    }
  });

  it("should apply the global variant class when variant is set to global", () => {
    fixture.componentRef.setInput("variant", "global");
    fixture.detectChanges();
    expect(element.classList).toContain("tedi-alert--global");
  });

  it("should apply the no-side-borders variant class when variant is set to noSideBorders", () => {
    fixture.componentRef.setInput("variant", "noSideBorders");
    fixture.detectChanges();
    expect(element.classList).toContain("tedi-alert--no-side-borders");
  });

  it("should close alert if close button is clicked", () => {
    fixture.componentRef.setInput("showClose", true);
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(By.css(".tedi-alert__close"))
      .nativeElement as HTMLButtonElement;

    closeButton.click();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).style.display).toBe("none");
  });
});
