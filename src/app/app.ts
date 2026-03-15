import { Component, NgModule, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('profound-knowledge-blog');
}