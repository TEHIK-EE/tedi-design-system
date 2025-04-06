import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackTextComponent } from './feedback-text.component';

describe('FeedbackTextComponent', () => {
  let component: FeedbackTextComponent;
  let fixture: ComponentFixture<FeedbackTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
