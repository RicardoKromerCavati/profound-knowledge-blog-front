import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from '../../i18n.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class HomeComponent {
  private i18n = inject(I18nService);
  router = inject(Router);


  goToPostsPage(): void {
    // this.router.navigateByUrl('/posts');
    this.router.navigate(['posts']);
    // this.router.navigate(['posts', 'sample', 'example']);
  }

  t(key: string) {
    return this.i18n.t(key);
  }
}