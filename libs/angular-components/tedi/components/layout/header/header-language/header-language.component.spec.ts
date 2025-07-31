import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { HeaderLanguageComponent, HeaderLanguage } from './header-language.component';
import { TediTranslationService } from '../../../../services/translation/translation.service';

describe('HeaderLanguageComponent', () => {
  let fixture: ComponentFixture<HeaderLanguageComponent>;
  let component: HeaderLanguageComponent;
  const mockTranslationService = {
    translate: jest.fn(),
    setLanguage: jest.fn(),
    getLanguage: signal("et"),
  } as Partial<TediTranslationService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLanguageComponent],
      providers: [
        { provide: TediTranslationService, useValue: mockTranslationService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderLanguageComponent);
    component = fixture.componentInstance;

    // Set required inputs
    const languages: HeaderLanguage = {
      en: 'ENG',
      et: 'EST',
      ru: 'RUS'
    };
    fixture.componentRef.setInput('languages', languages);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the host class applied', () => {
    expect(fixture.nativeElement.classList).toContain('tedi-header-language');
  });

  it('should compute languageKeys based on input', () => {
    const keys = component.languageKeys();
    expect(keys).toEqual(['en', 'et', "ru"]);
  });
});
