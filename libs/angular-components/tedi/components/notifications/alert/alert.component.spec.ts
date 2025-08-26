import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AlertComponent, AlertRole } from "./alert.component";

const roleToLiveMap: Record<AlertRole, string> = {
  alert: "assertive",
  status: "polite",
  none: "off",
};

const roles: AlertRole[] = ["alert", "status", "none"];

describe("AlertComponent", () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("Role attribute tests", () => {
    roles.forEach((role) => {
      it(`should ${role === "none" ? "not set" : "set"} role attribute when role="${role}"`, () => {
        fixture.componentRef.setInput("role", role);
        fixture.detectChanges();

        const alertElement = fixture.debugElement.query(By.css("div"));

        if (role === "none") {
          expect(alertElement.attributes["role"]).toBeUndefined();
        } else {
          expect(alertElement.attributes["role"]).toBe(role);
        }
      });
    });
  });

  describe("aria-live attribute tests", () => {
    (Object.keys(roleToLiveMap) as AlertRole[]).forEach((role) => {
      it(`should set aria-live="${roleToLiveMap[role]}" when role="${role}"`, () => {
        fixture.componentRef.setInput("role", role);
        fixture.detectChanges();

        const alertElement = fixture.debugElement.query(By.css("div"));
        const expectedLive = roleToLiveMap[role];
        expect(alertElement.attributes["aria-live"]).toBe(expectedLive);
      });
    });
  });

  it("should apply the correct type class based on the type input", () => {
    fixture.componentRef.setInput("type", "success");
    fixture.detectChanges();

    const alertElement = fixture.debugElement.query(By.css(".tedi-alert"));

    expect(alertElement.nativeElement.classList).toContain(
      "tedi-alert--success",
    );
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
    fixture.componentRef.setInput("role", "status");
    fixture.detectChanges();

    const alertElement = fixture.debugElement.query(By.css("div"));

    expect(alertElement.attributes["role"]).toBe("status");
  });

  it("should set the correct aria-live attribute based on the role input", () => {
    fixture.componentRef.setInput("role", "alert");
    fixture.detectChanges();

    const alertElement = fixture.debugElement.query(By.css("div"));

    expect(alertElement.attributes["aria-live"]).toBe("assertive");
  });

  it("should apply the global variant class when variant is set to global", () => {
    fixture.componentRef.setInput("variant", "global");
    fixture.detectChanges();

    const alertElement = fixture.debugElement.query(By.css(".tedi-alert"));

    expect(alertElement.nativeElement.classList).toContain(
      "tedi-alert--global",
    );
  });

  it("should apply the no-side-borders variant class when variant is set to noSideBorders", () => {
    fixture.componentRef.setInput("variant", "noSideBorders");
    fixture.detectChanges();

    const alertElement = fixture.debugElement.query(By.css(".tedi-alert"));

    expect(alertElement.nativeElement.classList).toContain(
      "tedi-alert--no-side-borders",
    );
  });

  it("should display the correct icon when icon input is provided", () => {
    fixture.componentRef.setInput("icon", "info-icon");
    fixture.detectChanges();

    const iconElement = fixture.debugElement.query(By.css(".tedi-alert__icon"));

    expect(iconElement).toBeTruthy();
    expect(iconElement.nativeElement.textContent.trim()).toBe("info-icon");
  });

  it("should not display an icon when icon input is empty", () => {
    fixture.componentRef.setInput("icon", "");
    fixture.detectChanges();

    const iconElement = fixture.debugElement.query(By.css(".tedi-alert__icon"));

    expect(iconElement).toBeNull();
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
