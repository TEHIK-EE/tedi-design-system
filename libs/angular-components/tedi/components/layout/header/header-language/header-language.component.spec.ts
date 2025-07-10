import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLanguageComponent } from './header-language.component';

describe('HeaderLanguageComponent', () => {
  let component: HeaderLanguageComponent;
  let fixture: ComponentFixture<HeaderLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLanguageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
