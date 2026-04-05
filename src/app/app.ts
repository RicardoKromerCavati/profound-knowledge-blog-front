import { Component, inject, NgModule, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { I18nService } from './i18n.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  protected readonly title = signal('profound-knowledge-blog');
  private i18n = inject(I18nService);

  ngOnInit(): void {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.i18n.load(savedLang);
  }

  t(key: string) {
    return this.i18n.t(key);
  }

  changeLang() {
    const savedLang = localStorage.getItem('lang') || 'en';
    let lang: string;
    if (savedLang === 'en')
      lang = 'pt';
    else
      lang = 'en';

    this.i18n.load(lang);
  }
}