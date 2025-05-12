import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InfoButtonComponent } from "./info-button.component";
import { IconComponent } from "../../../../tedi/components/base/icon/icon.component";

describe("InfoButtonComponent", () => {
  let fixture: ComponentFixture<InfoButtonComponent>;
  let buttonElement: HTMLButtonElement;
  const ariaLabel = "Info button";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InfoButtonComponent, IconComponent],
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
