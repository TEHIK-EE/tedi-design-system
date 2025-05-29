import { inject, Pipe, PipeTransform } from "@angular/core";
import { TediTranslationService } from "./translation.service";

@Pipe({
    name: "tediTranslate",
    standalone: true,
    pure: false
})
export class TediTranslationPipe implements PipeTransform {
    translationService = inject(TediTranslationService);

    transform(key: string, ...args: unknown[]): string {
        return this.translationService.translate(key, ...args);
    }
}