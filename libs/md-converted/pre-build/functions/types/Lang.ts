export const langs = ['de', 'en'] as const;

export type Lang = (typeof langs)[number];
