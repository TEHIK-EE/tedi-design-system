import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { signal } from "@angular/core";

import { BreadcrumbsComponent } from "./breadcrumbs.component";

describe("BreadcrumbsComponent", () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: () => signal({}),
            queryParams: () => signal({}),
            data: () => signal({}),
            fragment: () => signal(null),
            snapshot: {
              paramMap: new Map(),
              data: {},
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
