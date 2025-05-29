import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InfoButtonComponent } from "./info-button.component";

describe("InfoButtonComponent", () => {
  let fixture: ComponentFixture<InfoButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InfoButtonComponent],
    });

    fixture = TestBed.createComponent(InfoButtonComponent);
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
