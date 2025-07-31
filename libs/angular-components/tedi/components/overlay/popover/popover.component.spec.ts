import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick
} from '@angular/core/testing';
import { Component, Injectable, input, ViewChild, OnDestroy } from '@angular/core';
import {
  PopoverComponent,
  PopoverOpenWith,
  POPOVER_TIMEOUT_MS
} from './popover.component';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { PopoverTriggerComponent } from './popover-trigger/popover-trigger.component';
import { PopoverContentComponent } from './popover-content/popover-content.component';

@Injectable()
class NoopOverlayContainer extends OverlayContainer implements OnDestroy {
  private _customContainerElement: HTMLElement;

  constructor() {
    super();
    this._customContainerElement = document.createElement('div');
    this._customContainerElement.classList.add('cdk-overlay-container');
    document.body.appendChild(this._customContainerElement);
  }

  override getContainerElement(): HTMLElement {
    return this._customContainerElement;
  }

  override ngOnDestroy(): void {
    this._customContainerElement.remove();
  }
}

@Component({
  standalone: true,
  imports: [PopoverComponent, PopoverTriggerComponent, PopoverContentComponent],
  template: `
    <tedi-popover #popover [openWith]="openWith()">
      <tedi-popover-trigger #trigger>
        Trigger
      </tedi-popover-trigger>
      <tedi-popover-content [position]="position()">
        Popover content
      </tedi-popover-content>
    </tedi-popover>
  `
})
class PopoverNormalComponent {
  openWith = input<PopoverOpenWith>('hover');
  position = input<'top' | 'bottom' | 'left' | 'right'>('top');

  @ViewChild('popover') popoverComponent!: PopoverComponent;
  @ViewChild('trigger') triggerComponent!: PopoverTriggerComponent;
}

