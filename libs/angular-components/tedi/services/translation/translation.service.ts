import { Injectable, signal } from "@angular/core";
import { translationsMap, CurrentLanguageMap } from "./translations";

export type Language = "en" | "et" | "ru";

@Injectable({ providedIn: "root" })
export class TranslationService {
    private currentLang = signal<Language>("et");

    getLanguage() {
        return this.currentLang();
    }

    setLanguage(lang: Language) {
        this.currentLang.set(lang);
    }
    
    translate<L extends Language = Language, K extends keyof CurrentLanguageMap<L> = keyof CurrentLanguageMap<L>>(
        key: K,
        ...args: CurrentLanguageMap<L>[K] extends (...args: infer P) => string ? P : []
    ): string {
        const lang = this.currentLang();
        const value = translationsMap[key][lang];

        if (typeof value === "function") {
            return (value as (...args: unknown[]) => string)(...args);
        }

        return value;
    }
}