import { Component, signal } from '@angular/core';

interface ChecklistItem {
  id: number;
  label: string;
  done: boolean;
}

@Component({
  selector: 'app-route-demo',
  standalone: true,
  imports: [],
  templateUrl: './route-demo.component.html',
  styleUrl: './route-demo.component.scss'
})
export class RouteDemoComponent {
  readonly checklist = signal<ChecklistItem[]>([
    { id: 1, label: 'Разменять мелкие купюры (EGP) до посадки в транспорт', done: true },
    { id: 2, label: 'Скачать офлайн-карту Каира и этот PDF в память телефона', done: true },
    { id: 3, label: 'Сверить номер терминала и точку посадки по карте', done: false }
  ]);

  toggleCheck(id: number): void {
    this.checklist.update(items =>
      items.map(item => (item.id === id ? { ...item, done: !item.done } : item))
    );
  }
}

