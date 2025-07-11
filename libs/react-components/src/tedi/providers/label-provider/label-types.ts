type LabelBaseEntry = {
  description?: string;
  components?: string[];
};

type LabelStringEntry = LabelBaseEntry & {
  [TLang in TediLanguage]: string;
};

type LabelFunctionEntry<TArgs extends unknown[]> = LabelBaseEntry & {
  [TLang in TediLanguage]: (...args: TArgs) => string;
};

type ExtractLabelArgs<TArgs> = TArgs extends { [TLang in TediLanguage]: (...args: infer Args) => string }
  ? Args
  : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HasConsistentArgs<TArgs> = TArgs extends { [TLang in TediLanguage]: (...args: any[]) => string }
  ? TArgs extends {
      et: (...args: infer ArgsEt) => string;
      en: (...args: infer ArgsEn) => string;
      ru: (...args: infer ArgsRu) => string;
    }
    ? ArgsEt extends ArgsEn
      ? ArgsEn extends ArgsRu
        ? ArgsRu extends ArgsEt
          ? true
          : false
        : false
      : false
    : never
  : true;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TediLabelRecord = Record<string, LabelStringEntry | LabelFunctionEntry<any>>;
export type TediLanguage = 'et' | 'en' | 'ru';

export type TediValidatedLabels<TRecord> = {
  [TKey in keyof TRecord]: HasConsistentArgs<TRecord[TKey]> extends true
    ? TRecord[TKey] extends { [TLang in TediLanguage]: string }
      ? LabelStringEntry
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      TRecord[TKey] extends { [TLang in TediLanguage]: (...args: any[]) => string }
      ? LabelFunctionEntry<ExtractLabelArgs<TRecord[TKey]>>
      : never
    : never;
};
