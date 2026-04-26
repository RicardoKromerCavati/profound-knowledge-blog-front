import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class I18nService {
    private translations = signal<Record<string, string>>({});
    private currentLang = signal('en');

    async load(lang: string) {
        const localizationFilePath = `../assets/i18n/${lang}.json`;
        const response = await fetch(localizationFilePath);
        const json = await response.json();

        this.translations.set(json);
        this.currentLang.set(lang);

        localStorage.setItem('lang', lang);
    }

    t(key: string): string {
        return this.translations()[key] || key;
    }

    get lang() {
        return this.currentLang;
    }
}