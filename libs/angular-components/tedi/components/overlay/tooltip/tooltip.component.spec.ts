import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Component, Injectable, input, OnDestroy, ViewChild } from '@angular/core';
import { TOOLTIP_TIMEOUT_MS, TooltipComponent, TooltipOpenWith } from './tooltip.component';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { TooltipTriggerComponent } from './tooltip-trigger.component';
import { TooltipContentComponent, TooltipPosition, TooltipWidth } from './tooltip-content.component';

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
  imports: [TooltipComponent, TooltipTriggerComponent, TooltipContentComponent],
  template: `
    <tedi-tooltip #tooltip [openWith]="openWith()">
      <tedi-tooltip-trigger #trigger>
        Trigger
      </tedi-tooltip-trigger>
      <tedi-tooltip-content [position]="position()" [maxWidth]="maxWidth()">
        Tooltip content
      </tedi-tooltip-content>
    </tedi-tooltip>
  `,
})
class TooltipNormalComponent {
  position = input<TooltipPosition>("top");
  openWith = input<TooltipOpenWith>("hover");
  maxWidth = input<TooltipWidth>("medium");

  @ViewChild("tooltip") tooltipComponent!: TooltipComponent;
  @ViewChild('trigger') triggerComponent!: TooltipTriggerComponent;
}

@Component({
  standalone: true,
  imports: [TooltipComponent, TooltipTriggerComponent, TooltipContentComponent],
  template: `
    <tedi-tooltip>
      <tedi-tooltip-trigger #trigger></tedi-tooltip-trigger>
      <tedi-tooltip-content>Content</tedi-tooltip-content>
    </tedi-tooltip>
  `,
})
class TooltipEmptyTriggerComponent {
  @ViewChild('trigger') triggerComponent!: TooltipTriggerComponent;
}

@Component({
  standalone: true,
  imports: [TooltipComponent, TooltipTriggerComponent, TooltipContentComponent],
  template: `
    <tedi-tooltip>
      <tedi-tooltip-trigger #trigger>
        <div tabindex="5">Custom Tabindex</div>
      </tedi-tooltip-trigger>
      <tedi-tooltip-content>Content</tedi-tooltip-content>
    </tedi-tooltip>
  `,
})
class TooltipElementTriggerWithTabindexComponent {
  @ViewChild('trigger') triggerComponent!: TooltipTriggerComponent;
}

@Component({
  standalone: true,
  imports: [TooltipComponent, TooltipTriggerComponent, TooltipContentComponent],
  template: `
    <tedi-tooltip>
      <tedi-tooltip-trigger #trigger>
        <div>No tabindex</div>
      </tedi-tooltip-trigger>
      <tedi-tooltip-content>Content</tedi-tooltip-content>
    </tedi-tooltip>
  `,
})
class TooltipElementTriggerWithoutTabindexComponent {
  @ViewChild('trigger') triggerComponent!: TooltipTriggerComponent;
}


