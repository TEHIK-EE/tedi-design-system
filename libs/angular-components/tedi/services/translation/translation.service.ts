import { computed, Injectable, isSignal, signal, Signal } from "@angular/core";
import { translationsMap, TranslationMap, TediTranslationsMap } from "./translations";

export type Language = "en" | "et" | "ru";

@Injectable({ providedIn: "root" })
export class TediTranslationService {
    private currentLang = signal<Language>("et");
    private translations = signal<TranslationMap>(translationsMap);

    getLanguage = this.currentLang.asReadonly();
    
    setLanguage(lang: Language) {
        this.currentLang.set(lang);
    }

    translate<
        TLang extends Language, 
        TKey extends keyof TediTranslationsMap<TLang> | (string & {}),
        TArgs extends TKey extends keyof TediTranslationsMap<TLang>
            ? TediTranslationsMap<TLang>[TKey] extends (...args: infer P) => string 
                ? P 
                : []
            : unknown[]
    >(
        key: TKey,
        ...args: TArgs
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

    track<
        TLang extends Language, 
        TKey extends keyof TediTranslationsMap<TLang> | (string & {}),
        TArgs extends TKey extends keyof TediTranslationsMap<TLang>
            ? TediTranslationsMap<TLang>[TKey] extends (...args: infer P) => string 
                ? P 
                : []
            : unknown[]
    >(
        key: TKey,
        ...args: Signal<TArgs[number]>[]
    ) {
        return computed(() => {
            const resolvedArgs = args.map(arg =>
                isSignal(arg) ? arg() : arg
            ) as TArgs;

            return this.translate(key, ...resolvedArgs);
        });
    }

    addTranslations(newTranslations: TranslationMap) {
        this.translations.update(prev => ({ ...prev, ...newTranslations }));
    }
}