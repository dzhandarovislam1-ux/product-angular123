import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly currentYear = signal<number>(new Date().getFullYear());
  readonly projectName = signal<string>('Каир: Маршруты и Чек-листы');
}

