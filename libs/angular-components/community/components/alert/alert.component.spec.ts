import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AlertComponent } from "./alert.component";

describe("AlertComponent", () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the correct title when provided", () => {
    fixture.componentRef.setInput("title", "Test Alert Title");
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(
      By.css(".tedi-alert__title__text"),
    );
    expect(titleElement.nativeElement.textContent).toBe("Test Alert Title");
  });

  // it("should apply the correct type class based on the type input", () => {
  //   fixture.componentRef.setInput("type", "success");
  //   fixture.detectChanges();
  //   const alertElement = fixture.debugElement.query(By.css(".tedi-alert"));
  //   expect(alertElement.classes["tedi-alert--success"]).toBeTrue();
  // });

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

  // it("should apply the global variant class when variant is set to global", () => {
  //   component.variant.set("global");
  //   fixture.detectChanges();
  //   const alertElement = fixture.debugElement.query(By.css(".tedi-alert"));
  //   expect(alertElement.classes["tedi-alert--global"]).toBeTrue();
  // });

  // it("should apply the no-side-borders variant class when variant is set to noSideBorders", () => {
  //   fixture.componentRef.setInput("variant", "noSideBorders");
  //   fixture.detectChanges();
  //   const alertElement = fixture.debugElement.query(By.css(".tedi-alert"));
  //   expect(alertElement.classes["tedi-alert--no-side-borders"]).toBeTrue();
  // });

  it("should display the correct icon when icon input is provided", () => {
    fixture.componentRef.setInput("icon", "info-icon");
    fixture.detectChanges();
    const iconElement = fixture.debugElement.query(By.css(".tedi-alert__icon"));
    expect(iconElement).toBeTruthy();
    expect(iconElement.attributes["name"]).toBe("info-icon");
  });

  it("should not display an icon when icon input is empty", () => {
    fixture.componentRef.setInput("icon", "");
    fixture.detectChanges();
    const iconElement = fixture.debugElement.query(By.css(".tedi-alert__icon"));
    expect(iconElement).toBeNull();
  });
});
