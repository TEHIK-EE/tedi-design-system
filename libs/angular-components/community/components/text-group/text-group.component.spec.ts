import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextGroupComponent } from './text-group.component';

describe('TextGroupComponent', () => {
  let component: TextGroupComponent;
  let fixture: ComponentFixture<TextGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
