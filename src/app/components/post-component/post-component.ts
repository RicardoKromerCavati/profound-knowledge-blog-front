import { Component, input } from '@angular/core';

@Component({
  selector: 'app-post-component',
  imports: [],
  templateUrl: './post-component.html',
  styleUrl: './post-component.css',
})
export class PostComponent {
  postId = input.required<string>();
  limit = input.required<string>();
  ///posts/20?limit=10
  page = input.required<{pageId: string, name: string}>();
};
