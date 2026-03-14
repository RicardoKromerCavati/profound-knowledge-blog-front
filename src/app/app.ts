import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostItemComponent } from './components/post-item/post-item';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PostItemComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('profound-knowledge-blog');
}
