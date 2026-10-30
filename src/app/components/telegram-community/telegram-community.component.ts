import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-telegram-community',
  standalone: true,
  imports: [],
  templateUrl: './telegram-community.component.html',
  styleUrl: './telegram-community.component.scss'
})
export class TelegramCommunityComponent {
  readonly telegramUrl = signal<string>('https://t.me/cairo_students_community');
}

