import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CollapseComponent } from "./collapse.component";

Object.defineProperty(global.self, "crypto", {
  value: {
    randomUUID: () => "mocked-random-uuid",
  },
});

describe("CollapseComponent", () => {
  let component: CollapseComponent;
  let fixture: ComponentFixture<CollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with default values", () => {
    expect(component.openText()).toBe("Näita");
    expect(component.closeText()).toBe("Peida");
    expect(component.defaultOpen()).toBe(false);
    expect(component.hideCollapseText()).toBe(false);
    expect(component.arrowType()).toBe("default");
    expect(component.isOpen()).toBe(false);
  });

  it("should toggle collapse state", () => {
    expect(component.isOpen()).toBe(false);
    component.toggleCollapse();
    expect(component.isOpen()).toBe(true);
    component.toggleCollapse();
    expect(component.isOpen()).toBe(false);
  });

  it("should set isOpen to true if defaultOpen is true", () => {
    fixture.componentRef.setInput("defaultOpen", true);
    fixture.detectChanges();

    component.ngAfterViewInit();
    expect(component.isOpen()).toBe(true);
  });

  it("should generate a unique collapseContentId", () => {
    expect(component.collapseContentId).toBe(
      "collapse-content-mocked-random-uuid",
    );
  });

  it("should render openText when collapsed", () => {
    component.isOpen.set(false);
    fixture.detectChanges();
    const buttonText = fixture.nativeElement
      .querySelector(".collapse__button--text")
      .textContent.trim();
    expect(buttonText).toBe("Näita");
  });

  it("should render closeText when expanded", () => {
    component.isOpen.set(true);
    fixture.detectChanges();
    const buttonText = fixture.nativeElement
      .querySelector(".collapse__button--text")
      .textContent.trim();
    expect(buttonText).toBe("Peida");
  });

  it("should hide openText and closeText when hideCollapseText is true", () => {
    fixture.componentRef.setInput("hideCollapseText", true);
    fixture.detectChanges();
    const buttonText = fixture.nativeElement.querySelector(
      ".collapse__button--text",
    );
    expect(buttonText).toBeNull();
  });

  it("should apply secondary arrow style when arrowType is 'secondary'", () => {
    fixture.componentRef.setInput("arrowType", "secondary");
    fixture.detectChanges();
    const iconWrapper = fixture.nativeElement.querySelector(
      ".collapse__icon--wrapper",
    );
    expect(iconWrapper).toBeTruthy();
  });

  it("should not apply secondary arrow style when arrowType is 'default'", () => {
    fixture.componentRef.setInput("arrowType", "default");
    fixture.detectChanges();
    const iconWrapper = fixture.nativeElement.querySelector(
      ".collapse__icon--wrapper",
    );
    expect(iconWrapper).toBeNull();
  });
});