describe('PopoverComponent', () => {
  describe('Normal popover', () => {
    let fixture: ComponentFixture<PopoverNormalComponent>;
    let popoverComponent: PopoverComponent;
    let triggerComponent: PopoverTriggerComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PopoverNormalComponent, OverlayModule, PortalModule],
        providers: [{ provide: OverlayContainer, useClass: NoopOverlayContainer }]
      });

      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();

      fixture = TestBed.createComponent(PopoverNormalComponent);
      fixture.detectChanges();
      popoverComponent = fixture.componentInstance.popoverComponent;
      triggerComponent = fixture.componentInstance.triggerComponent;
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should show the popover when openPopover is called', fakeAsync(() => {
      popoverComponent.openPopover();
      fixture.detectChanges();
      tick();

      const popover = overlayContainerElement.querySelector('.tedi-popover-content');
      expect(popover).toBeTruthy();
    }));

    it('should hide the popover when closePopover is called', fakeAsync(() => {
      popoverComponent.openPopover();
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.querySelector('.tedi-popover-content')).toBeTruthy();

      popoverComponent.closePopover();
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.querySelector('.tedi-popover-content')).toBeFalsy();
      flush();
    }));

    it('should toggle the popover when togglePopover is called', fakeAsync(() => {
      popoverComponent.togglePopover();
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.querySelector('.tedi-popover-content')).toBeTruthy();

      popoverComponent.togglePopover();
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.querySelector('.tedi-popover-content')).toBeFalsy();
    }));

    it('should open on mouseenter and close after timeout on mouseleave when openWith="hover"', fakeAsync(() => {
      fixture.componentRef.setInput('openWith', 'hover');
      fixture.detectChanges();
      tick();

      const triggerEl = triggerComponent.host.nativeElement as HTMLElement;
      triggerEl.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();
      tick();

      expect(overlayContainerElement.querySelector('.tedi-popover-content')).toBeTruthy();

      triggerEl.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      fixture.detectChanges();
      tick(POPOVER_TIMEOUT_MS + 10);

      expect(overlayContainerElement.querySelector('.tedi-popover-content')).toBeFalsy();
    }));

    it('should open and close popover on click when openWith="click"', fakeAsync(() => {
      fixture.componentRef.setInput('openWith', 'click');
      fixture.detectChanges();

      const triggerEl = triggerComponent.host.nativeElement as HTMLElement;
      triggerEl.click();
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.querySelector('.tedi-popover-content')).toBeTruthy();

      triggerEl.click();
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.querySelector('.tedi-popover-content')).toBeFalsy();
    }));

    it('should close popover when clicking outside', fakeAsync(() => {
      fixture.componentRef.setInput('openWith', 'click');
      fixture.detectChanges();

      const triggerEl = triggerComponent.host.nativeElement as HTMLElement;
      triggerEl.click();
      fixture.detectChanges();
      tick();

      document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.querySelector('.tedi-popover-content')).toBeFalsy();
    }));

    it('should open popover on focus and close on blur', fakeAsync(() => {
      const triggerEl = triggerComponent.host.nativeElement as HTMLElement;

      triggerEl.dispatchEvent(new Event('focus'));
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.querySelector('.tedi-popover-content')).toBeTruthy();

      triggerEl.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      tick(POPOVER_TIMEOUT_MS + 10);
      expect(overlayContainerElement.querySelector('.tedi-popover-content')).toBeFalsy();
    }));

    it('should clear popover close timeout if it exists', fakeAsync(() => {
      const triggerEl = triggerComponent.host.nativeElement as HTMLElement;

      triggerEl.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();
      tick();

      triggerEl.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      fixture.detectChanges();
      tick();
      expect(popoverComponent.closeTimeout()).not.toBeNull();

      popoverComponent.openPopover();
      fixture.detectChanges();
      tick();
      expect(popoverComponent.closeTimeout()).toBeNull();
    }));

    it('should close popover when Escape key is pressed', fakeAsync(() => {
      const triggerEl = triggerComponent.host.nativeElement as HTMLElement;

      triggerEl.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();
      tick();

      expect(overlayContainerElement.querySelector('.tedi-popover-content')).toBeTruthy();

      const escEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escEvent);
      fixture.detectChanges();
      tick();

      expect(overlayContainerElement.querySelector('.tedi-popover-content')).toBeFalsy();
    }));

    it('should not fail if popover element is missing in addPopoverListeners', fakeAsync(() => {
      popoverComponent['overlayRef'] = popoverComponent['overlay'].create(popoverComponent['getOverlayConfig']());
      popoverComponent['overlayRef'].attach(popoverComponent['portal']);
      jest.spyOn(
        popoverComponent['overlayRef'].overlayElement,
        'querySelector'
      ).mockReturnValue(null);

      expect(() => popoverComponent['addPopoverListeners']()).not.toThrow();
    }));

    it('should schedule close when popover content mouseleave and openWith is hover', fakeAsync(() => {
      fixture.componentRef.setInput('openWith', 'hover');
      fixture.detectChanges();
      tick();

      const triggerEl = triggerComponent.host.nativeElement as HTMLElement;
      triggerEl.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();
      tick();

      const popoverEl = overlayContainerElement.querySelector('.tedi-popover-content')!;
      popoverEl.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      fixture.detectChanges();
      tick(POPOVER_TIMEOUT_MS + 10);

      expect(overlayContainerElement.querySelector('.tedi-popover-content')).toBeFalsy();
    }));
  });

  describe('PopoverContentComponent', () => {
    let component: PopoverContentComponent;
    let fixture: ComponentFixture<PopoverContentComponent>;
    let mockPopover: { closePopover: jest.Mock };

    beforeEach(() => {
      mockPopover = { closePopover: jest.fn() };
      TestBed.configureTestingModule({
        imports: [PopoverContentComponent],
        providers: [{ provide: PopoverComponent, useValue: mockPopover }]
      });
      fixture = TestBed.createComponent(PopoverContentComponent);
      component = fixture.componentInstance;
    });

    it('should include border class when withBorder is true', () => {
      fixture.componentRef.setInput('withBorder', true);
      fixture.detectChanges();
      expect(component.classes().split(' ')).toContain('tedi-popover-content--border');
    });

    it('should call popover.closePopover on handleClose', () => {
      component.handleClose();
      expect(mockPopover.closePopover).toHaveBeenCalled();
    });
  });
});
