import { Injectable, signal } from "@angular/core";
import { translationsMap, TranslationMap, TediTranslationsMap } from "./translations";

export type Language = "en" | "et" | "ru";

@Injectable({ providedIn: "root" })
export class TranslationService {
    private currentLang = signal<Language>("et");
    private translations = signal<TranslationMap>(translationsMap);

    getLanguage() {
        return this.currentLang();
    }

    setLanguage(lang: Language) {
        this.currentLang.set(lang);
    }

    translate<
        L extends Language, 
        K extends keyof TediTranslationsMap<L> | (string & {})
    >(
        key: K,
        ...args: K extends keyof TediTranslationsMap<L>
            ? TediTranslationsMap<L>[K] extends (...args: infer P) => string 
                ? P 
                : []
            : unknown[]
    ): string {
        const lang = this.currentLang();
        const entry = this.translations()[key];

        if (!entry || !(lang in entry)) {
            return key;
        }
        
        const value = entry[lang];

        if (typeof value === "function") {
            return value(...args);
        }

        return value;
    }

    addTranslations(newTranslations: TranslationMap) {
        this.translations.update(prev => ({ ...prev, ...newTranslations }));
    }
}