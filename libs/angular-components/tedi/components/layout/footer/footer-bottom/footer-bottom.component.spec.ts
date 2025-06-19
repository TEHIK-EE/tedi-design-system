import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FooterBottomComponent } from "./footer-bottom.component";
import { LinkComponent } from "../../../navigation/link/link.component";
@Component({
  standalone: true,
  imports: [FooterBottomComponent, LinkComponent],
  template: `
    <tedi-footer-bottom>
      <a tedi-link href="#">Link 1</a>
      <a tedi-link href="#">Link 2</a>
      <a tedi-link href="#">Link 3</a>
    </tedi-footer-bottom>
  `,
})
class TestHostComponent {}

describe("FooterBottomComponent", () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