describe("TooltipComponent", () => {
  describe("Normal tooltip", () => {
    let fixture: ComponentFixture<TooltipNormalComponent>;
    let tooltipComponent: TooltipComponent;
    let tooltipTriggerComponent: TooltipTriggerComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TooltipNormalComponent, OverlayModule, PortalModule],
        providers: [{ provide: OverlayContainer, useClass: NoopOverlayContainer }],
      });

      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
  
      fixture = TestBed.createComponent(TooltipNormalComponent);
      fixture.detectChanges();
      tooltipComponent = fixture.componentInstance.tooltipComponent;
      tooltipTriggerComponent = fixture.componentInstance.triggerComponent;
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should show the tooltip when openTooltip is called', fakeAsync(() => {
      tooltipComponent.openTooltip();
      fixture.detectChanges();
      tick();
  
      const tooltip = overlayContainerElement.querySelector('.tedi-tooltip-content');
      expect(tooltip).toBeTruthy();
    }));
  
    it('should hide the tooltip when closeTooltip is called', fakeAsync(() => {
      tooltipComponent.openTooltip();
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.querySelector('.tedi-tooltip-content')).toBeTruthy();
  
      tooltipComponent.closeTooltip();
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.querySelector('.tedi-tooltip-content')).toBeFalsy();
      flush();
    }));
  
    it('should toggle the tooltip when toggleTooltip is called', fakeAsync(() => {
      tooltipComponent.toggleTooltip();
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.querySelector('.tedi-tooltip-content')).toBeTruthy();
  
      tooltipComponent.toggleTooltip();
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.querySelector('.tedi-tooltip-content')).toBeFalsy();
    }));
  
    it('should open on mouseenter and close after timeout on mouseleave when openWith="hover"', fakeAsync(() => {
      fixture.componentRef.setInput('openWith', 'hover');
      fixture.detectChanges();
      tick();
  
      const trigger = tooltipTriggerComponent.element()!;
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();
      tick();
  
      expect(overlayContainerElement.querySelector('.tedi-tooltip-content')).toBeTruthy();
  
      trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      fixture.detectChanges();
      tick(TOOLTIP_TIMEOUT_MS + 10);
  
      expect(overlayContainerElement.querySelector('.tedi-tooltip-content')).toBeFalsy();
    }));
  
    it('should open and close tooltip on click when openWith="click"', fakeAsync(() => {
      fixture.componentRef.setInput('openWith', 'click');
      fixture.detectChanges();
  
      const trigger = tooltipTriggerComponent.element()!;
      trigger.click();
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.querySelector('.tedi-tooltip-content')).toBeTruthy();
  
      trigger.click();
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.querySelector('.tedi-tooltip-content')).toBeFalsy();
    }));
  
    it('should close tooltip when clicking outside', fakeAsync(() => {
      fixture.componentRef.setInput('openWith', 'click');
      fixture.detectChanges();
  
      const trigger = tooltipTriggerComponent.element()!;
      trigger.click();
      fixture.detectChanges();
      tick();
  
      document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.querySelector('.tedi-tooltip-content')).toBeFalsy();
    }));
  
    it('should open tooltip on focus and close on blur', fakeAsync(() => {
      const trigger = tooltipTriggerComponent.element()!;
  
      trigger.dispatchEvent(new Event('focus'));
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.querySelector('.tedi-tooltip-content')).toBeTruthy();
  
      trigger.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      tick(TOOLTIP_TIMEOUT_MS + 10);
      expect(overlayContainerElement.querySelector('.tedi-tooltip-content')).toBeFalsy();
    }));
  
    it('should clear tooltip close timeout if it exists', fakeAsync(() => {
      const trigger = tooltipTriggerComponent.element()!;
  
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();
      tick();
  
      trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      fixture.detectChanges();
      tick();
      expect(tooltipComponent.closeTimeout()).not.toBeNull();
  
      tooltipComponent.openTooltip();
      fixture.detectChanges();
      tick();
      expect(tooltipComponent.closeTimeout()).toBeNull();
    }));
  
    it('should wrap text content in a span with tabindex', fakeAsync(() => {
      const el = tooltipTriggerComponent.element()!;
      expect(el.tagName.toLowerCase()).toBe('span');
      expect(el.classList.contains('tedi-tooltip-trigger__text')).toBeTruthy();
      expect(el.getAttribute('tabindex')).toBe('0');
    }));
  
    it('should close tooltip when Escape key is pressed', fakeAsync(() => {
      const trigger = tooltipTriggerComponent.element()!;
  
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();
      tick();
    
      expect(overlayContainerElement.querySelector('.tedi-tooltip-content')).toBeTruthy();
    
      const escEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escEvent);
      fixture.detectChanges();
      tick();
    
      expect(overlayContainerElement.querySelector('.tedi-tooltip-content')).toBeFalsy();
    }));
  
    it('should not fail if tooltip element is missing in addTooltipListeners', fakeAsync(() => {
      tooltipComponent['overlayRef'] = tooltipComponent['overlay'].create(tooltipComponent['getOverlayConfig']());
      tooltipComponent['overlayRef'].attach(tooltipComponent['portal']);
      jest.spyOn(tooltipComponent['overlayRef'].overlayElement, 'querySelector').mockReturnValue(null);
    
      expect(() => tooltipComponent['addTooltipListeners']()).not.toThrow();
    }));
  
    it('should schedule close when tooltip content mouseleave and openWith is hover', fakeAsync(() => {
      fixture.componentRef.setInput('openWith', 'hover');
      fixture.detectChanges();
      tick();
    
      const trigger = tooltipTriggerComponent.element()!;
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();
      tick();
    
      const tooltip = overlayContainerElement.querySelector('.tedi-tooltip-content')!;
      tooltip.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      fixture.detectChanges();
      tick(TOOLTIP_TIMEOUT_MS + 10);
    
      expect(overlayContainerElement.querySelector('.tedi-tooltip-content')).toBeFalsy();
    }));
  })

  describe("Empty trigger tooltip", () => {
    it('should not throw if trigger has no content', fakeAsync(() => {
      const emptyFixture = TestBed.createComponent(TooltipEmptyTriggerComponent);
      emptyFixture.detectChanges();
      tick();
    
      const el = emptyFixture.componentInstance.triggerComponent.element();
      expect(el).toBeNull();
    }));
  })

  describe("With element and tabindex tooltip", () => {
    it('should not override existing tabindex on element child', fakeAsync(() => {
      const elFixture = TestBed.createComponent(TooltipElementTriggerWithTabindexComponent);
      elFixture.detectChanges();
      tick();
    
      const el = elFixture.componentInstance.triggerComponent.element()!;
      expect(el.tagName.toLowerCase()).toBe('div');
      expect(el.getAttribute('tabindex')).toBe('5');
      expect(el.textContent?.trim()).toBe('Custom Tabindex');
    }));
  })

  describe("With element and missing tabindex tooltip", () => {
    it('should set tabindex="0" on element child if missing', fakeAsync(() => {
      const elFixture = TestBed.createComponent(TooltipElementTriggerWithoutTabindexComponent);
      elFixture.detectChanges();
      tick();
    
      const el = elFixture.componentInstance.triggerComponent.element()!;
      expect(el.tagName.toLowerCase()).toBe('div');
      expect(el.getAttribute('tabindex')).toBe('0');
      expect(el.textContent?.trim()).toBe('No tabindex');
    }));
  })
});
