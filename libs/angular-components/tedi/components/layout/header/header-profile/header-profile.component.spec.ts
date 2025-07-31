import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HeaderProfileComponent } from './header-profile.component';

describe('HeaderProfileComponent', () => {
  let fixture: ComponentFixture<HeaderProfileComponent>;
  let component: HeaderProfileComponent;
  let documentMock: Document;

  beforeEach(() => {
    documentMock = document;

    TestBed.configureTestingModule({
      imports: [HeaderProfileComponent],
      providers: [
        { provide: DOCUMENT, useValue: documentMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeaderProfileComponent);
    component = fixture.componentInstance;

    // set required inputs
    fixture.componentRef.setInput('name', 'John Doe');
    fixture.componentRef.setInput('showDropdown', "lg");

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default modalOpen state false', () => {
    expect(component.modalOpen()).toBe(false);
  });

  it('should toggle modalOpen on handleModalOpen()', () => {
    component.handleModalOpen();
    expect(component.modalOpen()).toBe(true);
    component.handleModalOpen();
    expect(component.modalOpen()).toBe(false);
  });

  it('should close modal when clicking outside after AfterContentInit', () => {
    // initialize listeners
    component.ngAfterContentInit();

    // open modal
    component.modalOpen.set(true);
    expect(component.modalOpen()).toBe(true);

    // dispatch click inside
    const insideTarget = fixture.nativeElement as HTMLElement;
    insideTarget.click();
    expect(component.modalOpen()).toBe(true);

    // dispatch click outside
    const outsideEvent = new MouseEvent('click', { bubbles: true });
    documentMock.body.dispatchEvent(outsideEvent);

    expect(component.modalOpen()).toBe(false);
  });
});
