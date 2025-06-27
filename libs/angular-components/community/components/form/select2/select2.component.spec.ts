import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Select2Component } from './select2.component';

describe('Select2Component', () => {
  let component: Select2Component;
  let fixture: ComponentFixture<Select2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Select2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Select2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
