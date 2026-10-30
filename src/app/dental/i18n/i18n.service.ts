import { DOCUMENT, Injectable, computed, effect, inject, signal } from '@angular/core';
import { ru } from './ru';
import { en } from './en';
import { ar } from './ar';

export type Lang = 'ru' | 'en' | 'ar';

const DICTS = { ru, en, ar };
const STORAGE_KEY = 'fdc-lang';

@Injectable({ providedIn: 'root' })
export class I18n {
  private readonly doc = inject(DOCUMENT);

  readonly langs: { code: Lang; label: string }[] = [
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'ع' },
  ];

  readonly lang = signal<Lang>(this.initialLang());
  readonly t = computed(() => DICTS[this.lang()]);
  readonly rtl = computed(() => this.lang() === 'ar');

  constructor() {
    effect(() => {
      const lang = this.lang();
      const html = this.doc.documentElement;
      html.lang = lang;
      html.dir = lang === 'ar' ? 'rtl' : 'ltr';
      this.doc.title = DICTS[lang].meta.title;
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {}
    });
  }

  private initialLang(): Lang {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ru' || saved === 'en' || saved === 'ar') return saved;
    } catch {}
    return 'ru';
  }
}
