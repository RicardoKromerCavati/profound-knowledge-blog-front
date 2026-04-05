import { Component, inject, NgModule, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { I18nService } from './i18n.service';
import { TranslatePipe } from '../app/translate.pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  private i18n = inject(I18nService);
  protected readonly title = signal('profound-knowledge-blog');

  ngOnInit(): void {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.i18n.load(savedLang);
  }

  changeLang() {
    const savedLang = localStorage.getItem('lang') || 'en';
    let lang: string;
    if (savedLang === 'en')
      lang = 'pt';
    else
      lang = 'en';

    localStorage.setItem('lang', lang);

    this.i18n.load(lang);
  }
}