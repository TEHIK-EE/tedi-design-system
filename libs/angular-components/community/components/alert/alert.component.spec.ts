import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AlertComponent } from "./alert.component";

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

  it("should display the correct title when provided", () => {
    fixture.componentRef.setInput("title", "Test Alert Title");
    fixture.componentInstance.ngAfterViewInit();
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(
      By.css(".tedi-alert__title__text"),
    );

    expect(titleElement.nativeElement.textContent).toBe("Test Alert Title");
  });

  it("should render the title with correct HTML tag based on titleElement input", () => {
    fixture.componentRef.setInput("title", "Title with Strong Tag");
    fixture.componentRef.setInput("titleElement", "strong");
    component.ngAfterViewInit();
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(
      By.css("strong.tedi-alert__title__text"),
    );

    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent).toBe(
      "Title with Strong Tag",
    );
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

  it("should set the correct aria-label when title and type are provided", () => {
    fixture.componentRef.setInput("title", "My Alert");
    fixture.componentRef.setInput("type", "warning");
    fixture.detectChanges();

    fixture.componentInstance.ngAfterViewInit();
    fixture.detectChanges();

    const alertElement = fixture.debugElement.query(By.css("div"));
    expect(alertElement.attributes["aria-label"]).toBe(
      "warning alert: My Alert",
    );
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
});
