import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverComponent, PopoverPosition } from './popover.component';
import { NgxFloatUiContentComponent } from 'ngx-float-ui';

describe('PopoverComponent', () => {
  let fixture: ComponentFixture<PopoverComponent>;
  let component: PopoverComponent;
  let hostEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PopoverComponent],
    });

    fixture = TestBed.createComponent(PopoverComponent);
    component = fixture.componentInstance;
    hostEl = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default inputs', () => {
    expect(component.openWith()).toBe('click');
    expect(component.position()).toBe('top');
    expect(component.dismissible()).toBe(true);
    expect(component.hideOnScroll()).toBe(false);
    expect(component.withBorder()).toBe(false);
  });

  it('should initialize the ViewChild floatUiComponent', () => {
    expect(component.floatUiComponent).toBeInstanceOf(NgxFloatUiContentComponent);
  });

  it('should apply inline-flex style to trigger wrapper', () => {
    const wrapper = hostEl.querySelector('div');
    expect(wrapper?.style.display).toBe('inline-flex');
  });

  it('should render aria-haspopup="dialog"', () => {
    const wrapper = hostEl.querySelector('div');
    expect(wrapper?.getAttribute('aria-haspopup')).toBe('dialog');
  });

  it('should have appendTo="body" attribute', () => {
    const wrapper = hostEl.querySelector('div');
    expect(wrapper?.getAttribute('appendTo')).toBe('body');
  });

  it('should not include the border class by default', () => {
    const wrapper = hostEl.querySelector('div');
    expect(wrapper?.classList).not.toContain('float-ui-container--border');
  });

  it('should apply the border class when withBorder is true', () => {
    fixture.componentRef.setInput('withBorder', true);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const floatUiContent = hostEl.querySelector('float-ui-content');
      const wrapper = floatUiContent?.querySelector('div');
      expect(wrapper?.classList).toContain('float-ui-container--border');
    })
  });

  it('should update openWith when input changes', () => {
    fixture.componentRef.setInput('openWith', 'hover');
    fixture.detectChanges();
    expect(component.openWith()).toBe('hover');
  });

  it('should update position when input changes', () => {
    const POSITIONS: PopoverPosition[] = ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "right", "right-start", "right-end", "left", "left-start", "left-end"];

    for (const pos of POSITIONS) {
      fixture.componentRef.setInput('position', pos);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const floatUiContent = hostEl.querySelector('float-ui-content');
        const wrapper = floatUiContent?.querySelector('div');
        const position = pos.split('-')[0];
        expect(wrapper?.getAttribute('data-float-ui-placement')).toBe(position);
      })
    }
  });

  it('should update dismissible when input changes', () => {
    fixture.componentRef.setInput('dismissible', false);
    fixture.detectChanges();
    expect(component.dismissible()).toBe(false);
  });

  it('should update hideOnScroll when input changes', () => {
    fixture.componentRef.setInput('hideOnScroll', true);
    fixture.detectChanges();
    expect(component.hideOnScroll()).toBe(true);
  });
});
