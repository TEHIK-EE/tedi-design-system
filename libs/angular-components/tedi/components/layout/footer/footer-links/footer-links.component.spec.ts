import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterBodyLinksComponent } from './footer-links.component';

describe('FooterBodyLinksComponent', () => {
  let component: FooterBodyLinksComponent;
  let fixture: ComponentFixture<FooterBodyLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterBodyLinksComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterBodyLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
