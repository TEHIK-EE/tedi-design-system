import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextGroupComponent } from './text-group.component';

describe('TextGroupComponent', () => {
  let component: TextGroupComponent;
  let fixture: ComponentFixture<TextGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TextGroupComponent]
    });

    fixture = TestBed.createComponent(TextGroupComponent);
    fixture.componentRef.setInput("label", "Label");
    fixture.componentRef.setInput("value", "Value");
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
