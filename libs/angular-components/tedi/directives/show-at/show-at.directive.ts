import { Directive, input, inject, TemplateRef, ViewContainerRef, effect } from '@angular/core';
import { Breakpoint, BreakpointService } from '../../services/breakpoint/breakpoint.service';

@Directive({
  selector: '[showAt]',
  standalone: true,
})
export class ShowAtDirective {
    showAt = input.required<Breakpoint>();

    private templateRef = inject(TemplateRef);
    private viewContainerRef = inject(ViewContainerRef);
    private breakpointService = inject(BreakpointService);

    constructor() {
        effect(() => {
            if (this.breakpointService.isAboveBreakpoint(this.showAt())()) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainerRef.clear();
            }
        })
    }
}
