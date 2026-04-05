import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '../../translate.pipe';

@Component({
  selector: 'app-not-found-component',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './not-found-component.html',
  styleUrl: './not-found-component.css',
})
export class NotFoundComponent {
}
