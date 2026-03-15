import { Component } from '@angular/core';
import { PostItemComponent } from '../post-item/post-item'

@Component({
  selector: 'app-post-list-component',
  imports: [PostItemComponent],
  templateUrl: './post-list-component.html',
  styleUrl: './post-list-component.css',
  standalone: true  
})
export class PostListComponent {}
