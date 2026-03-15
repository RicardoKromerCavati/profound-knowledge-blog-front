import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
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