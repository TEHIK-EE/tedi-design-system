import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InfoButtonComponent } from "./info-button.component";

describe("InfoButtonComponent", () => {
  let fixture: ComponentFixture<InfoButtonComponent>;
  let buttonElement: HTMLButtonElement;
  const ariaLabel = "Info button";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InfoButtonComponent],
    });

    fixture = TestBed.createComponent(InfoButtonComponent);
    fixture.componentRef.setInput("ariaLabel", ariaLabel);
    buttonElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("checks if ariaLabel is correctly set", () => {
    fixture.whenStable().then(() => {
      expect(buttonElement.ariaLabel).toBe(ariaLabel);
    })
  })
});
