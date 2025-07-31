import { Component, Signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { HeaderLogoutComponent } from './header-logout.component';
import { BreakpointService } from '../../../../services/breakpoint/breakpoint.service';

@Component({
  standalone: true,
  imports: [HeaderLogoutComponent],
  template: `
    <button tedi-header-logout>
      Logout
    </button>
  `,
})
class TestHostComponent {}

describe('HeaderLogoutComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let isMobileSignal: Signal<boolean>;
  let mockBreakpointService: {
    isBelowBreakpoint: jest.Mock
  };

  beforeEach(async () => {
    isMobileSignal = signal(false);
    mockBreakpointService = {
      isBelowBreakpoint: jest.fn().mockReturnValue(isMobileSignal)
    };

    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        { provide: BreakpointService, useValue: mockBreakpointService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('should apply base and desktop classes when not mobile', () => {
    mockBreakpointService.isBelowBreakpoint.mockReturnValue(signal(false));
    fixture.detectChanges();

    const btn = fixture.debugElement.query(
      By.css('button[tedi-header-logout]')
    ).nativeElement as HTMLElement;

    expect(btn.classList).toContain('tedi-header-logout');
    expect(btn.classList).toContain('tedi-link');
    expect(btn.classList).not.toContain('tedi-header-logout--mobile');
  });
});
