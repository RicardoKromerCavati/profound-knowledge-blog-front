import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { I18nService } from './core/services/i18n.service';
import { TranslatePipe } from './shared/pipes/translate.pipe';
import { AuthService } from './core/api/authentication/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { UserSessionResponse } from './core/api/session/user.session.response';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  private i18n = inject(I18nService);
  protected readonly title = signal('profound-knowledge-blog');
  authService = inject(AuthService);
  http = inject(HttpClient);

  ngOnInit(): void {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.i18n.load(savedLang);
    this.http.get<UserSessionResponse>(`${environment.backendUrl}/Session`)
      .subscribe({
        next: (response) => {
          console.log('response', response);
          this.authService.currentUserSignal.set(response);
        },
        error: () => {
          this.authService.currentUserSignal.set(null);
        },
      });
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

  logout() {
    localStorage.setItem('token', '');
    this.authService.currentUserSignal.set(null);
  }
}