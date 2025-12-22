export const locales = ['ko', 'en', 'ja', 'zh', 'fr', 'it', 'es'] as const;
export const defaultLocale = 'ko' as const;

export type Locale = (typeof locales)[number];
