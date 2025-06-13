import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterSideComponent } from './footer-side.component';

describe('FooterLeftComponent', () => {
  let component: FooterSideComponent;
  let fixture: ComponentFixture<FooterSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSideComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
