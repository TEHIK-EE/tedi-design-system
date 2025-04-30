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

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
