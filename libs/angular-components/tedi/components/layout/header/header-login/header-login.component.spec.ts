import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal, Signal } from '@angular/core';
import { HeaderLoginComponent } from './header-login.component';
import { BreakpointService } from '../../../../services/breakpoint/breakpoint.service';
import { TediTranslationService } from '../../../../services/translation/translation.service';

@Component({
  standalone: true,
  imports: [HeaderLoginComponent],
  template: `<tedi-header-login></tedi-header-login>`,
})
class TestHostComponent {}

describe('HeaderLoginComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let isMobileSignal: Signal<boolean>;
  let mockBreakpointService: { isBelowBreakpoint: jest.Mock }; 
  let mockTranslationService: { track: jest.Mock };

  beforeEach(async () => {
    isMobileSignal = signal(false);
    mockBreakpointService = {
      isBelowBreakpoint: jest.fn().mockReturnValue(isMobileSignal)
    };
    mockTranslationService = {
      track: jest.fn((key: string) => () => key)
    };

    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        { provide: BreakpointService, useValue: mockBreakpointService },
        { provide: TediTranslationService, useValue: mockTranslationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should call translationService.track for both desktop and mobile keys', () => {
    expect(mockTranslationService.track).toHaveBeenCalledWith('header.login');
    expect(mockTranslationService.track).toHaveBeenCalledWith('header.login-mobile');
  });

  it('should display desktop text when isMobile is false', () => {
    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.textContent.trim()).toBe('header.login');
  });
});
