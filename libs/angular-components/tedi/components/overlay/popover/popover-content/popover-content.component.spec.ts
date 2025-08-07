import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PopoverContentComponent, PopoverWidth } from './popover-content.component';
import { PopoverComponent } from '../popover.component';

@Component({
  template: `
    <tedi-popover-content
      [maxWidth]="width"
      [title]="title"
      [showClose]="showClose"
    >
      <span class="projected">Hello!</span>
    </tedi-popover-content>
  `,
  standalone: true,
  imports: [PopoverContentComponent],
})
class TestHostComponent {
  width: PopoverWidth = 'small';
  title = '';
  showClose = false;
}

describe('PopoverContentComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostDE: DebugElement;
  let popoverMock: Partial<PopoverComponent>;
  let hideSpy: jest.Mock;

  beforeEach(() => {
    hideSpy = jest.fn();
    popoverMock = {
      floatUiComponent: {
        hide: hideSpy,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: PopoverComponent, useValue: popoverMock },
      ],
      imports: [TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    hostDE = fixture.debugElement.query(By.directive(PopoverContentComponent));
    fixture.detectChanges();
  });

  it('should create component', () => {
    const comp = hostDE.componentInstance as PopoverContentComponent;
    expect(comp).toBeTruthy();
  });

  it('should have role="dialog" on host', () => {
    expect(hostDE.attributes['role']).toBe('dialog');
  });

  it('should apply default classes (small)', () => {
    const classList = hostDE.nativeElement.className.split(' ');
    expect(classList).toContain('tedi-popover-content');
    expect(classList).toContain('tedi-popover-content--small');
  });

  it('should update classes when maxWidth input changes', () => {
    fixture.componentInstance.width = 'large';
    fixture.detectChanges();

    const classes = hostDE.nativeElement.className;
    expect(classes).toContain('tedi-popover-content--large');
    expect(classes).not.toContain('tedi-popover-content--small');
  });

  describe('template branches', () => {
    it('renders only projected content when no title & no close', () => {
      // default: title = '', showClose = false
      const projected = hostDE.query(By.css('.projected'));
      expect(projected).toBeTruthy();
      // no <h4> or button
      expect(hostDE.query(By.css('h4'))).toBeNull();
      expect(hostDE.query(By.css('button'))).toBeNull();
    });

    it('renders title only when title set, showClose = false', () => {
      fixture.componentInstance.title = 'My Title';
      fixture.componentInstance.showClose = false;
      fixture.detectChanges();

      const h4 = hostDE.query(By.css('h4'));
      expect(h4).toBeTruthy();
      expect(h4.nativeElement.textContent).toBe('My Title');
      // aria-labelledby should match id
      const id = h4.attributes['id'];
      expect(hostDE.attributes['aria-labelledby']).toBe(id);
      // no button
      expect(hostDE.query(By.css('button'))).toBeNull();
    });

    it('renders close only when showClose = true & no title', () => {
      fixture.componentInstance.title = '';
      fixture.componentInstance.showClose = true;
      fixture.detectChanges();

      const head = hostDE.query(By.css('.tedi-popover-content__head'));
      expect(head).toBeTruthy();
      // projected inside a div
      expect(head.query(By.css('.projected'))).toBeTruthy();
      const btn = head.query(By.css('button'));
      expect(btn).toBeTruthy();
      // closing-button default size is small
      expect(btn.attributes['size']).toBe('small');
    });

    it('renders title + close when both set', () => {
      fixture.componentInstance.title = 'T';
      fixture.componentInstance.showClose = true;
      fixture.detectChanges();

      const head = hostDE.query(By.css('.tedi-popover-content__head'));
      expect(head).toBeTruthy();
      const h4 = head.query(By.css('h4'));
      expect(h4.nativeElement.textContent).toBe('T');
      const btn = head.query(By.css('button'));
      expect(btn).toBeTruthy();
      // when title present, button has no size attr
      expect(btn.attributes['size']).toBeUndefined();
    });
  });

  it('should call popover.floatUiComponent.hide() on close click', () => {
    // set up a branch with a button
    fixture.componentInstance.showClose = true;
    fixture.detectChanges();

    const btnDe = hostDE.query(By.css('button'));
    btnDe.triggerEventHandler('click', {});
    expect(hideSpy).toHaveBeenCalled();
  });
});
