import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderRoleComponent, Representative } from './header-role.component';
import { TediTranslationService } from '../../../../services/translation/translation.service';

describe('HeaderRoleComponent', () => {
  let fixture: ComponentFixture<HeaderRoleComponent>;
  let hostElement: HTMLElement;
  const mockTranslationService = {
    track: (key: string) => () => key
  } as Partial<TediTranslationService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderRoleComponent],
      providers: [
        { provide: TediTranslationService, useValue: mockTranslationService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeaderRoleComponent);
    hostElement = fixture.nativeElement;

    // Set required inputs
    fixture.componentRef.setInput('role', 'Admin');
    fixture.componentRef.setInput('description', 'Administrator Role');
    fixture.componentRef.setInput('showInput', true);
    const reps: Representative[] = [
      { name: 'Alice', description: 'Team Lead' },
      { name: 'Bob', description: 'Developer' }
    ];
    fixture.componentRef.setInput('representatives', reps);
    fixture.componentRef.setInput('currentRepresentative', reps[0]);

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply the base class', () => {
    expect(hostElement.classList).toContain('tedi-header-role');
  });

  it('should have default mobileOpen state as false', () => {
    const comp = fixture.componentInstance;
    expect(comp.mobileOpen()).toBe(false);
  });

  it('should toggle mobileOpen on handleMobileOpen()', () => {
    const comp = fixture.componentInstance;
    comp.handleMobileOpen();
    expect(comp.mobileOpen()).toBe(true);
    comp.handleMobileOpen();
    expect(comp.mobileOpen()).toBe(false);
  });

  it('should update collapseText based on mobileOpen', () => {
    const comp = fixture.componentInstance;
    // mobileOpen false => collapseText equals switchRoleText
    expect(comp.collapseText()).toBe(comp.switchRoleText());
    comp.handleMobileOpen();
    // mobileOpen true => collapseText equals closeText
    expect(comp.collapseText()).toBe(comp.closeText());
  });

  it('should filter representatives based on inputValue', () => {
    const comp = fixture.componentInstance;
    const allReps: Representative[] = [
      { name: 'Alice', description: 'Lead' },
      { name: 'Bob', description: 'Developer' }
    ];
    // update representatives
    fixture.componentRef.setInput('representatives', allReps);
    // no filter => all returned
    expect(comp.filteredRepresentatives()).toEqual(allReps);

    // set filter to match first representative
    comp.inputValue.set('alice');
    expect(comp.filteredRepresentatives()).toEqual([allReps[0]]);

    // set filter with no matches
    comp.inputValue.set('xyz');
    expect(comp.filteredRepresentatives()).toEqual([]);
  });

  it('should set currentRepresentative on handleSelectRepresentative()', () => {
    const comp = fixture.componentInstance;
    const newRep: Representative = { name: 'Charlie', description: 'Tester' };
    comp.handleSelectRepresentative(newRep);
    expect(comp.currentRepresentative()).toBe(newRep);
  });
});
