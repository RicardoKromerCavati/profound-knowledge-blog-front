import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../translate.pipe';

@Component({
  selector: 'app-home',
  imports: [TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class HomeComponent {
  router = inject(Router);

  goToPostsPage(): void {
    // this.router.navigateByUrl('/posts');
    this.router.navigate(['posts']);
    // this.router.navigate(['posts', 'sample', 'example']);
  }
}