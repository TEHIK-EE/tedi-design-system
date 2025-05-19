import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Component, Injectable, input, OnDestroy, ViewChild } from '@angular/core';
import { TOOLTIP_TIMEOUT_MS, TooltipComponent, TooltipPosition, TooltipTrigger, TooltipWidth } from './tooltip.component';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

const tooltipContent = 'Tooltip content';

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
  imports: [TooltipComponent],
  template: `
    <tedi-tooltip #tooltip [text]="text()" [position]="position()" [openWith]="openWith()" [maxWidth]="maxWidth()">
      <button #tooltipTrigger>Trigger</button>
    </tedi-tooltip>
  `,
})
class TooltipHostComponent {
  text = input.required<string>();
  position = input<TooltipPosition>('top');
  openWith = input<TooltipTrigger>('hover');
  maxWidth = input<TooltipWidth>('medium');

  @ViewChild('tooltip') tooltipComponent!: TooltipComponent;
}

@Component({
  standalone: true,
  imports: [TooltipComponent],
  template: `
    <tedi-tooltip [text]="text()">
      <button>Trigger without template ref</button>
    </tedi-tooltip>
  `,
})
class TooltipWithoutTriggerRefComponent {
  text = input.required<string>();
}

describe('TooltipComponent', () => {
  let fixture: ComponentFixture<TooltipHostComponent>;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TooltipHostComponent, OverlayModule, PortalModule],
      providers: [{ provide: OverlayContainer, useClass: NoopOverlayContainer }],
    });

    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();

    fixture = TestBed.createComponent(TooltipHostComponent);
    fixture.componentRef.setInput('text', tooltipContent);
    fixture.detectChanges();
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should show the tooltip when openTooltip is called', fakeAsync(() => {
    fixture.componentInstance.tooltipComponent.openTooltip();
    fixture.detectChanges();
    tick();

    const tooltip = overlayContainerElement.querySelector('.tooltip');
    expect(tooltip).toBeTruthy();
    expect(tooltip?.textContent).toContain(tooltipContent);
  }));

  it('should hide the tooltip when closeTooltip is called', fakeAsync(() => {
    const cmp = fixture.componentInstance.tooltipComponent;

    cmp.openTooltip();
    fixture.detectChanges();
    tick();
    expect(overlayContainerElement.querySelector('.tooltip')).toBeTruthy();

    cmp.closeTooltip();
    fixture.detectChanges();
    tick();
    expect(overlayContainerElement.querySelector('.tooltip')).toBeFalsy();
    flush();
  }));

  it('should toggle the tooltip when toggleTooltip is called', fakeAsync(() => {
    const cmp = fixture.componentInstance.tooltipComponent;

    cmp.toggleTooltip();
    fixture.detectChanges();
    tick();
    expect(overlayContainerElement.querySelector('.tooltip')).toBeTruthy();

    cmp.toggleTooltip();
    fixture.detectChanges();
    tick();
    expect(overlayContainerElement.querySelector('.tooltip')).toBeFalsy();
  }));

  it('should open on mouseenter and close after timeout on mouseleave when openWith="hover"', fakeAsync(() => {
    fixture.componentRef.setInput('openWith', 'hover');
    fixture.detectChanges();
    tick();

    const trigger = fixture.nativeElement.querySelector('button');
    trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fixture.detectChanges();
    tick();

    expect(overlayContainerElement.querySelector('.tooltip')).toBeTruthy();

    trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    fixture.detectChanges();
    tick(TOOLTIP_TIMEOUT_MS + 10);

    expect(overlayContainerElement.querySelector('.tooltip')).toBeFalsy();
  }));

  it('should stay open when hovering tooltip content', fakeAsync(() => {
    fixture.componentRef.setInput('openWith', 'hover');
    fixture.detectChanges();
    tick();

    const trigger = fixture.nativeElement.querySelector('button');
    trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fixture.detectChanges();
    tick();

    const tooltip = overlayContainerElement.querySelector('.tooltip') as HTMLElement;
    expect(tooltip).toBeTruthy();

    tooltip.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fixture.detectChanges();
    tick();

    trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    fixture.detectChanges();
    tick(TOOLTIP_TIMEOUT_MS + 10);
    expect(overlayContainerElement.querySelector('.tooltip')).toBeTruthy();

    tooltip.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    fixture.detectChanges();
    tick(TOOLTIP_TIMEOUT_MS + 10);
    expect(overlayContainerElement.querySelector('.tooltip')).toBeFalsy();
  }));

  it('should open and close tooltip on click when openWith="click"', fakeAsync(() => {
    fixture.componentRef.setInput('openWith', 'click');
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('button');
    trigger.click();
    fixture.detectChanges();
    tick();
    expect(overlayContainerElement.querySelector('.tooltip')).toBeTruthy();

    trigger.click();
    fixture.detectChanges();
    tick();
    expect(overlayContainerElement.querySelector('.tooltip')).toBeFalsy();
  }));

  it('should close tooltip when clicking outside', fakeAsync(() => {
    fixture.componentRef.setInput('openWith', 'click');
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('button');
    trigger.click();
    fixture.detectChanges();
    tick();

    document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    tick();
    expect(overlayContainerElement.querySelector('.tooltip')).toBeFalsy();
  }));

  it('should open tooltip on focus and close on blur', fakeAsync(() => {
    const trigger = fixture.nativeElement.querySelector('button');

    trigger.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    tick();
    expect(overlayContainerElement.querySelector('.tooltip')).toBeTruthy();

    trigger.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    tick(TOOLTIP_TIMEOUT_MS + 10);
    expect(overlayContainerElement.querySelector('.tooltip')).toBeFalsy();
  }));

  it('should not throw if triggerButton is not defined', () => {
    const noTriggerFixture = TestBed.createComponent(TooltipWithoutTriggerRefComponent);
    noTriggerFixture.componentRef.setInput('text', 'Hello');
    expect(() => noTriggerFixture.detectChanges()).not.toThrow();
  });

  it('should clear tooltip close timeout if it exists', fakeAsync(() => {
    const cmp = fixture.componentInstance.tooltipComponent;
    const trigger = fixture.nativeElement.querySelector('button');

    trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fixture.detectChanges();
    tick();

    trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    fixture.detectChanges();
    tick();
    expect(cmp.hoverTimeout()).not.toBeNull();

    cmp.openTooltip();
    fixture.detectChanges();
    tick();
    expect(cmp.hoverTimeout()).toBeNull();
  }));

  it('should return empty array from buildPositions for invalid position', () => {
    fixture.componentRef.setInput('position', 'invalid');
    fixture.detectChanges();

    const result = fixture.componentInstance.tooltipComponent.buildPositions();
    expect(result).toEqual([]);
  });
});
